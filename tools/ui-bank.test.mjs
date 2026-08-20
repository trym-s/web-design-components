import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";

const run = (...args) => JSON.parse(execFileSync(process.execPath, ["tools/ui-bank.mjs", ...args], { encoding: "utf8" }));
const catalog = JSON.parse(readFileSync("catalog/catalog.json", "utf8"));

test("catalog IDs are unique and evidence is explicit", () => {
  assert.equal(new Set(catalog.entries.map((entry) => entry.id)).size, catalog.entries.length);
  assert.ok(catalog.entries.every((entry) => entry.evidence && entry.roles.length));
});

test("decorative references are visual-only", () => {
  assert.ok(catalog.entries.filter((entry) => entry.nature === "decorative").every((entry) => entry.roles.join() === "visual"));
});

test("structural search excludes decorative and blocked references", () => {
  const { results } = run("search", "dashboard", "table", "--role", "structure", "--include-pending", "--limit", "20");
  assert.ok(results.length > 0);
  assert.ok(results.every((entry) => entry.nature !== "decorative" && entry.evidence !== "blocked"));
});

test("blocked references require explicit inclusion", () => {
  assert.equal(run("search", "arcade-pixel").results.length, 0);
  assert.equal(run("search", "arcade-pixel", "--include-blocked", "--include-pending").results[0].evidence, "blocked");
});

test("search only returns human-curated references", () => {
  const { results } = run("search", "button", "--include-pending", "--limit", "200");
  assert.ok(results.some((entry) => entry.curation === "pending"));
  assert.ok(run("search", "button", "--limit", "200").results.every((entry) => entry.curation === "curated"));
});

test("next returns one pending non-icon reference", () => {
  const entry = run("next");
  assert.equal(entry.curation, "pending");
  assert.notEqual(entry.category, "icons");
  assert.equal(entry.curationPath, `${entry.paths.directory}/README.md`);
});

test("bans are complete and reach every selection surface", () => {
  assert.ok(catalog.bans.length > 0);
  assert.ok(catalog.bans.every((ban) => ban.id && ban.title && ban.rule && ban.instead));
  const ids = catalog.bans.map((ban) => ban.id);
  assert.deepEqual(run("bans").map((ban) => ban.id), ids);
  assert.deepEqual(run("search", "copy", "--limit", "1").bans.map((ban) => ban.id), ids);
  assert.deepEqual(run("show", "action-feedback/copy-button").bans.map((ban) => ban.id), ids);
});

test("animated icon inventories and installation metadata are complete", () => {
  const icons = catalog.entries.filter((entry) => entry.category === "icons");
  assert.equal(icons.length, 3929);
  assert.equal(icons.filter((entry) => entry.availability === "public").length, 3850);
  assert.equal(icons.filter((entry) => entry.availability === "personal-cache").length, 79);
  assert.deepEqual(
    Object.fromEntries([...new Set(icons.map((entry) => entry.source))].sort().map((source) => [source, icons.filter((entry) => entry.source === source).length])),
    { "animateicons-lucide": 509, "heroicons-animated": 316, itshover: 263, "line-md": 1218, "lucide-animated": 466, "lucide-motion-vue": 523, movingicons: 555, "react-useanimations": 79 },
  );
  for (const entry of icons.filter((candidate) => candidate.installation.method === "shadcn")) {
    assert.ok(entry.installation.command);
    assert.ok(entry.installation.fallbackPath);
  }
});
