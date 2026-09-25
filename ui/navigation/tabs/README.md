# Tabs

One indicator shared across tabs.

## Classification

- Category: `navigation` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/tabs.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/tabs.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/tabs

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### Tabs — `tabs.tsx`

- Props: `items` (`{ value, label, disabled? }[]`), `value` / `defaultValue` (first enabled) / `onValueChange(value)`,
  `activation` (`automatic`: arrow keys select; `manual`: arrow keys only move focus, Enter/Space selects), `renderPanel(value)`,
  `label` ("Tabs"), `panelClassName`, `className`. Also exports `useTabs(options)` (`getTabProps`, `getPanelProps`,
  `tabListProps`, direction of the last change).
- Structure: a `--card` box (radius `--radius + 2px`, 1 px `--border`, `shadow-sm`). The `role="tablist"` strip is `--muted` with
  a bottom `--border`, 4 px padding and gaps; tabs are 32 px, 14 px side padding, 12.5 px (the medium-weight width is reserved so
  selection never shifts layout). Under the selected tab sits a "plateau": a `--card` shape with top corners
  `--radius − 2px`, a 1 px `--border` outline without a bottom edge, extending 1 px over the strip's bottom border so the tab
  opens into the panel. The panel below is 13.5 px relaxed `--foreground`.
- States / motion: the plateau moves and resizes to the selected tab with a layout spring 620 / 42 / 0.35; the panel content
  slides in 12 px from the direction of travel with a fade (spring 460 / 38 / 0.8). Unselected tabs `--muted-foreground`,
  hover `--accent`; disabled tabs stay muted and inert.
- Keyboard: roving tabindex; ArrowLeft / ArrowRight move to the previous / next enabled tab (wrapping), Home / End to the
  first / last; `automatic` also selects on move. Tabs and panels are linked with `aria-controls` / `aria-labelledby`; the
  panel is focusable.
