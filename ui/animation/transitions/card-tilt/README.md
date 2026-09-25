# Card Tilt

A card / tile / media surface that tilts in 3D toward the pointer while hovered, with a soft light "glare" tracking the cursor across it.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the pointer tilt and glare

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`). `card-tilt.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### TiltCard — `card-tilt.tsx`

- Props: `children`, `max` (32° total tilt range → ±16° at the edges), `className` (size and surface of the card).
- Structure: an inline-block wrapper (`touch-action: none`) around the card (radius `--radius + 2px`, overflow hidden,
  `preserve-3d`) and a glare layer: three stacked radial gradients (95 / 200 / 360 px) of `--tilt-glare` (white, declared on
  the wrapper) centred on the pointer, `mix-blend-mode: screen`.
- Motion: pointer x/y (0–1) → `rotateY((x−0.5)·max)`, `rotateX((0.5−y)·max)` under `perspective(--tilt-perspective)` (1000 px);
  while moving the transform follows over `--tilt-follow` (400 ms), and on leave it returns to flat over `--tilt-return`
  (1000 ms), both `cubic-bezier(0.22, 1, 0.36, 1)`. The glare fades to `--tilt-glare-opacity` (0.32) over `--tilt-glare-fade`
  (300 ms) while hovered. Reduced motion: no tilt.
- Keyboard: none (pointer effect).
