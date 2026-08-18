/**
 * Selection model for the browser.
 *
 * The bank is ~97% icons, so a single undifferentiated list is unusable. The
 * view splits on that seam first (`Mode`), then narrows by the one facet that
 * actually organises each half — category for components, upstream source for
 * icons — and only then applies chips and free text.
 */
import { useMemo } from "react";
import type { Entry } from "./registry";
import { rank } from "./useCommandPalette";

export type Mode = "components" | "icons";

export const ALL = "all";

export interface Chip {
  key: string;
  label: string;
  count: number;
  tone?: "accent" | "green" | "orange" | "red";
}

export interface Query {
  mode: Mode;
  group: string;
  source: string;
  chip: string;
  text: string;
}

const isIcon = (entry: Entry) => entry.category === "icons";

/** The chip axis differs per mode: components sort by role, icons by framework. */
const chipOf = (entry: Entry, mode: Mode): string[] =>
  mode === "icons" ? [entry.framework ?? "unknown"] : entry.roles;

const TONES: Record<string, Chip["tone"]> = {
  structure: "accent",
  behavior: "green",
  visual: "orange",
};

function tally(entries: Entry[], of: (entry: Entry) => string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    for (const key of of(entry)) counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

/** Facet keys are slugs. Title-case them here rather than in CSS, which would
 *  turn "ai" into "Ai" and "line-md" into "Line-md". */
const WORDS: Record<string, string> = { ai: "AI", ui: "UI", svg: "SVG", md: "MD" };

export const label = (key: string) =>
  key
    .split("-")
    .map((word) => WORDS[word] ?? word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const newestFirst = (a: Entry, b: Entry) =>
  (b.addedAt ?? "").localeCompare(a.addedAt ?? "") || a.id.localeCompare(b.id);

export function useCatalogView(entries: Entry[], query: Query) {
  return useMemo(() => {
    const pool = entries.filter((entry) => (query.mode === "icons" ? isIcon(entry) : !isIcon(entry)));

    const groupOf = (entry: Entry) => (query.mode === "icons" ? entry.source : entry.category);
    const groupCounts = tally(pool, (entry) => [groupOf(entry)]);
    const groups = [
      { key: ALL, label: "All", count: pool.length },
      ...[...groupCounts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([key, count]) => ({ key, label: label(key), count })),
    ];

    const grouped = query.group === ALL ? pool : pool.filter((entry) => groupOf(entry) === query.group);

    const sourceCounts = tally(grouped, (entry) => [entry.source]);
    const sources: Chip[] = [
      { key: ALL, label: "All sources", count: grouped.length },
      ...[...sourceCounts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([key, count]) => ({ key, label: key, count })),
    ];
    const sourced = query.mode === "components" && query.source !== ALL
      ? grouped.filter((entry) => entry.source === query.source)
      : grouped;

    const chipCounts = tally(sourced, (entry) => chipOf(entry, query.mode));
    const chips: Chip[] = [
      { key: ALL, label: "All", count: sourced.length },
      ...[...chipCounts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([key, count]) => ({ key, label: label(key), count, tone: TONES[key] })),
    ];

    const chipped =
      query.chip === ALL
        ? sourced
        : sourced.filter((entry) => chipOf(entry, query.mode).includes(query.chip));

    // Free text reuses the palette's ranking so the sidebar filter and ⌘K agree
    // on what "matches" means, instead of one being substring and the other fuzzy.
    const results = query.text.trim()
      ? rank(
          chipped.map((entry) => ({
            id: entry.id,
            label: entry.title,
            keywords: `${entry.id} ${entry.useWhen} ${entry.source}`,
            entry,
          })),
          query.text,
        ).map((item) => item.entry)
      : query.mode === "components"
        ? [...chipped].sort(newestFirst)
        : chipped;

    return { groups, sources, chips, results, poolSize: pool.length };
  }, [entries, query.mode, query.group, query.source, query.chip, query.text]);
}

/** Every reference, ranked by the palette across both modes. */
export function useCommands(entries: Entry[]) {
  return useMemo(
    () =>
      entries.map((entry) => ({
        id: entry.id,
        label: entry.title,
        hint: entry.category === "icons" ? entry.source : entry.category,
        keywords: `${entry.id} ${entry.useWhen} ${entry.source} ${entry.roles.join(" ")}`,
        entry,
      })),
    [entries],
  );
}
