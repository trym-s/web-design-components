# Liquid UI

- I love UI where two cards fuse and the corner between them bends inward, like they were poured together, so I built a tiny engine that just makes it from code instead of drawing it by hand. Drag the cards below to watch the join re-flow, and turn one knob to go from crisp joints all the way to soft gooey blobs.

## Classification

- Category: `effects` — structural
- Medium: SDF + marching squares
- Entry point: `src/liquid/playground.tsx`
- Nature: affects real layout/geometry; safe to adopt as a structural primitive, not just a skin.

## Files

- `src/liquid/sdf.ts`
- `src/liquid/marching-squares.ts`
- `src/liquid/engine.ts`
- `src/liquid/LiquidGroup.tsx`
- `src/liquid/LiquidCard.tsx`
- `src/liquid/scenes.tsx`
- `src/liquid/playground.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `src/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/liquid-ui
