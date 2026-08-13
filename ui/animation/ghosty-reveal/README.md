# Ghosty reveal

- I love it when photos do not just fade in. The good ones bleed in through a soft, cloudy edge, like the image is forming out of fog. It looks expensive and hard to build. It is neither.
- The whole trick is a mask. A tall, feathered gradient is laid over the image, several times taller than the box, and you slide it across with `mask-position`. Because the edge of the mask is soft and a little cloudy, the image appears through a feathered front instead of a hard line. That is the ghost.
- Below is the real thing on live images, with controls for how soft the bleed is, which way it travels, the duration and the easing. You can grab the component and the mask and drop them into anything.

## Classification

- Category: `animation` — decorative
- Medium: CSS mask-position
- Entry point: `src/ghosty-reveal/standalone/GhostReveal.tsx`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `src/ghosty-reveal/standalone/GhostReveal.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `src/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/ghosty-reveal
