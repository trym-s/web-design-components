# Gooey liquid slider

Pinned interactive demo from Liquid Gooey. It preserves the upstream Move behavior,
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

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--foreground`, `--border`, `--ring`, …).
It imports only `react`, `react-dom`, `clsx` and `tailwind-merge`. `src/liquid-gooey/` is a vendored copy of `liquid-gooey` 0.1.0
(MIT, Jakub Antalik; licence in `src/liquid-gooey/LICENSE`; the few bank edits are listed in the header of its `index.ts`).
The root declares `--gooey-thumb` (the liquid thumb fill, default `oklch(1 0 0)`, dark `oklch(0.44 0 0)`) and `--gooey-drop`
(thumb shadow colour, default `oklch(0 0 0 / 0.08)`, dark `oklch(0 0 0 / 0.24)`). `src/demo.tsx` is sample wiring only.

### GooeyLiquidSlider — `gooey-liquid-slider.tsx`

- Props: `value` / `defaultValue` (uncontrolled default ≈ 44.7, the upstream 84 px of 188 px travel), `min` (0), `max` (100),
  `step` (1, keyboard), `onValueChange(value)`, `blur` (goo blur σ, 6), `contrast` (18), `shadow` (`box-shadow` syntax on the
  liquid thumb; default `0 0 0 1px var(--border), 0 1px 5px var(--gooey-drop)`), Move tuning `springiness` (0.5), `stretch` (0.6),
  `trail` (0.35), `aria-label` ("Value"), `className`.
- Structure: a 240×80 px `Liquid` group filled with `--gooey-thumb`. Behind the goo layer (z-index −2) an 8 px track, inset 14 px
  left/right, top 38 px, fully rounded, `--foreground` at 10 % with a 1 px inset `--border` ring. On top a `Liquid.Item effect="move"`
  wrapping the thumb: an unstyled 24 px round `role="slider"` box at left 14 px / top 30 px, moved by `translateX(0…188 px)`;
  its visible surface and shadow are the liquid blob, which lags behind on a spring, stretches with velocity and trails a droplet
  tail (engine defaults at springiness 0.5 ≈ stiffness 380). `aria-valuemin/max/now` (now rounded).
- States: idle (round liquid thumb); moving (the drop stretches along the track and a tail follows, settling with a small wobble);
  focus-visible → 2 px `--ring` outline, 4 px offset.
- Interactions: pointer down on the thumb captures the pointer; the thumb follows the pointer 1:1 (offset kept from the press
  point), clamped to the track; `cursor: grab` / `grabbing`, `touch-action: none`. The track itself is not clickable (upstream).
- Keyboard (bank addition; upstream had none): ArrowRight/ArrowUp +`step`, ArrowLeft/ArrowDown −`step`, PageUp/PageDown ±10 % of
  the range, Home → `min`, End → `max`; values clamp to `min…max`.
