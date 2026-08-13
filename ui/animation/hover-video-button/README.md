# Amo hover button

- On [amo](https://amo.co) a small pill button reveals a short video when you hover it, where the word puffs up into glossy 3D letters. The puffy part is only a video, so the button just plays it on hover and resets on leave, which means you can generate your own clip with any AI video model and drop it in.

## Classification

- Category: `animation` — interactive
- Medium: React + video
- Entry point: `src/hover-video/HoverVideoButton.tsx`
- Nature: carries hover/press behavior; keep the motion contract, adapt the visuals.

## Files

- `src/hover-video/HoverVideoButton.tsx`
- `src/app/lib/video-sources.ts`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `src/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/amo
