# Midjourney Medical's ASCII

- This is the [Midjourney Medical](https://www.midjourney.com) page. When it loads, a bunch of letters spin around and slowly form the Midjourney name. The cool part is that it's not a video or an image. It's all real text that the code moves around live.
- It all runs on one canvas. Each letter is drawn once and saved, then reused thousands of times, so it stays fast. Every frame the code takes text from a list of prompts and spins each letter around the center. The letters in the middle spin fast and the ones on the edges barely move, so it looks like a whirlpool. When a letter reaches the logo, it slowly turns into the right letter of the name.
- After the text is drawn, they add an old TV effect on top. The screen bends a little, the colors split at the edges, there are soft scanlines, the corners get darker, and everything gets a warm tone.

## Classification

- Category: `effects` — decorative
- Medium: 2D canvas + glyph atlas
- Entry point: `upstream/swirl/playground.tsx`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`
- `upstream/swirl/playground.tsx`
- `upstream/swirl/experiments.tsx`
- `upstream/swirl/controls.tsx`
- `upstream/swirl/use-swirl-stage.ts`
- `upstream/swirl/renderer.ts`
- `upstream/swirl/glyph-atlas.ts`
- `upstream/swirl/vortex-field.ts`
- `upstream/swirl/trail-field.ts`
- `upstream/swirl/crt-pass.ts`
- `upstream/swirl/block-font.ts`
- `upstream/swirl/figlet-fonts.ts`
- `upstream/swirl/resolver.ts`
- `upstream/swirl/color.ts`
- `upstream/swirl/default-text.ts`
- `upstream/swirl/experiment-stage.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `upstream/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/midjourney

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`; the stage hook, WebGL2
renderer, vortex/trail fields, CRT pass, glyph atlas and ASCII fonts are the upstream files (colours parsed from any CSS
colour instead of hex; the playground, controls and experiments are left out). `src/demo.tsx` shows the "Arlan" preset
with trail and shockwaves on, plus a Replay button.

### AsciiSwirl — `ascii-swirl.tsx`

- Props: `rows` (pre-baked ASCII wordmark rows) or `word` + `fontStyle` (`slant` default, `standard`, `ogre`, `doom`, `big`,
  `speed`, `stop`, `subzero`, `banner` — rendered live), `text` (the field text glyphs are sampled from; long, varied lines),
  `zoom` (0.62 → rows of glyphs = 22 / zoom), `scanlines` (0.4), `aberration` (1), `curvature` (1), `trail` (cursor wake),
  `shock` (click shockwaves), `turbulence` (0–1 ambient ripple) + `wavePattern`, `fallback` (shown without WebGL2), `className`;
  ref handle `replay()` restarts the formation.
- Structure: a rounded (`rounded-xl`, 1 px `--border`) box with a 16∶10 `role="img"` canvas on `--swirl-bg`. The canvas is a
  grid of monospace cells; each frame the field text flows through the grid in a vortex that condenses into the wordmark
  (cells on the word switch to bold glyphs in `--swirl-logo`, the rest are `--swirl-ink`), then a CRT pass adds scanlines,
  RGB aberration and barrel curvature. Defaults: ink `oklch(0.882 0 0)`, logo `oklch(1 0 0)`, bg `oklch(0.155 0.002 286.2)`.
- Motion: the formation runs on mount / `replay()`; the loop pauses off screen. Pointer movement bends the field
  (spring-smoothed); with `trail` it leaves a decaying wake; with `shock` each press sends a ring shockwave (2.4 s life).
- Keyboard: none (decorative); give the wordmark real text elsewhere for assistive tech (the canvas is labelled with `word`).
