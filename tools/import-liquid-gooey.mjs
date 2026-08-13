import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const REPOSITORY = "https://github.com/Jakubantalik/Libraries.git";
const COMMIT = "1dc861997d1987def44c191638cd245d7dbeec06";
const CAPTURED = "2026-08-12";
const ROOT = resolve(import.meta.dirname, "..");

const entries = [
  { demo: "PlusMenu", category: "navigation", slug: "gooey-plus-menu", title: "Gooey plus menu", effect: "Morph", assets: [] },
  { demo: "Tabs", category: "navigation", slug: "gooey-tabs", title: "Gooey tabs", effect: "Move", assets: [] },
  { demo: "Chips", category: "gesture", slug: "gooey-avatar-group", title: "Gooey avatar group", effect: "Morph + dissolve", assets: ["avatars", "drag-me-arrow.svg"] },
  { demo: "Cards", category: "gesture", slug: "gooey-melting-cards", title: "Gooey melting cards", effect: "Morph + dissolve", assets: ["avatars/avatar-5.png", "avatars/avatar-6.png"] },
  { demo: "EmailInput", category: "input", slug: "gooey-email-input", title: "Gooey email input", effect: "Morph", assets: [] },
  { demo: "Slider", category: "gesture", slug: "gooey-liquid-slider", title: "Gooey liquid slider", effect: "Move", assets: [] },
];

function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, encoding: "utf8", stdio: "pipe" });
  if (result.status !== 0) throw new Error(`${command} ${args.join(" ")} failed:\n${result.stderr}`);
}

function copy(source, target) {
  mkdirSync(resolve(target, ".."), { recursive: true });
  cpSync(source, target, { recursive: true });
}

const work = mkdtempSync(join(tmpdir(), "liquid-gooey-import-"));
const checkout = join(work, "Libraries");

try {
  run("git", ["clone", "--quiet", "--filter=blob:none", REPOSITORY, checkout], ROOT);
  run("git", ["checkout", "--quiet", COMMIT], checkout);

  const packageRoot = join(checkout, "packages/liquid-gooey");
  const siteRoot = join(checkout, "sites/gooey");
  const shared = join(ROOT, "ui/_sources/liquid-gooey");
  rmSync(shared, { recursive: true, force: true });
  mkdirSync(shared, { recursive: true });
  for (const name of ["LICENSE", "README.md", "package.json", "src", "design"]) copy(join(packageRoot, name), join(shared, name));
  copy(join(siteRoot, "playground/styles.css"), join(shared, "styles.css"));
  copy(join(siteRoot, "playground/demo.css"), join(shared, "demo.css"));
  copy(join(siteRoot, "playground/assets"), join(shared, "assets"));
  copy(join(siteRoot, "public/og-image.jpg"), join(shared, "og-image.jpg"));

  writeFileSync(join(shared, "SOURCE.md"), `# Liquid Gooey source snapshot

- Upstream site: https://gooey.jakubantalik.com/
- Repository: ${REPOSITORY}
- Captured commit: \`${COMMIT}\`
- Captured: ${CAPTURED}
- Package: \`liquid-gooey@0.1.0\`
- License: MIT (see \`LICENSE\`)
- Runtime: React 18+; no runtime network dependency

The live catalog and pinned repository agree on six public demos. The published engine exposes
\`Liquid\` and \`Liquid.Item\`; its complete TypeScript source is retained in \`src/\`. Shared site
CSS and all avatar/icon/image assets consumed by the demos are local in this directory.

| Demo | Effect | Bank entry |
| --- | --- | --- |
${entries.map(e => `| ${e.title} | ${e.effect} | \`ui/${e.category}/${e.slug}\` |`).join("\n")}

Excluded from the component count: \`ApiTest.tsx\` is an internal API test harness, while
\`App.tsx\` and \`DemoPage.tsx\` are composite catalog/marketing pages. They do not publish
additional components. The site has no sitemap or robots inventory; both paths return the SPA.
`);

  for (const entry of entries) {
    const dir = join(ROOT, "ui", entry.category, entry.slug);
    const previewPath = join(dir, "preview.png");
    const existingPreview = existsSync(previewPath) ? readFileSync(previewPath) : null;
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(join(dir, "src"), { recursive: true });

    let demo = readFileSync(join(siteRoot, "playground/demos", `${entry.demo}.tsx`), "utf8");
    demo = demo
      .replaceAll("from 'liquid-gooey'", "from '../../../_sources/liquid-gooey/src/index'")
      .replaceAll("from '../App'", "from './types'")
      .replaceAll("from '../assets/", "from './assets/");
    writeFileSync(join(dir, "src/demo.tsx"), demo);
    writeFileSync(join(dir, "src/types.ts"), `export interface DemoProps {
  blur: number
  contrast: number
  shadow: string
  dark: boolean
  pro: boolean
  bare?: boolean
}
`);

    for (const asset of entry.assets) {
      copy(join(siteRoot, "playground/assets", asset), join(dir, "src/assets", asset));
    }

    writeFileSync(join(dir, "reference.tsx"), `/* Use when: a React interface needs the upstream ${entry.title.toLowerCase()} interaction and its ${entry.effect} liquid behavior. */

import "../../_sources/liquid-gooey/styles.css";
import "../../_sources/liquid-gooey/demo.css";
import { ${entry.demo} } from "./src/demo";

const shadow = "0 0 0 1px rgba(255,255,255,.04) inset, 0 2px 6px rgba(0,0,0,.24)";

export default function LiquidGooeyReference() {
  return (
    <div className="page">
      <${entry.demo} blur={6} contrast={18} shadow={shadow} dark pro={false} />
    </div>
  );
}
`);

    writeFileSync(join(dir, "README.md"), `# ${entry.title}

Pinned interactive demo from Liquid Gooey. It preserves the upstream ${entry.effect} behavior,
values, accessibility roles, pointer handling, and controls. Use the visual/interaction decisions
as a reference and translate them into the target project's framework and conventions.

## Classification

- Category: ${entry.category}
- Medium: React component
- Entry point: \`reference.tsx\`
- Nature: interactive

## Files

- \`reference.tsx\` — dashboard wrapper using the upstream defaults
- \`src/demo.tsx\` — pinned upstream demo with only local import-path rewrites
- \`src/types.ts\` — the upstream demo prop contract extracted from its catalog host
- \`preview.png\` — Chromium capture from the original public site
- \`SOURCE.md\` — per-entry provenance and capture scope
- \`ui/_sources/liquid-gooey/\` — complete library engine, shared CSS, license, and assets
`);

    writeFileSync(join(dir, "SOURCE.md"), `# Source

- Upstream: https://gooey.jakubantalik.com/
- Repository: ${REPOSITORY}
- Demo source: \`sites/gooey/playground/demos/${entry.demo}.tsx\`
- Shared engine source: \`packages/liquid-gooey/src/\`
- Captured commit: \`${COMMIT}\`
- Captured: ${CAPTURED}
- Package version: \`0.1.0\`
- Effect: ${entry.effect}
- License: MIT; see \`ui/_sources/liquid-gooey/LICENSE\`
- Runtime: React 18+; fully local, no upstream network required
`);
    if (existingPreview) writeFileSync(previewPath, existingPreview);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}

console.log(`Imported ${entries.length} Liquid Gooey demos at ${COMMIT}.`);
