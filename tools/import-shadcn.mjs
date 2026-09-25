#!/usr/bin/env node
/**
 * Captures shadcn/ui (https://ui.shadcn.com, MIT) into the bank: every documented
 * component with every docs example, every block, every chart, and the eight styles.
 *
 * usage: node tools/import-shadcn.mjs /path/to/shadcn-ui/ui [--added ISO]
 *
 * What the live site shows is what gets captured:
 * - component pages render the `radix-nova` style (a few examples use `radix-rhea` or `base-nova`);
 *   their ui files come from the published registry (`/r/styles/<style>/<item>.json`), i.e. the exact
 *   code `npx shadcn add` installs, and the examples from `apps/v4/examples/<base>/`.
 * - blocks (`/view/new-york-v4/<block>`) and charts render `new-york-v4` from `apps/v4/registry/new-york-v4/`.
 * Imports are rewritten to the local snapshot; nothing else is edited. Rerunning is idempotent and
 * keeps captured `static/` and `preview.png`. Static HTML and previews: `tools/capture-bank.mjs`.
 */

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const args = process.argv.slice(2);
const REPO_ROOT = resolve(args[0] ?? "");
const V4 = join(REPO_ROOT, "apps/v4");
if (!args[0] || !existsSync(join(V4, "registry/new-york-v4"))) throw new Error("usage: node tools/import-shadcn.mjs /path/to/shadcn-ui/ui");
const ADDED = args.includes("--added") ? args[args.indexOf("--added") + 1] : new Date().toISOString().replace(/\.\d+Z$/, "Z");

const ROOT = resolve(import.meta.dirname, "..");
const UI = join(ROOT, "ui");
const OUT = join(UI, "_sources/shadcn");
const SITE = "https://ui.shadcn.com";
const REPO = "https://github.com/shadcn-ui/ui";
const COMMIT = execFileSync("git", ["-C", REPO_ROOT, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const STYLES = ["nova", "luma", "lyra", "maia", "mira", "rhea", "sera", "vega"];

// Bank category per documented component; the docs group them only alphabetically.
const CATEGORY = {
  accordion: "navigation", "alert-dialog": "overlay", alert: "notification", "aspect-ratio": "layout",
  attachment: "content", avatar: "content", badge: "content", breadcrumb: "navigation", bubble: "ai",
  "button-group": "action-feedback", button: "action-feedback", calendar: "input", card: "surface",
  carousel: "content", chart: "data-visualization", checkbox: "input", collapsible: "navigation",
  combobox: "input", command: "search", "context-menu": "overlay", "data-table": "data-display",
  "date-picker": "input", dialog: "overlay", direction: "utility", drawer: "overlay",
  "dropdown-menu": "overlay", empty: "content", field: "input", form: "input", "hover-card": "overlay",
  "input-group": "input", "input-otp": "input", input: "input", item: "data-display", kbd: "content",
  label: "input", marker: "content", menubar: "navigation", "message-scroller": "ai", message: "ai",
  "native-select": "input", "navigation-menu": "navigation", pagination: "navigation", popover: "overlay",
  progress: "notification", questionnaire: "input", "radio-group": "input", resizable: "layout",
  "scroll-area": "layout", select: "input", separator: "layout", sheet: "overlay", sidebar: "navigation",
  skeleton: "notification", slider: "input", sonner: "notification", spinner: "notification",
  switch: "input", table: "data-display", tabs: "navigation", textarea: "input", toast: "notification",
  "toggle-group": "action-feedback", toggle: "action-feedback", tooltip: "overlay", typography: "typography",
};
// Demos in the repository that no docs page embeds yet, grouped by name.
const UNDOCUMENTED = {
  shimmer: "Animated shimmer highlight that sweeps across text or a marker to signal activity.",
  "scroll-fade": "Fades the edges of a scroll container so overflowing content reads as scrollable.",
  markdown: "Renders streamed Markdown with the site's typography.",
  "file-upload-list": "A list of files being uploaded with per-file progress and actions.",
  "radio-fields": "Radio options laid out as full field rows with label and description.",
  "muted-item-group": "A muted-surface group of item rows.",
  "outline-item-group": "An outlined group of item rows.",
  "data-picker-with-dropdowns": "A date picker whose month and year switch through dropdowns.",
};
Object.assign(CATEGORY, {
  shimmer: "effects", "scroll-fade": "scroll", markdown: "content", "file-upload-list": "input", "radio-fields": "input",
  "muted-item-group": "data-display", "outline-item-group": "data-display", "data-picker-with-dropdowns": "input",
});
const NATURE = {
  effects: "decorative", scroll: "interactive",
  "action-feedback": "interactive", ai: "interactive", surface: "structural", content: "structural",
  notification: "interactive", input: "interactive", layout: "structural", navigation: "interactive",
  overlay: "interactive", "data-display": "structural", utility: "functional", search: "interactive",
  "data-visualization": "structural", page: "structural", theme: "decorative", typography: "structural",
};

const write = (path, body) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, body); };
const posix = (p) => p.split("\\").join("/");
const rel = (from, to) => { const r = posix(relative(from, to)); return r.startsWith(".") ? r : `./${r}`; };
const md = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\n+/g, " ").trim();
const firstSentence = (s) => md(s).match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? md(s);
const titleize = (s) => s.replace(/(^|-)(\w)/g, (m, d, c) => `${d ? " " : ""}${c.toUpperCase()}`);
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));

