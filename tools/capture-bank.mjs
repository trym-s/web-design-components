#!/usr/bin/env node
/**
 * Renders every reference of an imported design system (Astryx, shadcn/ui) in headless Chromium
 * and records what it produced.
 *
 * usage: node tools/capture-bank.mjs --source astryx|shadcn --base http://127.0.0.1:5173 [--static] [--previews] [--only <id,…>]
 *
 * --static   opens each example of each reference in the viewer's preview page and writes
 *            `static/<example>.html`: the rendered DOM, the theme attributes, any runtime-injected
 *            rules, and a link to the source's shared stylesheet. It also reports every
 *            example that throws, so a broken demo is never silently shipped.
 * --previews captures `preview.png` from the upstream page (docs, template, block, chart, Storybook).
 *
 * Needs the viewer dev server running (`npm run dev`).
 */

import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const ROOT = resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const opt = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const BASE = (opt("--base") ?? "http://127.0.0.1:5173").replace(/\/$/, "");
const ONLY = opt("--only");
const WORKERS = Number(opt("--workers") ?? 4);
// What differs per source: the harness's hooks and the stylesheet static HTML links.
const SOURCES = {
  astryx: { list: "__astryxExamples", frame: "data-astryx-frame", example: "data-astryx-example", error: "data-astryx-error", css: "_sources/astryx/frame.css", label: (m) => `Astryx ${m.version} (${m.commit.slice(0, 7)})` },
  shadcn: { list: "__bankExamples", frame: "data-bank-frame", example: "data-bank-example", error: "data-bank-error", css: "_sources/shadcn/styles.css", label: (m) => `shadcn/ui ${m.commit.slice(0, 7)}` },
};
const SOURCE = opt("--source") ?? "astryx";
const S = SOURCES[SOURCE];
if (!S) throw new Error(`unknown --source ${SOURCE}`);
const manifest = JSON.parse(readFileSync(join(ROOT, `ui/_sources/${SOURCE}/manifest.json`), "utf8"));
const entries = manifest.entries.filter((e) => !ONLY || ONLY.split(",").some((o) => e.id.includes(o)));

// ------------------------------------------------------------ chromium over CDP
const profile = mkdtempSync(join(tmpdir(), "bank-chromium-"));
const browser = spawn(process.env.CHROMIUM ?? "chromium", [
  "--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars",
  "--force-device-scale-factor=1", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank",
], { stdio: "ignore" });
const portFile = join(profile, "DevToolsActivePort");
for (let i = 0; i < 200 && !existsSync(portFile); i++) await delay(50);
const [port] = readFileSync(portFile, "utf8").trim().split("\n");

