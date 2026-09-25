# Long Press

Intent confirmed by time, and cancelled by everything else.

## Classification

- Category: `gesture` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/long-press.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/long-press.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/long-press

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--border`, `--muted`, `--accent`,
`--primary`, `--foreground`, `--radius`). It imports only `react` and `motion` (`motion/react`). `src/demo.tsx` is sample
data and wiring only (an archive/restore toggle).

### LongPressButton — `long-press.tsx`

- Props: `onLongPress()`, `children` (label), `duration` (ms to hold, 550), `steps` (progress granularity, 12), `disabled`,
  `className`. `useLongPress({ onLongPress, duration, steps, moveTolerance (8 px), haptic (true), disabled, onCancel })` is
  exported and returns `{ bind, step, steps, holding, fired, progress }`.
- Structure: an `h-9` button, `px-3.5`, radius `calc(var(--radius) - 1px)`, 1 px border, 13 px medium; the label twice in one grid
  cell — a `--foreground` base and a `--primary` copy revealed left→right with `clip-path: inset(0 <100−progress>% 0 0)`
  (spring 520 / 34 / 0.45); an sr-only hint "Press and hold for N seconds to confirm" via `aria-describedby`.
- States: idle — `--card`, `shadow-xs`, hover `--accent`; holding — pressed 1 px down, `--muted` at 70 %, `shadow-inner`; fired —
  `--primary` border, `--primary` 7 % fill, a scale pulse 1 → 1.045 → 1 (spring 640 / 22 / 0.7), 12 ms vibration, then back to
  idle after 260 ms; disabled — 50 % opacity, `aria-disabled`, not-allowed cursor. Progress advances in `steps` increments on
  requestAnimationFrame. Reduced motion: no pulse, instant fill.
- Interactions: pointer down starts the hold; moving more than 8 px, lifting, leaving, cancel, window blur or tab hide cancels
  (`onCancel`); the click that follows a fired hold is swallowed; the context menu and iOS callout are suppressed.
- Keyboard: Space/Enter held down runs the same hold (key repeat ignored); releasing it or Escape cancels; blur cancels.
  Focus-visible: `--primary` border + 3 px `--primary`/20 ring.
