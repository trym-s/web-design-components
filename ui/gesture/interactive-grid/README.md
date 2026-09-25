# Interactive Grid

A 3×3 image wall where the hovered card lifts and its direct neighbours respond.

## Classification

- Category: `gesture` — interactive
- Medium: React + TypeScript + CSS transforms
- Entry point: `upstream/interactive-grid.tsx`
- Nature: interactive; reuse the hover hierarchy, neighbour response, and optional shadow/glow treatments.
- Added: 2026-08-18T12:33:40+03:00

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`
- `upstream/interactive-grid.tsx` — localized source component
- `upstream/demo.tsx` — dashboard demo
- `reference.tsx` — dashboard entry point
- `../../_sources/originkit/interactive-grid/` — localized image assets

Upstream: Originkit (source supplied by the user).

## Usage

Copy `src/` into a React + Tailwind v4 project. It imports only `react`; `interactive-grid.css` holds the lift, glow and
shadow rules. `src/demo.tsx` fills the cells with lucide placeholder marks (the upstream used ten brand-logo PNGs).

### InteractiveGrid — `interactive-grid.tsx`

- Props: `items` (cell contents, repeated to fill), `padding` ("50px"), `columns` (3), `rows` (3), `gap` (0), `rounded` (0 px),
  `logoScale` (3 → content at 60 % of the card), `shadow` (false), `glow` (false), `glowIntensity` (50 → 8 px blur),
  `perspective` (1600), `rotateX` / `rotateY` (0° tilt of the whole grid), `className`, `style`.
- Structure: a padded box centring a CSS grid (`preserve-3d`); each card has 20 px × 12 px padding, a 1 px
  `--interactive-grid-border` (`oklch(0.281 0 0)`) on a `--interactive-grid-card` fill (`oklch(0 0 0)`), content at 70 % opacity.
  Optional shadow: three stacked `--interactive-grid-shadow` drops; glow colours `--interactive-grid-glow-start/end`.
- States: hovered card → scale 1.15, translate −20 px, translateZ 15 px, on top; its left/right/up/down neighbours → scale
  1.05, translate −5 px; transitions 200 ms; content goes to full opacity on hover. With `glow`, lifted cards pulse a
  drop-shadow (1.5 s alternate). Leaving the grid resets after 200 ms (re-entering cancels).
- Keyboard: none (pointer hover effect).
