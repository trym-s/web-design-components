# Wizard Steps

Transition knows forward from back.

## Classification

- Category: `navigation` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/wizard-steps.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/wizard-steps.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/wizard-steps

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### WizardSteps — `wizard-steps.tsx`

- Props: `steps` (`{ id, label, content }[]`), `index` / `defaultIndex` (0) / `onIndexChange(index, direction)`, `onComplete()`
  (Next on the last step), `complete` (show the finished panel), `height` (184 px panel), `backLabel` ("Back"), `nextLabel`
  ("Next"), `finishLabel` ("Finish"), `completeLabel` ("All set"), `completeHint` ("Step back to change anything"), `label`
  ("Steps"), `className`. Also exports `useWizard(options)` (`index`, `direction`, `furthest`, `next`, `back`, `goTo`).
- Structure: the current step's title (13 px medium; titles cross-fade in one cell); a rail of 28 px numbered tiles (radius
  `--radius − 2px`, 1 px `--border`, `shadow-sm`, 11.5 px tabular) joined by 3 px tracks (`--muted` with an inner shadow) that
  fill with `--primary`; a `--card` panel (radius `--radius + 1px`, `--border`, `shadow-sm`, 16 px padding, 13.5 px relaxed text,
  scrolls inside); a 36 px footer with Back (outlined `--card`) on the left and Next / Finish (`--primary`) on the right, its width
  reserved for the longer label.
- States / motion: done tiles `--primary` with a check and their tracks full; the current tile `--card` / `--foreground` at scale
  1; upcoming tiles `--muted-foreground` at 0.92 (tiles and tracks spring 520 / 40 / 0.5). The panel slides 22 px in from the
  travel direction with a fade (spring 260 / 34 / 0.8) while the old one leaves 22 px the other way (140 ms). Back fades out on
  the first step; the Next / Finish labels cross-fade; on `complete` the action button leaves and the panel shows the finished
  message. Tiles beyond the furthest visited step are not interactive.
- Keyboard: the current tile is the rail's single tab stop; Arrow keys move one step (Right/Down forward, Left/Up back), Home
  jumps to the first and End to the furthest visited step; clicking a visited tile goes there. Back / Next move focus to the
  panel; a polite live region reads "Step n of m: label".
