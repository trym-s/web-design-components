#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const UI = join(ROOT, "ui");
const OUTPUT = join(ROOT, "catalog", "catalog.json");
const CURATION = join(ROOT, "catalog", "curation.json");
const NATURES = new Set(["decorative", "structural", "interactive", "functional", "unknown"]);
const STATUSES = new Set(["ok", "shim", "broken"]);
const EVIDENCE = new Set(["verified", "review", "limited", "blocked"]);

const ROLE_BY_CATEGORY = {
  animation: ["visual", "behavior"], effects: ["visual"], typography: ["visual"], surface: ["visual"],
  navigation: ["structure", "behavior"], overlay: ["structure", "behavior"], scroll: ["behavior"],
  gesture: ["behavior"], input: ["structure", "behavior"], async: ["behavior"],
  notification: ["structure", "behavior"], data: ["structure", "behavior"],
  "data-display": ["structure"], "data-visualization": ["structure", "visual"],
  ai: ["structure", "behavior"], editor: ["structure", "behavior"], inspector: ["structure"],
  insights: ["structure"], content: ["structure", "behavior"], code: ["structure", "behavior"],
  "action-feedback": ["behavior"], search: ["structure", "behavior"],
};

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function text(path) {
  return existsSync(path) ? readFileSync(path, "utf8") : "";
}

function grab(readme, label) {
  return readme.match(new RegExp(`^- ${label}: (.*)$`, "m"))?.[1]?.replaceAll("`", "").trim();
}