// ---------------------------------------------------------------- clean slate (captures survive)
for (const cat of readdirSync(UI)) {
  if (cat === "_sources" || !statSync(join(UI, cat)).isDirectory()) continue;
  for (const d of readdirSync(join(UI, cat))) {
    if (!d.startsWith("shadcn-")) continue;
    for (const f of readdirSync(join(UI, cat, d))) if (f !== "static" && f !== "preview.png") rmSync(join(UI, cat, d, f), { recursive: true });
  }
}
rmSync(OUT, { recursive: true, force: true });

// ---------------------------------------------------------------- published registry items
const itemCache = new Map();
async function registryItem(style, name) {
  const key = `${style}/${name}`;
  if (!itemCache.has(key)) {
    itemCache.set(key, fetch(`${SITE}/r/styles/${style}/${name}.json`).then(async (r) => {
      if (!r.ok) return null;
      return r.json();
    }));
  }
  return itemCache.get(key);
}

// ---------------------------------------------------------------- import localization
const REMOTE = new Map();
const DEAD = new Set();
const bareImports = new Set();
const pending = [];              // registry files still to write, resolved lazily as imports appear
const written = new Set();
const DOCSITE = join(OUT, "docsite");

/** Where a registry-published file lives in the snapshot. */
const styleFile = (style, sub) => join(OUT, style, sub);

async function ensureStyleItem(style, kind, name) {
  // kind: ui | lib | hooks. The item name for lib/utils is "utils".
  const target = styleFile(style, `${kind}/${name}`);
  if ([".tsx", ".ts"].some((e) => existsSync(target + e)) || written.has(`${style}:${kind}/${name}`)) return;
  written.add(`${style}:${kind}/${name}`);
  if (style === "new-york-v4") {
    const src = ["tsx", "ts"].map((e) => join(V4, "registry/new-york-v4", kind, `${name}.${e}`)).find(existsSync);
    if (!src) throw new Error(`new-york-v4 ${kind}/${name} is missing`);
    const dest = styleFile(style, `${kind}/${basename(src)}`);
    write(dest, await localize(readFileSync(src, "utf8"), dest));
    return;
  }
  const item = await registryItem(style, name);
  if (!item) throw new Error(`registry has no ${style}/${name}`);
  for (const file of item.files) {
    const sub = file.path.replace(new RegExp(`^registry/${style}/`), "");
    const dest = styleFile(style, sub);
    write(dest, await localize(file.content, dest));
  }
}

