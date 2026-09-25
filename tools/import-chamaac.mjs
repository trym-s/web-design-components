#!/usr/bin/env node
/**
 * Captures Chamaac UI (https://www.chamaac.com, MIT) into the bank — everything the repository ships:
 * - every component page on the site (`app/components/<category>/<name>/`, its demo and props table);
 * - the in-progress demos under `app/in-progress/` (not on the site yet);
 * - registry components with no page or demo, mounted with their default props.
 * The animated icons are an icon set: `tools/import-animated-icons.mjs` (`chamaac-icons`).
 *
 * usage: node tools/import-chamaac.mjs /path/to/chamaacui [--added ISO]
 *
 * Imports are rewritten to the local snapshot (`ui/_sources/chamaac/`, same paths as the repository);
 * `@/lib/utils` stays, the viewer resolves it to its `cn`. Previews are the site's own images where
 * it has one; the rest, and all static HTML, come from `tools/capture-bank.mjs --source chamaac`.
 */

import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const args = process.argv.slice(2);
const REPO_ROOT = resolve(args[0] ?? "");
if (!args[0] || !existsSync(join(REPO_ROOT, "registry/chamaac"))) throw new Error("usage: node tools/import-chamaac.mjs /path/to/chamaacui");
const ADDED = args.includes("--added") ? args[args.indexOf("--added") + 1] : new Date().toISOString().replace(/\.\d+Z$/, "Z");

const ROOT = resolve(import.meta.dirname, "..");
const UI = join(ROOT, "ui");
const OUT = join(UI, "_sources/chamaac");
const SITE = "https://www.chamaac.com";
const REPO = "https://github.com/amarnathdhumal/chamaacui";
const COMMIT = execFileSync("git", ["-C", REPO_ROOT, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const registry = new Map(JSON.parse(readFileSync(join(REPO_ROOT, "registry.json"), "utf8")).items.map((i) => [i.name, i]));

const write = (path, body) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, body); };
const posix = (p) => p.split("\\").join("/");
const rel = (from, to) => { const r = posix(relative(from, to)); return r.startsWith(".") ? r : `./${r}`; };
const md = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\n+/g, " ").trim();
const firstSentence = (s) => md(s).match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? md(s);
const titleize = (s) => s.replace(/(^|-)(\w)/g, (m, d, c) => `${d ? " " : ""}${c.toUpperCase()}`);

// Bank category per site section, and for everything the site does not list yet.
const SECTION = { backgrounds: "effects", buttons: "action-feedback", carousels: "content", inputs: "ai", navigation: "navigation", "text-animations": "animation" };
const BY_NAME = {
  gauge: "data-visualization", "stats-cards": "data-display", "feature-steps": "page", "how-it-works": "page",
  "invoice-card": "data-display", "orbiting-icons": "animation", "reveal-card": "effects", "svg-animation": "animation",
  "tilt-card": "surface", "stack-scroll": "scroll",
};
const NATURE = { effects: "decorative", "action-feedback": "interactive", content: "interactive", ai: "interactive", navigation: "interactive", animation: "decorative", "data-visualization": "structural", "data-display": "structural", page: "structural", surface: "interactive", scroll: "interactive" };

