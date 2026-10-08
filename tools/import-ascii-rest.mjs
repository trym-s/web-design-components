#!/usr/bin/env node
/** Capture ascii.rest except language and company logos; preserve distro pieces. */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(import.meta.dirname, "..");
const UPSTREAM = resolve(process.argv[2] ?? join(ROOT, ".cache/ascii-rest/upstream"));
const COMMIT = "813ea2a233b56cc1c67a00d1e65ded21845ed1cd";
const REPO = "https://github.com/bas3line/ascii";
const SITE = "https://ascii.rest";
const SHARED = join(ROOT, "ui/_sources/ascii-rest");
const FONT_VERSION = "5.3.0";
const previous = existsSync(join(SHARED, "manifest.json")) ? JSON.parse(readFileSync(join(SHARED, "manifest.json"), "utf8")) : null;
const ADDED = previous?.commit === COMMIT ? previous.captured : new Date().toISOString().replace(/\.\d+Z$/, "Z");
const write = (path, data) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, data); };
const rel = (from, to) => { const p = relative(from, to).replaceAll("\\", "/"); return p.startsWith(".") ? p : `./${p}`; };
const run = (args, cwd = ROOT) => execFileSync(args[0], args.slice(1), { cwd, encoding: "utf8" }).trim();
if (run(["git", "rev-parse", "HEAD"], UPSTREAM) !== COMMIT) throw new Error(`Checkout must be pinned to ${COMMIT}`);

