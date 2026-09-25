#!/usr/bin/env node
/**
 * Captures the Astryx design system (https://astryx.atmeta.com, MIT) into the bank.
 *
 * usage: node tools/import-astryx.mjs /path/to/facebook/astryx [--added ISO]
 *
 * The checkout must sit at the commit the installed `@astryxdesign/*` canary was
 * published from; the live demos run on that package, the snapshot is the source.
 * Every Astryx directory under `ui/` and `ui/_sources/astryx/` is regenerated, so
 * rerunning is idempotent. Previews and static HTML come from
 * `tools/capture-bank.mjs --source astryx` afterwards.
 */

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const SRC = resolve(args[0] ?? "");
if (!args[0] || !existsSync(join(SRC, "packages/core"))) throw new Error("usage: node tools/import-astryx.mjs /path/to/astryx");
const ADDED = args.includes("--added") ? args[args.indexOf("--added") + 1] : new Date().toISOString().replace(/\.\d+Z$/, "Z");

const ROOT = resolve(import.meta.dirname, "..");
const UI = join(ROOT, "ui");
const OUT = join(UI, "_sources/astryx");
const SITE = "https://astryx.atmeta.com";
const REPO = "https://github.com/facebook/astryx";
const STORYBOOK = "https://facebook.github.io/astryx/storybook/";
const COMMIT = execFileSync("git", ["-C", SRC, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const VERSION = JSON.parse(readFileSync(join(ROOT, "node_modules/@astryxdesign/core/package.json"), "utf8")).version;
if (!VERSION.endsWith(COMMIT.slice(0, 7))) throw new Error(`installed @astryxdesign/core ${VERSION} is not built from ${COMMIT}`);

const THEMES = ["neutral", "butter", "chocolate", "gothic", "matcha", "stone", "y2k"];
const CATEGORY = {
  "Action": "action-feedback", "Chat": "ai", "Container": "surface", "Content": "content",
  "Feedback & Status": "notification", "Form Controls": "input", "Layout": "layout",
  "Navigation": "navigation", "Overlay": "overlay", "Table & List": "data-display",
  "Utility": "utility", "Data Visualization": "data-visualization",
};
// Menus are opened from an action but render as overlays; the bank files them there.
const CATEGORY_BY_NAME = { DropdownMenu: "overlay", ContextMenu: "overlay", MoreMenu: "overlay" };
const NATURE = {
  "action-feedback": "interactive", ai: "interactive", surface: "structural", content: "structural",
  notification: "interactive", input: "interactive", layout: "structural", navigation: "interactive",
  overlay: "interactive", "data-display": "structural", utility: "functional", hooks: "functional",
  "data-visualization": "structural", page: "structural", theme: "decorative",
};
const FONT_FAMILIES = ["Albert Sans", "DM Sans", "Figtree", "Fraunces", "Fustat", "JetBrains Mono", "Montserrat", "Outfit", "Playwrite US Trad", "Poppins"];

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z][a-z])/g, "$1-$2").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const p = join(dir, e.name);
  return e.isDirectory() ? (e.name === "__tests__" || e.name === "node_modules" ? [] : walk(p)) : [p];
});
const isTest = (p) => /\.(test|spec)\.[cm]?[jt]sx?$|\.stories\.[jt]sx?$|__tests__/.test(p) && !p.endsWith(".spec.md");
const write = (path, body) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, body); };
const posix = (p) => p.split("\\").join("/");
const rel = (from, to) => { const r = posix(relative(from, to)); return r.startsWith(".") ? r : `./${r}`; };
const md = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\n+/g, " ").trim();
const firstSentence = (s) => md(s).match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? md(s);
const load = async (file) => Object.values(await import(pathToFileURL(file).href)).filter((d) => d && typeof d === "object" && d.name);

// ---------------------------------------------------------------- clean slate
for (const cat of readdirSync(UI)) {
  if (cat === "_sources" || !statSync(join(UI, cat)).isDirectory()) continue;
  // Captured output (static HTML, preview) survives a re-import; everything else is regenerated.
  for (const d of readdirSync(join(UI, cat))) {
    if (!d.startsWith("astryx-")) continue;
    for (const f of readdirSync(join(UI, cat, d))) if (f !== "static" && f !== "preview.png") rmSync(join(UI, cat, d, f), { recursive: true });
  }
}
rmSync(OUT, { recursive: true, force: true });

// ---------------------------------------------------------------- shared snapshot
const nm = (p) => join(ROOT, "node_modules/@astryxdesign", p);
cpSync(join(SRC, "LICENSE"), join(OUT, "LICENSE"));
cpSync(nm("core/src/reset.css"), join(OUT, "css/reset.css"));
cpSync(nm("core/dist/astryx.css"), join(OUT, "css/astryx.css"));
cpSync(nm("lab/dist/lab.css"), join(OUT, "css/lab.css"));
cpSync(nm("charts/dist/charts.css"), join(OUT, "css/charts.css"));
for (const t of THEMES) cpSync(nm(`theme-${t}/dist/theme.css`), join(OUT, `css/themes/${t}.css`));
cpSync(join(SRC, "packages/cli/assets/docs"), join(OUT, "docs"), { recursive: true, filter: (p) => !/\.(draft|zh)\./.test(p) });
for (const [pkg, keep] of [["core", true], ["lab", true], ["charts", true]]) {
  if (!keep) continue;
  cpSync(join(SRC, `packages/${pkg}/src`), join(OUT, `src/${pkg}`), { recursive: true, filter: (p) => !isTest(p) });
}