// ---------------------------------------------------------------- what to capture
const refs = [];
const excludedList = [];
const excluded = (example, reason) => excludedList.push({ example, reason });
const PAGES = join(REPO_ROOT, "app/components");
for (const section of readdirSync(PAGES)) {
  if (section === "animated-icons" || !statSync(join(PAGES, section)).isDirectory()) continue;
  for (const name of readdirSync(join(PAGES, section))) {
    const dir = join(PAGES, section, name);
    if (!existsSync(join(dir, "page.tsx"))) continue;
    const page = readFileSync(join(dir, "page.tsx"), "utf8");
    const meta = page.slice(page.indexOf("buildComponentMetadata("));
    const field = (k) => meta.match(new RegExp(`${k}:\\s*"([^"]*)"`))?.[1];
    const demo = readdirSync(dir).find((f) => f.endsWith("-demo.tsx"));
    refs.push({ name, status: "published", category: SECTION[section] ?? BY_NAME[name] ?? "page", title: field("title") ?? titleize(name), description: field("description"), image: field("image"), page: `${SITE}${field("pathname") ?? `/components/${section}/${name}`}`, demo: demo && join(dir, demo), props: propsOf(page), section });
  }
}
// The in-progress folder holds demos the site does not link yet; a few folder names carry typos.
const PROGRESS = join(REPO_ROOT, "app/in-progress");
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
for (const demo of walk(PROGRESS).filter((f) => f.endsWith("-demo.tsx"))) {
  const name = basename(demo, "-demo.tsx");
  const reg = registry.get(name);
  refs.push({ name, status: "in-progress", category: BY_NAME[name] ?? "effects", title: reg?.title ?? titleize(name), description: reg?.description ?? `${titleize(name)} (work in progress in the Chamaac repository).`, page: null, demo, props: [] });
}
// Registry components with no page and no demo: mount the default export as it is.
for (const name of readdirSync(join(REPO_ROOT, "registry/chamaac"))) {
  if (name === "animated-icons" || refs.some((r) => r.name === name)) continue;
  const file = readdirSync(join(REPO_ROOT, "registry/chamaac", name)).find((f) => f.endsWith(".tsx"));
  const code = file && readFileSync(join(REPO_ROOT, "registry/chamaac", name, file), "utf8");
  if (!code || !/^export default/m.test(code)) { excluded(name, "the whole file is commented out upstream; exports no component"); continue; }
  const reg = registry.get(name);
  refs.push({ name, status: "source-only", category: "effects", title: reg?.title ?? titleize(name), description: reg?.description ?? `${titleize(name)} shader background (in the Chamaac registry source, not on the site).`, page: null, component: join(REPO_ROOT, "registry/chamaac", name, file), props: [] });
}

function propsOf(page) {
  const start = page.indexOf("props={[");
  if (start < 0) return [];
  let depth = 0, i = start + "props={".length;
  for (; i < page.length; i++) { if (page[i] === "[") depth++; else if (page[i] === "]" && --depth === 0) break; }
  try { return new Function(`return ${page.slice(start + "props={".length, i + 1)}`)(); } catch { return []; }
}

// ---------------------------------------------------------------- clean slate (captures survive)
for (const cat of readdirSync(UI)) {
  if (cat === "_sources" || cat === "icons" || !statSync(join(UI, cat)).isDirectory()) continue; // icons: the chamaac-icons set
  for (const d of readdirSync(join(UI, cat))) {
    if (!d.startsWith("chamaac-")) continue;
    for (const f of readdirSync(join(UI, cat, d))) if (f !== "static" && f !== "preview.png") rmSync(join(UI, cat, d, f), { recursive: true });
  }
}
rmSync(OUT, { recursive: true, force: true });

// ---------------------------------------------------------------- import localization
const bareImports = new Set();
const copied = new Set();
const resolveFile = (base) => ["", ".ts", ".tsx", "/index.ts", "/index.tsx"].map((e) => base + e).find((p) => existsSync(p) && statSync(p).isFile());
const PUBLIC = join(REPO_ROOT, "public");

