import assert from "node:assert/strict";
import test from "node:test";
import { rank } from "./useCommandPalette.ts";

test("fuzzy search rejects loose matches spread across unrelated keywords", () => {
  const items = [
    { id: "dice", label: "Dice Roll", keywords: "animation/dice-roll tactile throw" },
    { id: "diff", label: "Diff Table", keywords: "data-display/diff-table side by side textual changes" },
    { id: "filter", label: "Filter Table", keywords: "data-display/filter-table filter dense records" },
  ];

  assert.deepEqual(rank(items, "dice").map((item) => item.label), ["Dice Roll"]);
});
