# Realistic emboss

- Really liked the emboss effect people do, so I replicated it in web.
- Type your own word or drop an SVG, then play with the depth, the light, and the surface until it feels right. The presets are good places to start.

## Classification

- Category: `effects` — decorative
- Medium: WebGL canvas
- Entry point: `upstream/emboss/playground.tsx`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `upstream/emboss/params.ts`
- `upstream/emboss/content-mask.ts`
- `upstream/emboss/pg-shader.ts`
- `upstream/emboss/pg-engine.ts`
- `upstream/emboss/playground.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `upstream/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/emboss
