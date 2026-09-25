# Kinetic typography

- A letter is cut into a grid of tiles, and each tile slips on its own wave, so the whole letter ripples like water.

## Classification

- Category: `typography` — decorative
- Medium: 2D canvas
- Entry point: `upstream/kinetic-a/KineticACard.tsx`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`
- `upstream/kinetic-a/engine.ts`
- `upstream/kinetic-a/KineticACard.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `upstream/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/kinetic-typography

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`; `engine.ts` is the
upstream framework-free canvas engine, taking CSS colours and a font family instead of hex values and a site font variable.
`src/demo.tsx` shows the default letter and a short word.

### KineticTiles — `kinetic-tiles.tsx`

- Props: `text` ("a"; one character fills 86 % of the height, up to 12 are shrunk to fit 90 % of the width), `tiles` (34 grid
  columns; rows follow 16∶9), `offset` (26 px max displacement), `speed` (0.02 per frame), `spread` (0.025 — the x·y phase term:
  low = uniform ripple, high = turbulent), `chroma` (0.35 accent edge-split), `shade` (0.35 depth shading), `grain` (0.7 grain +
  scanlines), `aria-label` (defaults to `text`), `className`.
- Structure: a 16∶9 `role="img"` stage, radius `--radius + 2px`, 1 px `--border`, `--kinetic-paper` background, holding a
  DPR-scaled canvas. The text is drawn once as a white mask in the element's font (weight 700; system-ui 800 as fallback);
  each frame every tile copies its patch of the mask from a sine-offset position, the result is tinted `--kinetic-ink` over
  the paper, with the accent (`--kinetic-accent`, `oklch(0.623 0.188 259.8)`) and its inverse split off the edges, plus
  shading and grain. Paper and ink default to `--background` / `--foreground` and are re-read on theme changes.
- Motion: continuous; paused off screen and on hidden tabs; `prefers-reduced-motion` renders one static frame.
- Interactions / keyboard: none (decorative).
