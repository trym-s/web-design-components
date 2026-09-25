# Sticky Header

Condenses as you go down.

## Classification

- Category: `scroll` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/sticky-header.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/sticky-header.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/sticky-header

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### StickyHeader — `sticky-header.tsx`

- Props: `title`, `children` (scrolling content), `subtitle`, `leading` / `actions` (24 px high slots, interactive), `expandedHeight`
  (68 px), `compactHeight` (48 px), `maxHeight` (320 px viewport), `className`. Also exports `useCondense({ range })` → scroll
  `ref`, `progress` motion value 0–1 over `range` px, `condensed`.
- Structure: a `--card` frame (radius `--radius + 4px`, `--border`, `shadow-sm`) with a focusable `role="region"` scroller (a spacer
  the expanded height, stable gutter, a 24 px `--card` fade at the bottom) and a header overlaid on top: a `--card` plate, the
  large title (20 px medium, 1.2 line-height, −0.03 em) with an 11.5 px subtitle, and a compact 13 px medium title in the same
  spot; leading and actions on either side (16 px padding, 12 px top).
- States / motion: condensing is driven by scroll over `range = max(64, 3 × (expanded − compact))` px, smoothed with a spring
  240 / 44 / 0.6: the plate scales from the expanded to the compact height from its top; its bottom edge gains a 1 px
  `--border` line, a `shadow-md` hairline and a 20 px `--card` fade (fading in over the first 12 %); the large title moves up by
  the height difference, shrinks 5 % from its top-left and fades out by 45 %; the compact title fades in between 55 % and 90 %
  while rising 6 px. Reduced motion follows the scroll without the spring.
- Keyboard: the scroller is focusable (keyboard scrolling drives the same condense); leading / actions keep their own semantics.