const inventory = [];
for (const file of readdirSync(join(UPSTREAM, "src/pieces")).filter((p) => p.endsWith(".ts") && p !== "index.ts").sort()) {
  const { meta } = await import(pathToFileURL(join(UPSTREAM, "src/pieces", file)));
  inventory.push({ slug: file.slice(0, -3), source: `src/pieces/${file}`, ...meta });
}
const excluded = inventory.filter((p) => ["logos", "companies"].includes(p.category));
const included = inventory.filter((p) => !["logos", "companies"].includes(p.category));
let live = previous?.commit === COMMIT ? previous.liveInventory : null;
if (!live) {
  const response = await fetch(`${SITE}/`);
  if (!response.ok) throw new Error(`Live catalog: ${response.status}`);
  live = [...new Set([...(await response.text()).matchAll(/data-piece="([^"]+)"/g)].map((m) => m[1]))].sort();
}
if (included.some((p) => !live.includes(p.slug)) || live.some((slug) => !inventory.some((p) => p.slug === slug))) throw new Error("Live catalog and pinned source disagree");

const categories = { distros: "icons", scenes: "effects", effects: "effects", generative: "effects", type: "typography", data: "data-visualization", ui: "data-display" };
const entries = included.map((p) => ({ ...p, upstreamCategory: p.category, category: categories[p.category] ?? "animation", id: p.category === "distros" ? `icons/ascii-rest/${p.slug}` : `${categories[p.category] ?? "animation"}/ascii-rest-${p.slug}`, page: `${SITE}/${p.slug}/`, clip: ".well.big", captured: ["default"] }));

for (const file of ["types.ts", "mount.ts", "react.tsx", "index.ts", "terminal.ts"]) write(join(SHARED, "src", file), readFileSync(join(UPSTREAM, "src", file)));
write(join(SHARED, "src/cli.ts"), readFileSync(join(UPSTREAM, "src/cli.ts"), "utf8").replace("../package.json", "../manifest.json"));
write(join(SHARED, "LICENSE"), readFileSync(join(UPSTREAM, "LICENSE")));
cpSync(join(UPSTREAM, "site/public/fonts"), join(SHARED, "fonts"), { recursive: true });
write(join(SHARED, "src/ascii.ts"), readFileSync(join(UPSTREAM, "src/ascii.ts"), "utf8").replace("url(https://ascii.rest/fonts/ascii-rest-mono.woff2)", `url(' + new URL("../fonts/ascii-rest-mono.woff2", import.meta.url).href + ')`));
write(join(SHARED, "src/astro/Ascii.astro"), readFileSync(join(UPSTREAM, "src/astro/Ascii.astro"), "utf8").replaceAll("../../dist/", "../").replaceAll("library.js", "library.ts").replaceAll("mount.js", "mount.ts").replaceAll("types.js", "types.ts").replaceAll("ascii.js", "ascii.ts").replaceAll("https://ascii.rest/fonts/ascii-rest-mono.woff2", "../../fonts/ascii-rest-mono.woff2"));

// Download the site's IBM Plex Mono family without changing installed dependencies.
const fontCache = join(ROOT, ".cache/ascii-rest/ibm-plex-mono");
const fontPackage = join(fontCache, "package");
const fontMetadata = await fetch(`https://registry.npmjs.org/@fontsource/ibm-plex-mono/${FONT_VERSION}`).then((r) => { if (!r.ok) throw new Error(`Font package: ${r.status}`); return r.json(); });
if (!existsSync(join(fontPackage, "LICENSE"))) {
  const bytes = Buffer.from(await fetch(fontMetadata.dist.tarball).then((r) => { if (!r.ok) throw new Error(`Font download: ${r.status}`); return r.arrayBuffer(); }));
  const [algorithm, digest] = fontMetadata.dist.integrity.split("-");
  if (createHash(algorithm).update(bytes).digest("base64") !== digest) throw new Error("Font package integrity mismatch");
  write(join(fontCache, "font.tgz"), bytes);
  run(["tar", "-xzf", join(fontCache, "font.tgz"), "-C", fontCache]);
}
for (const weight of [400, 500]) write(join(SHARED, "fonts", `ibm-plex-mono-latin-${weight}-normal.woff2`), readFileSync(join(fontPackage, "files", `ibm-plex-mono-latin-${weight}-normal.woff2`)));
write(join(SHARED, "fonts/IBM-Plex-Mono-LICENSE"), readFileSync(join(fontPackage, "LICENSE")));
write(join(SHARED, "fonts/SOURCE.md"), `# Fonts\n\n- ascii.rest mono: upstream JetBrains Mono subset; SIL OFL 1.1 in \`OFL.txt\`; pinned with ${COMMIT}.\n- IBM Plex Mono: \`@fontsource/ibm-plex-mono@${FONT_VERSION}\`, Latin normal weights 400 and 500; SIL OFL 1.1 in \`IBM-Plex-Mono-LICENSE\`.\n- Font package: ${fontMetadata.dist.tarball}\n- Integrity: \`${fontMetadata.dist.integrity}\`\n\nAll runtime font URLs are local and emitted by Vite.\n`);

write(join(SHARED, "frame.css"), `@font-face{font-family:"IBM Plex Mono";src:url("./fonts/ibm-plex-mono-latin-400-normal.woff2") format("woff2");font-style:normal;font-weight:400;font-display:swap}
@font-face{font-family:"IBM Plex Mono";src:url("./fonts/ibm-plex-mono-latin-500-normal.woff2") format("woff2");font-style:normal;font-weight:500;font-display:swap}
@font-face{font-family:"ascii.rest mono";src:url("./fonts/ascii-rest-mono.woff2") format("woff2");unicode-range:U+00B0,U+00B7,U+2022,U+2500-259F,U+25CF;font-display:swap}
.ascii-rest-frame{box-sizing:border-box;width:100%;max-width:960px;container-type:inline-size;display:grid;place-items:center;color:#c9cfd9;background:#131518}
.ascii-rest-frame pre{margin:0;padding:0;border:0;font-family:"IBM Plex Mono","ascii.rest mono",ui-monospace,monospace;font-size:min(16px,calc(100cqw / var(--cols) / .6));line-height:1.2;letter-spacing:0;white-space:pre;font-variant-ligatures:none;overflow:visible}
.ascii-rest-frame canvas{display:block;width:100%}
`);
write(join(SHARED, "frame.tsx"), `/** Bank harness; the captured renderer and piece control their own motion. */
import { Ascii } from "./src/react";
import type { Piece } from "./src/types";
import type { CSSProperties } from "react";
import "./frame.css";
export default function Frame({ piece, size, mono = false }: { piece: Piece; size?: number; mono?: boolean }) {
  return <div className="ascii-rest-frame" data-bank-frame data-bank-example="default" style={{ "--cols": piece.meta.cols, background: piece.meta.ground ?? "#131518", ...(size ? { width: size } : {}) } as CSSProperties}>
    <Ascii piece={piece} mono={mono} />
  </div>;
}
`);

for (const entry of entries) {
  const dir = join(ROOT, "ui", entry.id);
  const sourceFile = join(dir, "src", `${entry.slug}.ts`);
  const raw = readFileSync(join(UPSTREAM, entry.source), "utf8");
  write(sourceFile, raw.replace('"../types.ts"', JSON.stringify(rel(dirname(sourceFile), join(SHARED, "src/types.ts")))));
  const use = `a terminal-style page needs ${entry.note}.`;
  const demo = `import * as piece from "./${entry.slug}";\nimport Frame from ${JSON.stringify(rel(join(dir, "src"), join(SHARED, "frame")))};\nexport default function Demo() { return <Frame piece={piece} />; }\n`;
  write(join(dir, "src/demo.tsx"), demo);
  write(join(dir, "reference.tsx"), `/* Use when: ${use} */\nexport { default } from "./src/demo";\n`);
  const nature = entry.clock ? "functional" : "decorative";
  write(join(dir, "README.md"), `# ${entry.name}\n\n${entry.note}.\n\n## Classification\n\n- Category: \`${entry.category}\` — ${nature}\n- Medium: TypeScript ASCII frames + ${entry.palette ? "Canvas 2D" : "monospace text"}; React demo\n- Framework: react\n- Entry point: \`src/demo.tsx\`\n- Nature: ${nature}\n- Added: ${ADDED}\n- Curation: pending\n- Use when: ${use}\n- Avoid when: the visual would substitute for a usable control or a real data source.\n- Provides: ${entry.note}; ${entry.cols}×${entry.rows} cells at ${entry.fps} fps${entry.clock ? "; reads the local clock" : ""}.\n- Requires: the local ascii.rest snapshot; React for this demo, browser DOM for playback.\n- Availability: public\n- Variants: ${entry.upstreamCategory === "distros" ? "default, mono" : "default"}\n- Upstream category: ${entry.upstreamCategory}\n- Local source: \`src/${entry.slug}.ts\`\n\n## Files\n\n- \`src/${entry.slug}.ts\`: captured piece; only its type import points to the shared snapshot.\n- \`src/demo.tsx\`: minimal replay of the upstream default options.\n- \`reference.tsx\`: dashboard entry point.\n- \`preview.png\`: Chromium capture of the original component page.\n- Shared renderer, adapters, font files and licenses: \`ui/_sources/ascii-rest/\`.\n\n## Use\n\nThe piece exports \`meta\` and a factory returning \`frame(t, env)\`. Use the shared \`mount\` with a \`pre\` or \`canvas\`, or copy the React / HTML / Astro adapter and local font assets when adapting to a project. Preserve upstream defaults and reduced-motion behavior. The data and form animations are visual demonstrations, not live services or operable forms.\n\nUpstream page: ${entry.page}\n`);
  write(join(dir, "SOURCE.md"), `# Source\n\n- Site: ${entry.page}\n- Repository: ${REPO}\n- Source path: \`${entry.source}\`\n- Captured commit: \`${COMMIT}\`\n- Capture date: ${ADDED}\n- License: MIT — \`ui/_sources/ascii-rest/LICENSE\`\n- Upstream category: ${entry.upstreamCategory}\n\nPinned source snapshot. Only the type import is localized; piece behavior, palette, defaults and timing are preserved. ${entry.upstreamCategory === "distros" ? "Original icon attribution and trademark notices remain in the captured file. " : ""}Fonts retain their own SIL OFL licenses. Runtime playback uses local files without contacting the upstream site.\n`);
  if (entry.upstreamCategory === "distros") {
    const icon = join(SHARED, "src", `${entry.slug}.tsx`);
    write(icon, `import * as piece from ${JSON.stringify(rel(dirname(icon), sourceFile).replace(/\.ts$/, ""))};\nimport Frame from "../frame";\nexport default function Icon({ size = 64, animation }: { size?: number; animation?: string }) { return <Frame piece={piece} size={size} mono={animation === "mono"} />; }\n`);
  }
}
write(join(SHARED, "src/library.ts"), `// Scope-filtered index generated by tools/import-ascii-rest.mjs.\nimport type { Piece } from "./types.ts";\nexport const load = {\n${entries.map((p) => `  ${JSON.stringify(p.slug)}: () => import(${JSON.stringify(rel(join(SHARED, "src"), join(ROOT, "ui", p.id, "src", `${p.slug}.ts`)))}),`).join("\n")}\n} satisfies Record<string, () => Promise<Piece>>;\nexport type PieceName = keyof typeof load;\nexport const names = Object.keys(load) as PieceName[];\nexport const canvas: ReadonlySet<PieceName> = new Set<PieceName>(${JSON.stringify(entries.filter((p) => p.palette).map((p) => p.slug))});\nexport const isPiece = (name: string): name is PieceName => Object.hasOwn(load, name);\n`);
write(join(SHARED, "manifest.json"), JSON.stringify({ site: SITE, repository: REPO, commit: COMMIT, version: JSON.parse(readFileSync(join(UPSTREAM, "package.json"), "utf8")).version, captured: ADDED, count: entries.length, liveInventory: live, entries, excluded: excluded.map((p) => ({ slug: p.slug, category: p.category, reason: "Language and company logos excluded by user scope" })) }, null, 2) + "\n");
const counts = Object.fromEntries([...new Set(entries.map((p) => p.upstreamCategory))].sort().map((c) => [c, entries.filter((p) => p.upstreamCategory === c).length]));
write(join(SHARED, "SOURCE.md"), `# ascii.rest\n\n- Site: ${SITE}/\n- Repository: ${REPO}\n- Captured commit: \`${COMMIT}\`\n- Capture date: ${ADDED}\n- License: MIT — \`LICENSE\`; local fonts have their own SIL OFL notices under \`fonts/\`.\n- Importer: \`node tools/import-ascii-rest.mjs .cache/ascii-rest/upstream\`\n- Previews: \`node tools/capture-bank.mjs --source ascii-rest --previews\`\n\n## Inventory\n\n${Object.entries(counts).map(([c, n]) => `- ${c}: ${n}`).join("\n")}\n\n${entries.length} captured references, including all ${counts.distros} distro pieces. The live site and pinned repository agree on ${live.length} published pieces. Per-piece paths, options, dependencies, dimensions and upstream documentation are recorded in \`manifest.json\`.\n\n## Excluded\n\n- ${excluded.filter((p) => p.category === "logos").length} language logos (upstream \`logos\`).\n- ${excluded.filter((p) => p.category === "companies").length} company logos (upstream \`companies\`).\n\n## Snapshot boundary\n\nPiece source is retained per reference, with only its type import rewritten. \`src/mount.ts\`, \`src/react.tsx\`, \`src/types.ts\`, \`src/index.ts\` and \`src/terminal.ts\` are unchanged. \`src/cli.ts\` reads its captured version from \`manifest.json\`. The library index includes only the requested pieces. The HTML and Astro adapters use local font paths; the Astro adapter points to captured TypeScript instead of package build output. \`frame.tsx\`, \`frame.css\` and the distro React wrappers are bank-only harnesses. Distro attribution notices remain intact. Every default demo runs offline after the bank is loaded.\n\n## Terminal playback\n\nRun from the bank repository root on Aletheia; no install or upstream connection is needed:\n\n\`\`\`sh\nnode ui/_sources/ascii-rest/src/cli.ts list\nnode ui/_sources/ascii-rest/src/cli.ts donut\nnode ui/_sources/ascii-rest/src/cli.ts ubuntu\nnode ui/_sources/ascii-rest/src/cli.ts night-coast\n\`\`\`\n\nAny key stops playback. \`--mono\` uses the terminal's own ink; \`--light\` selects light-background shading; \`--seconds\` bounds playback. A pipe prints the first frame. Coloured square-cell scenes pair rows into Unicode half blocks with ANSI truecolor; a wide terminal shows the full scene. The piece list contains only the captured scope.\n`);
console.log(JSON.stringify({ imported: entries.length, distros: counts.distros, excluded: excluded.length, commit: COMMIT, counts }, null, 2));
