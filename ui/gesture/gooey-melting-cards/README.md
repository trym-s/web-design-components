# Gooey melting cards

Pinned interactive demo from Liquid Gooey. It preserves the upstream Morph + dissolve behavior,
values, accessibility roles, pointer handling, and controls. Use the visual/interaction decisions
as a reference and translate them into the target project's framework and conventions.

## Classification

- Category: gesture
- Medium: React component
- Entry point: `reference.tsx`
- Nature: interactive

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `reference.tsx` — dashboard wrapper using the upstream defaults
- `upstream/demo.tsx` — pinned upstream demo with only local import-path rewrites
- `upstream/types.ts` — the upstream demo prop contract extracted from its catalog host
- `preview.png` — Chromium capture from the original public site
- `SOURCE.md` — per-entry provenance and capture scope
- `ui/_sources/liquid-gooey/` — complete library engine, shared CSS, license, and assets

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--popover`, `--border`, `--muted`, `--radius`, …).
It imports only `react`, `react-dom`, `clsx` and `tailwind-merge`. `src/liquid-gooey/` is a vendored copy of `liquid-gooey` 0.1.0
(MIT, Jakub Antalik; licence in `src/liquid-gooey/LICENSE`; the few bank edits are listed in the header of its `index.ts`).
The root declares `--gooey-drop` (liquid drop-shadow colour, default `oklch(0 0 0 / 0.08)`, dark `oklch(0 0 0 / 0.24)`).
`src/demo.tsx` is sample data and wiring only; `src/avatar-5.png` / `src/avatar-6.png` are the upstream sample photos — replace them.

### GooeyMeltingCards — `gooey-melting-cards.tsx`

- Props: `cards` (`{ src, label? }[]`; two in the upstream demo), `blur` (goo blur σ, 6), `contrast` (alpha slope, 18),
  `shadow` (`box-shadow` syntax drawn on the merged liquid; default `0 0 0 1px var(--border) inset, 0 2px 6px var(--gooey-drop)`),
  dissolve tuning `strength` (0…1, 1), `warp` (26), `mix` (0.7), `gravity` (60 px), `zone` (26 px), `range` (44 px), `className`.
- Structure: a 320×210 px `Liquid` group (position relative, isolated) whose liquid surface is `--popover`. Each card is a
  `Liquid.Item` with `morph.advanced = { blobInset: 2, bridgeGrow: 10 }` and a dissolve of
  `{ warp·s, blur: 5·s, mix·s, gravity·s, taper: 0.95, warpFreq: 1, flowSpeed: 26, detail: 2, zone, range, releaseMs: 110, fadeMs: 320 }`
  (s = `strength`). Inside: a 96×96 px `role="img"` box (`aria-label` = `label` or "Draggable photo card N"), anchored at the
  stage centre (`left/top: 50%`, margins −48 px), radius `--radius + 6px` (16 px upstream), holding a full-bleed `object-fit: cover`
  image on a `--muted` placeholder. Cards start in a row, 156 px apart, centred (two cards: x = −78 / +78 px).
- States: at rest the cards are separate liquid slabs, each with the shadow; when two come within `range` px their blobs bridge
  (liquid neck grows ~10 px toward the neighbour) and the photos melt into each other at the contact (noise warp + two-liquid mix
  inside the merged silhouette), fading back over 320 ms when pulled apart.
- Interactions: pointer drag per card with pointer capture; the card follows the pointer 1:1 via `translate()` (no transition),
  clamped to ±106 px horizontally and ±51 px vertically (stage half-size − 48 − 6). `cursor: grab` / `grabbing`, `touch-action: none`,
  no text selection, image not draggable.
- Keyboard: none upstream (cards are not focusable).