// Fonts: every family a theme names, as local latin woff2 files.
{
  const query = FONT_FAMILIES.map((f) => `family=${f.replaceAll(" ", "+")}:ital,wght@0,100..900;1,100..900`).join("&");
  const ua = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";
  let css = "";
  for (const family of FONT_FAMILIES) {
    // Families differ in axes; ask per family and fall back to the plain family.
    const tries = [`family=${family.replaceAll(" ", "+")}:ital,wght@0,100..900;1,100..900`, `family=${family.replaceAll(" ", "+")}:wght@100..900`, `family=${family.replaceAll(" ", "+")}`];
    let text = "";
    for (const q of tries) {
      const r = await fetch(`https://fonts.googleapis.com/css2?${q}&display=swap`, { headers: { "user-agent": ua } });
      if (r.ok) { text = await r.text(); break; }
    }
    if (!text) throw new Error(`Google Fonts has no ${family}`);
    const blocks = text.split("}").filter((b) => b.includes("@font-face") && /\/\* latin \*\//.test(b));
    for (const block of blocks) {
      const url = block.match(/url\((https:[^)]+)\)/)[1];
      const file = `${kebab(family)}-${block.match(/font-style: (\w+)/)[1]}-${basename(new URL(url).pathname)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`font ${url}: ${res.status}`);
      write(join(OUT, "fonts", file), Buffer.from(await res.arrayBuffer()));
      css += `${block.replace(url, `./fonts/${file}`).trim()}\n}\n`;
    }
  }
  write(join(OUT, "fonts.css"), `/* Google Fonts (OFL) named by the Astryx themes, latin subset, localized. */\n${css}`);
}

// Runtime assets: docsite template images and the few remote logos examples use.
const TEMPLATE_ASSETS = join(SRC, "apps/docsite/public/template-assets");
const REMOTE = new Map();
const DEAD = new Set();
async function localizeAssets(code, fileDir) {
  const toSrc = (p) => rel(fileDir, join(OUT, p));
  const urlExpr = (p) => `new URL(${JSON.stringify(toSrc(p))}, import.meta.url).href`;
  for (const m of [...code.matchAll(/(["'])\/template-assets\/([^"']+)\1/g)]) {
    const name = m[2];
    if (!existsSync(join(TEMPLATE_ASSETS, name))) continue; // intentional broken-image demos keep their URL
    if (!existsSync(join(OUT, "template-assets", name))) cpSync(join(TEMPLATE_ASSETS, name), join(OUT, "template-assets", name));
  }
  code = code.replace(/(\s[\w-]+)=(["'])\/template-assets\/([^"']+)\2/g, (all, attr, q, name) =>
    existsSync(join(TEMPLATE_ASSETS, name)) ? `${attr}={${urlExpr(`template-assets/${name}`)}}` : all);
  code = code.replace(/(["'])\/template-assets\/([^"']+)\1/g, (all, q, name) =>
    existsSync(join(TEMPLATE_ASSETS, name)) ? urlExpr(`template-assets/${name}`) : all);
  for (const m of [...code.matchAll(/(["'])(https?:\/\/[^"'\s]+\.(?:png|jpe?g|svg|webp|gif))\1/g)]) {
    const url = m[2];
    if (/\.example\//.test(url)) continue; // deliberately unreachable in the upstream demo
    if (!REMOTE.has(url) && !DEAD.has(url)) {
      const u = new URL(url);
      const local = `remote/${u.hostname}${u.pathname}`;
      const res = await fetch(url);
      // A dead upstream URL stays as written: the upstream demo renders its fallback too.
      if (!res.ok) { DEAD.add(url); continue; }
      write(join(OUT, local), Buffer.from(await res.arrayBuffer()));
      REMOTE.set(url, local);
    }
  }
  code = code.replace(/(\s[\w-]+)=(["'])(https?:\/\/[^"'\s]+)\2/g, (all, attr, q, url) => REMOTE.has(url) ? `${attr}={${urlExpr(REMOTE.get(url))}}` : all);
  code = code.replace(/(["'])(https?:\/\/[^"'\s]+)\1/g, (all, q, url) => REMOTE.has(url) ? urlExpr(REMOTE.get(url)) : all);
  return code;
}

write(join(OUT, "frame.css"), `/* Astryx cascade: reset → components → lab/charts → themes (each theme is scoped by data-astryx-theme). */
@import "./fonts.css";
@import "./css/reset.css";
@import "./css/astryx.css";
@import "./css/lab.css";
@import "./css/charts.css";
${THEMES.map((t) => `@import "./css/themes/${t}.css";`).join("\n")}
`);

write(join(OUT, "frame.tsx"), `/**
 * Bank-only harness: mounts Astryx examples inside the Theme provider the upstream
 * docsite uses. Not part of the snapshot; the examples themselves are verbatim.
 */
import { Component, useState, type ComponentType, type ReactNode } from "react";
import { Theme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";
import "./frame.css";

export type Example = { name: string; title: string; component: ComponentType };

class Guard extends Component<{ children: ReactNode }, { error?: string }> {
  state: { error?: string } = {};
  static getDerivedStateFromError(e: Error) { return { error: e.message }; }
  render() { return this.state.error ? <pre data-astryx-error style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{this.state.error}</pre> : this.props.children; }
}

export function AstryxFrame({ examples, theme = neutralTheme }: { examples: Example[]; theme?: Parameters<typeof Theme>[0]["theme"] }) {
  const pinned = new URLSearchParams(location.search).get("example");
  const [current, setCurrent] = useState(() => Math.max(0, examples.findIndex((e) => e.name === pinned)));
  const Example = examples[current]?.component;
  // The capture tool enumerates examples through this list.
  (window as any).__astryxExamples = examples.map((e) => e.name);
  return (
    <Theme theme={theme}>
      <div data-astryx-frame style={{ width: "100%", minHeight: "100vh", padding: 24, boxSizing: "border-box", background: "var(--color-background-body, transparent)" }}>
        {examples.length > 1 && !pinned && (
          <select aria-label="Example" value={current} onChange={(e) => setCurrent(Number(e.target.value))} style={{ marginBottom: 16, font: "inherit" }}>
            {examples.map((e, i) => <option key={e.name} value={i}>{e.title}</option>)}
          </select>
        )}
        <div data-astryx-example={examples[current]?.name}>
          <Guard key={current}>{Example ? <Example /> : null}</Guard>
        </div>
      </div>
    </Theme>
  );
}
`);

// ---------------------------------------------------------------- docs inventory
const packages = [
  { pkg: "core", dir: join(SRC, "packages/core/src"), prefix: "astryx-", importBase: "@astryxdesign/core" },
  { pkg: "lab", dir: join(SRC, "packages/lab/src"), prefix: "astryx-lab-", importBase: "@astryxdesign/lab" },
  { pkg: "charts", dir: join(SRC, "packages/charts/src"), prefix: "astryx-charts-", importBase: "@astryxdesign/charts" },
];
const refs = [];            // one reference per component the docs list, plus one per hook
const byName = new Map();   // doc name → ref (listed and attached sub-docs)
const unlisted = [];
for (const p of packages) {
  for (const file of walk(p.dir).filter((f) => f.endsWith(".doc.mjs"))) {
    for (const doc of await load(file)) {
      const entry = { doc, file, pkg: p, dir: dirname(file) };
      const isHook = /^use[A-Z]/.test(doc.name);
      const listed = doc.category && (isHook || /^[A-Z]/.test(doc.category));
      if (!listed) { unlisted.push(entry); continue; }
      const category = isHook ? "hooks" : CATEGORY_BY_NAME[doc.name] ?? CATEGORY[doc.category];
      if (!category) throw new Error(`no bank category for ${doc.name} (${doc.category})`);
      const slug = `${p.prefix}${kebab(doc.name)}`;
      if (refs.some((r) => r.slug === slug && r.category === category)) continue; // same doc exported twice
      const ref = { ...entry, category, slug, docs: [doc], files: new Set([file]), examples: [], stories: [] };
      refs.push(ref);
      byName.set(`${p.pkg}:${doc.name}`, ref);
    }
  }
}
// A sub-doc (DialogHeader, useImperativeDialog, TableRow…) belongs to the listed doc in the
// same directory with the longest shared name prefix; otherwise to the directory's namesake.
for (const sub of unlisted) {
  const siblings = refs.filter((r) => r.dir === sub.dir && r.category !== "hooks");
  const pool = siblings.length ? siblings : refs.filter((r) => r.dir === sub.dir);
  const score = (r) => { let i = 0; while (i < r.doc.name.length && r.doc.name[i] === sub.doc.name[i]) i++; return i; };
  const owner = pool.sort((a, b) => score(b) - score(a) || (b.doc.name === basename(sub.dir)) - (a.doc.name === basename(sub.dir)))[0];
  if (!owner) { console.warn(`unowned doc ${sub.doc.name} (${relative(SRC, sub.file)})`); continue; }
  owner.docs.push(sub.doc);
  owner.files.add(sub.file);
  byName.set(`${sub.pkg.pkg}:${sub.doc.name}`, owner);
}
// Source files: each file whose basename starts with one of the ref's doc names, longest match wins.
for (const p of packages) {
  const inPkg = refs.filter((r) => r.pkg === p);
  for (const file of walk(p.dir).filter((f) => !isTest(f) && /\.(tsx?|mjs|md|css)$/.test(f))) {
    const base = basename(file).replace(/\..*$/, "");
    let best, bestLen = 0;
    for (const r of inPkg.filter((r) => r.dir === dirname(file) || dirname(file).startsWith(r.dir + "/"))) {
      for (const d of r.docs) if (base.startsWith(d.name) && d.name.length > bestLen) { best = r; bestLen = d.name.length; }
    }
    if (best) best.files.add(file);
  }
}

// A name no doc carries (HStack, MobileNavToggle, ChatDictation…) goes to the documented
// component it is a part or variant of: shared prefix or suffix, at least five letters.
function nearestRef(name, pool) {
  const shared = (a, b) => { let i = 0; while (i < a.length && a[i] === b[i]) i++; let j = 0; while (j < a.length && a.at(-1 - j) === b.at(-1 - j)) j++; return Math.max(i, j); };
  const scored = pool.map((r) => [r, Math.max(...r.docs.map((d) => shared(name, d.name)))]).sort((a, b) => b[1] - a[1]);
  return scored[0]?.[1] >= 5 ? scored[0][0] : undefined;
}

// Blocks (core examples) attach through `exampleFor`; lab/charts examples are Storybook stories.
const BLOCKS = join(SRC, "packages/cli/assets/templates/blocks/components");
const orphanBlocks = [];
for (const docFile of walk(BLOCKS).filter((f) => f.endsWith(".doc.mjs"))) {
  const [doc] = await load(docFile).then((d) => d.length ? d : import(pathToFileURL(docFile).href).then((m) => [m.doc]));
  const tsx = docFile.replace(/\.doc\.mjs$/, ".tsx");
  const ref = byName.get(`core:${doc.exampleFor}`) ?? nearestRef(doc.exampleFor, refs.filter((r) => r.pkg.pkg === "core" && r.category !== "hooks"));
  if (!ref || !existsSync(tsx)) { orphanBlocks.push(relative(BLOCKS, docFile)); continue; }
  ref.examples.push({ name: basename(tsx, ".tsx"), title: doc.displayName ?? doc.name, description: doc.description, file: tsx, doc });
}
const STORIES = join(SRC, "apps/storybook/stories");
const orphanStories = [];
for (const story of readdirSync(STORIES).filter((f) => f.endsWith(".stories.tsx"))) {
  const code = readFileSync(join(STORIES, story), "utf8");
  if (!/@astryxdesign\/(lab|charts)/.test(code)) continue;
  // The story belongs to the lab/charts component it imports most; its file name breaks ties.
  const base = story.replace(/\.stories\.tsx$/, "").replace(/-.*/, "");
  const imported = [...code.matchAll(/import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+'@astryxdesign\/(?:lab|charts)[^']*'/g)]
    .flatMap((m) => m[1].split(",").map((n) => n.replace(/\btype\b|\bas\b.*/g, "").trim())).filter(Boolean);
  const labRefs = refs.filter((r) => r.pkg.pkg !== "core");
  const byImport = (r) => imported.filter((n) => r.docs.some((d) => n === d.name || n.startsWith(d.name))).length;
  const byFile = (r) => Math.max(...r.docs.map((d) => base.startsWith(d.name) || d.name.startsWith(base) ? Math.min(d.name.length, base.length) : 0));
  const owner = labRefs.sort((a, b) => byImport(b) - byImport(a) || byFile(b) - byFile(a))[0];
  if (!owner || (byImport(owner) === 0 && byFile(owner) < 3)) { orphanStories.push(story); continue; }
  owner.stories.push(join(STORIES, story));
}

// ---------------------------------------------------------------- writers
const docsUrl = (name) => `${SITE}/components/${name}`;
function propsTable(doc) {
  const props = doc.props ?? doc.params ?? [];
  if (!props.length) return "";
  const rows = props.map((p) => `| \`${p.name}\`${p.required ? " *" : ""} | \`${md(p.type)}\` | ${p.default !== undefined ? `\`${md(p.default)}\`` : ""} | ${md(p.description)} |`);
  return `| Prop | Type | Default | Description |\n| --- | --- | --- | --- |\n${rows.join("\n")}\n`;
}
function docSection(doc) {
  const u = doc.usage ?? {};
  const out = [`### ${doc.displayName ?? doc.name}`, ""];
  if (doc.importPath) out.push(`Import: \`${doc.importPath}\``, "");
  if (u.description) out.push(md(u.description), "");
  const bp = u.bestPractices ?? [];
  if (bp.length) out.push("**Do**", "", ...bp.filter((b) => b.guidance).map((b) => `- ${md(b.description)}`), "", "**Don't**", "", ...bp.filter((b) => !b.guidance).map((b) => `- ${md(b.description)}`), "");
  if (u.anatomy?.length) out.push("**Anatomy**", "", ...u.anatomy.map((a) => `- ${a.name}${a.required ? " (required)" : ""} — ${md(a.description)}`), "");
  if (u.accessibility?.length) out.push("**Accessibility**", "", ...u.accessibility.map((a) => typeof a === "string" ? `- ${md(a)}` : `- ${a.name}${a.criterion ? ` — WCAG ${a.criterion}` : ""}${a.requirement ? ` (${a.requirement})` : ""}: ${md(a.description)}`), "");
  const table = propsTable(doc);
  if (table) out.push(doc.params ? "**Parameters**" : "**Props** (`*` required)", "", table);
  if (doc.returns) out.push("**Returns**", "", "```ts", typeof doc.returns === "string" ? doc.returns : JSON.stringify(doc.returns, null, 2), "```", "");
  const vars = doc.theming?.vars?.filter((v) => !v.private) ?? [];
  if (vars.length) out.push("**Theming variables**", "", ...vars.map((v) => `- \`${v.name}\` — ${md(v.description)} (default \`${md(v.default)}\`)`), "");
  if (doc.theming?.targets?.length) out.push(`Styling hook class: ${doc.theming.targets.map((t) => `\`.${t.className}\``).join(", ")}`, "");
  if (doc.examples?.length) for (const e of doc.examples) out.push(`**Example — ${e.label}**`, "", "```tsx", e.code, "```", "");
  return out.join("\n");
}
function sourceMd({ what, upstreamPaths, page }) {
  return `# Source

- Site: ${page}
- Repository: ${REPO}
- Captured commit: \`${COMMIT}\`
- Package build used by the live demo: \`${VERSION}\` (npm canary published from the same commit)
- License: MIT (\`ui/_sources/astryx/LICENSE\`)
- Captured: ${ADDED}

${what}

Upstream paths:

${upstreamPaths.map((p) => `- \`${p}\``).join("\n")}

