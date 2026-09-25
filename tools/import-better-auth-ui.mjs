#!/usr/bin/env node
/**
 * Captures Better Auth UI (https://better-auth-ui.com, MIT) into the bank: every React demo the docs
 * site embeds, in both of its React flavours — shadcn/ui (copy-in components) and HeroUI (the
 * `@better-auth-ui/heroui` package) — plus the transactional email templates of each.
 *
 * usage: node tools/import-better-auth-ui.mjs /path/to/better-auth-ui [--added ISO]
 *
 * What the docs site renders is what gets captured:
 * - demos from `apps/docs/src/demos/{shadcn,heroui}/`, named as `apps/docs/src/demos/index.tsx` names them;
 * - the shadcn components, ui files and the docs' mock auth client (a `customFetchImpl` that answers
 *   every Better Auth endpoint with demo data) copied from `apps/docs/src/`, following imports;
 * - emails rendered to HTML here, with the same props the docs demo passes.
 * The SolidJS (Zaidan) flavour is not captured: the viewer runs React, Vue and Svelte only.
 * Imports are rewritten to the local snapshot; nothing else is edited. Rerunning keeps captured
 * `preview.png` and component `static/`. Static HTML and previews: `tools/capture-bank.mjs`.
 */

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const args = process.argv.slice(2);
const REPO_ROOT = resolve(args[0] ?? "");
const DOCS = join(REPO_ROOT, "apps/docs");
const DSRC = join(DOCS, "src");
if (!args[0] || !existsSync(join(DSRC, "demos/index.tsx"))) throw new Error("usage: node tools/import-better-auth-ui.mjs /path/to/better-auth-ui");
const ADDED = args.includes("--added") ? args[args.indexOf("--added") + 1] : new Date().toISOString().replace(/\.\d+Z$/, "Z");

const ROOT = resolve(import.meta.dirname, "..");
const UI = join(ROOT, "ui");
const OUT = join(UI, "_sources/better-auth-ui");
const APP = join(OUT, "app");
const SITE = "https://better-auth-ui.com";
const REPO = "https://github.com/better-auth-ui/better-auth-ui";
const COMMIT = execFileSync("git", ["-C", REPO_ROOT, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const VERSION = JSON.parse(readFileSync(join(REPO_ROOT, "packages/react/package.json"), "utf8")).version;
const PREFIX = { shadcn: "better-auth-ui-", heroui: "better-auth-ui-heroui-" };
const FLAVOUR = { shadcn: "shadcn/ui", heroui: "HeroUI" };

const write = (path, body) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, body); };
const posix = (p) => p.split("\\").join("/");
const rel = (from, to) => { const r = posix(relative(from, to)); return r.startsWith(".") ? r : `./${r}`; };
const md = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\n+/g, " ").trim();
const firstSentence = (s) => md(s).match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? md(s);
const titleize = (s) => s.replace(/(^|-)(\w)/g, (m, d, c) => `${d ? " " : ""}${c.toUpperCase()}`);

