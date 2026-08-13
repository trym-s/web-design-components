# Arcade pixel

- The letters look pixelated, but there is no pixel grid anywhere: the word is just drawn tiny and blown up, so every little pixel becomes a big square.
- Type your own word below and drag the two sliders that make the whole thing work.

## Classification

- Category: `effects` — decorative
- Medium: WebGL canvas
- Entry point: `src/arcade/playground.tsx`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `src/arcade/params.ts`
- `src/arcade/text-mask.ts`
- `src/arcade/shaders.ts`
- `src/arcade/engine.ts`
- `src/arcade/playground.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `src/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/arcade-pixel