Files are retained verbatim apart from image URLs, which point at the localized copies in
\`ui/_sources/astryx/\`. They are a pinned source snapshot, not an installable package.
`;
}
const agentUse = (category) => `## How an agent uses this reference

- **React 19 target** — install \`@astryxdesign/core\` + a theme and copy the example from
  \`src/examples/\` as-is, or read \`src/\` to own the component (upstream calls this "swizzle").
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open \`static/<example>.html\`: the
  rendered DOM of each example with every class resolved by the local stylesheets in
  \`ui/_sources/astryx/\` (\`frame.css\` pulls fonts, reset, component CSS and all seven themes).
  Keep the markup, the \`data-astryx-theme\` wrapper and the \`--*\` tokens; re-implement behavior
  from the Props / Accessibility sections below, never from the minified class names.
- Overlays (dialogs, menus, popovers…) also have \`static/<example>.open.html\`: the same example after
  its trigger was pressed, with the portal content included.
- Design rules shared by every component: \`ui/_sources/astryx/docs/\` (principles, tokens, color,
  spacing, typography, motion, layout).
${category === "hooks" ? "- Hooks carry behavior only: port the logic, keep the accessibility contract.\n" : ""}`;

function exampleImports(examples, fromDir) {
  return examples.map((e, i) => `import E${i} from ${JSON.stringify(rel(fromDir, e.local))};`).join("\n");
}
function exampleList(examples) {
  return `[\n${examples.map((e, i) => `  { name: ${JSON.stringify(e.name)}, title: ${JSON.stringify(e.title)}, component: E${i} },`).join("\n")}\n]`;
}

