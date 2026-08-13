# Apple's corners

- A normal rounded corner has a tiny kink where it meets the flat edge. You feel it before you can name it. Apple fixes this with a squircle, a corner that eases in smooth. Here is the real one on a live button you can play with.

## Classification

- Category: `surface` — structural
- Medium: SVG path / superellipse
- Entry point: `src/squircle/playground.tsx`
- Nature: affects real layout/geometry; safe to adopt as a structural primitive, not just a skin.

## Files

- `src/squircle/superellipse.ts`
- `src/squircle/tokens.ts`
- `src/squircle/Squircle.tsx`
- `src/squircle/parts.tsx`
- `src/squircle/playground.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `src/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/squircle
