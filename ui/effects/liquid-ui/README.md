# Liquid UI

- I love UI where two cards fuse and the corner between them bends inward, like they were poured together, so I built a tiny engine that just makes it from code instead of drawing it by hand. Drag the cards below to watch the join re-flow, and turn one knob to go from crisp joints all the way to soft gooey blobs.

## Classification

- Category: `effects` — structural
- Medium: SDF + marching squares
- Entry point: `upstream/liquid/playground.tsx`
- Nature: affects real layout/geometry; safe to adopt as a structural primitive, not just a skin.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`
- `upstream/liquid/sdf.ts`
- `upstream/liquid/marching-squares.ts`
- `upstream/liquid/engine.ts`
- `upstream/liquid/LiquidGroup.tsx`
- `upstream/liquid/LiquidCard.tsx`
- `upstream/liquid/scenes.tsx`
- `upstream/liquid/playground.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `upstream/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/liquid-ui

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`; `engine.ts`,
`sdf.ts` and `marching-squares.ts` are the upstream engine unchanged. `src/demo.tsx` lays out two presets from the
upstream playground (bubble + tail, card + Share button) with draggable pieces.

### LiquidGroup / LiquidCard — `liquid-group.tsx`

- `LiquidCard` props: `id`, `x`, `y`, `w`, `h` (px in the group's coordinates), `radius` (per-card corner; default the
  group's `cardRadius`), `className`, `style`, `children` (real, accessible content).
- `LiquidGroup` props: `children` (LiquidCards), `k` (blend: low = crisp inverse-rounded joints, high = gooey melt),
  `cardRadius` (26), `cell` (marching-squares grid px — outline crispness), `smooth` (smoothing passes), `bridges`
  (`{ from, to, width? }[]` — capsule pipes between card ids; default width = half the smaller card height), `fill`
  (skin colour, default `var(--accent)`), `fillStyle` (extra style on the skin SVG, e.g. gradients), `className`, `style`,
  `viewTransitionName` (forwarded to the skin for a card→detail view transition).
- Structure: a `position: relative` box. Behind the content, one `aria-hidden` SVG path — the smooth union (SDF with
  smooth-min `k`) of every card's rounded rectangle plus bridges, traced with marching squares and smoothed — positioned
  at the field's bounds so bulges past (0,0) are not clipped. Each card is an absolutely positioned div at its rect,
  holding its children above the skin.
- States: geometry is recomputed from props on every change (no DOM measurement), so moving or resizing cards re-flows
  the joint immediately; animate `x`/`y` to morph.
- Interactions / keyboard: none built in; the demo drags pieces with pointer capture. Content inside cards keeps its own
  semantics (links, buttons, selectable text).
