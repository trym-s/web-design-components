# Long Running Work Loader

An agent operation needs visible progress, elapsed time, or distinct drive, dots, and orbit loading modes.

## Classification

- Category: `ai` — progress indicator
- Medium: React + TypeScript + Tailwind CSS v4
- Entry point: `reference.tsx`
- Nature: functional; reuse the 3×3 pixel-grid loader with a shimmering label and elapsed timer
- Use when: an agent operation needs visible progress, elapsed time, or distinct drive, dots, and orbit loading modes.

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx`
- `reference.tsx` — upstream capture and dashboard entry point
- `preview.png` — capture from the original site
- Shared styles: `ui/_sources/beautiful-ui/styles.css` (token mapping in `ui/_sources/beautiful-ui/SOURCE.md`)

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--foreground`, `--muted-foreground`, …).
It imports only `react`, `clsx` and `tailwind-merge`; `work-loader.css` holds the `pixel-on` and `shimmer-text` keyframes
and the reduced-motion rule. `src/demo.tsx` is the simulated elapsed clock (+0.1 s every 100 ms) and the three variants.

### WorkLoader — `work-loader.tsx`

- Props: `label` ("Churning"), `variant` (`drive` | `dots` | `orbit`, default `drive`), `elapsed` (seconds since the work
  started; omitted → no timer), `className`. `formatElapsed(seconds)` is exported: under 60 s → `12.3s`, otherwise `1m 15.4s`.
- Structure: an inline row (`role="status"`, 10 px gap): a 3×3 grid of 4 px `--foreground` cells with 1.5 px gaps
  (squares with a 1 px radius; circles for `dots`), the label (13 px medium) and the timer (`font-mono` 12 px,
  `--muted-foreground`, tabular figures).
- Grid animation: every cell runs `pixel-on` (opacity 0.15 → 1 at 18–42 % → 0.15 at 62 %) ease-in-out, infinite, at a base
  opacity of 0.15. `drive` / `dots`: 650 ms cycle, delay = (column + |row − 1|) × 90 ms, a right-pointing chevron front.
  `orbit`: 950 ms cycle; the eight perimeter cells run clockwise from the top-left, delay = index × 110 ms; the centre cell
  stays at 0.07 opacity without animation.
- Label: text clipped to a 200 %-wide gradient `--muted-foreground 35% → --foreground 50% → --muted-foreground 65%`, moved by
  `shimmer-text` (background-position 150 % → −50 %) over 1.4 s linear, infinite.
- States: `prefers-reduced-motion: reduce` stops the cell animation (the grid rests dim); the timer keeps updating.
- Interactions / Keyboard: none; it is a passive status element.