async function copySource(file, destDir, srcRoot) {
  const dest = join(destDir, posix(relative(srcRoot, file)));
  let code = readFileSync(file, "utf8");
  if (/\.(tsx?|mjs)$/.test(file)) code = await localizeAssets(code, dirname(dest));
  write(dest, code);
  return dest;
}

const hasDemo = (r) => r.examples.length || r.stories.length;
const familyOf = (ref) => refs.find((r) => r !== ref && r.dir === ref.dir && hasDemo(r)) ??
  (ref.doc.group ? refs.find((r) => r !== ref && r.category === ref.category && r.doc.group === ref.doc.group && hasDemo(r)) : undefined);

// Components and hooks
const report = { components: 0, hooks: 0, examples: 0, stories: 0, pages: 0, themes: 0, fallbacks: [] };
for (const ref of refs) {
  const dir = join(UI, ref.category, ref.slug);
  const srcDir = join(dir, "src");
  const primary = ref.doc;
  for (const f of ref.files) await copySource(f, srcDir, ref.dir);
  // Stories reach into package source through relative paths; bring those along.
  const storyExamples = [];
  for (const story of ref.stories) {
    let code = readFileSync(story, "utf8");
    for (const m of [...code.matchAll(/from '(\.\.?\/[^']+)'/g)]) {
      const target = ["", ".ts", ".tsx"].map((e) => resolve(STORIES, m[1] + e)).find((p) => existsSync(p) && statSync(p).isFile());
      if (!target) continue;
      const local = target.startsWith(join(SRC, "packages")) ? join(srcDir, "support", basename(target)) : join(srcDir, "stories", basename(target));
      await copySource(target, dirname(local), dirname(target));
      code = code.replace(m[0], `from '${rel(join(srcDir, "stories"), local).replace(/\.tsx?$/, "")}'`);
    }
    // The monorepo aliases lab subpaths the published package does not export.
    code = code.replace(/'@astryxdesign\/lab\/\w+'/g, "'@astryxdesign/lab'");
    const dest = join(srcDir, "stories", basename(story));
    write(dest, await localizeAssets(code, dirname(dest)));
    storyExamples.push({ name: basename(story, ".stories.tsx"), title: `Storybook — ${basename(story, ".stories.tsx")}`, local: dest, story: true });
  }
  const blockExamples = [];
  for (const e of ref.examples.sort((a, b) => (b.name.endsWith("Showcase")) - (a.name.endsWith("Showcase")) || a.name.localeCompare(b.name))) {
    const dest = join(srcDir, "examples", `${e.name}.tsx`);
    write(dest, await localizeAssets(readFileSync(e.file, "utf8"), dirname(dest)));
    blockExamples.push({ ...e, local: dest });
  }
  // Demo module: blocks mount directly; each story export mounts through its render/args.
  let demo;
  const demoPath = join(srcDir, "demo.tsx");
  if (blockExamples.length) {
    demo = `${exampleImports(blockExamples, srcDir)}\nimport { AstryxFrame } from ${JSON.stringify(rel(srcDir, join(OUT, "frame")))};\n\nconst examples = ${exampleList(blockExamples)};\n\nexport default function Demo() {\n  return <AstryxFrame examples={examples} />;\n}\n`;
  } else if (storyExamples.length) {
    demo = `import { createElement, type ComponentType } from "react";\n${storyExamples.map((s, i) => `import * as S${i} from ${JSON.stringify(rel(srcDir, s.local).replace(/\.tsx$/, ""))};`).join("\n")}
import { AstryxFrame, type Example } from ${JSON.stringify(rel(srcDir, join(OUT, "frame")))};

// Storybook CSF: default export is the meta, every other export a story.
function fromStories(file: string, mod: Record<string, any>): Example[] {
  const meta = mod.default ?? {};
  return Object.entries(mod).filter(([k, v]) => k !== "default" && v && typeof v === "object" || typeof v === "function" && k !== "default" && /^[A-Z]/.test(k)).map(([k, story]) => {
    const component: ComponentType = () => {
      const args = { ...(meta.args ?? {}), ...(story.args ?? {}) };
      if (typeof story === "function") return story(args);
      if (story.render) return story.render(args, { args });
      return meta.component ? createElement(meta.component, args) : null;
    };
    return { name: \`\${file}--\${k}\`, title: \`\${file} · \${story.name ?? k}\`, component };
  });
}

const examples = [${storyExamples.map((s, i) => `...fromStories(${JSON.stringify(s.name)}, S${i})`).join(", ")}];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
`;
  } else if (familyOf(ref)) {
    // A part without examples of its own (ChartArea, ChatTypingIndicator…) shows its family's demo:
    // a documented sibling in the same directory, else one in the same docs group.
    const sibling = familyOf(ref);
    ref.familyDemo = `${sibling.category}/${sibling.slug}`;
    demo = `export { default } from ${JSON.stringify(rel(srcDir, join(UI, sibling.category, sibling.slug, "src/demo")))};\n`;
  } else {
    // No upstream example: mount the component with the docs playground defaults.
    report.fallbacks.push(`${ref.category}/${ref.slug}`);
    const exportName = primary.name;
    const importPath = primary.importPath ?? `${ref.pkg.importBase}${ref.pkg.pkg === "core" ? `/${basename(ref.dir)}` : ""}`;
    const defaults = primary.playground?.defaults ?? {};
    demo = /^use[A-Z]/.test(exportName)
      ? `import { AstryxFrame } from ${JSON.stringify(rel(srcDir, join(OUT, "frame")))};\n\n// ${exportName} is a hook with no upstream example; see README for its contract.\nconst examples = [{ name: "contract", title: ${JSON.stringify(exportName)}, component: () => <code>${exportName}</code> }];\n\nexport default function Demo() {\n  return <AstryxFrame examples={examples} />;\n}\n`
      : `import { ${exportName} } from ${JSON.stringify(importPath)};\nimport { AstryxFrame } from ${JSON.stringify(rel(srcDir, join(OUT, "frame")))};\n\nconst Component = ${exportName} as any;\nconst examples = [{ name: "playground", title: "Playground defaults", component: () => <Component {...${JSON.stringify(defaults)}} /> }];\n\nexport default function Demo() {\n  return <AstryxFrame examples={examples} />;\n}\n`;
  }
  write(demoPath, demo);

  // Some lab docs ship an empty description; the source header's @output line says what it renders.
  const header = readFileSync([...ref.files].find((f) => basename(f).startsWith(`${primary.name}.ts`)) ?? ref.file, "utf8");
  const described = primary.usage?.description || primary.description ||
    [header.match(/@output (.*)/)?.[1], header.match(/@position (.*)/)?.[1]].filter(Boolean).map((s) => s.trim().replace(/\.?$/, ".")).join(" ") ||
    primary.displayName || primary.name;
  primary.usage = { ...primary.usage, description: described };
  const use = firstSentence(described);
  const avoid = (primary.usage?.bestPractices ?? []).filter((b) => !b.guidance).map((b) => md(b.description)).join(" ");
  const provides = (primary.usage?.anatomy ?? []).map((a) => a.name).join(", ") || ref.docs.map((d) => d.name).join(", ");
  const examples = [...blockExamples, ...storyExamples];
  const page = ref.pkg.pkg === "core" ? docsUrl(primary.name) : STORYBOOK;
  const entry = [...ref.files].map((f) => posix(relative(ref.dir, f))).find((f) => f === `${primary.name}.tsx` || f === `${primary.name}.ts`) ?? posix(relative(ref.dir, [...ref.files].find((f) => /\.tsx?$/.test(f)) ?? ref.file));
  write(join(dir, "reference.tsx"), `/* Use when: ${use.replaceAll("*/", "* /")} */\n\nexport { default } from "./src/demo";\n`);
  const nature = NATURE[ref.category];
  write(join(dir, "README.md"), `# ${primary.displayName ?? primary.name}

${md(primary.usage?.description ?? primary.description ?? "")}

## Classification

- Category: \`${ref.category}\` — ${nature}
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: \`src/${entry}\`
- Nature: ${nature}${nature === "decorative" ? "; supplies look-and-feel only" : "; reuse the behavior, hierarchy and tokens, adapt literal values to the target project"}.
- Added: ${ADDED}
- Curation: pending
- Use when: ${use}
${avoid ? `- Avoid when: ${avoid}\n` : ""}- Provides: ${provides}
- Requires: React 19 with \`${ref.pkg.importBase}\` and a theme, or the static HTML with \`ui/_sources/astryx/frame.css\`
- Variants: ${examples.length ? examples.map((e) => e.name).join(", ") : ref.familyDemo ? `family demo (${ref.familyDemo})` : "default"}
- Upstream: Astryx ${ref.pkg.pkg === "core" ? "core" : `${ref.pkg.pkg} (experimental, canary-only upstream)`} · ${primary.category}
${primary.keywords?.length ? `- Keywords: ${primary.keywords.join(", ")}\n` : ""}
${agentUse(ref.category)}
## Examples

${examples.length ? examples.map((e) => `- \`${posix(relative(dir, e.local))}\` — ${md(e.title)}${e.description ? `: ${md(e.description)}` : ""}${e.story ? "" : ` · static: \`static/${e.name}.html\``}`).join("\n") : ref.familyDemo ? `- None of its own upstream; the demo is its family's: \`ui/${ref.familyDemo}\`.` : "- None upstream; the demo mounts the documented playground defaults."}

## Documentation

${ref.docs.map(docSection).join("\n")}
## Files

${[...ref.files].map((f) => `- \`src/${posix(relative(ref.dir, f))}\``).sort().join("\n")}
- \`src/demo.tsx\` — bank harness that mounts the examples in the neutral theme
- \`reference.tsx\` — dashboard entry point

Upstream page: ${page}
`);
  write(join(dir, "SOURCE.md"), sourceMd({
    what: `Component source and docs from \`packages/${ref.pkg.pkg}/src\`; examples from the CLI block templates${ref.stories.length ? " and the Storybook stories" : ""}. Shared internals the source imports (hooks, theme, utils, i18n) live in \`ui/_sources/astryx/src/${ref.pkg.pkg}/\`.`,
    upstreamPaths: [...[...ref.files].map((f) => relative(SRC, f)), ...ref.examples.map((e) => relative(SRC, e.file)), ...ref.stories.map((s) => relative(SRC, s))],
    page,
  }));
  report[ref.category === "hooks" ? "hooks" : "components"]++;
  report.examples += blockExamples.length;
  report.stories += storyExamples.length;
}

