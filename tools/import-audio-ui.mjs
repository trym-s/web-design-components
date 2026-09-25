#!/usr/bin/env node
/**
 * Captures Audio UI (https://audio-ui.xyz, MIT) into the bank: every demo and block its registry
 * lists (`apps/www/src/registry-audio/bases/components.json`), in the Base UI + Nova style the docs
 * render by default.
 *
 * usage: node tools/import-audio-ui.mjs /path/to/audio-ui [--added ISO]
 *
 * - One reference per component family (knob, fader, XY pad, player, queue, track, transport,
 *   sortable list, playback speed) holding all of its demos, and one per block (channel strips,
 *   synths, player widgets).
 * - The audio elements, their shadcn Base UI dependencies and hooks are copied from `apps/www/src/`
 *   following imports, into `ui/_sources/audio-ui/` at the same paths; the primitives come from the
 *   `@audio-ui/react` npm package, as the registry installs them.
 * - The docs pick the icon library from the site customizer; the bank's `IconPlaceholder` shim
 *   always renders lucide, the docs default.
 * Static HTML and previews: `tools/capture-bank.mjs --source audio-ui --static --previews`.
 */

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const args = process.argv.slice(2);
const REPO_ROOT = resolve(args[0] ?? "");
const WWW = join(REPO_ROOT, "apps/www/src");
const BASES = join(WWW, "registry-audio/bases");
if (!args[0] || !existsSync(join(BASES, "components.json"))) throw new Error("usage: node tools/import-audio-ui.mjs /path/to/audio-ui");
const ADDED = args.includes("--added") ? args[args.indexOf("--added") + 1] : new Date().toISOString().replace(/\.\d+Z$/, "Z");

const ROOT = resolve(import.meta.dirname, "..");
const UI = join(ROOT, "ui");
const OUT = join(UI, "_sources/audio-ui");
const SITE = "https://audio-ui.xyz";
const REPO = "https://github.com/ouestlabs/audio-ui";
const COMMIT = execFileSync("git", ["-C", REPO_ROOT, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const PRIMITIVES = JSON.parse(readFileSync(join(REPO_ROOT, "packages/ui/package.json"), "utf8")).version;

const write = (path, body) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, body); };
const posix = (p) => p.split("\\").join("/");
const rel = (from, to) => { const r = posix(relative(from, to)); return r.startsWith(".") ? r : `./${r}`; };
const md = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\n+/g, " ").trim();
const firstSentence = (s) => md(s).match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? md(s);
const titleize = (s) => s.replace(/(^|-)(\w)/g, (m, d, c) => `${d ? " " : ""}${c.toUpperCase()}`);

// ---------------------------------------------------------------- what the registry lists
async function loadRegistry(file) {
  const out = join(ROOT, ".cache", `audio-ui-${basename(dirname(file))}-registry.mjs`);
  await build({ entryPoints: [file], outfile: out, format: "esm", platform: "node", bundle: false, logLevel: "silent" });
  return Object.values(await import(`${pathToFileURL(out).href}?${Date.now()}`)).flat();
}
const items = new Map((await loadRegistry(join(BASES, "base/components/_registry.ts"))).map((i) => [i.name, i]));
const elements = new Map((await loadRegistry(join(BASES, "base/audio/_registry.ts"))).map((i) => [i.name, i]));
const listed = JSON.parse(readFileSync(join(BASES, "components.json"), "utf8"));
const categories = new Map(JSON.parse(readFileSync(join(BASES, "registry.json"), "utf8")).categories.map((c) => [c.name, c]));

// Which docs page embeds which demo.
const pages = new Map();
for (const file of readdirSync(join(WWW, "content/docs/components/base")).filter((f) => f.endsWith(".mdx"))) {
  const mdx = readFileSync(join(WWW, "content/docs/components/base", file), "utf8");
  const fm = Object.fromEntries([...(mdx.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "").matchAll(/^(\w+): (.*)$/gm)].map(([, k, v]) => [k, v.trim()]));
  const page = { url: `${SITE}/docs/components/base/${file.replace(/\.mdx$/, "")}`, title: fm.title, description: fm.description };
  for (const [, name] of mdx.matchAll(/<ComponentPreview[^>]*name="([^"]+)"/g)) if (!pages.has(name)) pages.set(name, page);
}

