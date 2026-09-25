# Insight Cards

Paged agent insights need compact charts, scrub details, narrative context, and follow-up actions.

## Classification

- Category: `insights` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (upstream: + `liveline` charts)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the pager + prose + embedded mini-chart card + follow-up pill structure.
- Use when: paged agent insights need compact charts, scrub details, narrative context, and follow-up actions.

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx`
- `reference.tsx` — upstream capture and dashboard entry point
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--muted`, `--primary`, `--destructive`, `--border`, …).
It imports only `react`, `clsx` and `tailwind-merge`. The upstream draws its charts with the `liveline` canvas package
(paused, i.e. static); `src/snapshot-chart.tsx` redraws that snapshot as plain SVG, so no chart package is needed.
`src/demo.tsx` is sample data only (three pages, formatters).

`--success` / `--warning` are declared on the pager root and on every card (light `oklch(0.603 0.155 150.9)` /
`oklch(0.689 0.179 49.9)`, dark `oklch(0.705 0.154 153.8)` / `oklch(0.746 0.156 55.6)`).

### InsightCards — `insight-cards.tsx`

- Props: `pages` (`{ key, prose: ReactNode, card: ReactNode, pill }`), `title` ("Insights"), `defaultPage` (0),
  `onPageChange(index)`, `onPillClick(page)`, `className`, `style`.
- Structure: column up to 344 px wide, min height 408 px. Header: title 13 px semibold `--foreground` + page count 13 px
  tabular `--muted-foreground` (baseline, 6 px gap); right: two 24 px icon buttons (`rounded-sm`, 13 px chevrons, stroke 2.2).
  Then the prose (12.5 px, relaxed line-height, `--muted-foreground`, 6 px top margin), the card (8 px top margin) and a
  follow-up pill (`rounded-full`, `--card`, `shadow-xs` + 1 px `--input` ring, padding 6×12 px, 12 px `--foreground`).
- States: pill and chevron hover fill `--accent` (100 ms); chevrons press to 0.96.
- Interactions: chevrons page backward / forward, wrapping around.
- Keyboard: chevrons and pill are native buttons ("Previous insight", "Next insight").

### Entity, Mono — inline prose pieces

- `Entity { name, color? }`: medium `--foreground` "@name" after a 10 px dot (default `--warning`).
- `Mono { tone }`: `font-mono` 11.5 px, `negative` → `--destructive`, `positive` → `--success`.

### Cards — shared frame and chart stage

- Card frame: min height 278 px, `--card`, `rounded-lg`, 1 px `--border` ring, padding 12 px. Chart well: 8 px top margin,
  `--muted`, `rounded-md`, 1 px `--border` ring; a caption bar (padding 6×10 px, bottom border, 11 px tabular
  `--muted-foreground`, a "Snapshot" badge `rounded-full` `--foreground` 8 % fill, 10.5 px medium) above a 166 px stage.
- Stage interactions: pointer down/move maps x to the nearest data index; a 1 px `--foreground` cursor at 26 % opacity and a
  tooltip (min 154 px, `rounded-lg`, `--foreground` fill and border, `--background` text, `shadow-lg`, padding 9×10 px; time
  line 11 px at 70 %, rows with an 8 px dot, value at 70 % tabular) follow it; the tooltip centre is clamped to 28–72 % of
  the width. Leave / up / cancel hides both. `touch-action: pan-y`.
- `SnapshotChart` (SVG): x spreads points over 98.5 % of the width; y range = min/max of all values ± 12 % (minimum span
  10 % or 0.4); a Fritsch–Carlson monotone cubic line (2.25 px, round caps/joins), a 4/4 dashed line across the full width
  at each series' last value (series colour at 40 %), a tip dot (multi-series: 3 px radius; single: 3.5 px on a 6.5 px
  `--card` disc with a small drop shadow), optional dotted (1/3) grid lines at a 1/2/2.5/5×10ⁿ step ≥ 36 px in
  `--foreground` at 6 % fading out within 32 px of the plot edges, a 40 px transparent→opaque mask at the left edge, and
  (multi-series) dot-only legend chips top-left (20×14 px, `--foreground` 8 %).

### CompareCard

- Props: `series` (`{ id, name, values, sub, tone, color }`), `formatValue`, `caption` ("Trend snapshot"), `badge`, `tooltipTime`.
- Structure: one column per series (16 px gap): 8 px dot + name (11.5 px `--muted-foreground`), the formatted last value
  (17 px semibold, −0.01 em, tabular; `--destructive` or `--success` by tone), the `sub` in `Mono`. Chart padding 24 / 22 px.

### AnomalyCard

- Props: `title`, `metrics` (`{ key, label, values, format, threshold }`), `defaultMetric`, `onMetricChange`, `total`,
  `delta`, `comparison`, `badge`, `tooltipTime`, `color` (default `--destructive`).
- Structure: title row (12 px `--destructive` up-arrow, 12 px medium title, badge right); the caption shows the scrubbed
  value or `threshold`; a pill toggle (`--foreground` 8 % track, 2 px padding; active pill `--card` + `shadow-xs` + `--input`
  ring; 10.5 px medium) switches metrics; chart has a grid, padding 18 / 22 px; summary row `total` (17 px semibold),
  `delta` (`Mono` negative), `comparison` (11 px muted).
- States: toggle buttons press to 0.96, 150 ms transitions; `aria-pressed` on the active one.

### AllocationCard

- Props: `title`, `mark` (badge letter), `segments` (`{ name, label, pct, amount, tone }`, tone `accent` → `--warning`,
  `strong` → `--input`, `subtle` → `--border`), `description`, `defaultSelected`, `onSelectedChange`.
- Structure: title row (14 px `--warning` round badge with an 8 px bold white letter), the selected amount (20 px
  semibold), a 36 px segmented bar (`--muted` track, 2 px padding and gap, `rounded-full` segments sized by `pct`), a row
  of legend chips (11 px, 6 px dot, name + pct), and a detail well (`--muted`, `rounded-md`, `--border` ring, min 64 px):
  the label in the tone colour (11.5 px medium) and the description (11 px muted, relaxed).
- States: unselected segments at 58 % opacity; the selected one at 100 % with an inset 1 px ring `--allocation-ring`
  (`oklch(1 0 0 / 0.22)`) and a sheen bar (`--allocation-sheen`, `oklch(1 0 0 / 0.2)`, inset 4 px) that grows from 0 to
  full width over 500 ms; opacity over 300 ms, both `cubic-bezier(0.16, 1, 0.3, 1)`. Selected chip `--muted` fill +
  `--foreground`; others muted with `--accent` hover.
- Interactions: clicking a segment or its chip selects it (`aria-pressed`; segments labelled "Label: N%"); press scale 0.98 / 0.96.
- Keyboard: all controls are native buttons.
