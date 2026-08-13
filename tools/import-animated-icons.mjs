#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = join(ROOT, ".cache/icon-bank");
const UI = join(ROOT, "ui/icons");
const CHECK = process.argv.includes("--check");
const CAPTURED = "2026-08-13";

const SOURCES = [
  { id: "lucide-animated", repo: "pqoqubbw/icons", commit: "61c4202489f898cccaa2aa64b6a2d5a1a713a32e", site: "https://lucide-animated.com", license: "MIT", framework: "react", pattern: /^icons\/(.+)\.tsx$/, expected: 466, registry: (n) => `https://lucide-animated.com/r/${n}.json`, command: (n) => `pnpm dlx shadcn@latest add https://lucide-animated.com/r/${n}.json` },
  { id: "animateicons-lucide", repo: "Avijit07x/animateicons", commit: "2ec6bc6c0b4eba9ce1ba13e31ded8c16ef8a69a3", site: "https://animateicons.in/icons/lucide", license: "MIT", framework: "react", pattern: /^icons\/lucide\/(.+)-icon\.tsx$/, expected: 509, registry: (n) => `https://animateicons.in/r/lu-${n}.json`, command: (n) => `pnpm dlx shadcn@latest add https://animateicons.in/r/lu-${n}.json` },
  { id: "heroicons-animated", repo: "heroicons-animated/heroicons-animated", commit: "d2380bdaf36b708b8c40fcefc0a965d25c322705", site: "https://www.heroicons-animated.com", license: "MIT", framework: "react", pattern: /^packages\/react\/src\/icons\/(.+)\.tsx$/, expected: 316, registry: (n) => `https://www.heroicons-animated.com/r/${n}.json`, command: (n) => `pnpm dlx shadcn@latest add @heroicons-animated/${n}` },
  { id: "react-useanimations", repo: "useAnimations/react-useanimations", commit: "a19d6f1323e1d7dd7c02eb0e3196e9891cc16060", site: "https://react.useanimations.com", license: "CC BY 4.0 with upstream redistribution restriction", framework: "lottie", pattern: /^src\/lib\/([^/]+)\/index\.ts$/, expected: 79, personal: true },
  { id: "lucide-motion-vue", repo: "respeak-io/lucide-motion-vue", commit: "ae8e3c2db33ab3c4b796963e087860a960fc0d7e", site: "https://respeak-io.github.io/lucide-motion-vue", license: "mixed: MIT, MIT + Commons Clause, ISC", framework: "vue", pattern: /^src\/icons\/(.+)\.vue$/, expected: 523 },
  { id: "line-md", repo: "cyberalien/line-md", commit: "2ed22555cee9c1e50d4269865681d01ee8cffd7c", site: "https://icon-sets.iconify.design/line-md", license: "MIT", framework: "svg", pattern: /^svg\/([^/]+)\.svg$/, expected: 1218 },
  { id: "movingicons", repo: "jis3r/icons", commit: "8009cd4aed11e4fa799afb1d61a930a65eda1910", site: "https://movingicons.dev/icons", license: "MIT", framework: "svelte", pattern: /^src\/lib\/icons\/(.+)\.svelte$/, reject: new Set(["types"]), expected: 555, registry: (n) => `https://movingicons.dev/r/${n}`, command: (n) => `npx shadcn-svelte@latest add https://movingicons.dev/r/${n}` },
  { id: "itshover", repo: "itshover/itshover", commit: "65862bd1d31cbb438ee379c328bd13ddc6c319b3", site: "https://itshover.com/icons", license: "Apache-2.0", framework: "react", pattern: /^icons\/(.+)\.tsx$/, reject: new Set(["types"]), expected: 263, registry: (n) => `https://itshover.com/r/${n}.json`, command: (n) => `npx shadcn@latest add https://itshover.com/r/${n}.json` },
];

function run(args, cwd = ROOT) {
  return execFileSync(args[0], args.slice(1), { cwd, encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "inherit"] }).trim();
}

function repo(source) {
  const dir = join(CACHE, "repos", source.id);
  if (!existsSync(join(dir, ".git"))) {
    mkdirSync(dirname(dir), { recursive: true });
    run(["git", "clone", "--quiet", "--filter=blob:none", `https://github.com/${source.repo}.git`, dir]);
  }
  run(["git", "fetch", "--quiet", "origin", source.commit], dir);
  if (run(["git", "rev-parse", source.commit], dir) !== source.commit) throw new Error(`commit mismatch: ${source.id}`);
  return dir;
}

function show(dir, commit, path) {
  return execFileSync("git", ["show", `${commit}:${path}`], { cwd: dir, maxBuffer: 64 * 1024 * 1024 });
}

function files(dir, commit, source) {
  if (source.id === "line-md") {
    const data = JSON.parse(show(dir, commit, "line-md.json"));
    return Object.keys(data.icons).map((name) => `svg/${name}.svg`);
  }
  return run(["git", "ls-tree", "-r", "--name-only", commit], dir).split("\n");
}