const CATEGORY = { knob: "input", fader: "input", xypad: "input", "channel-strip": "input", synth: "input", player: "content", queue: "data-display", track: "data-display", "sortable-list": "data-display", transport: "action-feedback", "playback-speed": "action-feedback" };
const NATURE = { input: "interactive", content: "interactive", "data-display": "interactive", "action-feedback": "interactive" };
const ELEMENT = { knob: "knob", fader: "fader", xypad: "xypad", player: "player", queue: "player", track: "player", "playback-speed": "player", transport: "transport", "sortable-list": "sortable-list", "channel-strip": "channel-strip", synth: "xypad" };

const refs = new Map();
const excluded = [];
for (const { name, categories: cats } of listed) {
  const item = items.get(name);
  const file = item?.files?.[0]?.path && join(BASES, "base", item.files[0].path);
  if (!file || !existsSync(file)) { excluded.push({ example: name, reason: "listed but its file is missing upstream" }); continue; }
  const block = name.startsWith("block-");
  const family = cats[0];
  const key = block ? name : family;
  if (!refs.has(key)) {
    const cat = categories.get(family);
    const page = pages.get(name);
    refs.set(key, {
      slug: block ? name : family, block, family, category: CATEGORY[family] ?? "input",
      title: block ? titleize(name.replace(/^block-/, "")) : page?.title ?? cat?.label ?? titleize(family),
      description: block ? item.description : page?.description ?? cat?.description,
      page: page?.url ?? (block ? null : `${SITE}/components/${family}`), examples: [], cats,
    });
  }
  refs.get(key).examples.push({ name, file, description: item.description });
}

// ---------------------------------------------------------------- clean slate (captures survive)
for (const cat of readdirSync(UI)) {
  if (cat === "_sources" || cat === "icons" || !statSync(join(UI, cat)).isDirectory()) continue;
  for (const d of readdirSync(join(UI, cat))) {
    if (!d.startsWith("audio-ui-")) continue;
    for (const f of readdirSync(join(UI, cat, d))) if (f !== "static" && f !== "preview.png") rmSync(join(UI, cat, d, f), { recursive: true });
  }
}
rmSync(OUT, { recursive: true, force: true });

// ---------------------------------------------------------------- import localization
const bareImports = new Set();
const copied = new Set();
const resolveFile = (base) => ["", ".ts", ".tsx", "/index.ts", "/index.tsx"].map((e) => base + e).find((p) => existsSync(p) && statSync(p).isFile());
const ICON_SHIM = join(OUT, "shims/icon-placeholder.tsx");

function localize(code, sourceFile, destFile) {
  const specs = [...new Set([...code.matchAll(/(?:from\s+|import\s*\(\s*|import\s+)["']([^"']+)["']/g)].map((m) => m[1]))];
  for (const spec of specs) {
    let local;
    if (spec === "@/app/(create)/components/icon-placeholder") local = ICON_SHIM;
    else {
      const target = spec.startsWith("@/") ? resolveFile(join(WWW, spec.slice(2))) : spec.startsWith(".") ? resolveFile(resolve(dirname(sourceFile), spec)) : null;
      if (!target) {
        if (!spec.startsWith(".") && !spec.startsWith("@/")) bareImports.add(spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]);
        continue;
      }
      local = join(OUT, relative(WWW, target));
      copyModule(target, local);
    }
    const to = rel(dirname(destFile), local).replace(/\.tsx?$/, "").replace(/\/index$/, "");
    code = code.replaceAll(`"${spec}"`, `"${to}"`).replaceAll(`'${spec}'`, `'${to}'`);
  }
  return code;
}

function copyModule(source, dest) {
  if (copied.has(dest)) return;
  copied.add(dest);
  write(dest, localize(readFileSync(source, "utf8"), source, dest));
}

// The docs' preview surface seeds the audio store with demo tracks for player-type demos.
const STORE_CATEGORIES = new Set(["player", "queue", "track", "playback-speed"]);
copyModule(join(WWW, "components/audio-demo-provider.tsx"), join(OUT, "components/audio-demo-provider.tsx"));

// The docs choose the icon library in the customizer; previews use lucide, the default.
copyModule(join(WWW, "registry/icons/__lucide__.ts"), join(OUT, "registry/icons/__lucide__.ts"));
write(ICON_SHIM, `/**
 * Bank shim for app/(create)/components/icon-placeholder: the site resolves the icon library from its
 * customizer (URL params, stored config); the bank renders the lucide name, the docs default.
 */
import type { ComponentProps } from "react";
import * as lucide from "../registry/icons/__lucide__";

type Libraries = { lucide?: string; tabler?: string; hugeicons?: string; phosphor?: string; remixicon?: string };

export function IconPlaceholder({ lucide: name, tabler, hugeicons, phosphor, remixicon, ...props }: Libraries & ComponentProps<"svg">) {
  const Icon = name ? (lucide as Record<string, React.ComponentType<ComponentProps<"svg">>>)[name] : undefined;
  return Icon ? <Icon {...props} /> : null;
}
`);