// ---------------------------------------------------------------- what the docs embed
const index = readFileSync(join(DSRC, "demos/index.tsx"), "utf8");
const loaders = new Map([...index.matchAll(/const (\w+) = lazyDemo\(\s*\(\) => import\("([^"]+)"\),\s*\(\{ (\w+) \}\) => \w+\s*\)/g)]
  .map(([, id, path, exportName]) => [id, { file: join(DSRC, "demos", `${path}.tsx`), exportName }]));
const demos = [...index.slice(index.indexOf("export const demos")).matchAll(/"((shadcn|heroui|zaidan)-[\w-]+)":\s*(\w+)/g)]
  .map(([, name, flavour, id]) => ({ name, flavour, slug: name.slice(flavour.length + 1), ...loaders.get(id) }));

// Which docs page embeds which demo: pages include a topic, topics hold the previews.
const pages = new Map();
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
for (const flavour of ["shadcn", "heroui"]) {
  for (const file of walk(join(DOCS, "content/docs", flavour)).filter((f) => f.endsWith(".mdx"))) {
    const page = readFileSync(file, "utf8");
    const fm = Object.fromEntries([...(page.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "").matchAll(/^(\w+): (.*)$/gm)].map(([, k, v]) => [k, v.trim()]));
    const body = [page, ...[...page.matchAll(/<include>([^<#]+)(?:#[^<]*)?<\/include>/g)].map(([, p]) => readFileSync(resolve(dirname(file), p), "utf8"))].join("\n");
    const url = `${SITE}/docs/${posix(relative(join(DOCS, "content/docs"), file)).replace(/(\/index)?\.mdx$/, "")}`;
    // Component pages name no preview; their template renders `<flavour>-<id>`.
    const names = [...body.matchAll(/<ComponentPreview[^>]*name="([^"]+)"/g), ...[...body.matchAll(/<ComponentPage id="([^"]+)"/g)].map(([a, id]) => [a, `${flavour}-${id.split("/").pop()}`])];
    for (const [, name] of names) {
      if (name.startsWith(`${flavour}-`) && !pages.has(name)) pages.set(name, { url, title: fm.title, description: fm.description });
    }
  }
}

// Bank category per demo; auth flows are whole screens, account and organization settings are forms or lists.
const LISTS = new Set(["active-sessions", "linked-accounts", "passkeys", "api-keys", "organizations", "organization-members", "organization-invitations", "organization-people", "user-invitations", "manage-accounts"]);
const NAVIGATION = new Set(["user-button", "user-button-links", "user-button-icon", "user-avatar", "user-view", "organization-switcher", "switch-account-submenu"]);
function categoryOf(demo) {
  const leaf = basename(demo.file, ".tsx");
  const dir = relative(join(DSRC, "demos", demo.flavour), dirname(demo.file)).split("/")[0];
  if (dir === "email") return "content";
  if (leaf === "theme-toggle-item") return "action-feedback";
  if (NAVIGATION.has(leaf)) return "navigation";
  if (LISTS.has(leaf)) return "data-display";
  if (["auth", "magic-link", "passkey", "device-authorization"].includes(dir) || /^(sign-in|sign-up)$/.test(leaf)) return "page";
  return "input";
}
const NATURE = { page: "structural", navigation: "interactive", "data-display": "structural", input: "interactive", content: "structural", "action-feedback": "interactive" };

// ---------------------------------------------------------------- clean slate (captures survive)
for (const cat of readdirSync(UI)) {
  if (cat === "_sources" || !statSync(join(UI, cat)).isDirectory()) continue;
  for (const d of readdirSync(join(UI, cat))) {
    if (!d.startsWith("better-auth-ui-")) continue;
    for (const f of readdirSync(join(UI, cat, d))) if (f !== "static" && f !== "preview.png") rmSync(join(UI, cat, d, f), { recursive: true });
  }
}
rmSync(OUT, { recursive: true, force: true });

// ---------------------------------------------------------------- import localization
const bareImports = new Set();
const copied = new Set();
const resolveFile = (base) => ["", ".ts", ".tsx", "/index.ts", "/index.tsx"].map((e) => base + e).find((p) => existsSync(p) && statSync(p).isFile());

/** Root-relative public files (/avatars/…, /favicon-…) come from apps/docs/public. */
function localizeAssets(code, fileDir) {
  return code.replace(/(["'])\/((?:avatars|favicon)[^"'\s]*\.(?:png|jpe?g|svg|webp))\1/g, (all, q, p) => {
    const src = join(DOCS, "public", p);
    if (!existsSync(src)) return all;
    cpSync(src, join(OUT, "public", p));
    return `new URL(${JSON.stringify(rel(fileDir, join(OUT, "public", p)))}, import.meta.url).href`;
  });
}

/** Rewrites `@/…` and relative imports to the snapshot, copying each docs module it reaches. */
function localize(code, sourceFile, destFile) {
  const specs = [...new Set([...code.matchAll(/(?:from\s+|import\s*\(\s*|import\s+)["']([^"']+)["']/g)].map((m) => m[1]))];
  for (const spec of specs) {
    // The docs read the theme from fumadocs' provider (next-themes with system/light/dark); the viewer has none.
    if (spec === "fumadocs-ui/provider/base") {
      const shim = join(APP, "shims/fumadocs-theme.ts");
      write(shim, `/* Bank shim for fumadocs-ui/provider/base: next-themes' useTheme shape, toggling \`.dark\` as the docs site does. */
import { useState } from "react";

export function useTheme() {
  const [theme, set] = useState("system");
  const setTheme = (next: string) => {
    set(next);
    const dark = next === "dark" || (next === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  };
  return { theme, setTheme, themes: ["light", "dark", "system"], resolvedTheme: theme };
}
`);
      code = code.replaceAll(`"${spec}"`, `"${rel(dirname(destFile), shim).replace(/\.ts$/, "")}"`);
      continue;
    }
    const target = spec.startsWith("@/") ? resolveFile(join(DSRC, spec.slice(2))) : spec.startsWith(".") ? resolveFile(resolve(dirname(sourceFile), spec)) : null;
    if (!target) {
      if (!spec.startsWith(".") && !spec.startsWith("@/")) bareImports.add(spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]);
      continue;
    }
    const local = join(APP, relative(DSRC, target));
    copyModule(target, local);
    const to = rel(dirname(destFile), local).replace(/\.tsx?$/, "").replace(/\/index$/, "");
    code = code.replaceAll(`"${spec}"`, `"${to}"`).replaceAll(`'${spec}'`, `'${to}'`);
  }
  return localizeAssets(code, dirname(destFile));
}

function copyModule(source, dest) {
  if (copied.has(dest)) return;
  copied.add(dest);
  write(dest, localize(readFileSync(source, "utf8"), source, dest));
}

// ---------------------------------------------------------------- frames and styles
const frame = (flavour) => `/**
 * Bank-only harness: mounts Better Auth UI ${FLAVOUR[flavour]} demos inside the docs site's own providers,
 * whose auth client answers every endpoint with demo data. Not part of the snapshot.
 */
import { Component, useState, type ComponentType, type ReactNode } from "react";
import { Providers } from "./app/components/demos/${flavour}/providers";
import "./${flavour}.css";

export type Example = { name: string; title: string; component: ComponentType };

class Guard extends Component<{ children: ReactNode }, { error?: string }> {
  state: { error?: string } = {};
  static getDerivedStateFromError(e: Error) { return { error: e.message }; }
  render() { return this.state.error ? <pre data-bank-error style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{this.state.error}</pre> : this.props.children; }
}

export function BetterAuthFrame({ examples, bare = false }: { examples: Example[]; bare?: boolean }) {
  const pinned = new URLSearchParams(location.search).get("example");
  const [current, setCurrent] = useState(() => Math.max(0, examples.findIndex((e) => e.name === pinned)));
  const Example = examples[current]?.component;
  // The capture tool enumerates examples through this list.
  (window as any).__bankExamples = examples.map((e) => e.name);
  const body = <Guard key={current}>{Example ? <Example /> : null}</Guard>;
  return (
    <div data-bank-frame className="bg-background text-foreground font-sans antialiased" style={{ width: "100%", minHeight: "100vh", boxSizing: "border-box", padding: 24 }}>
      {examples.length > 1 && !pinned && (
        <select aria-label="Example" value={current} onChange={(e) => setCurrent(Number(e.target.value))} style={{ margin: "0 0 16px", font: "inherit" }}>
          {examples.map((e, i) => <option key={e.name} value={i}>{e.title}</option>)}
        </select>
      )}
      <div data-bank-example={examples[current]?.name} className="flex min-h-[350px] w-full items-center justify-center">
        {bare ? body : <Providers>{body}</Providers>}
      </div>
    </div>
  );
}
`;

const sources = (flavour) => `@source "./app/**/*.{ts,tsx}";\n@source "../../**/${PREFIX[flavour]}*/src/**/*.{ts,tsx}";\n`;
const shadcnCss = readFileSync(join(DSRC, "styles/shadcn.css"), "utf8")
  // app.css is the docs chrome (fumadocs); the demos need only the tokens below it.
  .replace(/^@import "\.\/app\.css";\n/m, "")
  .replace(/^@import "shadcn\/tailwind\.css";$/m, '@import "../shadcn/shadcn-tailwind.css";')
  .replace(/^@import "@fontsource-variable\/inter";$/m, '@import "./fonts.css";')
  .replace(/^@source .*\n?/gm, "");
write(join(OUT, "shadcn.input.css"), `/* The docs site's shadcn stylesheet (tokens, theme, base) over this snapshot. */\n${shadcnCss.replace(/(@import "tailwindcss";)/, `$1\n${sources("shadcn")}`)}`);
write(join(OUT, "heroui.input.css"), `/* The docs site's HeroUI stylesheet without its docs chrome, over this snapshot. */\n@import "tailwindcss";\n${sources("heroui")}@import "@heroui/styles";\n@import "@better-auth-ui/heroui/styles";\n@import "./fonts.css";\n`);
for (const flavour of ["shadcn", "heroui"]) {
  const providers = `components/demos/${flavour}/providers.tsx`;
  copyModule(join(DSRC, providers), join(APP, providers));
}
write(join(OUT, "frame-shadcn.tsx"), frame("shadcn"));
write(join(OUT, "frame-heroui.tsx"), frame("heroui"));
{
  const ua = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";
  const text = await fetch("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap", { headers: { "user-agent": ua } }).then((r) => r.text());
  let fonts = "";
  for (const block of text.split("}").filter((b) => b.includes("@font-face") && /\/\* latin \*\//.test(b))) {
    const url = block.match(/url\((https:[^)]+)\)/)[1];
    const file = `inter-${basename(new URL(url).pathname)}`;
    write(join(OUT, "fonts", file), Buffer.from(await fetch(url).then((r) => r.arrayBuffer())));
    fonts += `${block.replace("font-family: 'Inter'", "font-family: 'Inter Variable'").replace(url, `./fonts/${file}`).trim()}\n}\n`;
  }
  write(join(OUT, "fonts.css"), `/* Inter (OFL), latin subset, localized; named as @fontsource-variable/inter names it. */\n${fonts}`);
}

// ---------------------------------------------------------------- emails, rendered here
const emailStub = join(OUT, ".email-frame-stub.mjs");
write(emailStub, "export function EmailFrame(props) { return { props }; }\n");
async function renderEmail(demo) {
  const out = join(ROOT, ".cache", "better-auth-ui-email.mjs");
  await build({
    entryPoints: [demo.file], nodePaths: [join(ROOT, "node_modules")], bundle: true, format: "esm", platform: "node", outfile: out, jsx: "automatic", logLevel: "silent",
    // The templates are bundled so their tailwind-merge import gets the version they declare (see vite.config.ts).
    plugins: [{ name: "packages", setup(b) {
      b.onResolve({ filter: /^@\/components\/email-frame$/ }, () => ({ path: emailStub }));
      b.onResolve({ filter: /^[^./]/ }, (a) => a.path.startsWith("@/") || a.path.startsWith("@better-auth-ui/") ? undefined
        : { path: a.path.replace(/^(zod|tailwind-merge)(?=\/|$)/, (p) => ({ zod: "zod-v4", "tailwind-merge": "tailwind-merge-v3" })[p]), external: true });
    } }],
  });
  const mod = await import(`${pathToFileURL(out).href}?${demo.name}`);
  return mod[demo.exportName]().props;
}

// ---------------------------------------------------------------- references
const agentUse = (flavour) => flavour === "shadcn"
  ? `## How an agent uses this reference

- **React + shadcn/ui target** — \`npx shadcn@latest add ${SITE}/r/<component>.json\` installs the same component
  set; or copy the files under \`ui/_sources/better-auth-ui/app/components/auth/\` it imports. They run on
  \`@better-auth-ui/react\` (headless hooks) and a Better Auth client.
- **Any other stack** — open \`static/<example>.html\`: the rendered DOM; every class resolves through
  \`ui/_sources/better-auth-ui/shadcn.css\`. Keep the markup and tokens; re-implement the auth calls.
- The demo data comes from the docs' mock client (\`ui/_sources/better-auth-ui/app/lib/auth-client.tsx\`), not a server.
`
  : `## How an agent uses this reference

- **React + HeroUI target** — \`npm i @better-auth-ui/heroui@${VERSION} @heroui/react @heroui/styles\` and render the
  same component inside its \`AuthProvider\`; \`src/examples/\` shows the exact usage.
- **Any other stack** — open \`static/<example>.html\`: the rendered DOM; every class resolves through
  \`ui/_sources/better-auth-ui/heroui.css\` (HeroUI's styles plus Tailwind utilities).
- The demo data comes from the docs' mock client (\`ui/_sources/better-auth-ui/app/lib/auth-client.tsx\`), not a server.
`;

const entries = [];
const excluded = [];
for (const demo of demos) {
  if (demo.flavour === "zaidan") { excluded.push({ example: demo.name, reason: "SolidJS flavour; the viewer does not run Solid" }); continue; }
  const page = pages.get(demo.name);
  const category = categoryOf(demo);
  const nature = NATURE[category];
  const dir = join(UI, category, `${PREFIX[demo.flavour]}${demo.slug}`);
  const srcDir = join(dir, "src");
  const id = `${category}/${PREFIX[demo.flavour]}${demo.slug}`;
  const email = category === "content";
  const title = page?.title?.replace(/^<(.+) \/>$/, "$1") ?? titleize(demo.slug);
  const description = page?.description ?? `${titleize(demo.slug)} from Better Auth UI.`;
  const use = firstSentence(description);
  const code = readFileSync(demo.file, "utf8");
  const example = join(srcDir, "examples", `${basename(demo.file)}`);

  if (email) {
    // The docs demo renders the template once, at module load, and shows it in an iframe.
    const { srcDoc, className } = await renderEmail(demo);
    const images = new Map(); // path as written in static/ → path from src/
    const html = srcDoc.replace(/(["'(])\/(favicon[^"')\s]*\.png)/g, (all, q, p) => {
      if (!existsSync(join(DOCS, "public", p))) return all;
      cpSync(join(DOCS, "public", p), join(OUT, "public", p));
      images.set(rel(join(dir, "static"), join(OUT, "public", p)), rel(srcDir, join(OUT, "public", p)));
      return `${q}${rel(join(dir, "static"), join(OUT, "public", p))}`;
    });
    // In the iframe, relative paths resolve against the viewer page; hand it bundled image URLs instead.
    const imgs = [...images];
    rmSync(join(dir, "static"), { recursive: true, force: true });
    write(join(dir, "static", `${demo.slug}.html`), html);
    write(example, code);
    write(join(srcDir, "demo.tsx"), `import raw from "../static/${demo.slug}.html?raw";
${imgs.map(([, from], i) => `import img${i} from "${from}";\n`).join("")}import { BetterAuthFrame } from "${rel(srcDir, join(OUT, "frame-shadcn"))}";

// \`examples/${basename(demo.file)}\` renders this template with @react-email/render; the importer ran it.
const html = raw${imgs.map(([written], i) => `.replaceAll(${JSON.stringify(written)}, img${i})`).join("")};
const examples = [{ name: "${demo.slug}", title: ${JSON.stringify(title)}, component: () => <iframe title=${JSON.stringify(title)} srcDoc={html} className="${className ?? "h-[620px]"} w-full max-w-3xl rounded-md border" /> }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} bare />;
}
`);
  } else {
    write(example, localize(code, demo.file, example));
    write(join(srcDir, "demo.tsx"), `import { ${demo.exportName} as E0 } from "./examples/${basename(demo.file, ".tsx")}";
import { BetterAuthFrame } from "${rel(srcDir, join(OUT, `frame-${demo.flavour}`))}";

const examples = [{ name: "${demo.slug}", title: ${JSON.stringify(title)}, component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}
`);
  }
  write(join(dir, "reference.tsx"), `/* Use when: ${use.replaceAll("*/", "* /")} */\n\nexport { default } from "./src/demo";\n`);
  const css = `_sources/better-auth-ui/${email ? "none" : `${demo.flavour}.css`}`;
  write(join(dir, "README.md"), `# ${title}${demo.flavour === "heroui" ? " (HeroUI)" : ""}

${md(description)}

## Classification

- Category: \`${category}\` — ${nature}
- Medium: ${email ? "HTML email (React Email template, rendered)" : `React + TypeScript + ${demo.flavour === "shadcn" ? "shadcn/ui (Tailwind CSS v4, radix-ui)" : "HeroUI v3 (Tailwind CSS v4)"}`}; static HTML
- Framework: react
- Entry point: \`src/examples/${basename(demo.file)}\`
- Nature: ${nature}; reuse the flow, fields, hierarchy and copy, adapt literal values to the target project.
- Added: ${ADDED}
- Curation: pending
- Use when: ${use}
- Provides: ${email ? `${title} email template` : `\`${title}\` from ${demo.flavour === "shadcn" ? "the shadcn component set" : `\`@better-auth-ui/heroui\``}`}
- Requires: ${email ? `\`@better-auth-ui/${demo.flavour === "shadcn" ? "react" : "heroui"}/email\` and \`@react-email/render\`, or the static HTML` : `React, a Better Auth client and \`@better-auth-ui/${demo.flavour === "shadcn" ? "react" : "heroui"}\``}
- Variants: default
- Upstream: Better Auth UI ${VERSION} · ${FLAVOUR[demo.flavour]}
${email ? "" : `- Local source fallback: \`ui/_sources/better-auth-ui/app/\`\n`}
${email ? `## How an agent uses this reference

- **Any stack** — \`static/${demo.slug}.html\` is the finished email (table layout, inline styles).
- **React** — render the template from \`@better-auth-ui/${demo.flavour === "shadcn" ? "react" : "heroui"}/email\` with \`@react-email/render\`; \`src/examples/\` has the props.
` : agentUse(demo.flavour)}
## Files

- \`src/examples/${basename(demo.file)}\` — the docs demo${email ? "" : ", imports pointed at the snapshot"}
- \`src/demo.tsx\` — bank harness
- \`reference.tsx\` — dashboard entry point
${email ? `- \`static/${demo.slug}.html\` — the rendered email\n` : ""}
Upstream page: ${page?.url ?? SITE}
`);
  write(join(dir, "SOURCE.md"), `# Source

- Site: ${page?.url ?? SITE}
- Repository: ${REPO}
- Captured commit: \`${COMMIT}\`
- Packages: \`@better-auth-ui/core\`, \`@better-auth-ui/react\`, \`@better-auth-ui/heroui\` ${VERSION} (npm)
- License: MIT (\`ui/_sources/better-auth-ui/LICENSE.md\`)
- Captured: ${ADDED}

Demo from \`${posix(relative(REPO_ROOT, demo.file))}\`, embedded on the docs page as \`${demo.name}\`.
Files are verbatim apart from \`@/…\` import paths and image URLs, which point into \`ui/_sources/better-auth-ui/\`.
`);
  entries.push({ id, page: page?.url ?? null, clip: page ? `.preview[data-name="${demo.name}"]` : null, captured: [demo.slug], kind: email ? "email" : "component", css: email ? null : css });
}

// Drop references that no longer exist upstream.
for (const cat of readdirSync(UI)) {
  if (cat === "_sources" || !statSync(join(UI, cat)).isDirectory()) continue;
  for (const d of readdirSync(join(UI, cat))) if (d.startsWith("better-auth-ui-") && !existsSync(join(UI, cat, d, "reference.tsx"))) rmSync(join(UI, cat, d), { recursive: true });
}

// Compile both stylesheets over the fresh snapshot.
for (const flavour of ["shadcn", "heroui"]) {
  execFileSync(process.execPath, [join(ROOT, "node_modules/@tailwindcss/cli/dist/index.mjs"), "-i", join(OUT, `${flavour}.input.css`), "-o", join(OUT, `${flavour}.css`)], { stdio: "ignore", cwd: ROOT });
}
rmSync(emailStub);
cpSync(join(REPO_ROOT, "LICENSE"), join(OUT, "LICENSE.md"));
write(join(OUT, "manifest.json"), JSON.stringify({ commit: COMMIT, version: VERSION, captured: ADDED, entries }, null, 2) + "\n");
write(join(OUT, "SOURCE.md"), `# Better Auth UI

- Site: ${SITE}
- Repository: ${REPO}
- Captured commit: \`${COMMIT}\`
- Packages: \`@better-auth-ui/{core,react,heroui}\` ${VERSION} (npm, installed in the bank)
- License: MIT — \`LICENSE.md\`
- Captured: ${ADDED}
- Importer: \`node tools/import-better-auth-ui.mjs <better-auth-ui checkout>\`, then \`node tools/capture-bank.mjs --source better-auth-ui --static --previews\`

## Contents

- \`app/\` — the docs modules the demos reach, same paths as \`apps/docs/src/\`: the shadcn auth components
  (\`components/auth/\`), their ui files (\`components/ui/\`), the mock auth client (\`lib/auth-client.tsx\`)
  and the plugin configs (\`lib/auth/\`), and the per-flavour providers (\`components/demos/\`)
- \`shadcn.css\`, \`heroui.css\` — Tailwind v4 builds of \`*.input.css\`; link one from a static HTML
- \`frame-shadcn.tsx\`, \`frame-heroui.tsx\` — bank-only React harnesses; \`manifest.json\` — every captured entry
- \`public/\`, \`fonts/\` — the avatar and logos the demos use, and Inter, localized

## Counts

- shadcn/ui: ${entries.filter((e) => e.id.includes(PREFIX.shadcn) && !e.id.includes(PREFIX.heroui)).length} references
- HeroUI: ${entries.filter((e) => e.id.includes(PREFIX.heroui)).length} references
- of which emails: ${entries.filter((e) => e.kind === "email").length}

## Excluded

${excluded.map((e) => `- \`${e.example}\` — ${e.reason}`).join("\n")}
`);

console.log(JSON.stringify({ references: entries.length, emails: entries.filter((e) => e.kind === "email").length, withoutPage: entries.filter((e) => !e.page).map((e) => e.id), excluded: excluded.length, bareImports: [...bareImports].sort() }, null, 2));