// Page templates
const PAGES = join(SRC, "packages/cli/assets/templates/pages");
for (const slug of readdirSync(PAGES).filter((d) => statSync(join(PAGES, d)).isDirectory())) {
  const { doc } = await import(pathToFileURL(join(PAGES, slug, "template.doc.mjs")).href);
  const dir = join(UI, "page", `astryx-${slug}`);
  const files = readdirSync(join(PAGES, slug));
  for (const f of files) await copySource(join(PAGES, slug, f), join(dir, "src"), join(PAGES, slug));
  write(join(dir, "src/demo.tsx"), `import Page from "./page";\nimport { AstryxFrame } from ${JSON.stringify(rel(join(dir, "src"), join(OUT, "frame")))};\n\nconst examples = [{ name: "page", title: ${JSON.stringify(doc.displayName ?? doc.name)}, component: Page }];\n\nexport default function Demo() {\n  return <AstryxFrame examples={examples} />;\n}\n`);
  const use = firstSentence(doc.description);
  write(join(dir, "reference.tsx"), `/* Use when: ${use.replaceAll("*/", "* /")} */\n\nexport { default } from "./src/demo";\n`);
  const used = [...new Set([...readFileSync(join(PAGES, slug, "page.tsx"), "utf8").matchAll(/import \{([^}]+)\} from '@astryxdesign\/core\/(\w+)'/g)].map((m) => m[2]))].sort();
  write(join(dir, "README.md"), `# ${doc.displayName ?? doc.name}

${md(doc.description)}

## Classification

- Category: \`page\` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS snapshot
- Framework: react
- Entry point: \`src/page.tsx\`
- Nature: structural; reuse the page composition, hierarchy and density, not its sample data.
- Added: ${ADDED}
- Curation: pending
- Use when: ${use}
- Provides: full-page layout composed from ${used.length} Astryx components
- Requires: React 19 with \`@astryxdesign/core\` and a theme, or \`static/page.html\` with \`ui/_sources/astryx/frame.css\`
- Variants: default
- Upstream: Astryx template · ${doc.category ?? "page"}

${agentUse("page")}
## Components used

${used.map((u) => `- ${u}`).join("\n")}

## Files

${files.map((f) => `- \`src/${f}\``).join("\n")}
- \`static/page.html\` — rendered markup
- \`reference.tsx\` — dashboard entry point

Upstream page: ${SITE}/templates/${slug}
`);
  write(join(dir, "SOURCE.md"), sourceMd({ what: "Page template from the Astryx CLI (`astryx template`).", upstreamPaths: files.map((f) => relative(SRC, join(PAGES, slug, f))), page: `${SITE}/templates/${slug}` }));
  report.pages++;
}