/** Root-relative public files (/images/…, /components/…) become bundled URLs into the snapshot's public/. */
function localizeAssets(code, fileDir) {
  // A JSX attribute (`src="/x.png"`) needs braces around the expression.
  return code.replace(/(=?)(["'`])\/([\w./-]+\.(?:png|jpe?g|svg|webp|gif|avif|mp4|webm|glb|gltf|hdr))\2/g, (all, eq, q, p) => {
    if (!existsSync(join(PUBLIC, p))) return all;
    cpSync(join(PUBLIC, p), join(OUT, "public", p));
    const url = `new URL(${JSON.stringify(rel(fileDir, join(OUT, "public", p)))}, import.meta.url).href`;
    return eq ? `={${url}}` : url;
  });
}

function localize(code, sourceFile, destFile) {
  const specs = [...new Set([...code.matchAll(/(?:from\s+|import\s*\(\s*|import\s+)["']([^"']+)["']/g)].map((m) => m[1]))];
  for (const spec of specs) {
    if (spec === "@/lib/utils") continue; // the viewer's alias: the same cn
    const target = spec.startsWith("@/") ? resolveFile(join(REPO_ROOT, spec.slice(2))) : spec.startsWith(".") ? resolveFile(resolve(dirname(sourceFile), spec)) : null;
    if (!target) {
      if (!spec.startsWith(".") && !spec.startsWith("@/")) bareImports.add(spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]);
      continue;
    }
    const local = join(OUT, relative(REPO_ROOT, target));
    copyModule(target, local);
    const to = rel(dirname(destFile), local).replace(/\.tsx?$/, "").replace(/\/index$/, "");
    code = code.replaceAll(`"${spec}"`, `"${to}"`).replaceAll(`'${spec}'`, `'${to}'`);
  }
  return localizeAssets(code, dirname(destFile));
}

function copyModule(source, dest) {
  if (copied.has(dest)) return;
  copied.add(dest);
  write(dest, /\.(tsx?|jsx?)$/.test(source) ? localize(readFileSync(source, "utf8"), source, dest) : readFileSync(source));
}

// ---------------------------------------------------------------- frame and styles
write(join(OUT, "frame.tsx"), `/**
 * Bank-only harness: mounts Chamaac demos on the site's stylesheet, in a box the size of its preview
 * area (full-bleed backgrounds fill it). Not part of the snapshot.
 */
import { Component, type ComponentType, type ReactNode } from "react";
import "./styles.css";

export type Example = { name: string; title: string; component: ComponentType };

class Guard extends Component<{ children: ReactNode }, { error?: string }> {
  state: { error?: string } = {};
  static getDerivedStateFromError(e: Error) { return { error: e.message }; }
  render() { return this.state.error ? <pre data-bank-error style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{this.state.error}</pre> : this.props.children; }
}

export function ChamaacFrame({ examples }: { examples: Example[] }) {
  const Example = examples[0].component;
  // The capture tool enumerates examples through this list.
  (window as any).__bankExamples = examples.map((e) => e.name);
  return (
    <div data-bank-frame className="bg-background text-foreground antialiased" style={{ width: "100%", minHeight: "100vh", boxSizing: "border-box", padding: 24 }}>
      <div data-bank-example={examples[0].name} className="relative flex min-h-[500px] w-full items-center justify-center overflow-hidden rounded-xl border border-border">
        <Guard><Example /></Guard>
      </div>
    </div>
  );
}
`);
{
  const globals = readFileSync(join(REPO_ROOT, "app/globals.css"), "utf8").replace(/^@source .*\n?/gm, "");
  const sources = `@source "./**/*.{ts,tsx}";\n@source "../../**/chamaac-*/{src,upstream}/**/*.{ts,tsx}";\n`;
  const ua = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";
  // The site loads these with next/font/google and exposes them as CSS variables.
  const FONTS = [["Space Grotesk", "--font-space-grotesk", "wght@300..700"], ["Geist Mono", "--font-geist-mono", "wght@100..900"], ["Instrument Serif", "--font-instrument-serif", "ital@0;1"]];
  let fonts = "";
  for (const [family, , axes] of FONTS) {
    const text = await fetch(`https://fonts.googleapis.com/css2?family=${family.replaceAll(" ", "+")}:${axes}&display=swap`, { headers: { "user-agent": ua } }).then((r) => r.text());
    for (const block of text.split("}").filter((b) => b.includes("@font-face") && /\/\* latin \*\//.test(b))) {
      const url = block.match(/url\((https:[^)]+)\)/)[1];
      const file = `${family.toLowerCase().replaceAll(" ", "-")}-${basename(new URL(url).pathname)}`;
      write(join(OUT, "fonts", file), Buffer.from(await fetch(url).then((r) => r.arrayBuffer())));
      fonts += `${block.replace(url, `./fonts/${file}`).trim()}\n}\n`;
    }
  }
  write(join(OUT, "fonts.css"), `/* Space Grotesk, Geist Mono, Instrument Serif (OFL), latin subset, localized. */\n${fonts}:root {\n${FONTS.map(([f, v]) => `  ${v}: "${f}";`).join("\n")}\n}\n`);
  write(join(OUT, "tailwind.css"), `/* The site's app/globals.css over this snapshot. */\n${globals.replace(/(@import "tailwindcss";)/, `$1\n${sources}@import "./fonts.css";`)}`);
}

// ---------------------------------------------------------------- references
const entries = [];
for (const ref of refs) {
  const dir = join(UI, ref.category, `chamaac-${ref.name}`);
  const srcDir = join(dir, "upstream");
  const id = `${ref.category}/chamaac-${ref.name}`;
  const nature = NATURE[ref.category] ?? "structural";
  const use = firstSentence(ref.description ?? titleize(ref.name));
  let entryPoint;
  if (ref.demo) {
    const example = join(srcDir, "examples", basename(ref.demo));
    write(example, localize(readFileSync(ref.demo, "utf8"), ref.demo, example));
    const exportName = readFileSync(ref.demo, "utf8").match(/export default function (\w+)/)?.[1] ?? readFileSync(ref.demo, "utf8").match(/export default (\w+);/)?.[1];
    if (!exportName) { excluded(ref.name, "demo exports no default component"); rmSync(dir, { recursive: true, force: true }); continue; }
    write(join(srcDir, "demo.tsx"), `import Example from "./examples/${basename(ref.demo, ".tsx")}";
import { ChamaacFrame } from "${rel(srcDir, join(OUT, "frame"))}";

const examples = [{ name: "${ref.name}", title: ${JSON.stringify(ref.title)}, component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
`);
    entryPoint = `upstream/examples/${basename(ref.demo)}`;
  } else {
    const local = join(OUT, relative(REPO_ROOT, ref.component));
    copyModule(ref.component, local);
    write(join(srcDir, "demo.tsx"), `import Component from "${rel(srcDir, local).replace(/\.tsx$/, "")}";
import { ChamaacFrame } from "${rel(srcDir, join(OUT, "frame"))}";

// No demo upstream: the component with its default props, filling the preview box.
const examples = [{ name: "${ref.name}", title: ${JSON.stringify(ref.title)}, component: () => <div className="absolute inset-0"><Component /></div> }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
`);
    entryPoint = `ui/_sources/chamaac/${posix(relative(REPO_ROOT, ref.component))}`;
  }
  // The site's own preview image, when it has a raster one.
  const sitePreview = Boolean(ref.image && /\.png$/.test(ref.image) && existsSync(join(PUBLIC, ref.image)));
  if (sitePreview) copyFileSync(join(PUBLIC, ref.image), join(dir, "preview.png"));
  const reg = registry.get(ref.name);
  const componentFiles = (reg?.files ?? []).map((f) => `ui/_sources/chamaac/${f.path}`).filter((f) => existsSync(join(UI, "..", f)));
  write(join(dir, "reference.tsx"), `/* Use when: ${use.replaceAll("*/", "* /")} */\n\nexport { default } from "./upstream/demo";\n`);
  const deps = reg?.dependencies ?? [];
  write(join(dir, "README.md"), `# ${ref.title}

${md(ref.description)}${ref.status === "published" ? "" : `\n\n> ${ref.status === "in-progress" ? "Work in progress in the Chamaac repository (`app/in-progress/`); not on the site yet." : "In the Chamaac registry source but not on the site and without a demo; the bank mounts it with its default props."}`}

## Classification

- Category: \`${ref.category}\` — ${nature}
- Medium: React + TypeScript + Tailwind CSS v4${deps.includes("three") ? " + three.js (@react-three/fiber, GLSL shaders)" : deps.includes("motion") || /motion/.test(readFileSync(ref.demo ?? ref.component, "utf8")) ? " + Motion" : ""}; static HTML
- Framework: react
- Entry point: \`${entryPoint}\`
- Nature: ${nature}; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: ${ADDED}
- Curation: pending
- Use when: ${use}
- Provides: ${ref.title}
- Requires: ${deps.length ? deps.map((d) => `\`${d}\``).join(", ") : "React and Tailwind v4"}
- Variants: default
- Upstream: Chamaac UI · ${ref.status}
${reg ? `- Preferred install: \`npx shadcn@latest add ${SITE}/r/${ref.name}.json\`\n- Registry: ${SITE}/r/${ref.name}.json\n` : ""}- Local source fallback: \`${componentFiles[0] ?? entryPoint}\`

## How an agent uses this reference

- **React + Tailwind target** — ${reg ? `install from the registry above, or ` : ""}copy the component from \`ui/_sources/chamaac/\` and the demo from \`upstream/examples/\`, changing only import paths.
- **Any other stack** — \`static/${ref.name}.html\` is the rendered DOM against \`ui/_sources/chamaac/styles.css\`.${deps.includes("three") ? " Shader backgrounds draw on a canvas at runtime: port the GLSL from the component source, not the markup." : ""}
${ref.props.length ? `
## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
${ref.props.map((p) => `| \`${md(p.name)}\` | \`${md(p.type)}\` | ${p.default === undefined || p.default === "" ? "—" : `\`${md(p.default)}\``} | ${md(p.description)} |`).join("\n")}
` : ""}
## Files

${componentFiles.map((f) => `- \`${f}\` — the component as the registry installs it`).join("\n")}${componentFiles.length ? "\n" : ""}${ref.demo ? `- \`upstream/examples/${basename(ref.demo)}\` — the site's demo\n` : ""}- \`upstream/demo.tsx\` — bank harness
- \`reference.tsx\` — dashboard entry point

Upstream page: ${ref.page ?? `${REPO}/tree/main/${posix(relative(REPO_ROOT, dirname(ref.demo ?? ref.component)))}`}
`);
  write(join(dir, "SOURCE.md"), `# Source

- Site: ${ref.page ?? SITE}
- Repository: ${REPO}
- Captured commit: \`${COMMIT}\`
- License: MIT (\`ui/_sources/chamaac/LICENSE.md\`)
- Captured: ${ADDED}

${ref.demo ? `Demo from \`${posix(relative(REPO_ROOT, ref.demo))}\`` : `Component \`${posix(relative(REPO_ROOT, ref.component))}\``}; files are verbatim apart from \`@/…\` import paths and public file URLs, which point into \`ui/_sources/chamaac/\`.
`);
  entries.push({ id, page: null, clip: "[data-bank-example]", captured: [ref.name], kind: ref.status, preview: sitePreview ? "site" : "bank" });
}

