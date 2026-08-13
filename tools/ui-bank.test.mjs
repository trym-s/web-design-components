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
