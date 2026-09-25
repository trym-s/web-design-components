# Hide on Scroll

Toolbar yields to the content.

## Classification

- Category: `scroll` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/hide-on-scroll.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/hide-on-scroll.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/hide-on-scroll

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### HideOnScroll — `hide-on-scroll.tsx`

- Props: `bar` (header content), `children` (scrolling content), `barHeight` (44 px), `hideAfter` (14 px of continuous downward
  scroll), `revealAfter` (10 px of upward scroll), `topGuard` (24 px — always shown this close to the top), `pinned` (never
  hide), `maxHeight` (320 px viewport), `label` ("Scrollable content"), `onHiddenChange(hidden)`, `className`. Also exports
  `useHideOnScroll({ hideAfter, revealAfter, topGuard, pinned, disabled })` → `ref` (a scroll container, or the window when
  unattached), `hidden`, `atTop`.
- Structure: a `--card` frame (radius `--radius + 4px`, 1 px `--border`, `shadow-sm`) with the bar overlaid at the top (`--card`,
  12 px side padding, 8 px gaps) and a focusable `role="region"` scroller below it (a spacer the bar's height, stable gutter,
  `scroll-padding-top` = bar + 8 px) with 20 px `--card` fades at the top and bottom edges.
- States / motion: scroll direction is accumulated per animation frame and resets when it reverses; crossing `hideAfter` slides
  the bar up by its height, crossing `revealAfter` brings it back (spring 150 / 27 / 1). Near the top, when the content does not
  overflow, while pinned, or while focus is inside the bar, it stays shown. A 1 px `--border` hairline under the bar fades in
  once scrolled off the top (spring 260 / 34 / 0.8).
- Keyboard: the scroller is focusable (arrow keys / Page keys scroll); focusing any control in the bar keeps it visible;
  focus-visible 1 px `--primary` inset ring.