// Themes: the showcase page rendered in each theme, with the theme source and built CSS.
const THEME_SRC = join(SRC, "packages/cli/assets/templates/themes");
const manifest = JSON.parse(readFileSync(join(THEME_SRC, "manifest.json"), "utf8"));
for (const t of THEMES) {
  const meta = manifest.themes.find((m) => m.slug === t) ?? { displayName: t, description: "" };
  const dir = join(UI, "theme", `astryx-${t}`);
  cpSync(join(THEME_SRC, t), join(dir, "src"), { recursive: true });
  cpSync(nm(`theme-${t}/dist/theme.css`), join(dir, "src/theme.css"));
  const exportName = `${t}Theme`;
  write(join(dir, "src/demo.tsx"), `import { ${exportName} } from "@astryxdesign/theme-${t}/built";\nimport Page from ${JSON.stringify(rel(join(dir, "src"), join(UI, "page/astryx-theme-showcase/src/page")))};\nimport { AstryxFrame } from ${JSON.stringify(rel(join(dir, "src"), join(OUT, "frame")))};\n\nconst examples = [{ name: "theme", title: ${JSON.stringify(meta.displayName)}, component: Page }];\n\nexport default function Demo() {\n  return <AstryxFrame examples={examples} theme={${exportName}} />;\n}\n`);
  const use = firstSentence(meta.description || `${meta.displayName} theme for Astryx.`);
  write(join(dir, "reference.tsx"), `/* Use when: ${use} */\n\nexport { default } from "./src/demo";\n`);
  const css = readFileSync(join(dir, "src/theme.css"), "utf8");
  const pick = (name) => css.match(new RegExp(`${name}:\\s*([^;]+);`))?.[1]?.trim();
  const tokens = ["--font-family-body", "--font-family-heading", "--font-family-code", "--radius-element", "--radius-container", "--color-accent", "--color-background-body", "--color-text-primary"].map((k) => [k, pick(k)]).filter(([, v]) => v);
  write(join(dir, "README.md"), `# ${meta.displayName} theme

${md(meta.description)}

## Classification

- Category: \`theme\` — decorative
- Medium: CSS custom properties (built) + TypeScript theme source
- Framework: css
- Entry point: \`src/theme.css\`
- Nature: decorative; supplies look-and-feel only — never lift layout or interaction from it.
- Added: ${ADDED}
- Curation: pending
- Use when: ${use}
- Provides: color, typography, radius, elevation and motion tokens scoped to \`[data-astryx-theme="${t}"]\`
- Requires: \`src/theme.css\` after \`ui/_sources/astryx/css/astryx.css\`, and a \`data-astryx-theme="${t}"\` ancestor
- Variants: default

## How an agent uses this reference

- Any stack: link \`src/theme.css\` (or \`ui/_sources/astryx/css/themes/${t}.css\`) and put
  \`data-astryx-theme="${t}"\` on the root; every Astryx token (\`--color-*\`, \`--text-*\`, \`--radius-*\`,
  \`--shadow-*\`) resolves to this theme. To take the palette only, copy the token values.
- React: \`<Theme theme={${exportName}}>\` from \`@astryxdesign/theme-${t}/built\`.
- Fonts are local in \`ui/_sources/astryx/fonts/\`.

## Key tokens

${tokens.map(([k, v]) => `- \`${k}\`: \`${v}\``).join("\n")}

