# Accordion

height auto, done correctly.

## Classification

- Category: `navigation` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/accordion.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/accordion.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/accordion

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### Accordion — `accordion.tsx`

- Props: `items` (`{ id, title, content, meta? }[]`), `type` (`single` default | `multiple`), `open` / `defaultOpen` (ids) /
  `onOpenChange(ids)`, `collapsible` (true — in `single` mode, whether the open item can be closed), `maxPanelHeight` (220 px,
  then the panel scrolls), `headingLevel` (3), `className`. Also exports `useAccordion(options)` (open state, `toggle`,
  `headerProps(id)`, `panelProps(id)`) and `useAutoHeight()` (measured height via ResizeObserver).
- Structure: a `--card` box (radius `--radius + 1px`, 1 px `--border`, `shadow-sm`, rows divided by `--border`). Each row: a
  `role="heading"` wrapping a full-width button (14 × 12 px padding): title (13 px medium, truncated), optional meta (11.5 px
  tabular `--muted-foreground`) and a 13 px chevron; then the panel region (`--muted` with an inner shadow, 1 px top
  `--border`, content 12.5 px relaxed `--muted-foreground`, 14 px padding, stable scrollbar gutter).
- States / motion: height animates between 0 and the measured content height (spring 480 / 40 / 0.6); content fades in over
  180 ms (`cubic-bezier(0.23, 1, 0.32, 1)`) and out over 140 ms (`cubic-bezier(0.4, 0, 1, 1)`); the chevron rotates 180°
  (spring 700 / 46 / 0.5). Closed panels are `inert` and `aria-hidden`. Header hover `--accent`; focus-visible: a 1 px
  `--primary` inset ring on `--primary` at 6 %.
- Keyboard: headers are buttons (`aria-expanded`, `aria-controls`); Enter/Space toggles; ArrowDown / ArrowUp move between
  headers (wrapping), Home / End jump to the first / last header. Panels are `role="region"` labelled by their header.
