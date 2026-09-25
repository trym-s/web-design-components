# Reading Progress

How much is left.

## Classification

- Category: `scroll` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/reading-progress.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/reading-progress.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/reading-progress

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### ReadingProgress — `reading-progress.tsx`

- Props: `target` (ref of the article to measure; default the whole scroller), `scroller` (ref of a scroll container; default the
  window), `steps` (24 — progress is quantised so the bar moves in visible ticks), `words` (enables the time estimate),
  `wordsPerMinute` (220), `label` ("Reading progress"), `doneLabel` ("End"), `className`. Also exports
  `useReadingProgress(options)` → `step`, `progress`, `percent`, `minutesLeft`, `totalMinutes`, `complete`.
- Measurement: the fraction of the target that has scrolled past (target height minus viewport as the travel; 100 % when it
  fits), rounded to `steps`; re-read per animation frame on scroll, resize and size changes.
- Structure: a `role="progressbar"` trough (`--muted` with an inner shadow, 2 px padding, radius `--radius − 6px`) holding a 3 px
  `--primary` bar scaled from the left; with `words`, a right-aligned mono 10.5 px readout sized for its longest text:
  "n min left" (`--muted-foreground`) cross-fading at the end to a drawn check + "End · n min" (`--foreground`).
- States / motion: the bar fills with a spring 210 / 34 / 0.9; the readouts cross-fade (spring 260 / 34 / 0.8), the done label
  slides 4 px in, and the check draws in 300 ms after 80 ms. `aria-valuetext` reads "n% read, m min left".
- Keyboard: none (indicator).
