# Gooey avatar group

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

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--popover`, `--foreground`, `--muted`,
`--secondary`, `--border`, `--ring`, …). It imports only `react`, `react-dom` (via the engine), `clsx` and `tailwind-merge`
(`src/lib/utils.ts`). `src/liquid-gooey/` is a vendored copy of `liquid-gooey` 0.1.0 (MIT, Jakub Antalik; licence in
`src/liquid-gooey/LICENSE`; the few bank edits are listed in the header of `src/liquid-gooey/index.ts`).
`src/gooey-avatar-group.css` holds what Tailwind cannot express: the registered `--seat` property, the multi-timing
transitions and the chip's edge treatments. The root declares `--gooey-drop` (liquid drop-shadow colour, default
`oklch(0 0 0 / 0.08)`, dark `oklch(0 0 0 / 0.24)`), `--photo-edge` (photo hairline, `oklch(0 0 0 / 0.2)`, dark
`oklch(1 0 0 / 0.08)`) and `--photo-lift` (loose avatar's contact shadow, `oklch(0 0 0 / 0.16)`, dark `oklch(0 0 0 / 0.55)`);
override them on the component to rebrand. `src/demo.tsx` and `src/avatars/*.png` (sample portraits from the upstream
demo) are sample data and wiring only.

### GooeyAvatarGroup — `gooey-avatar-group.tsx`

- Props: `avatars` (image srcs already in the group, unique — they are the React keys), `chipSrc` (the loose draggable
  avatar), `chipAlt` ("Drag into the group"), `label` ("Share"), `dragHint` ("Drag me"), `resetLabel` ("Reset"),
  `dissolve` (0..1 melt strength, 1), `blur` (goo sigma, 6 px), `contrast` (alpha slope, 18), `shadow` (`box-shadow`
  syntax drawn on the merged liquid; default `0 0 0 1px var(--border) inset, 0 2px 6px var(--gooey-drop)`),
  `tuning` (partial `GooeyAvatarGroupTuning`, defaults exported as `GOOEY_AVATAR_GROUP_TUNING`: `releaseMs` 380,
  `fadeMs` 320, `dropDuration` 400, `dropBounce` 0.5, `push` 9 px, `pushBounce` 0, `pushDelay` 110 ms, `pushSpeed` 80,
  `pushSpread` 0), `onJoin(index)` when the dropped avatar becomes part of the group, `onReset()`, `className` (root).
- Structure: a 290×250 px liquid group (`Liquid`, fill `--popover`), positioned children:
  - drag affordance `<p aria-hidden>` at top 2 px / right 66 px: 13/19 px `--muted-foreground` text at 55 % opacity,
    pushed 27 px down, followed by a 50×49 px hand-drawn arrow in `currentColor` pointing at the loose avatar;
  - the pill — a liquid item anchored at left 20 px / top 82 px, 56 px tall, fully rounded, padding 0 12 px 0 17 px,
    gap 10 px: the 14/22 px `--foreground` label, then the stack of 32 px round photos (`object-fit: cover`, `--muted`
    behind, 0 1px 1px `--photo-edge` shadow + 1 px inside outline in `--photo-edge`) overlapped by 8 px (24 px pitch),
    each carving an 18 px-radius crescent (CSS mask radial gradient scaled by `--seat`) around its right neighbour so the
    pill shows through as a separator; explicit z-index = slot index;
  - the loose chip — a 40 px round liquid item at right 20 px / top 22 px, `cursor: grab`, `touch-action: none`, its photo
    lifted by `0 2px 6px --photo-lift, 0 1px 1px --photo-edge` and a 1 px inside outline;
  - a Reset pill centred 10 px above the bottom: 36 px tall, 6/12 px padding, 13/16 px medium, `--secondary` /
    `--secondary-foreground`, fully rounded.
  The pill's liquid morphs with `shape` physics (size and mass springs both 380 stiffness / 40 damping, no content blur,
  anticipation 0, travel 0, roundness 0) so it only resizes, never slides. The chip's liquid uses `blobInset` 2 and
  `bridgeGrow` 8 and dissolves (warp melt) into the pill at the contact point while dragged.
- States: idle; dragging (affordance fades out over 220 ms, chip follows the pointer 1:1 with no transition); hovering a
  slot (within 18 px of the pill, the slot index = chip centre offset / 24 px with 0.72-pitch hysteresis; the neighbour's
  margin opens by one pitch over 280 ms `cubic-bezier(0.3, 1.05, 0.4, 1)`, the pill width springs with it, the chip takes
  the seated 1 px edge over 180 ms `ease-out`); absorbing (chip flies into the gap on rAF over `dropDuration` with
  `cubic-bezier(0.34, 1 + 0.8·dropBounce, 0.64, 1)`, scaling 40 → 32 px; the crescent opens via `--seat` over
  0.6·`dropDuration` `cubic-bezier(0.22, 1, 0.36, 1)`; after `pushDelay` the neighbours get a coupled-spring shove peaking
  near `push` px); joined (the chip is replaced by a real avatar at that slot, affordance and chip unmount, `onJoin` fires).
  A release away from the pill springs the chip back home (550 ms `cubic-bezier(0.34, 1.56, 0.64, 1)`). Reset restores
  `avatars` and the chip without transitions. Reduced motion: chip transitions off; the engine drops its springs.
- Interactions: pointer drag on the chip (pointer capture; pointerup/cancel ends); Reset button.
- Keyboard: Reset is a native button (Tab, Enter/Space) with a 2 px `--ring` outline offset 2 px on focus-visible. The drag
  itself is pointer-only, as upstream; offer another way to add a member if keyboard users need it.
