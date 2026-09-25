# Pixel brushes

- A brush is a small shape stamped over and over along a path, and a handful of numbers turn the same code into a crisp line or a loose spray.

## Classification

- Category: `effects` — decorative
- Medium: 2D canvas
- Entry point: `upstream/pixel-brush/PixelBrushCard.tsx`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`
- `upstream/pixel-brush/brushes.ts`
- `upstream/pixel-brush/engine.ts`
- `upstream/pixel-brush/PixelBrushCard.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `upstream/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/pixel-brushes

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`; `engine.ts` (stamping)
and `brushes.ts` (the brush presets, minus the unused paper constant) are the upstream files. `src/demo.tsx` mounts the sheet.

### PixelBrushSheet — `pixel-brush-sheet.tsx`

- Props: `brushes` (brush ids from `brushes.ts`, default `rows`, `scatter-heavy`, `cluster`), `aria-label`, `className`.
- Structure: a `role="img"` box, aspect 1344∶620, radius `--radius + 2px`, 1 px `--border`, filled with `--pixel-brush-paper`
  (`oklch(0.983 0.003 67.8)`), holding a DPR-scaled canvas (≤ 2). The sheet is split into equal cells, one per brush; each draws
  a spiral (radius 38 % of the cell's short side) stamped with that brush in ink `--pixel-brush-ink-1…3` (HSL
  `336 82% 56%` pink, `212 84% 52%` blue, `152 62% 40%` green; HSL because rainbow brushes drift the hue per stamp).
- Motion: each spiral draws in over 900 ms (cubic ease-out), 180 ms apart, then the loop stops and the sheet stays still;
  resizes repaint the finished sheet. It only runs while on screen (200 px margin) and the tab is visible;
  `prefers-reduced-motion` paints the finished sheet at once.
- Interactions / keyboard: none (decorative).
