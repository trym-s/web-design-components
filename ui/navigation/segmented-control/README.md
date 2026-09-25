# Segmented Control

Thumb slides, label inverts through it.

## Classification

- Category: `navigation` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/segmented-control.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/segmented-control.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/segmented-control

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### SegmentedControl — `segmented-control.tsx`

- Props: `options` (`{ value, label, disabled? }[]`), `label` (group name), `value` / `defaultValue` (first option) /
  `onValueChange(value)`, `className`.
- Structure: a `role="radiogroup"` track (radius `--radius − 1px`, 1 px `--border`, `--muted` at 70 % with an inner shadow,
  3 px padding) with equal columns; labels are 13 px medium, 12 × 7 px padding, −0.01 em tracking. The thumb is a `--primary`
  block (radius `--radius − 4px`, `shadow-sm`) one column wide containing a second copy of every label in
  `--primary-foreground`, counter-translated so the text under the thumb is always the inverted copy (a clean colour split
  while it moves).
- States / motion: the thumb (and its counter-mask) slides to the selected column on a spring 520 / 34 / 0.45; unselected labels
  `--muted-foreground`, hovered `--foreground`, disabled at 60 %.
- Keyboard: one `role="radio"` button per option with roving tabindex (only the selected one is tabbable); Arrow keys move and
  select the next / previous enabled option (wrapping), Home / End the first / last; disabled options are skipped.
  Focus-visible: 1 px `--primary` inset ring.
