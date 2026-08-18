/**
 * Fuzzy ranking and listbox keyboard handling.
 *
 * Adapted from `ui/overlay/command-palette/src/command-palette.tsx`. The
 * scoring function, the streak/boundary bonuses, the keyword penalty and the
 * Arrow/Home/End/Enter/Escape contract are preserved verbatim in behaviour;
 * the Motion layout animation and the Tailwind markup are dropped because the
 * shell renders its own list with plain CSS.
 */
import { useEffect, useMemo, useRef, useState } from "react";

const BOUNDARY = /[\s\-_/.:]/;

export interface Command {
  id: string;
  label: string;
  hint?: string;
  keywords?: string;
}

/** Positive score, or -1 when `query` is not a subsequence of `text`. */
export function scoreOne(text: string, query: string): number {
  const t = text.toLowerCase();
  let cursor = 0;
  let total = 0;
  let streak = 0;
  let first = -1;

  for (let i = 0; i < query.length; i++) {
    const at = t.indexOf(query[i], cursor);
    if (at < 0) return -1;
    if (first < 0) first = at;
    streak = at === cursor && i > 0 ? streak + 1 : 0;
    total += 2 + streak * 4;
    if (at === 0) total += 12;
    else if (BOUNDARY.test(t[at - 1])) total += 8;
    cursor = at + 1;
  }

  return cursor - first > query.length + 2 ? -1 : total;
}

function scoreKeywords(text: string, query: string): number {
  if (text.toLowerCase().includes(query)) return scoreOne(text, query);
  return Math.max(
    -1,
    ...text.split(/[^a-z0-9]+/i).map((word) => scoreOne(word, query)),
  );
}

export function rank<T extends Command>(items: T[], query: string, limit = Infinity): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return limit === Infinity ? items : items.slice(0, limit);

  const scored: { item: T; score: number; order: number }[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const direct = scoreOne(item.label, q);
    const aliased = item.keywords ? scoreKeywords(item.keywords, q) - 3 : -1;
    const best = Math.max(direct, aliased);
    if (best < 0) continue;
    scored.push({ item, score: best - item.label.length * 0.05, order: i });
  }

  scored.sort((a, b) => b.score - a.score || a.order - b.order);
  const out = scored.map((s) => s.item);
  return limit === Infinity ? out : out.slice(0, limit);
}

export function useCommandPalette<T extends Command>({
  items,
  onSelect,
  onDismiss,
  limit = 40,
}: {
  items: T[];
  onSelect: (item: T) => void;
  onDismiss?: () => void;
  limit?: number;
}) {
  const [query, setQuery] = useState("");
  const [pinned, setPinned] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const pointer = useRef({ x: -1, y: -1 });

  const select = useRef(onSelect);
  select.current = onSelect;
  const dismiss = useRef(onDismiss);
  dismiss.current = onDismiss;

  const results = useMemo(() => rank(items, query, limit), [items, query, limit]);

  const activeId = results.some((r) => r.id === pinned) ? pinned : (results[0]?.id ?? null);
  const activeIndex = results.findIndex((r) => r.id === activeId);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [query]);

  const reveal = (index: number) => {
    const list = listRef.current;
    const row = list?.children[index];
    if (!list || !(row instanceof HTMLElement)) return;
    const top = row.offsetTop - 5;
    const bottom = row.offsetTop + row.offsetHeight + 5;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
  };

  const jump = (index: number) => {
    if (results.length === 0) return;
    const next = Math.max(0, Math.min(results.length - 1, index));
    setPinned(results[next].id);
    reveal(next);
  };

  const move = (delta: number) => {
    if (results.length === 0) return;
    const from = activeIndex < 0 ? 0 : activeIndex;
    jump((from + delta + results.length) % results.length);
  };

  const run = (item?: T) => {
    const target = item ?? results.find((r) => r.id === activeId);
    if (target) select.current(target);
  };

  /** Pointer motion, not mere hover, moves the active row — matches upstream. */
  const pointerActivate = (id: string, event: React.PointerEvent) => {
    const { x, y } = pointer.current;
    if (event.clientX === x && event.clientY === y) return;
    pointer.current = { x: event.clientX, y: event.clientY };
    if (id !== activeId) setPinned(id);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      jump(0);
    } else if (event.key === "End") {
      event.preventDefault();
      jump(results.length - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      run();
    } else if (event.key === "Escape") {
      event.preventDefault();
      dismiss.current?.();
    }
  };

  return { query, setQuery, results, activeId, listRef, onKeyDown, pointerActivate, run };
}