function useWhen(raw) {
  const block = raw.match(/\/\*\s*Use when:\s*([\s\S]*?)\*\//);
  if (block) return block[1].replace(/^\s*\*\s?/gm, "").replace(/\s+/g, " ").trim();
  return raw.match(/#\s*Use when\s*\n+([\s\S]*?)(?:\n\n|$)/i)?.[1]?.replace(/\s+/g, " ").trim() ?? "";
}

function titleize(slug) {
  return slug.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function sourceOf(id, source, hasPrompt) {
  if (id.startsWith("animation/transitions/")) return "transitions.dev";
  if (hasPrompt) return "arlan-vault";
  if (source.includes("www.interior.dev")) return "interior.dev";
  if (source.includes("gooey.jakubantalik.com")) return "liquid-gooey";
  if (source || id.split("/").length === 2) return "standalone";
  return "beautiful-ui";
}

function natureOf(readme) {
  const explicit = grab(readme, "Nature")?.toLowerCase();
  const category = grab(readme, "Category")?.toLowerCase();
  const raw = `${explicit ?? ""} ${category ?? ""}`;
  return ["decorative", "structural", "interactive", "functional"].find((value) => raw.includes(value)) ?? "unknown";
}

function capabilities(id, use, nature) {
  return [...new Set([...id.split(/[/-]/), ...use.toLowerCase().match(/[a-z0-9]+/g) ?? [], nature])]
    .filter((token) => token.length > 2)
    .sort();
}

function discover() {
  const curation = JSON.parse(text(CURATION) || "{}");
  const refs = walk(UI).filter((path) => /\/reference\.(tsx|md)$/.test(path));
  return refs.map((ref) => {
    const dir = dirname(ref);
    const id = relative(UI, dir).split(sep).join("/");
    const category = id.split("/")[0];
    const readmePath = join(dir, "README.md");
    const sourcePath = join(dir, "SOURCE.md");
    const promptPath = join(dir, "PROMPT.md");
    const previewPath = join(dir, "preview.png");
    const readme = text(readmePath);
    const sourceDoc = text(sourcePath);
    const nature = natureOf(readme);
    const status = curation[id]?.status ?? "ok";
    const preview = existsSync(previewPath);
    const evidence = status === "broken" ? "blocked" : status === "shim" ? "limited" : readme && preview ? "verified" : "review";
    const use = useWhen(text(ref));
    const medium = grab(readme, "Medium") ?? "unknown";
    const roles = nature === "decorative" ? ["visual"] : ROLE_BY_CATEGORY[category] ?? ["structure"];
    return {
      id, title: titleize(id.split("/").at(-1)), category,
      source: sourceOf(id, sourceDoc, existsSync(promptPath)), nature, roles,
      capabilities: capabilities(id, use, nature), useWhen: use, medium,
      entryPoint: grab(readme, "Entry point") ?? relative(dir, ref),
      status, statusReason: curation[id]?.statusReason,
      evidence,
      paths: {
        directory: relative(ROOT, dir), reference: relative(ROOT, ref),
        readme: existsSync(readmePath) ? relative(ROOT, readmePath) : null,
        source: existsSync(sourcePath) ? relative(ROOT, sourcePath) : null,
        prompt: existsSync(promptPath) ? relative(ROOT, promptPath) : null,
        preview: preview ? relative(ROOT, previewPath) : null,
      },
    };
  }).sort((a, b) => a.id.localeCompare(b.id));
}

function validate(entries) {
  const errors = [];
  const ids = new Set();
  for (const entry of entries) {
    if (ids.has(entry.id)) errors.push(`duplicate id: ${entry.id}`);
    ids.add(entry.id);
    if (!entry.useWhen) errors.push(`missing Use when: ${entry.id}`);
    if (!NATURES.has(entry.nature)) errors.push(`invalid nature: ${entry.id}`);
    if (!STATUSES.has(entry.status)) errors.push(`invalid status: ${entry.id}`);
    if (!EVIDENCE.has(entry.evidence)) errors.push(`invalid evidence: ${entry.id}`);
    for (const [name, path] of Object.entries(entry.paths)) {
      if (path && !existsSync(join(ROOT, path))) errors.push(`missing ${name}: ${entry.id} -> ${path}`);
    }
    if (entry.nature === "decorative" && entry.roles.some((role) => role !== "visual")) {
      errors.push(`decorative entry has non-visual role: ${entry.id}`);
    }
  }
  const curated = Object.keys(JSON.parse(text(CURATION) || "{}"));
  for (const id of curated) if (!ids.has(id)) errors.push(`curation has no reference: ${id}`);
  return errors;
}

function loadCatalog() {
  if (!existsSync(OUTPUT)) throw new Error("catalog/catalog.json missing; run `npm run catalog:build`");
  return JSON.parse(text(OUTPUT)).entries;
}

function search(entries, args) {
  const options = { limit: 8, includeBlocked: false, terms: [] };
  for (let index = 0; index < args.length; index++) {
    const value = args[index];
    if (value === "--role") options.role = args[++index];
    else if (value === "--nature") options.nature = args[++index];
    else if (value === "--category") options.category = args[++index];
    else if (value === "--medium") options.medium = args[++index];
    else if (value === "--limit") options.limit = Number(args[++index]);
    else if (value === "--include-blocked") options.includeBlocked = true;
    else options.terms.push(value.toLowerCase());
  }
  const evidenceScore = { verified: 12, review: 5, limited: -8, blocked: -100 };
  return entries.flatMap((entry) => {
    if (!options.includeBlocked && entry.evidence === "blocked") return [];
    if (options.role && !entry.roles.includes(options.role)) return [];
    if (options.nature && entry.nature !== options.nature) return [];
    if (options.category && entry.category !== options.category) return [];
    if (options.medium && !entry.medium.toLowerCase().includes(options.medium.toLowerCase())) return [];
    const fields = {
      id: entry.id.toLowerCase(), use: entry.useWhen.toLowerCase(),
      title: entry.title.toLowerCase(), capabilities: entry.capabilities.join(" "),
    };
    let score = evidenceScore[entry.evidence];
    const matched = [];
    for (const term of options.terms) {
      const points = fields.id.includes(term) ? 8 : fields.title.includes(term) ? 7 : fields.use.includes(term) ? 6 : fields.capabilities.includes(term) ? 3 : 0;
      if (points) matched.push(term);
      score += points;
    }
    if (options.terms.length && !matched.length) return [];
    return [{ ...entry, score, matched }];
  }).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id)).slice(0, options.limit);
}

const [command = "help", ...args] = process.argv.slice(2);
try {
  if (command === "build") {
    const entries = discover();
    const errors = validate(entries);
    if (errors.length) throw new Error(errors.join("\n"));
    writeFileSync(OUTPUT, `${JSON.stringify({ schemaVersion: 1, generatedFrom: "ui/", entries }, null, 2)}\n`);
    console.log(`wrote ${relative(ROOT, OUTPUT)} (${entries.length} references)`);
  } else if (command === "check") {
    const discovered = discover();
    const errors = validate(discovered);
    const current = loadCatalog();
    if (JSON.stringify(discovered) !== JSON.stringify(current)) errors.push("catalog/catalog.json is stale; run `npm run catalog:build`");
    if (errors.length) throw new Error(errors.join("\n"));
    console.log(`catalog valid (${current.length} references)`);
  } else if (command === "search") {
    console.log(JSON.stringify(search(loadCatalog(), args), null, 2));
  } else if (command === "show") {
    const entry = loadCatalog().find((candidate) => candidate.id === args[0]);
    if (!entry) throw new Error(`unknown reference: ${args[0] ?? "<missing>"}`);
    console.log(JSON.stringify(entry, null, 2));
  } else {
    console.log("usage: node tools/ui-bank.mjs build|check|search [terms] [--role visual|structure|behavior] [--nature value] [--category value] [--medium value] [--limit n] [--include-blocked]|show <id>");
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