## Files

${readdirSync(join(dir, "src")).filter((f) => f !== "demo.tsx").map((f) => `- \`src/${f}\``).join("\n")}
- \`src/demo.tsx\` — the Theme Showcase template rendered in this theme

Upstream page: ${SITE}/themes?theme=${t}
`);
  write(join(dir, "SOURCE.md"), sourceMd({ what: `Theme source from the CLI theme templates; \`theme.css\` is the built file of \`@astryxdesign/theme-${t}@${VERSION}\`.`, upstreamPaths: [relative(SRC, join(THEME_SRC, t)), `packages/themes/${t}`], page: `${SITE}/themes?theme=${t}` }) + "\n\`preview.png\` is the Theme Showcase template rendered in this theme by the bank viewer: the live\n\`/themes\` page does not apply its \`?theme=\` seed.\n");
  report.themes++;
}

// A reference upstream dropped keeps only captured output; remove it.
for (const cat of readdirSync(UI)) {
  if (cat === "_sources" || !statSync(join(UI, cat)).isDirectory()) continue;
  for (const d of readdirSync(join(UI, cat))) if (d.startsWith("astryx-") && !existsSync(join(UI, cat, d, "reference.tsx"))) rmSync(join(UI, cat, d), { recursive: true });
}

// Upstream manifest the capture tool and SOURCE share.
const manifestOut = refs.map((r) => ({ id: `${r.category}/${r.slug}`, name: r.doc.name, pkg: r.pkg.pkg, page: r.pkg.pkg === "core" ? docsUrl(r.doc.name) : null, examples: [...r.examples.map((e) => e.name)], stories: r.stories.length }))
  .concat(readdirSync(PAGES).filter((d) => statSync(join(PAGES, d)).isDirectory()).map((slug) => ({ id: `page/astryx-${slug}`, name: slug, pkg: "template", page: `${SITE}/templates/${slug}`, examples: ["page"] })))
  .concat(THEMES.map((t) => ({ id: `theme/astryx-${t}`, name: t, pkg: "theme", page: `${SITE}/themes?theme=${t}`, examples: ["theme"] })));
