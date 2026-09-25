# Filter Grid

Filtering rearranges, it does not blink.

## Classification

- Category: `data` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/filter-grid.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/filter-grid.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/filter-grid

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--primary`, `--primary-foreground`, `--card`,
`--border`, `--foreground`, `--muted-foreground`, `--radius`). It imports only `react` and `motion` (`motion/react`).
`src/demo.tsx` is sample data and wiring only (nine assets, four filters).

### FilterGrid — `filter-grid.tsx`

- Props: `items`, `filters` (`{ id, label, match(item) }[]`; the first is the fallback), `getKey(item)`, `renderItem(item)`,
  `label` (radiogroup `aria-label`), `value` / `defaultValue` / `onValueChange(id)` (controlled or not), `columns` (3), `rowHeight`
  (px, 72), `maxRows` (4; more rows scroll), `gap` (px, 8), `emptyLabel` ("Nothing matches this filter"), `className`.
  `useFilterGrid({ items, filters, value, defaultValue, onValueChange })` is exported and returns `{ active, activeLabel, select,
  visible, counts, total }`.
- Structure: a `role="radiogroup"` row of chips (`gap-1.5`), each an `h-8` `role="radio"` button, `px-3`, radius
  `calc(var(--radius) - 4px)`, 12.5 px medium label + 10.5 px tabular count. Inactive chip: 1 px `--border` outline, label in
  `--foreground`, count in `--muted-foreground`. Active chip: a shared `--primary` thumb that slides between chips (layout
  animation, spring stiffness 520 / damping 34 / mass 0.45), label in `--primary-foreground`, count at 70 % opacity; labels
  cross-fade with the same spring. Below (10 px gap) a CSS grid `<ul>` of fixed height `rows × rowHeight + (rows − 1) × gap`
  (rows = min(ceil(total / columns), maxRows), so the box never jumps between filters); each tile is a `<li>`
  (`p-2.5`, radius `calc(var(--radius) + 1px)`, 1 px `--border`, `--card`, `shadow-sm`). An empty-state label in
  `--muted-foreground` fades in centred when nothing matches.
- States: entering tiles fade from opacity 0 / scale 0.97 (200 ms, `cubic-bezier(0.23, 1, 0.32, 1)`), staying tiles move with a
  position layout spring (stiffness 260 / damping 34 / mass 0.8), leaving tiles fade to opacity 0 / scale 0.98 in 140 ms
  (`cubic-bezier(0.4, 0, 1, 1)`), exits first (`popLayout`). Reduced motion: all instant, no layout animation. A polite
  live region says "<filter>: N of M shown"; each chip's sr-only text is "<label>, N of M".
- Interactions: click a chip to filter. If focus was inside the grid on a tile that leaves, focus moves to the grid itself.
- Keyboard: roving tabindex — only the active chip is tabbable; Arrow Right/Down and Arrow Left/Up move and select (wrapping),
  Home/End jump to the first/last. Focus-visible: the chip's outline turns `--primary` plus `shadow-sm`.
