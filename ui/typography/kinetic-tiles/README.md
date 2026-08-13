# Kinetic typography

- A letter is cut into a grid of tiles, and each tile slips on its own wave, so the whole letter ripples like water.

## Classification

- Category: `typography` — decorative
- Medium: 2D canvas
- Entry point: `src/kinetic-a/KineticACard.tsx`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `src/kinetic-a/engine.ts`
- `src/kinetic-a/KineticACard.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `src/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/kinetic-typography
