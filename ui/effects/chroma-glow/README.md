# Chromatic glow

- I wanted light that blooms out soft and pulls the colors apart at the edges.
- The word gets blurred at a few sizes and added back together, so it glows for real. Then it splits into a warm copy and a cool copy that drift a little the opposite way, and that gap is the rainbow edge. Move over it and the split leans toward your cursor. Type your own word and pick the two colors below.

## Classification

- Category: `effects` — decorative
- Medium: WebGL canvas
- Entry point: `upstream/chroma/playground.tsx`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`
- `upstream/chroma/params.ts`
- `upstream/chroma/text-mask.ts`
- `upstream/chroma/shaders.ts`
- `upstream/chroma/engine.ts`
- `upstream/chroma/playground.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `upstream/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/chroma-glow

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`; `engine.ts`,
`shaders.ts` and `text-mask.ts` are the upstream raw-WebGL1 engine (palette fields now filled by the component).
`src/demo.tsx` shows the default dark world, the light "Sand / Cobalt" world (by overriding the variables in inline `style` — the reliable way to override a variable the root declares) and a word input.

### ChromaGlowText — `chroma-glow.tsx`

- Props: `word` (≤ ~14 characters reads best), `style` (override the `--chroma-*` variables here), `bloom` (1.62), `split` (9 px at a 620 px tall card), `core` (1.06 rim
  brightness), `noise` (0.15 grain), `spectral` (0.6 rainbow rim), `invert` (light wall with a dark pressed word), `className`.
- Structure: a `role="img"` card labelled with the word, aspect 1344∶620, radius `--radius + 2px`, background `--chroma-bg`;
  a WebGL canvas fills it. The word is drawn in the element's font (weight 800, 42 % of the height, shrunk to 78 % of the
  width) as a white mask; a 4-level downsample-and-blur chain builds the bloom; the composite samples it three times with
  per-tint offsets (`--chroma-warm`, `--chroma-cool`, `--chroma-fringe`) for the RGB split, adds grain, vignette and a thin
  core rim, tone-mapped with `1 − e^−x`. Defaults: warm `oklch(0.809 0.116 45.8)`, cool `oklch(0.690 0.141 262.6)`, fringe
  `oklch(0.722 0.184 3.5)`, bg `oklch(0.252 0.035 271.5)`.
- Motion: an autonomous drift nudges the split and bloom; the cursor overrides it and intensifies the split toward itself.
  Rendering pauses off screen.
- Interactions / keyboard: pointer only (decorative).