async function openTab() {
  const target = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" }).then((r) => r.json());
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((ok, fail) => { socket.onopen = ok; socket.onerror = fail; });
  let seq = 0;
  const pending = new Map();
  const errors = [];
  socket.onmessage = (event) => {
    const m = JSON.parse(event.data);
    if (m.method === "Runtime.exceptionThrown") errors.push(m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text);
    if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") errors.push(m.params.args.map((a) => a.value ?? a.description ?? "").join(" "));
    const w = m.id && pending.get(m.id);
    if (!w) return;
    pending.delete(m.id);
    m.error ? w.reject(new Error(JSON.stringify(m.error))) : w.resolve(m.result);
  };
  // A page that reloads mid-call (Vite re-optimizing deps) never answers; time out instead of hanging.
  const cdp = (method, params = {}) => new Promise((ok, fail) => {
    const id = ++seq;
    const timer = setTimeout(() => { pending.delete(id); fail(new Error(`${method} timed out`)); }, 60000);
    pending.set(id, { resolve: (v) => { clearTimeout(timer); ok(v); }, reject: (e) => { clearTimeout(timer); fail(e); } });
    socket.send(JSON.stringify({ id, method, params }));
  });
  await cdp("Page.enable");
  await cdp("Runtime.enable");
  await cdp("Emulation.setDeviceMetricsOverride", { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
  const evaluate = async (expression) => (await cdp("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result.value;
  async function go(url, ready, timeout = 20000) {
    errors.length = 0;
    await cdp("Page.navigate", { url });
    const start = Date.now();
    while (Date.now() - start < timeout) {
      if (await evaluate(ready).catch(() => false)) return true;
      await delay(150);
    }
    return false;
  }
  return { cdp, evaluate, go, errors, close: () => socket.close() };
}

async function pool(items, fn) {
  const queue = [...items];
  await Promise.all(Array.from({ length: WORKERS }, async () => {
    const tab = await openTab();
    while (queue.length) {
      const item = queue.shift();
      try { await fn(item, tab); } catch (e) { report.crashed.push({ id: item.id, error: e.message }); }
    }
    tab.close();
  }));
}

// ------------------------------------------------------------ static HTML
const SERIALIZE = `(() => {
  const frame = document.querySelector("[${S.frame}]");
  // Astryx wraps the frame in its Theme element; that wrapper carries the theme scope.
  const theme = frame?.parentElement?.closest("[data-astryx-theme]") ?? frame;
  const example = document.querySelector("[${S.example}]");
  if (!theme || !example) return null;
  const clone = theme.cloneNode(true);
  clone.querySelector("[${S.frame}] > select")?.remove();
  const root = document.getElementById("root");
  const portals = [...document.body.children].filter((el) => el !== root && el.tagName !== "SCRIPT" && !root.contains(el)).map((el) => el.outerHTML);
  // StyleX runtime injection writes rules through insertRule, so read the sheets, not the text.
  const injected = [...document.querySelectorAll("style:not([data-vite-dev-id])")].flatMap((s) => { try { return [...s.sheet.cssRules].map((r) => r.cssText); } catch { return []; } });
  const htmlAttrs = [...document.documentElement.attributes].filter((a) => a.name.startsWith("data-astryx") || ["dir", "lang", "class", "style"].includes(a.name)).map((a) => a.name + '="' + a.value + '"');
  const canvases = example.querySelectorAll("canvas").length;
  return { body: clone.outerHTML, portals, injected, htmlAttrs, canvases };
})()`;

function staticPage(id, name, snap) {
  const dir = join(ROOT, "ui", id, "static");
  const up = relative(dir, join(ROOT, "ui")).split("\\").join("/");
  const localize = (html) => html
    .replaceAll(`${BASE}/ui/`, `${up}/`)
    .replace(/(src|href|poster)="\/ui\//g, `$1="${up}/`)
    .replace(/url\((["']?)\/ui\//g, `url($1${up}/`)
    .replace(/srcset="([^"]*)"/g, (all, set) => `srcset="${set.replaceAll("/ui/", `${up}/`)}"`);
  const title = `${id.split("/").at(-1)} — ${name}`;
  return `<!doctype html>
<!-- ${S.label(manifest)}: static render of ${id} / ${name}.
     Markup as React rendered it; class names resolve through ${S.css.split("/").pop()}. Behavior is not included:
     re-implement it from README.md.${snap.canvases ? ` This example draws ${snap.canvases} canvas element(s) at runtime; their pixels are not in the markup.` : ""} -->
<html ${snap.htmlAttrs.join(" ")}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="stylesheet" href="${up}/${S.css}">
${snap.injected.length ? `<style>\n${snap.injected.join("\n")}\n</style>\n` : ""}</head>
<body>
${localize(snap.body)}
${snap.portals.map(localize).join("\n")}
</body>
</html>
`;
}

const report = { rendered: 0, failed: [], empty: [], staticFiles: 0, previews: 0, previewFailed: [], crashed: [] };

if (args.includes("--static")) {
  await pool(entries, async (entry, tab) => {
    if (!existsSync(join(ROOT, "ui", entry.id, "src/demo.tsx"))) return; // documentation-only reference
    const demo = readFileSync(join(ROOT, "ui", entry.id, "src/demo.tsx"), "utf8");
    const family = demo.startsWith("export { default }"); // shows another reference's demo
    const url = `${BASE}/dashboard/preview.html?id=${encodeURIComponent(entry.id)}`;
    if (!(await tab.go(url, `Array.isArray(window.${S.list}) || !!document.querySelector('.pv-error')`, 60000))) {
      report.failed.push({ id: entry.id, example: "*", error: "demo did not mount" });
      return;
    }
    const names = await tab.evaluate(`window.${S.list} ?? []`);
    if (!family) rmSync(join(ROOT, "ui", entry.id, "static"), { recursive: true, force: true });
    for (const name of names) {
      const ok = await tab.go(`${url}&example=${encodeURIComponent(name)}`, `!!document.querySelector('[${S.example}]') || !!document.querySelector('.pv-error')`, 30000);
      await delay(700); // effects, fonts and entry animations settle
      const failure = await tab.evaluate(`document.querySelector('.pv-error pre, [${S.error}]')?.textContent ?? null`);
      if (!ok || failure) { report.failed.push({ id: entry.id, example: name, error: failure ?? "timeout", console: tab.errors.slice(0, 3) }); continue; }
      let snap = await tab.evaluate(SERIALIZE);
      for (let i = 0; !snap && i < 20; i++) { await delay(500); snap = await tab.evaluate(SERIALIZE); }
      if (!snap) { report.failed.push({ id: entry.id, example: name, error: "nothing to serialize" }); continue; }
      const text = await tab.evaluate(`(() => { const e = document.querySelector('[${S.example}]'); return e.innerText.trim().length + e.querySelectorAll('svg,img,canvas,input,button').length; })()`);
      if (!text) report.empty.push({ id: entry.id, example: name });
      report.rendered++;
      if (family) continue;
      const file = join(ROOT, "ui", entry.id, "static", `${name}.html`);
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, staticPage(entry.id, name, snap));
      report.staticFiles++;
      // Overlays render only their trigger until opened; also keep the open state's markup.
      if (entry.id.startsWith("overlay/")) {
        const opened = await tab.evaluate(`(() => {
          const t = document.querySelector('[${S.example}] button, [${S.example}] [role=button]');
          if (!t) return false;
          t.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, button: 0, pointerType: "mouse" }));
          t.click();
          return true;
        })()`);
        await delay(700);
        const openSnap = opened ? await tab.evaluate(SERIALIZE) : null;
        if (openSnap && openSnap.portals.length + (openSnap.body.length > snap.body.length ? 1 : 0)) {
          writeFileSync(join(ROOT, "ui", entry.id, "static", `${name}.open.html`), staticPage(entry.id, `${name} (open)`, openSnap));
          report.staticFiles++;
        }
      }
    }
    process.stdout.write(".");
  });
}

// ------------------------------------------------------------ upstream previews
const STORYBOOK = "https://facebook.github.io/astryx/storybook/";
async function storyId(entry) {
  // A part that shows its family's demo also borrows the family's first story.
  const demo = join(ROOT, "ui", entry.id, "src/demo.tsx");
  const family = existsSync(demo) && readFileSync(demo, "utf8").match(/^export \{ default \} from "(.+)\/src\/demo";/)?.[1];
  const stories = family ? resolve(ROOT, "ui", entry.id, "src", family, "src/stories") : join(ROOT, "ui", entry.id, "src/stories");
  if (!existsSync(stories)) return null;
  const index = (storyId.index ??= await fetch(`${STORYBOOK}index.json`).then((r) => r.json()).catch(() => ({ entries: {} })));
  const files = new Set(await import("node:fs").then((fs) => fs.readdirSync(stories)));
  const hit = Object.values(index.entries).find((e) => e.type === "story" && [...files].some((f) => e.importPath?.endsWith(`/${f}`)));
  return hit?.id ?? null;
}

if (args.includes("--previews")) {
  await pool(entries, async (entry, tab) => {
    let url = entry.page;
    let selector = null;
    if (entry.pkg === "lab" || entry.pkg === "charts") {
      const id = await storyId(entry);
      url = id ? `${STORYBOOK}iframe.html?id=${id}&viewMode=story` : null;
      selector = "#storybook-root";
    }
    // The live /themes page ignores its ?theme= seed, so a theme is shot from its own showcase render.
    if (entry.pkg === "theme") { url = `${BASE}/dashboard/preview.html?id=${encodeURIComponent(entry.id)}&example=theme`; selector = "[data-astryx-example] > *"; }
    // Not on the shadcn site yet: shoot the bank's own render of its first example.
    if (SOURCE === "shadcn" && !url && entry.captured?.length) { url = `${BASE}/dashboard/preview.html?id=${encodeURIComponent(entry.id)}&example=${encodeURIComponent(entry.captured[0])}`; selector = "[data-bank-example] > *"; }
    const out = join(ROOT, "ui", entry.id, "preview.png");
    if (!url) { report.previewFailed.push({ id: entry.id, reason: "no upstream page" }); return; }
    const ready = selector ? `!!document.querySelector('${selector}')?.children.length` : "document.readyState === 'complete'";
    if (!(await tab.go(url, ready, 45000))) { report.previewFailed.push({ id: entry.id, reason: `timeout ${url}` }); return; }
    await delay(2500);
    // Component and hook docs: the first live example on the page; templates and themes: the page.
    // shadcn: a docs page's first preview pane, a chart's card; blocks keep the whole viewport.
    const shadcnTarget = SOURCE === "shadcn" ? (entry.kind === "component" && entry.page ? '[data-slot="preview"]' : entry.kind === "chart" ? '[data-slot="card"]' : null) : null;
    const clip = shadcnTarget ? await tab.evaluate(`(() => {
      const el = document.querySelector('${shadcnTarget}');
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.top + scrollY, width: r.width, height: Math.min(r.height, 900), scale: 1 };
    })()`) : entry.pkg === "core" ? await tab.evaluate(`(() => {
      // The docs page opens with the live hero example inside the first large card.
      const el = [...document.querySelectorAll(".astryx-card")].find((c) => { const r = c.getBoundingClientRect(); return r.width > 400 && r.height > 120 && r.top + scrollY > 150; });
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return r.width > 200 && r.height > 80 ? { x: r.x, y: r.top + scrollY, width: r.width, height: Math.min(r.height, 900), scale: 1 } : null;
    })()`) : null;
    const shot = await tab.cdp("Page.captureScreenshot", { format: "png", ...(clip ? { clip, captureBeyondViewport: true } : {}) });
    writeFileSync(out, Buffer.from(shot.data, "base64"));
    report.previews++;
    process.stdout.write("+");
  });
}

const exited = new Promise((ok) => browser.once("exit", ok));
browser.kill();
await exited;
rmSync(profile, { recursive: true, force: true, maxRetries: 5 });
mkdirSync(join(ROOT, ".cache"), { recursive: true });
writeFileSync(join(ROOT, `.cache/${SOURCE}-capture-report.json`), JSON.stringify(report, null, 2));
console.log(`\n${JSON.stringify({ ...report, failed: report.failed.length, empty: report.empty.length, previewFailed: report.previewFailed.length })}`);
console.log(`details: .cache/${SOURCE}-capture-report.json`);