// ---------------------------------------------------------------- frame and styles
write(join(OUT, "frame.tsx"), `/**
 * Bank-only harness: mounts Audio UI demos in the docs' default style (Base UI + Nova, \`.style-nova\`).
 * Not part of the snapshot.
 */
import { Component, useState, type ComponentType, type ReactNode } from "react";
import { AudioDemoProvider } from "./components/audio-demo-provider";
import "./styles.css";

export type Example = { name: string; title: string; component: ComponentType };

class Guard extends Component<{ children: ReactNode }, { error?: string }> {
  state: { error?: string } = {};
  static getDerivedStateFromError(e: Error) { return { error: e.message }; }
  render() { return this.state.error ? <pre data-bank-error style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{this.state.error}</pre> : this.props.children; }
}

/** \`tracks\`: seed the audio store with the docs' demo tracks, as the docs do for player, queue, track and playback-speed. */
const body = (Example: ComponentType | undefined, current: number) => <Guard key={current}>{Example ? <Example /> : null}</Guard>;

export function AudioFrame({ examples, tracks = false }: { examples: Example[]; tracks?: boolean }) {
  const pinned = new URLSearchParams(location.search).get("example");
  const [current, setCurrent] = useState(() => Math.max(0, examples.findIndex((e) => e.name === pinned)));
  const Example = examples[current]?.component;
  // The capture tool enumerates examples through this list.
  (window as any).__bankExamples = examples.map((e) => e.name);
  return (
    <div data-bank-frame className="style-nova bg-background text-foreground font-sans antialiased" style={{ width: "100%", minHeight: "100vh", boxSizing: "border-box", padding: 24 }}>
      {examples.length > 1 && !pinned && (
        <select aria-label="Example" value={current} onChange={(e) => setCurrent(Number(e.target.value))} style={{ margin: "0 0 16px", font: "inherit" }}>
          {examples.map((e, i) => <option key={e.name} value={i}>{e.title}</option>)}
        </select>
      )}
      <div data-bank-example={examples[current]?.name} className="flex min-h-[320px] w-full items-center justify-center rounded-xl border p-6">
        {tracks ? <AudioDemoProvider>{body(Example, current)}</AudioDemoProvider> : body(Example, current)}
      </div>
    </div>
  );
}
`);
{
  // The site stylesheet, limited to the Nova style (the docs default) and without its docs typography.
  const globals = readFileSync(join(WWW, "styles/globals.css"), "utf8")
    .replace(/^@import "\.\/typeset\.css";\n/m, "")
    .replace(/^@import "\.\/default\.css";\n/m, "")
    .replace(/^@import "shadcn\/tailwind\.css";$/m, '@import "../shadcn/shadcn-tailwind.css";')
    .replace(/^@import "\.\.\/(registry(?:-audio)?)\/styles\/style-(\w+)\.css" layer\(base\);\n/gm, (all, dir, style) => (style === "nova" ? `@import "./${dir}/styles/style-nova.css" layer(base);\n` : ""))
    .replace(/^@source .*\n?/gm, "");
  for (const dir of ["registry", "registry-audio"]) cpSync(join(WWW, dir, "styles/style-nova.css"), join(OUT, dir, "styles/style-nova.css"));
  const ua = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";
  const FONTS = [["Bricolage Grotesque", "wght@200..800"], ["Instrument Serif", "ital@0;1"], ["Geist Mono", "wght@100..900"]];
  let fonts = "";
  for (const [family, axes] of FONTS) {
    const text = await fetch(`https://fonts.googleapis.com/css2?family=${family.replaceAll(" ", "+")}:${axes}&display=swap`, { headers: { "user-agent": ua } }).then((r) => r.text());
    for (const block of text.split("}").filter((b) => b.includes("@font-face") && /\/\* latin \*\//.test(b))) {
      const url = block.match(/url\((https:[^)]+)\)/)[1];
      const file = `${family.toLowerCase().replaceAll(" ", "-")}-${basename(new URL(url).pathname)}`;
      write(join(OUT, "fonts", file), Buffer.from(await fetch(url).then((r) => r.arrayBuffer())));
      fonts += `${block.replace(url, `./fonts/${file}`).trim()}\n}\n`;
    }
  }
  write(join(OUT, "fonts.css"), `/* Bricolage Grotesque, Instrument Serif, Geist Mono (OFL), latin subset, localized. */\n${fonts}`);
  const sources = `@source "./**/*.{ts,tsx}";\n@source "../../**/audio-ui-*/{src,upstream}/**/*.{ts,tsx}";\n`;
  write(join(OUT, "tailwind.css"), `/* The site's styles/globals.css (Nova only) over this snapshot. */\n${globals.replace(/(@import "tailwindcss";)/, `$1\n${sources}@import "./fonts.css";`)}`);
}

