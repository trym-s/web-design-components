# Dia Browser's gradient

- Dia Browser has a soft glow at the bottom of the screen. A row of blurry colour bars, short on the sides and tall in the middle, going from dark up through blue, white, yellow, red and pink, then fading out at the top. It grows up from the floor when the page loads.
- It is simpler than it looks. Just a few tall rectangles in one small SVG, all painted with the same rainbow and blurred a lot so they melt together. It starts flat at the bottom and scales up to full height, so it looks like it rises from the floor. Below you can change the bars, the blur, the curve and the colours.

## Classification

- Category: `effects` — decorative
- Medium: SVG + blur
- Entry point: `upstream/dia-gradient/standalone/DiaGradient.tsx`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `upstream/dia-gradient/standalone/DiaGradient.tsx`
- `upstream/dia-gradient/standalone/PeakedGradient.tsx`
- `upstream/dia-gradient/standalone/DodgeGradient.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `upstream/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/dia-gradient
