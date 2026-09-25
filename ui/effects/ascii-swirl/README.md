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
