# Sortable Table

Rows travel to their new order.

## Classification

- Category: `data` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/sortable-table.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/sortable-table.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/sortable-table

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--border`, `--muted`, `--primary`,
`--primary-foreground`, `--foreground`, `--muted-foreground`, `--radius`). It imports only `react` and `motion`
(`motion/react`). `src/demo.tsx` is sample data and wiring only (six reviewers, three columns, follow marks on).

### SortableTable — `sortable-table.tsx`

- Props: `rows`, `columns` (`{ id, header, width? (CSS grid track, default minmax(0,1fr)), align? start|end, numeric?, sortable?
  (default true), value?(row) (sort key and default cell text; empty → "—"), cell?(row) (custom cell) }[]`), `getRowId(row)`,
  `label` (table `aria-label`), `rowHeight` (px, 44), `maxHeight` (px; body scrolls beyond it), `sort` / `defaultSort` /
  `onSortChange(state | null)` (`{ columnId, direction: asc|desc }`), `markable` (adds a 28 px follow-checkbox column),
  `onMarkChange(id | null)` (one marked row at a time), `getRowLabel(row)`, `className`. `useSortableRows(options)` is
  exported (numeric-aware `Intl.Collator`, stable, empties last) and returns `{ sort, ordered, toggle, ariaSort }`.
- Structure: a card (radius `calc(var(--radius) + 4px)`, 1 px `--border`, `--card`, `shadow-sm`) holding an ARIA grid built from
  divs: `role="table"` with `aria-rowcount` / `aria-colcount`, a header `role="row"` (`h-9`, bottom `--border`) of
  `role="columnheader"` cells with `aria-sort`; sortable headers are `h-7` buttons (11 px semibold uppercase, tracking 0.08em,
  `--muted-foreground`, active or hover `--foreground`) with a 9 px arrow that shows, scales from 0.72 and rotates 180° for
  descending (spring 700 / 46 / 0.5). Body rows are absolutely positioned at `y = index × rowHeight` inside a fixed-height
  rowgroup, cells 13 px (first column medium `--foreground`, others `--muted-foreground`, `tabular-nums` when `numeric`),
  separated by 1 px `--border` lines drawn in an overlay. The follow checkbox is 18 px, radius `calc(var(--radius) - 5px)`,
  `--border` outline; checked: `--primary` fill, `--primary-foreground` tick scaling 0.4 → 1; the marked row gets `--muted`
  and `aria-current`.
- States: click cycles asc → desc → original order. On a sort, rows slide to their new slots with a spring (stiffness 520 /
  damping 34 / mass 0.45) staggered 18 ms per index (capped at 8 steps); the divider overlay hides (120 ms,
  `cubic-bezier(0.4, 0, 1, 1)`) and returns after 380 ms (250 ms, `cubic-bezier(0.23, 1, 0.32, 1)`). A polite status says
  "Sorted by <header>, ascending. N rows." or "Original order restored." Empty table: a "No rows" row. Reduced motion: instant.
- Interactions: header click sorts; checkbox click toggles the follow mark (`aria-pressed`, sr-only "Follow <name>").
- Keyboard: headers and checkboxes are native buttons (Tab, Enter/Space). Header focus-visible: `--primary` 6 % fill +
  1 px inset `--primary` ring; checkbox focus-visible: `--primary` outline + `shadow-sm`.