function variants(raw, framework) {
  if (framework !== "vue") return [];
  const block = raw.match(/const animations\s*=\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  return [...block.matchAll(/^\s{2}(?:'([^']+)'|([\w-]+)):\s*\{/gm)].map((m) => m[1] || m[2]);
}

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

function syncSource(source) {
  const dir = repo(source);
  const tree = files(dir, source.commit, source);
  const matches = tree.flatMap((path) => {
    const match = path.match(source.pattern);
    return match && !source.reject?.has(match[1]) ? [{ path, name: match[1] }] : [];
  });
  if (matches.length !== source.expected) throw new Error(`${source.id}: expected ${source.expected}, found ${matches.length}`);

  const shared = source.personal ? join(CACHE, "personal", source.id) : join(ROOT, "ui/_sources", source.id);
  if (!CHECK) rmSync(shared, { recursive: true, force: true });
  const manifest = [];
  for (const item of matches) {
    let raw = show(dir, source.commit, item.path).toString("utf8");
    const extension = item.path.split(".").at(-1);
    const target = join(shared, "src", source.framework === "vue" ? "icons" : "", `${item.name}.${extension}`);
    if (!CHECK) write(target, raw);
    if (source.framework === "lottie") {
      const jsonPath = item.path.replace(/index\.ts$/, `${item.name}.json`);
      if (!CHECK) write(join(shared, "src", `${item.name}.json`), show(dir, source.commit, jsonPath));
    }
    manifest.push({
      name: item.name,
      path: relative(ROOT, target).replaceAll("\\", "/"),
      variants: variants(raw, source.framework),
      registryUrl: source.registry?.(item.name) ?? null,
      command: source.command?.(item.name) ?? null,
    });
  }

  if (!CHECK) {
    const fullTree = source.id === "line-md" ? ["license.txt"] : tree;
    const licensePath = fullTree.find((p) => /(^|\/)(LICENSE|license\.txt)$/i.test(p));
    if (licensePath) write(join(shared, "LICENSE"), show(dir, source.commit, licensePath));
    if (source.framework === "vue") {
      for (const path of tree.filter((p) => p.startsWith("src/core/") && /\.(vue|ts)$/.test(p))) write(join(shared, path), show(dir, source.commit, path));
      for (const path of ["src/icons-meta.ts", "ATTRIBUTIONS.md"].filter((p) => tree.includes(p))) write(join(shared, path), show(dir, source.commit, path));
    }
    if (source.framework === "svelte") write(join(shared, "src/types.ts"), show(dir, source.commit, "src/lib/icons/types.ts"));
    if (source.id === "itshover") write(join(shared, "src/types.ts"), show(dir, source.commit, "icons/types.ts"));
    write(join(shared, "manifest.json"), `${JSON.stringify({ ...source, pattern: undefined, reject: undefined, count: manifest.length, icons: manifest }, null, 2)}\n`);
  }
  return manifest;
}

function entryFiles(source, icon) {
  const dir = join(UI, source.id, icon.name);
  const extension = icon.path.split(".").at(-1);
  const fallback = source.personal ? icon.path : `ui/icons/${source.id}/${icon.name}/src/${icon.name}.${extension}`;
  if (!source.personal) {
    mkdirSync(join(dir, "src"), { recursive: true });
    cpSync(join(ROOT, icon.path), join(dir, "src", `${icon.name}.${extension}`));
  }
  const installation = icon.command
    ? `- Preferred install: \`${icon.command}\`\n- Registry: ${icon.registryUrl}\n- Local source fallback: \`${fallback}\``
    : `- Local source: \`${fallback}\``;
  write(join(dir, "reference.md"), `# Use when\n\nUse the ${icon.name} animated icon from ${source.id}.\n`);
  write(join(dir, "README.md"), `# ${icon.name}\n\n## Classification\n\n- Category: \`icons\` — interactive\n- Medium: ${source.framework}\n- Entry point: \`${fallback}\`\n- Nature: interactive\n- Framework: ${source.framework}\n- Availability: ${source.personal ? "personal-cache" : "public"}\n- Variants: ${icon.variants.length ? icon.variants.join(", ") : "default"}\n\n## Installation\n\n${installation}\n`);
  write(join(dir, "SOURCE.md"), `# Source\n\n- Site: ${source.site}/${icon.name}\n- Repository: https://github.com/${source.repo}\n- Source path: \`${icon.path}\`\n- Captured commit: \`${source.commit}\`\n- Capture date: ${CAPTURED}\n- License: ${source.license}\n\nPinned source snapshot. ${source.personal ? "Source is stored only in the ignored personal cache because upstream prohibits redistribution." : "Runtime source is stored under ui/_sources and works offline."}\n`);
}

if (!CHECK) rmSync(UI, { recursive: true, force: true });
mkdirSync(CACHE, { recursive: true });
for (const source of SOURCES) {
  const icons = syncSource(source);
  if (!CHECK) for (const icon of icons) entryFiles(source, icon);
  console.log(`${source.id}: ${icons.length}`);
}