// ---------------------------------------------------------------- references
const entries = [];
for (const ref of refs.values()) {
  const dir = join(UI, ref.category, `audio-ui-${ref.slug}`);
  const srcDir = join(dir, "upstream");
  const id = `${ref.category}/audio-ui-${ref.slug}`;
  const nature = NATURE[ref.category];
  const use = firstSentence(ref.description ?? ref.title);
  const examples = ref.examples.map((e, i) => {
    const dest = join(srcDir, "examples", basename(e.file));
    const code = readFileSync(e.file, "utf8");
    write(dest, localize(code, e.file, dest));
    const named = code.match(/export default function (\w+)/)?.[1] ?? code.match(/export default (\w+);/)?.[1];
    const exportName = named ? null : code.match(/export function (\w+)/)?.[1];
    return { ...e, dest, index: i, exportName, title: titleize(e.name.replace(/^player-|-demo$/g, "")) };
  });
  write(join(srcDir, "demo.tsx"), `${examples.map((e) => (e.exportName ? `import { ${e.exportName} as E${e.index} } from "./examples/${basename(e.file, ".tsx")}";` : `import E${e.index} from "./examples/${basename(e.file, ".tsx")}";`)).join("\n")}
import { AudioFrame } from "${rel(srcDir, join(OUT, "frame"))}";

const examples = [
${examples.map((e) => `  { name: "${e.name}", title: ${JSON.stringify(e.title)}, component: E${e.index} },`).join("\n")}
];

export default function Demo() {
  return <AudioFrame examples={examples}${ref.cats.some((c) => STORE_CATEGORIES.has(c)) ? " tracks" : ""} />;
}
`);
  write(join(dir, "reference.tsx"), `/* Use when: ${use.replaceAll("*/", "* /")} */\n\nexport { default } from "./upstream/demo";\n`);
  const element = elements.get(ELEMENT[ref.family]);
  const elementFiles = (element?.files ?? []).map((f) => `ui/_sources/audio-ui/registry-audio/bases/base/${f.path}`).filter((f) => existsSync(join(ROOT, f)));
  const install = ref.block ? ref.slug : ELEMENT[ref.family];
  write(join(dir, "README.md"), `# ${ref.title}

${md(ref.description)}

## Classification

- Category: \`${ref.category}\` — ${nature}
- Medium: React + TypeScript + Tailwind CSS v4 (shadcn Base UI, Nova style, \`@audio-ui/react\` primitives); static HTML
- Framework: react
- Entry point: \`${ref.block ? `upstream/examples/${basename(examples[0].file)}` : elementFiles[0] ?? `upstream/examples/${basename(examples[0].file)}`}\`
- Nature: ${nature}; reuse the control, its interaction model and layout, adapt literal values to the target project.
- Added: ${ADDED}
- Curation: pending
- Use when: ${use}
- Provides: ${ref.block ? `${ref.title} block` : `${ref.title} with ${examples.length} documented example${examples.length === 1 ? "" : "s"}`}
- Requires: React, Tailwind v4 with the shadcn tokens and a shadcn style (\`cn-*\` slots), \`@audio-ui/react\` ${PRIMITIVES}
- Variants: ${examples.map((e) => e.name).join(", ")}
- Upstream: Audio UI · ${ref.cats.join(", ")}
- Preferred install: \`npx shadcn@latest add @audio/${install}\`
- Local source fallback: \`${elementFiles[0] ?? `ui/${ref.category}/audio-ui-${ref.slug}/upstream/examples/${basename(examples[0].file)}`}\`

## How an agent uses this reference

- **React + shadcn target** — add the \`@audio\` registry (\`${SITE}/docs/registry\`) and install as above; the demos in
  \`upstream/examples/\` show the exact usage. The elements live in \`ui/_sources/audio-ui/registry-audio/bases/base/audio/\`.
- **Any other stack** — \`static/<example>.html\` is the rendered DOM against \`ui/_sources/audio-ui/styles.css\` (the
  site's Tailwind build with the Nova style); keep the markup, re-implement drag/keyboard behavior from the docs.

## Examples

${examples.map((e) => `- \`upstream/examples/${basename(e.file)}\` — ${md(e.description ?? e.title)} · static: \`static/${e.name}.html\``).join("\n")}