write(join(OUT, "manifest.json"), JSON.stringify({ commit: COMMIT, version: VERSION, captured: ADDED, entries: manifestOut }, null, 2) + "\n");
write(join(OUT, "SOURCE.md"), `# Astryx

- Site: ${SITE}
- Repository: ${REPO}
- Storybook (lab/charts): ${STORYBOOK}
- Captured commit: \`${COMMIT}\`
- npm build used by live demos: \`${VERSION}\` (canary published from the same commit)
- License: MIT — \`LICENSE\`
- Captured: ${ADDED}
- Importer: \`node tools/import-astryx.mjs <astryx checkout>\`, then \`node tools/capture-bank.mjs --source astryx --static --previews\`

## Contents

- \`css/\` — the published prebuilt CSS: \`reset.css\`, \`astryx.css\` (core), \`lab.css\`, \`charts.css\`, \`themes/*.css\`
- \`frame.css\` — imports all of the above in cascade order plus \`fonts.css\`; link this one file from static HTML
- \`fonts/\`, \`fonts.css\` — theme typefaces from Google Fonts (OFL), latin subset
- \`docs/\` — the CLI design docs (principles, tokens, color, spacing, typography, motion, layout, theme…)
- \`src/{core,lab,charts}/\` — full package source without tests, for the internals component files import
- \`template-assets/\`, \`remote/\` — images the examples and templates render
- \`frame.tsx\` — bank-only React harness (Theme provider + example switcher)
- \`manifest.json\` — every captured entry with its upstream page and examples

## Counts

- Components: ${report.components} (core ${refs.filter((r) => r.pkg.pkg === "core" && r.category !== "hooks").length}, lab ${refs.filter((r) => r.pkg.pkg === "lab").length}, charts ${refs.filter((r) => r.pkg.pkg === "charts").length})
- Hooks: ${report.hooks}
- Block examples: ${report.examples}; Storybook story files: ${report.stories}
- Page templates: ${report.pages}
- Themes: ${report.themes}

## Excluded

- \`@astryxdesign/vega\` (Vega-Lite wrapper): a thin adapter over an external charting grammar, no visual design of its own.
- The docsite's own chrome, blog and playground.
${orphanBlocks.length ? `- Blocks whose \`exampleFor\` names no documented component: ${orphanBlocks.map((b) => `\`${b}\``).join(", ")}\n` : ""}${orphanStories.length ? `- Storybook files that document no lab/charts component: ${orphanStories.map((b) => `\`${b}\``).join(", ")}\n` : ""}`);

console.log(JSON.stringify({ ...report, fallbacks: report.fallbacks.length, fallbackIds: report.fallbacks, orphanBlocks, orphanStories, remote: [...REMOTE.keys()].length, dead: [...DEAD] }, null, 2));
