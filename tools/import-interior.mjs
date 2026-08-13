#!/usr/bin/env node

import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";

const [sourceArg] = process.argv.slice(2);
if (!sourceArg) throw new Error("usage: node tools/import-interior.mjs /path/to/interior");

const root = process.cwd();
const source = resolve(sourceArg);
const registry = readFileSync(join(source, "lib/registry.ts"), "utf8");
const commit = readFileSync(join(source, ".git/HEAD"), "utf8").trim().startsWith("ref:")
  ? readFileSync(join(source, ".git", readFileSync(join(source, ".git/HEAD"), "utf8").trim().slice(5)), "utf8").trim()
  : readFileSync(join(source, ".git/HEAD"), "utf8").trim();

const categoryNames = [...registry.matchAll(/\[\n\s+"(\d{2})",\n\s+"([^"]+)",\n\s+\[/g)]
  .map((match) => [match[1], match[2]]);
const rows = [...registry.matchAll(/\["(\d{2})\.(\d+)", "([^"]+)", "([^"]+)", "([^"]+)"\]/g)];
const categoryById = new Map(categoryNames);

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const sourceRoot = join(root, "ui/_sources/interior-dev");
mkdirSync(sourceRoot, { recursive: true });
cpSync(join(source, "LICENSE"), join(sourceRoot, "LICENSE"));
cpSync(join(source, "DESIGN.md"), join(sourceRoot, "DESIGN.md"));
cpSync(join(source, "public/demo"), join(sourceRoot, "demo"), { recursive: true });

const site = "https://www.interior.dev";
const docsHtml = await fetch(`${site}/docs`).then((response) => {
  if (!response.ok) throw new Error(`Unable to fetch interior.dev docs: ${response.status}`);
  return response.text();
});
const cssHrefs = [...docsHtml.matchAll(/href="([^"]+\.css\?[^"]+)"/g)].map((match) => match[1]);
const cssChunks = await Promise.all(
  [...new Set(cssHrefs)].map(async (href) => {
    const cssUrl = new URL(href, site);
    const response = await fetch(cssUrl);
    if (!response.ok) throw new Error(`Unable to fetch ${cssUrl}: ${response.status}`);
    return { cssUrl, text: await response.text() };
  }),
);
const fontsDir = join(sourceRoot, "fonts");
mkdirSync(fontsDir, { recursive: true });
let sharedCss = "";
for (const chunk of cssChunks) {
  let css = chunk.text;
  const fontRefs = [...css.matchAll(/url\(([^)]+\.woff2[^)]*)\)/g)];
  for (const match of fontRefs) {
    const raw = match[1].replace(/["']/g, "");
    const fontUrl = new URL(raw, chunk.cssUrl);
    const filename = basename(fontUrl.pathname);
    const response = await fetch(fontUrl);
    if (!response.ok) throw new Error(`Unable to fetch ${fontUrl}: ${response.status}`);
    writeFileSync(join(fontsDir, filename), Buffer.from(await response.arrayBuffer()));
    css = css.replaceAll(match[1], `"./fonts/${filename}"`);
  }
  sharedCss += `${css}\n`;
}
writeFileSync(join(sourceRoot, "styles.css"), sharedCss);

const avatarIds = [47, 12, 32, 60, 15, 26, 68, 5];
const avatarsDir = join(sourceRoot, "avatars");
mkdirSync(avatarsDir, { recursive: true });
for (const id of avatarIds) {
  const response = await fetch(`https://i.pravatar.cc/96?img=${id}`);
  if (!response.ok) throw new Error(`Unable to fetch avatar ${id}: ${response.status}`);
  writeFileSync(join(avatarsDir, `${id}.jpg`), Buffer.from(await response.arrayBuffer()));
}

writeFileSync(join(sourceRoot, "SOURCE.md"), `# interior.dev source snapshot

- Upstream: https://www.interior.dev/docs
- Repository: https://github.com/ddoemonn/interior
- Captured commit: \`${commit}\`
- Captured: 2026-08-12
- License: MIT (see \`LICENSE\`)

This directory holds the shared visual source material used by all interior.dev entries. Each
entry retains its self-contained copy-paste component and the upstream live demo. The bank treats
these files as a pinned source snapshot, not as a package.
`);

for (const row of rows) {
  const [, categoryId, sheet, slug, name, blurb] = row;
  const categoryName = categoryById.get(categoryId);
  const category = slugify(categoryName);
  const dir = join(root, "ui", category, slug);
  const srcDir = join(dir, "src");
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(srcDir, { recursive: true });

  cpSync(join(source, `components/interior/${slug}.tsx`), join(srcDir, `${slug}.tsx`));
  let demo = readFileSync(join(source, `lib/demos/${slug}-demo.tsx`), "utf8")
    .replace(new RegExp(`@/components/interior/${slug}`, "g"), `./${slug}`)
    .replaceAll('"/demo/', '"/ui/_sources/interior-dev/demo/')
    .replace(
      'const face = (n: number) => `https://i.pravatar.cc/96?img=${n}`;',
      'const face = (n: number) => `/ui/_sources/interior-dev/avatars/${n}.jpg`;',
    );
  if (slug === "blur-up-image") {
    demo = demo
      .replace(
        'import { BlurUpImage } from "./blur-up-image";',
        'import { BlurUpImage } from "./blur-up-image";\nimport PHOTO from "../../../_sources/interior-dev/demo/hillside-castle.jpg?url";',
      )
      .replace('const PHOTO = "/ui/_sources/interior-dev/demo/hillside-castle.jpg";\n\n', "");
  }
  if (slug === "lightbox") {
    demo = demo
      .replace(
        'import { Lightbox } from "./lightbox";',
        'import { Lightbox } from "./lightbox";\nimport PHOTO from "../../../_sources/interior-dev/demo/river-valley.jpg?url";',
      )
      .replace('const PHOTO = "/ui/_sources/interior-dev/demo/river-valley.jpg";\n\n', "");
  }
  const demoExport = [...demo.matchAll(/export function\s+(\w+Demo)\s*\(/g)][0]?.[1];
  if (!demoExport) throw new Error(`No demo export for ${slug}`);
  writeFileSync(join(srcDir, "demo.tsx"), demo);
  writeFileSync(join(dir, "reference.tsx"), `/* Use when: ${blurb}. */\n\nimport "../../_sources/interior-dev/styles.css";\nexport { ${demoExport} as default } from "./src/demo";\n`);
  writeFileSync(join(dir, "README.md"), `# ${name}

${blurb}.

## Classification

- Category: \`${category}\` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: \`src/${slug}.tsx\`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- \`src/${slug}.tsx\` — self-contained hook and styled component
- \`src/demo.tsx\` — upstream replayable documentation demo
- \`reference.tsx\` — dashboard entry point

Upstream page: https://www.interior.dev/docs/${slug}
`);
  writeFileSync(join(dir, "SOURCE.md"), `# Source

- Site: https://www.interior.dev/docs/${slug}
- Repository: https://github.com/ddoemonn/interior
- Captured commit: \`${commit}\`
- Upstream sheet: \`${categoryId}.${sheet}\` (${categoryName})
- License: MIT

The component and demo are retained verbatim apart from local import paths and local demo-asset
URLs. They are a pinned source snapshot, not an installable package.
`);
}

console.log(`Imported ${rows.length} interior.dev components at ${commit}.`);