## Files

${elementFiles.map((f) => `- \`${f}\` — the element as the registry installs it`).join("\n")}${elementFiles.length ? "\n" : ""}- \`upstream/demo.tsx\` — bank harness mounting every example
- \`reference.tsx\` — dashboard entry point

Upstream page: ${ref.page ?? `${REPO}/tree/main/apps/www/src/registry-audio/bases/base/${posix(relative(join(BASES, "base"), examples[0].file))}`}
`);
  write(join(dir, "SOURCE.md"), `# Source

- Site: ${ref.page ?? SITE}
- Repository: ${REPO}
- Captured commit: \`${COMMIT}\`
- Primitives: \`@audio-ui/react\` ${PRIMITIVES} (npm)
- License: MIT (\`ui/_sources/audio-ui/LICENSE.md\`)
- Captured: ${ADDED}

Examples from \`apps/www/src/registry-audio/bases/base/components/\`; files are verbatim apart from \`@/…\` import paths,
which point into \`ui/_sources/audio-ui/\`, and the icon placeholder, which points at the bank's lucide shim.
`);
  entries.push({ id, page: null, clip: "[data-bank-example]", captured: examples.map((e) => e.name), kind: ref.block ? "block" : "component" });
}

// Every element the registry publishes, even one no demo reaches.
for (const el of elements.values()) for (const f of el.files ?? []) if (existsSync(join(BASES, "base", f.path))) copyModule(join(BASES, "base", f.path), join(OUT, "registry-audio/bases/base", f.path));

for (const cat of readdirSync(UI)) {
  if (cat === "_sources" || cat === "icons" || !statSync(join(UI, cat)).isDirectory()) continue;
  for (const d of readdirSync(join(UI, cat))) if (d.startsWith("audio-ui-") && !existsSync(join(UI, cat, d, "reference.tsx"))) rmSync(join(UI, cat, d), { recursive: true });
}

execFileSync(process.execPath, [join(ROOT, "node_modules/@tailwindcss/cli/dist/index.mjs"), "-i", join(OUT, "tailwind.css"), "-o", join(OUT, "styles.css")], { stdio: "ignore", cwd: ROOT });
cpSync(join(REPO_ROOT, "LICENSE"), join(OUT, "LICENSE.md"));
write(join(OUT, "manifest.json"), JSON.stringify({ commit: COMMIT, captured: ADDED, entries }, null, 2) + "\n");
write(join(OUT, "SOURCE.md"), `# Audio UI

- Site: ${SITE}
- Repository: ${REPO}
- Captured commit: \`${COMMIT}\`
- Primitives: \`@audio-ui/react\` ${PRIMITIVES} (npm, installed in the bank)
- License: MIT — \`LICENSE.md\`
- Captured: ${ADDED}
- Importer: \`node tools/import-audio-ui.mjs <audio-ui checkout>\`, then \`node tools/capture-bank.mjs --source audio-ui --static --previews\`

## Contents

- \`registry-audio/\`, \`registry/\` — the site modules the demos reach, same paths as \`apps/www/src/\`: the audio
  elements, hooks and stores, and the shadcn Base UI components they build on
- \`shims/icon-placeholder.tsx\` — lucide-only replacement for the site's icon-library switch
- \`styles.css\` — Tailwind v4 build of \`tailwind.css\` (the site's \`styles/globals.css\`, Nova style) over this snapshot
- \`frame.tsx\` — bank-only React harness; \`manifest.json\` — every captured entry; \`fonts/\` — the site's fonts

## Counts

- Component families: ${[...refs.values()].filter((r) => !r.block).length} (${[...refs.values()].filter((r) => !r.block).reduce((n, r) => n + r.examples.length, 0)} demos)
- Blocks: ${[...refs.values()].filter((r) => r.block).length}

## Excluded

${excluded.map((e) => `- \`${e.example}\` — ${e.reason}`).join("\n") || "- nothing"}
- The seven other shadcn styles and the Radix base: the docs render Base UI + Nova by default.
`);

console.log(JSON.stringify({ references: entries.length, examples: entries.reduce((n, e) => n + e.captured.length, 0), excluded, bareImports: [...bareImports].sort() }, null, 2));
