# Pixel brushes

- A brush is a small shape stamped over and over along a path, and a handful of numbers turn the same code into a crisp line or a loose spray.

## Classification

- Category: `effects` — decorative
- Medium: 2D canvas
- Entry point: `upstream/pixel-brush/PixelBrushCard.tsx`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `upstream/pixel-brush/brushes.ts`
- `upstream/pixel-brush/engine.ts`
- `upstream/pixel-brush/PixelBrushCard.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `upstream/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/pixel-brushes
