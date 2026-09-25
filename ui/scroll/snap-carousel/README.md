# Snap Carousel

Momentum that lands on a slide.

## Classification

- Category: `scroll` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/snap-carousel.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/snap-carousel.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/snap-carousel

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### SnapCarousel — `snap-carousel.tsx`

- Props: `children` (slides), `label`, `index` / `defaultIndex` (0) / `onIndexChange(index)`, `gap` (12 px), `peek` (0 px of the
  neighbours shown at each side, faded with a mask), `momentum` (0.14 s of velocity projection), `maxFlick` (1 slide per
  flick), `prevLabel` / `nextLabel`, `className`. Also exports `useSnapCarousel(options)` (motion value `x`, `goTo`, `next`,
  `prev`, viewport and track props).
- Structure: a focusable `role="group"` viewport ("carousel", radius `--radius + 4px`, 6 px vertical padding) with a draggable
  track of full-width slides (`role="group"`, "slide", "i of n"; only the current slide is interactive); below, a row of
  pagination bars (5 × 14 px `--primary` bars in 16 × 18 px buttons, 3 px apart) and two 28 px arrow buttons (`--card`,
  `--border`, `shadow-sm`, radius `--radius − 4px`).
- States / motion: dragging (horizontal, direction-locked, elastic 0.14 at the ends) previews the slide it will land on; release
  projects the velocity and snaps to at most `maxFlick` slides from where it was, gliding with a spring 260 / 34 / 0.8 that
  inherits the fling velocity. Arrows past either end bounce off the wall (spring 700 / 30 / 0.5 with a 900 px/s impulse).
  Non-current slides dim to 0.55 opacity at scale 0.96; the current pagination bar is full width and opaque, others shrink to
  36 % at 26 % opacity (spring 520 / 34 / 0.45). A polite live region reads "Slide i of n".
- Keyboard: on the focused viewport ArrowLeft / ArrowRight move one slide (bouncing at the ends), Home / End jump to the first /
  last; pagination bars and arrows are labelled buttons.
