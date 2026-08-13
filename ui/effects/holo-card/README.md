# Holo

- Airbnb's identity card, rebuilt as a holo card for my girlfriend. Tilt it and the foil catches the light, the hearts come up on the side you turned, and her photo flips its colours.

## Classification

- Category: `effects` — decorative
- Medium: CSS 3D + gradients
- Entry point: `src/holo/HoloCard.tsx`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `src/holo/engine.ts`
- `src/holo/HoloCard.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `src/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/holo