async function ensureDocsiteModule(spec) {
  // "@/components/markdown" → apps/v4/components/markdown.tsx, localized into docsite/.
  // "@/app/(create)/…" lives under the (app) route group on disk.
  const base = [join(V4, spec.slice(2)), join(V4, spec.slice(2).replace(/^app\//, "app/(app)/"))]
    .find((b) => ["", ".tsx", ".ts", "/index.tsx", "/index.ts"].some((e) => existsSync(b + e))) ?? join(V4, spec.slice(2));
  const src = ["", ".tsx", ".ts", "/index.tsx", "/index.ts"].map((e) => base + e).find((p) => existsSync(p) && statSync(p).isFile());
  if (!src) throw new Error(`docsite module ${spec} is missing`);
  const dest = join(DOCSITE, relative(V4, src));
  if (!written.has(dest)) {
    written.add(dest);
    write(dest, await localize(readFileSync(src, "utf8"), dest));
  }
  return dest.replace(/(\/index)?\.tsx?$/, "");
}

async function localizeAssets(code, fileDir) {
  const urlExpr = (p) => `new URL(${JSON.stringify(rel(fileDir, join(OUT, p)))}, import.meta.url).href`;
  // Root-relative public files (/avatars/…, /placeholder.svg) come from apps/v4/public.
  for (const m of [...code.matchAll(/(["'])\/((?:avatars|placeholder)[^"'\s]*\.(?:png|jpe?g|svg|webp))\1/g)]) {
    const src = join(V4, "public", m[2]);
    if (existsSync(src) && !existsSync(join(OUT, "public", m[2]))) cpSync(src, join(OUT, "public", m[2]));
  }
  code = code.replace(/(\s[\w-]+)=(["'])\/((?:avatars|placeholder)[^"'\s]*)\2/g, (all, attr, q, p) => existsSync(join(OUT, "public", p)) ? `${attr}={${urlExpr(`public/${p}`)}}` : all);
  code = code.replace(/(["'])\/((?:avatars|placeholder)[^"'\s]*\.(?:png|jpe?g|svg|webp))\1/g, (all, q, p) => existsSync(join(OUT, "public", p)) ? urlExpr(`public/${p}`) : all);
  for (const m of [...code.matchAll(/(["'])(https?:\/\/[^"'\s]+?(?:\.(?:png|jpe?g|svg|webp|gif)|images\.unsplash\.com\/[^"'\s]+|github\.com\/[\w-]+\.png|avatar\.vercel\.sh\/[\w-]+))\1/g)]) {
    const url = m[2];
    if (REMOTE.has(url) || DEAD.has(url)) continue;
    const res = await fetch(url, { redirect: "follow" }).catch(() => null);
    if (!res?.ok) { DEAD.add(url); continue; }
    const type = res.headers.get("content-type") ?? "";
    const ext = type.includes("svg") ? "svg" : type.includes("png") ? "png" : type.includes("webp") ? "webp" : type.includes("gif") ? "gif" : "jpg";
    const u = new URL(url);
    const local = `remote/${u.hostname}${u.pathname.replace(/\.[a-z]+$/i, "")}${u.search ? `-${Buffer.from(u.search).toString("base64url").slice(0, 16)}` : ""}.${ext}`;
    write(join(OUT, local), Buffer.from(await res.arrayBuffer()));
    REMOTE.set(url, local);
  }
  code = code.replace(/(\s[\w-]+)=(["'])(https?:\/\/[^"'\s]+)\2/g, (all, attr, q, url) => REMOTE.has(url) ? `${attr}={${urlExpr(REMOTE.get(url))}}` : all);
  code = code.replace(/(["'])(https?:\/\/[^"'\s]+)\1/g, (all, q, url) => REMOTE.has(url) ? urlExpr(REMOTE.get(url)) : all);
  return code;
}

// `shadcn add` rewrites <IconPlaceholder lucide="X" tabler="…" …/> into the configured icon library;
// the bank applies the CLI's default (lucide-react) the same way transform-icons.ts does.
const ICON_LIBS = ["lucide", "tabler", "hugeicons", "phosphor", "remixicon"];
function resolveIcons(code) {
  if (!code.includes("IconPlaceholder")) return code;
  const icons = new Set();
  code = code.replace(/<IconPlaceholder\b([\s\S]*?)\/>/g, (all, attrs) => {
    const name = attrs.match(/\blucide="([^"]+)"/)?.[1];
    if (!name) return all;
    icons.add(name);
    const rest = attrs.replace(new RegExp(`\\s*\\b(?:${ICON_LIBS.join("|")})="[^"]*"`, "g"), "").trim();
    return rest ? `<${name} ${rest} />` : `<${name} />`;
  });
  code = code.replace(/import \{\s*IconPlaceholder\s*\} from "[^"]*icon-placeholder"\n?/, "");
  if (icons.size) {
    const existing = code.match(/import \{([^}]*)\} from "lucide-react"/);
    if (existing) {
      const merged = [...new Set([...existing[1].split(",").map((n) => n.trim()).filter(Boolean), ...icons])].sort().join(", ");
      code = code.replace(existing[0], `import { ${merged} } from "lucide-react"`);
    } else {
      code = code.replace(/^((?:"use client"\n+)?)/, `$1import { ${[...icons].sort().join(", ")} } from "lucide-react"\n`);
    }
  }
  return code;
}

let blockRoot = null; // set while copying a block so its self-imports stay inside the reference
async function localize(code, destFile) {
  const fromDir = dirname(destFile);
  code = resolveIcons(code);
  const specs = [...new Set([...code.matchAll(/(?:from\s+|import\s*\(\s*|import\s+)["']([^"']+)["']/g)].map((m) => m[1]))];
  for (const spec of specs) {
    let target = null;
    let m;
    if ((m = spec.match(/^@\/(?:registry|styles)\/([\w-]+)\/(ui|lib|hooks)\/([\w-]+)$/))) {
      const [, style, kind, name] = m;
      await ensureStyleItem(style, kind, kind === "lib" && name === "utils" ? "utils" : name);
      target = styleFile(style, `${kind}/${name}`);
    } else if ((m = spec.match(/^@\/registry\/new-york-v4\/blocks\/([\w-]+)\/(.+)$/))) {
      target = join(blockRoot ?? join(UI, "_missing"), m[2]);
    } else if (spec.startsWith("@/")) {
      target = await ensureDocsiteModule(spec);
    } else if (!spec.startsWith(".")) {
      bareImports.add(spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]);
    }
    if (target) code = code.replaceAll(`"${spec}"`, JSON.stringify(rel(fromDir, target).replace(/\.tsx?$/, ""))).replaceAll(`'${spec}'`, JSON.stringify(rel(fromDir, target).replace(/\.tsx?$/, "")));
  }
  return localizeAssets(code, fromDir);
}

// ---------------------------------------------------------------- MDX → Markdown
function mdxToMarkdown(mdx, exampleLink) {
  const body = mdx.replace(/^---[\s\S]*?---\n/, "");
  const out = [];
  let fence = false;
  let tag = null; // collecting a multi-line JSX tag
  for (const line of body.split("\n")) {
    if (/^\s*```/.test(line)) { fence = !fence; out.push(line); continue; }
    if (fence) { out.push(line); continue; }
    if (tag !== null) {
      tag += ` ${line.trim()}`;
      if (/\/?>\s*$/.test(line)) { out.push(renderTag(tag, exampleLink)); tag = null; }
      continue;
    }
    if (/^\s*<[A-Z]/.test(line) && !/\/?>\s*$/.test(line)) { tag = line.trim(); continue; }
    if (/^\s*<\/?[A-Z]/.test(line)) { const r = renderTag(line.trim(), exampleLink); if (r) out.push(r); continue; }
    out.push(line);
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
function renderTag(tag, exampleLink) {
  const attr = (n) => tag.match(new RegExp(`${n}="([^"]*)"`))?.[1];
  if (tag.startsWith("<ComponentPreview")) return exampleLink(attr("name"), attr("styleName"));
  if (tag.startsWith("<ComponentSource")) return attr("name") ? `Source: \`${attr("title") ?? attr("name")}\`` : "";
  const step = tag.match(/^<Step[^>]*>(.*)<\/Step>$/);
  if (step) return `- ${step[1]}`;
  if (tag.startsWith("<Callout")) return "> Note:";
  if (tag.startsWith("</Callout")) return "";
  return "";
}
const frontmatter = (mdx) => Object.fromEntries([...(mdx.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "").matchAll(/^(\w+):\s*(.*)$/gm)].map((m) => [m[1], m[2].trim()]));

// ---------------------------------------------------------------- shared snapshot
cpSync(join(REPO_ROOT, "LICENSE.md"), join(OUT, "LICENSE.md"));
for (const s of STYLES) cpSync(join(V4, "registry/styles", `style-${s}.css`), join(OUT, "styles", `style-${s}.css`));
cpSync(join(REPO_ROOT, "packages/shadcn/src/tailwind.css"), join(OUT, "shadcn-tailwind.css"));

write(join(OUT, "frame.tsx"), `/**
 * Bank-only harness: mounts shadcn examples on the site's neutral theme (compiled Tailwind in
 * styles.css). Not part of the snapshot; the examples themselves are verbatim.
 */
import { Component, useState, type ComponentType, type ReactNode } from "react";
import { Tooltip } from "radix-ui";
import "./styles.css";

export type Example = { name: string; title: string; component: ComponentType };

class Guard extends Component<{ children: ReactNode }, { error?: string }> {
  state: { error?: string } = {};
  static getDerivedStateFromError(e: Error) { return { error: e.message }; }
  render() { return this.state.error ? <pre data-bank-error style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{this.state.error}</pre> : this.props.children; }
}

export function ShadcnFrame({ examples, page = false }: { examples: Example[]; page?: boolean }) {
  const pinned = new URLSearchParams(location.search).get("example");
  const [current, setCurrent] = useState(() => Math.max(0, examples.findIndex((e) => e.name === pinned)));
  const Example = examples[current]?.component;
  // The capture tool enumerates examples through this list.
  (window as any).__bankExamples = examples.map((e) => e.name);
  return (
    <div data-bank-frame className="bg-background text-foreground font-sans antialiased" style={{ width: "100%", minHeight: "100vh", boxSizing: "border-box", padding: page ? 0 : 24 }}>
      {examples.length > 1 && !pinned && (
        <select aria-label="Example" value={current} onChange={(e) => setCurrent(Number(e.target.value))} style={{ margin: page ? 8 : "0 0 16px", font: "inherit" }}>
          {examples.map((e, i) => <option key={e.name} value={i}>{e.title}</option>)}
        </select>
      )}
      <div data-bank-example={examples[current]?.name} className={page ? "" : "flex min-h-[320px] w-full items-center justify-center"}>
        <Tooltip.Provider><Guard key={current}>{Example ? <Example /> : null}</Guard></Tooltip.Provider>
      </div>
    </div>
  );
}
`);

// ---------------------------------------------------------------- components (docs pages)
const DOCS = join(V4, "content/docs/components/radix");
const pages = readdirSync(DOCS).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
const refs = [];
const excluded = [];
const exampleOwner = new Map(); // "base/name" → page
for (const name of pages) {
  const mdx = readFileSync(join(DOCS, `${name}.mdx`), "utf8");
  const previews = [...mdx.matchAll(/<ComponentPreview[\s\S]*?\/>/g)].map((m) => ({
    name: m[0].match(/name="([^"]+)"/)?.[1], style: m[0].match(/styleName="([^"]+)"/)?.[1] ?? "radix-nova",
  })).filter((p) => p.name);
  const sources = [...mdx.matchAll(/<ComponentSource[\s\S]*?\/>/g)].map((m) => m[0].match(/name="([^"]+)"/)?.[1]).filter(Boolean);
  const seen = new Set();
  const examples = [];
  for (const p of previews) {
    const base = p.style.split("-")[0];
    const key = `${base}/${p.name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    examples.push({ ...p, base, file: join(V4, "examples", base, `${p.name}.tsx`) });
    exampleOwner.set(key, name);
  }
  refs.push({ kind: "component", name, mdx, fm: frontmatter(mdx), examples, sources: [...new Set(sources)] });
}
// Demos in examples/radix no docs page embeds still belong to the component their name starts with.
for (const f of readdirSync(join(V4, "examples/radix")).filter((f) => f.endsWith(".tsx"))) {
  const ex = f.replace(/\.tsx$/, "");
  if (exampleOwner.has(`radix/${ex}`)) continue;
  const owner = refs.filter((r) => ex.startsWith(`${r.name}-`) || ex === r.name).sort((a, b) => b.name.length - a.name.length)[0];
  if (owner) { owner.examples.push({ name: ex, style: "radix-nova", base: "radix", file: join(V4, "examples/radix", f), unlisted: true }); continue; }
  // Undocumented yet (shimmer, scroll-fade…): the demos sharing a known prefix become one reference.
  const group = Object.keys(UNDOCUMENTED).filter((g) => ex === g || ex.startsWith(`${g}-`)).sort((a, b) => b.length - a.length)[0];
  if (!group) { excluded.push({ example: `radix/${ex}`, reason: "no component owns it" }); continue; }
  let ref = refs.find((r) => r.name === group);
  if (!ref) refs.push(ref = { kind: "component", name: group, mdx: "", fm: { title: titleize(group), description: UNDOCUMENTED[group] }, examples: [], sources: [], undocumented: true });
  ref.examples.push({ name: ex, style: "radix-nova", base: "radix", file: join(V4, "examples/radix", f), unlisted: true });
}

// Only top-level exports count; example code often embeds sample sources in template strings.
function exportedComponent(code, fileName = "") {
  if (/^export default /m.test(code)) return "default";
  // The export named after the file (markdown-demo → MarkdownDemo) wins over any other.
  const own = fileName.replace(/(^|-)(\w)/g, (m, d, c) => c.toUpperCase());
  if (own && new RegExp(`^export (?:function|const) ${own}\\b`, "m").test(code)) return own;
  return code.match(/^export function ([A-Z]\w*)/m)?.[1] ?? code.match(/^export const ([A-Z]\w*)\s*=\s*(?:\(|React\.forwardRef|forwardRef|memo)/m)?.[1];
}
const exampleImport = (e, i, fromDir) => e.exportName === "default"
  ? `import E${i} from ${JSON.stringify(rel(fromDir, e.local).replace(/\.tsx$/, ""))};`
  : `import { ${e.exportName} as E${i} } from ${JSON.stringify(rel(fromDir, e.local).replace(/\.tsx$/, ""))};`;
const demoModule = (examples, srcDir, page = false) => `${examples.map((e, i) => exampleImport(e, i, srcDir)).join("\n")}
import { ShadcnFrame } from ${JSON.stringify(rel(srcDir, join(OUT, "frame")))};

const examples = [
${examples.map((e, i) => `  { name: ${JSON.stringify(e.name)}, title: ${JSON.stringify(e.title)}, component: E${i} },`).join("\n")}
];

export default function Demo() {
  return <ShadcnFrame examples={examples}${page ? " page" : ""} />;
}
`;

const agentUse = `## How an agent uses this reference

- **React + Tailwind v4 target** — \`npx shadcn@latest add\` installs the same code; or copy the ui file
  and the example from \`src/\`, changing only the \`@/…\` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open \`static/<example>.html\`: the rendered DOM
  of each example; every class resolves through \`ui/_sources/shadcn/styles.css\` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the \`--background\`/\`--primary\`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).
- Overlays (dialogs, menus, popovers…) also have \`static/<example>.open.html\`: the same example after
  its trigger was pressed, with the portal content included.
`;

const report = { components: 0, examples: 0, blocks: 0, charts: 0, styles: 0, excluded };
for (const ref of refs) {
  const category = CATEGORY[ref.name];
  if (!category) throw new Error(`no bank category for ${ref.name}`);
  const dir = join(UI, category, `shadcn-${ref.name}`);
  const srcDir = join(dir, "src");
  // The component's own ui file(s): the docs' ComponentSource names, else the page name.
  const uiNames = (ref.sources.length ? ref.sources : [ref.name]).filter((n) => !/-example$|-demo$/.test(n));
  const uiFiles = [];
  for (const n of uiNames) {
    const item = await registryItem("radix-nova", n);
    if (!item || !["registry:ui", "registry:hook", "registry:lib", "registry:component"].includes(item.type)) continue;
    await ensureStyleItem("radix-nova", "ui", n).catch(() => {});
    for (const file of item.files) {
      const dest = join(srcDir, file.path.replace(/^registry\/radix-nova\//, ""));
      write(dest, await localize(file.content, dest));
      uiFiles.push(posix(relative(dir, dest)));
    }
  }
  const examples = [];
  for (const e of ref.examples) {
    if (!existsSync(e.file)) { excluded.push({ example: `${e.base}/${e.name}`, reason: "embedded by the docs but absent from the repository" }); continue; }
    const code = readFileSync(e.file, "utf8");
    if (/-rtl$/.test(e.name) || /ui-rtl|language-selector/.test(code)) { excluded.push({ example: `${e.base}/${e.name}`, reason: "RTL localisation demo; needs the docsite language selector" }); continue; }
    const dest = join(srcDir, "examples", `${e.name}.tsx`);
    write(dest, await localize(code, dest));
    const exportName = exportedComponent(code, e.name);
    if (!exportName) { excluded.push({ example: `${e.base}/${e.name}`, reason: "exports no component" }); continue; }
    examples.push({ name: e.name, title: `${titleize(e.name)}${e.style !== "radix-nova" ? ` (${e.style})` : ""}${e.unlisted ? " · not on docs page" : ""}`, local: dest, exportName, style: e.style });
  }
  const description = ref.fm.description ?? titleize(ref.name);
  const use = firstSentence(description);
  if (examples.length) {
    write(join(srcDir, "demo.tsx"), demoModule(examples, srcDir));
    write(join(dir, "reference.tsx"), `/* Use when: ${use.replaceAll("*/", "* /")} */\n\nexport { default } from "./src/demo";\n`);
  } else {
    // Nothing on the page renders (a provider, or a page that only redirects): documentation only.
    excluded.push({ example: ref.name, reason: "documentation only; the page embeds no renderable example" });
    write(join(dir, "reference.md"), `# Use when\n\n${use}\n`);
  }
  const nature = NATURE[category];
  const docs = mdxToMarkdown(ref.mdx, (name, style) => `> Example \`${name}\`${style && style !== "radix-nova" ? ` (${style})` : ""} — \`src/examples/${name}.tsx\`, \`static/${name}.html\``);
  write(join(dir, "README.md"), `# ${ref.fm.title ?? titleize(ref.name)}

${md(description)}

## Classification

- Category: \`${category}\` — ${nature}
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: \`${uiFiles[0] ?? `src/examples/${examples[0]?.name}.tsx`}\`
- Nature: ${nature}; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: ${ADDED}
- Curation: pending
- Use when: ${use}
- Provides: ${uiFiles.length ? uiFiles.map((f) => basename(f, ".tsx")).join(", ") : "composition pattern"} with ${examples.length} documented example${examples.length === 1 ? "" : "s"}
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with \`ui/_sources/shadcn/styles.css\`
- Variants: ${examples.map((e) => e.name).join(", ") || "default"}
- Upstream: shadcn/ui · style radix-nova
- Preferred install: \`npx shadcn@latest add ${uiNames[0] ?? ref.name}\`
- Registry: ${SITE}/r/styles/radix-nova/${uiNames[0] ?? ref.name}.json

${agentUse}
## Documentation

${ref.undocumented ? "Not yet documented on the site; the examples below are the repository's demos." : docs}

## Files

${[...uiFiles.map((f) => `- \`${f}\` — the ui file as the registry installs it`), ...examples.map((e) => `- \`src/examples/${e.name}.tsx\``)].join("\n")}
- \`src/demo.tsx\` — bank harness mounting every example
- \`reference.tsx\` — dashboard entry point

Upstream page: ${ref.undocumented ? `${REPO}/tree/main/apps/v4/examples/radix (not yet on the docs site)` : `${SITE}/docs/components/radix/${ref.name}`}
`);
  write(join(dir, "SOURCE.md"), sourceMd(`${SITE}/docs/components/radix/${ref.name}`, `ui files from the published registry (\`/r/styles/radix-nova/\`); examples from \`apps/v4/examples/\`; docs from \`apps/v4/content/docs/components/radix/${ref.name}.mdx\`.`));
  ref.id = `${category}/shadcn-${ref.name}`;
  ref.page = ref.undocumented ? null : `${SITE}/docs/components/radix/${ref.name}`;
  ref.captured = examples.map((e) => e.name);
  ref.live = examples.length > 0;
  report.components++;
  report.examples += examples.length;
}

function sourceMd(page, what) {
  return `# Source

- Site: ${page}
- Repository: ${REPO}
- Captured commit: \`${COMMIT}\`
- Published registry: ${SITE}/r/styles/ (fetched ${ADDED})
- License: MIT (\`ui/_sources/shadcn/LICENSE.md\`)
- Captured: ${ADDED}

${what}

Files are verbatim apart from \`@/…\` import paths and image URLs, which point into
\`ui/_sources/shadcn/\`. They are a pinned source snapshot, not an installable package.
`;
}

// ---------------------------------------------------------------- blocks (new-york-v4)
const blocksIndex = JSON.parse(readFileSync(join(V4, "registry/__blocks__.json"), "utf8"));
const blockEntries = [];
for (const block of blocksIndex) {
  const srcRoot = join(V4, "registry/new-york-v4/blocks", block.name);
  if (!existsSync(srcRoot)) { excluded.push({ example: `block ${block.name}`, reason: "homepage showcase; exists only as untransformed radix style-slot source, never published as an installable block" }); continue; }
  const category = block.name.startsWith("sidebar-") ? "layout" : "page";
  const dir = join(UI, category, `shadcn-${block.name}`);
  const srcDir = join(dir, "src");
  blockRoot = srcDir;
  const files = walk(srcRoot);
  for (const f of files) {
    const dest = join(srcDir, relative(srcRoot, f));
    const code = readFileSync(f, "utf8");
    write(dest, /\.(tsx?|jsx?)$/.test(f) ? await localize(code, dest) : code);
  }
  blockRoot = null;
  const pageFile = join(srcDir, "page.tsx");
  const pageCode = readFileSync(pageFile, "utf8");
  const examples = [{ name: block.name, title: titleize(block.name), local: pageFile, exportName: exportedComponent(pageCode, "page") }];
  write(join(srcDir, "demo.tsx"), demoModule(examples, srcDir, true));
  const use = firstSentence(block.description ?? titleize(block.name));
  write(join(dir, "reference.tsx"), `/* Use when: ${use} */\n\nexport { default } from "./src/demo";\n`);
  write(join(dir, "README.md"), `# ${titleize(block.name)}

${md(block.description)}

## Classification

- Category: \`${category}\` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (new-york-v4); static HTML + compiled CSS snapshot
- Framework: react
- Entry point: \`src/page.tsx\`
- Nature: structural; reuse the page composition, hierarchy and density, not its sample data.
- Added: ${ADDED}
- Curation: pending
- Use when: ${use}
- Provides: ${(block.categories ?? []).join(", ") || "page"} block — ${files.length} file${files.length === 1 ? "" : "s"}
- Requires: React with Tailwind v4 and the shadcn tokens, or \`static/${block.name}.html\` with \`ui/_sources/shadcn/styles.css\`
- Variants: default
- Upstream: shadcn/ui block · ${(block.categories ?? []).join(", ")}
- Preferred install: \`npx shadcn@latest add ${block.name}\`
- Registry: ${SITE}/r/styles/new-york-v4/${block.name}.json

${agentUse}
## Files

${files.map((f) => `- \`src/${posix(relative(srcRoot, f))}\``).join("\n")}
- \`src/demo.tsx\` — bank harness
- \`reference.tsx\` — dashboard entry point

Upstream page: ${SITE}/view/new-york-v4/${block.name}
`);
  write(join(dir, "SOURCE.md"), sourceMd(`${SITE}/view/new-york-v4/${block.name}`, `Block from \`apps/v4/registry/new-york-v4/blocks/${block.name}/\`.`));
  blockEntries.push({ id: `${category}/shadcn-${block.name}`, page: `${SITE}/view/new-york-v4/${block.name}`, captured: [block.name], kind: "block" });
  report.blocks++;
}

// ---------------------------------------------------------------- charts (new-york-v4)
const chartEntries = [];
const CHARTS = join(V4, "registry/new-york-v4/charts");
for (const f of readdirSync(CHARTS).filter((f) => /^chart-.*\.tsx$/.test(f))) {
  const name = f.replace(/\.tsx$/, "");
  const dir = join(UI, "data-visualization", `shadcn-${name}`);
  const srcDir = join(dir, "src");
  const code = readFileSync(join(CHARTS, f), "utf8");
  const dest = join(srcDir, f);
  write(dest, await localize(code, dest));
  const type = name.split("-")[1];
  const description = code.match(/export const description = "([^"]+)"/)?.[1] ?? `${titleize(name)}.`;
  write(join(srcDir, "demo.tsx"), demoModule([{ name, title: titleize(name), local: dest, exportName: exportedComponent(code, name) }], srcDir));
  const use = firstSentence(description.replace(/\.?$/, "."));
  write(join(dir, "reference.tsx"), `/* Use when: ${use} */\n\nexport { default } from "./src/demo";\n`);
  write(join(dir, "README.md"), `# ${titleize(name)}

${md(description)}

## Classification

- Category: \`data-visualization\` — structural
- Medium: React + TypeScript + Tailwind CSS v4 + Recharts (new-york-v4 \`chart\` and \`card\`); static HTML + compiled CSS
- Framework: react
- Entry point: \`src/${f}\`
- Nature: structural; reuse the chart form, encoding and card framing, not the sample data.
- Added: ${ADDED}
- Curation: pending
- Use when: ${use}
- Provides: ${type} chart
- Requires: React with Recharts, Tailwind v4 and the shadcn \`--chart-*\` tokens, or \`static/${name}.html\` with \`ui/_sources/shadcn/styles.css\` (a static SVG snapshot)
- Variants: default
- Upstream: shadcn/ui charts · ${type}
- Preferred install: \`npx shadcn@latest add ${name}\`
- Registry: ${SITE}/r/styles/new-york-v4/${name}.json

${agentUse}
## Files

- \`src/${f}\`
- \`src/demo.tsx\` — bank harness
- \`reference.tsx\` — dashboard entry point

Upstream page: ${SITE}/charts/${type}#${name}
`);
  write(join(dir, "SOURCE.md"), sourceMd(`${SITE}/charts/${type}#${name}`, `Chart from \`apps/v4/registry/new-york-v4/charts/${f}\`.`));
  chartEntries.push({ id: `data-visualization/shadcn-${name}`, page: `${SITE}/view/new-york-v4/${name}`, captured: [name], kind: "chart" });
  report.charts++;
}

// ---------------------------------------------------------------- styles
const styleEntries = [];
for (const s of STYLES) {
  const dir = join(UI, "theme", `shadcn-style-${s}`);
  cpSync(join(OUT, "styles", `style-${s}.css`), join(dir, "src", `style-${s}.css`));
  const css = readFileSync(join(dir, "src", `style-${s}.css`), "utf8");
  const sample = (cls) => css.match(new RegExp(`\\.${cls} \\{\\s*@apply ([^;]+);`))?.[1];
  write(join(dir, "reference.md"), `# Use when\n\nThe ${titleize(s)} visual style of shadcn/ui: the same components with its own radius, density, borders and focus treatment.\n`);
  write(join(dir, "README.md"), `# shadcn/ui ${titleize(s)} style

${s === "nova" ? "The style the shadcn docs render by default; every `shadcn-*` component reference in the bank is captured in it." : `One of the eight shadcn/ui styles. The bank's component references are captured in Nova; this file maps the same \`cn-*\` slots to the ${titleize(s)} look.`}

## Classification

- Category: \`theme\` — decorative
- Medium: CSS (\`@apply\` map from \`cn-*\` component slots to Tailwind utilities)
- Framework: css
- Entry point: \`src/style-${s}.css\`
- Nature: decorative; supplies look-and-feel only — never lift layout or interaction from it.
- Added: ${ADDED}
- Curation: pending
- Use when: The ${titleize(s)} visual style of shadcn/ui is wanted for the same components.
- Provides: per-slot utility classes for every shadcn component under \`.style-${s}\`
- Requires: Tailwind v4 and the shadcn tokens; components written against the \`cn-*\` slots (\`registry/bases/*\`)
- Variants: default

## How an agent uses this reference

- Install components in this style: \`npx shadcn@latest init\` and pick ${titleize(s)}, or read
  \`${SITE}/r/styles/radix-${s}/<component>.json\` — the registry resolves each \`cn-*\` slot into the utilities below.
- Hand-port: take the utilities of a slot, e.g. \`.cn-button\` → \`${md(sample("cn-button") ?? "")}\`.

## Files

- \`src/style-${s}.css\`

Upstream page: ${SITE}/create
`);
  write(join(dir, "SOURCE.md"), sourceMd(`${SITE}/create`, `\`apps/v4/registry/styles/style-${s}.css\`.`));
  styleEntries.push({ id: `theme/shadcn-style-${s}`, page: null, captured: [], kind: "style" });
  report.styles++;
}

// ---------------------------------------------------------------- Tailwind build input
{
  const globals = readFileSync(join(V4, "app/globals.css"), "utf8")
    .replace(/^@import "\.\/legacy-themes\.css";\n/m, "")
    .replace(/^@import "shadcn\/tailwind\.css";$/m, '@import "./shadcn-tailwind.css";')
    .replace(/^@source .*\n/gm, "");
  const sources = `@source "../../**/shadcn-*/src/**/*.{ts,tsx}";\n@source "./**/*.{ts,tsx}";\n`;
  write(join(OUT, "tailwind.css"), `/* The docsite globals (tokens, theme, base layer) with the bank snapshot as the only source. */\n${globals.replace(/(@import "\.\/shadcn-tailwind\.css";)/, `$1\n${sources}`)}\n/* The site sets these with next/font; the bank ships the same families locally. */\n:root { --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif; --font-mono: "Geist Mono", ui-monospace, monospace; --font-heading: var(--font-sans); }\n@import "./fonts.css";\n`);
  let fonts = "";
  const ua = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";
  for (const family of ["Geist", "Geist Mono"]) {
    const text = await fetch(`https://fonts.googleapis.com/css2?family=${family.replaceAll(" ", "+")}:wght@100..900&display=swap`, { headers: { "user-agent": ua } }).then((r) => r.text());
    for (const block of text.split("}").filter((b) => b.includes("@font-face") && /\/\* latin \*\//.test(b))) {
      const url = block.match(/url\((https:[^)]+)\)/)[1];
      const file = `${family.toLowerCase().replace(" ", "-")}-${basename(new URL(url).pathname)}`;
      write(join(OUT, "fonts", file), Buffer.from(await fetch(url).then((r) => r.arrayBuffer())));
      fonts += `${block.replace(url, `./fonts/${file}`).trim()}\n}\n`;
    }
  }
  write(join(OUT, "fonts.css"), `/* Geist (OFL), latin subset, localized. */\n${fonts}`);
}

// Drop references that no longer exist upstream; captured output alone does not keep one alive.
for (const cat of readdirSync(UI)) {
  if (cat === "_sources" || !statSync(join(UI, cat)).isDirectory()) continue;
  for (const d of readdirSync(join(UI, cat))) {
    if (d.startsWith("shadcn-") && !["reference.tsx", "reference.md"].some((f) => existsSync(join(UI, cat, d, f)))) rmSync(join(UI, cat, d), { recursive: true });
  }
}

// Compile the site's Tailwind over the fresh snapshot (same as `npm run shadcn:css`).
execFileSync(process.execPath, [join(ROOT, "node_modules/@tailwindcss/cli/dist/index.mjs"), "-i", join(OUT, "tailwind.css"), "-o", join(OUT, "styles.css")], { stdio: "ignore" });

const entries = [
  ...refs.filter((r) => r.id).map((r) => ({ id: r.id, page: r.page, captured: r.captured, kind: "component" })),
  ...blockEntries, ...chartEntries, ...styleEntries,
];
write(join(OUT, "manifest.json"), JSON.stringify({ commit: COMMIT, captured: ADDED, entries }, null, 2) + "\n");
write(join(OUT, "SOURCE.md"), `# shadcn/ui

- Site: ${SITE}
- Repository: ${REPO}
- Captured commit: \`${COMMIT}\`
- Published registry: ${SITE}/r/styles/{radix-nova,radix-rhea,base-nova,new-york-v4}/
- License: MIT — \`LICENSE.md\`
- Captured: ${ADDED}
- Importer: \`node tools/import-shadcn.mjs <shadcn-ui/ui checkout>\`, then \`node tools/capture-bank.mjs --source shadcn --static --previews\`

## Contents

- \`radix-nova/\`, \`radix-rhea/\`, \`base-nova/\` — ui/lib/hook files exactly as the registry installs them (docs examples import these)
- \`new-york-v4/\` — the ui files blocks and charts are built on (repository source)
- \`styles.css\` — the site's Tailwind v4 build over this snapshot; link it from any static HTML
- \`tailwind.css\` — its input: the docsite \`globals.css\` tokens with the snapshot as source
- \`styles/style-*.css\` — the eight style maps; \`shadcn-tailwind.css\` — the \`shadcn/tailwind.css\` layer
- \`docsite/\` — site modules a few examples import (markdown, message animations, media-query hook)
- \`public/\`, \`remote/\`, \`fonts/\` — images and Geist, localized
- \`frame.tsx\` — bank-only React harness; \`manifest.json\` — every captured entry

## Counts

- Components: ${report.components} (docs pages), examples: ${report.examples}
- Blocks: ${report.blocks}
- Charts: ${report.charts}
- Styles: ${report.styles}

## Excluded

${excluded.map((e) => `- \`${e.example}\` — ${e.reason}`).join("\n")}
${[...DEAD].map((u) => `- image \`${u}\` — unreachable upstream; kept as written`).join("\n")}
`);

console.log(JSON.stringify({ ...report, excluded: excluded.length, bareImports: [...bareImports].sort(), remote: REMOTE.size, dead: [...DEAD] }, null, 2));
