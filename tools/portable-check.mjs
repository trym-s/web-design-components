#!/usr/bin/env node
/**
 * Proves an entry's copy-paste `src/` works outside the bank: copies it into
 * `tools/portable-fixture/` (stock Vite + React 19 + Tailwind v4 + shadcn tokens), type-checks it,
 * builds it, and renders its `demo.tsx` in headless Chromium to `.cache/portable/<id>.png`.
 *
 * usage: npm run portable:check [-- <entry-id|id-prefix> …] [--dark]
 *        With no ids, checks every entry that has a `src/`.
 */

import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";
import { execFile, execFileSync } from "node:child_process";
import { promisify } from "node:util";

const ROOT = resolve(import.meta.dirname, "..");
const FIXTURE = join(ROOT, "tools/portable-fixture");
const OUT = join(ROOT, ".cache/portable");
const CHROMIUM = process.env.CHROMIUM ?? "chromium";
const args = process.argv.slice(2);
const dark = args.includes("--dark");
const wanted = args.filter((arg) => !arg.startsWith("--"));
const catalog = JSON.parse(readFileSync(join(ROOT, "catalog/catalog.json"), "utf8"));
const entries = catalog.entries.filter((entry) => entry.paths.src && (!wanted.length || wanted.some((id) => entry.id === id || entry.id.startsWith(id))));
if (!entries.length) throw new Error(`no entry with a src/ matches ${wanted.join(" ") || "(all)"}`);

const node = (bin, ...rest) => execFileSync(process.execPath, [join(ROOT, "node_modules", bin), ...rest], { cwd: ROOT, stdio: "pipe", encoding: "utf8" });
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp", ".webm": "video/webm", ".mp4": "video/mp4", ".woff2": "font/woff2" };
const server = createServer((req, res) => {
  const path = join(OUT, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (!path.startsWith(OUT) || !existsSync(path)) return res.writeHead(404).end();
  res.writeHead(200, { "Content-Type": TYPES[extname(path)] ?? "application/octet-stream" }).end(readFileSync(path));
}).listen(0, "127.0.0.1");
await new Promise((ok) => server.once("listening", ok));
const base = `http://127.0.0.1:${server.address().port}`;
const profile = mkdtempSync(join(tmpdir(), "portable-chromium-"));
// Async: the static server above runs in this process and must keep answering while Chromium loads.
const chromium = async (...rest) => (await promisify(execFile)(CHROMIUM, ["--headless=new", `--user-data-dir=${profile}`, "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--window-size=1024,768", "--virtual-time-budget=5000", ...rest], { encoding: "utf8", maxBuffer: 1 << 26 })).stdout;

const failures = [];
for (const entry of entries) {
  const slug = entry.id.replaceAll("/", "__");
  const step = { name: "copy" };
  try {
    rmSync(join(FIXTURE, "entry"), { recursive: true, force: true });
    cpSync(join(ROOT, entry.paths.src), join(FIXTURE, "entry"), { recursive: true });
    if (!existsSync(join(FIXTURE, "entry/demo.tsx"))) throw new Error("src/demo.tsx is missing");
    step.name = "tailwind";
    node("@tailwindcss/cli/dist/index.mjs", "-i", join(FIXTURE, "globals.css"), "-o", join(FIXTURE, ".generated/styles.css"));
    step.name = "tsc";
    node("typescript/bin/tsc", "-p", join(FIXTURE, "tsconfig.json"));
    step.name = "vite build";
    process.env.PORTABLE_OUT = join(OUT, slug);
    node("vite/bin/vite.js", "build", "--config", join(FIXTURE, "vite.config.ts"));
    step.name = "render";
    const url = `${base}/${slug}/index.html${dark ? "#dark" : ""}`;
    const dom = await chromium("--dump-dom", url);
    const error = dom.match(/<pre data-portable-error(?:="[^"]*")?>([\s\S]*?)<\/pre>/)?.[1];
    if (error) throw new Error(error.split("\n").slice(0, 4).join("\n"));
    if (!/<main[^>]*>[\s\S]*?<\/main>/.test(dom) || /<main[^>]*><\/main>/.test(dom)) throw new Error("demo rendered nothing");
    mkdirSync(OUT, { recursive: true });
    await chromium(`--screenshot=${join(OUT, `${slug}${dark ? ".dark" : ""}.png`)}`, url);
    console.log(`ok    ${entry.id} -> .cache/portable/${slug}${dark ? ".dark" : ""}.png`);
  } catch (error) {
    const detail = `${error.stdout ?? ""}${error.stderr ?? ""}`.trim() || error.message;
    failures.push(entry.id);
    console.log(`FAIL  ${entry.id} (${step.name})\n${detail.split("\n").slice(0, 30).map((line) => `      ${line}`).join("\n")}`);
  }
}
rmSync(join(FIXTURE, "entry"), { recursive: true, force: true });
server.close();
rmSync(profile, { recursive: true, force: true });
console.log(`\n${entries.length - failures.length}/${entries.length} portable`);
if (failures.length) process.exitCode = 1;