// Registry files every reference should carry, even when its demo imports a local copy.
for (const reg of registry.values()) for (const f of reg.files) if (!f.path.includes("animated-icons") && existsSync(join(REPO_ROOT, f.path))) copyModule(join(REPO_ROOT, f.path), join(OUT, f.path));

// Drop references that no longer exist upstream.
for (const cat of readdirSync(UI)) {
  if (cat === "_sources" || cat === "icons" || !statSync(join(UI, cat)).isDirectory()) continue; // icons: the chamaac-icons set
  for (const d of readdirSync(join(UI, cat))) if (d.startsWith("chamaac-") && !existsSync(join(UI, cat, d, "reference.tsx"))) rmSync(join(UI, cat, d), { recursive: true });
}

execFileSync(process.execPath, [join(ROOT, "node_modules/@tailwindcss/cli/dist/index.mjs"), "-i", join(OUT, "tailwind.css"), "-o", join(OUT, "styles.css")], { stdio: "ignore", cwd: ROOT });
cpSync(join(REPO_ROOT, "LICENSE"), join(OUT, "LICENSE.md"));
write(join(OUT, "manifest.json"), JSON.stringify({ commit: COMMIT, captured: ADDED, entries }, null, 2) + "\n");
const count = (s) => refs.filter((r) => r.status === s && entries.some((e) => e.id.endsWith(`/chamaac-${r.name}`))).length;
write(join(OUT, "SOURCE.md"), `# Chamaac UI

- Site: ${SITE}
- Repository: ${REPO}
- Captured commit: \`${COMMIT}\`
- License: MIT — \`LICENSE.md\`
- Captured: ${ADDED}
- Importer: \`node tools/import-chamaac.mjs <chamaacui checkout>\`, then \`node tools/capture-bank.mjs --source chamaac --static --previews\`
- Animated icons: the \`chamaac-icons\` icon set (\`tools/import-animated-icons.mjs\`)

## Contents

- \`registry/chamaac/\`, \`app/\`, \`components/\` — the repository modules the demos reach, same paths as upstream
- \`styles.css\` — Tailwind v4 build of \`tailwind.css\` (the site's \`app/globals.css\`) over this snapshot
- \`frame.tsx\` — bank-only React harness; \`manifest.json\` — every captured entry
- \`public/\`, \`fonts/\` — the images the components use, and the site's fonts, localized

## Counts

- On the site: ${count("published")}
- In progress (\`app/in-progress/\`): ${count("in-progress")}
- Registry source only, no demo: ${count("source-only")}

## Excluded

${excludedList.map((e) => `- \`${e.example}\` — ${e.reason}`).join("\n") || "- nothing"}
`);

console.log(JSON.stringify({ references: entries.length, sitePreviews: entries.filter((e) => e.preview === "site").length, excluded: excludedList, bareImports: [...bareImports].sort() }, null, 2));
