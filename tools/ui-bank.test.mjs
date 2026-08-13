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
  const results = run("search", "dashboard", "table", "--role", "structure", "--limit", "20");
  assert.ok(results.length > 0);
  assert.ok(results.every((entry) => entry.nature !== "decorative" && entry.evidence !== "blocked"));
});

test("blocked references require explicit inclusion", () => {
  assert.equal(run("search", "arcade-pixel").length, 0);
  assert.equal(run("search", "arcade-pixel", "--include-blocked")[0].evidence, "blocked");
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
