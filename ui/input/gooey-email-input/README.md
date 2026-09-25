# Gooey email input

Pinned interactive demo from Liquid Gooey. It preserves the upstream Morph behavior,
values, accessibility roles, pointer handling, and controls. Use the visual/interaction decisions
as a reference and translate them into the target project's framework and conventions.

## Classification

- Category: input
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

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--popover`, `--foreground`, `--primary`, `--border`, `--ring`, …). It imports only `react`, `react-dom` (via the engine), `clsx` and `tailwind-merge` (`src/lib/utils.ts`). `src/liquid-gooey/` is a vendored copy of `liquid-gooey` 0.1.0 (MIT, Jakub Antalik; licence in `src/liquid-gooey/LICENSE`): `Liquid` renders its children once as the real, accessible DOM and once as blurred shapes through an SVG goo filter (Gaussian blur `blur` σ, then an alpha-contrast step `contrast`) painted in `fill` with `shadow` on the merged outline, so neighbouring items melt together. `src/demo.tsx` is sample wiring only; colours follow `ui/_sources/liquid-gooey/SOURCE.md`.

### GooeyEmailInput — `gooey-email-input.tsx`

- Props: `value` / `defaultValue` / `onValueChange(value)`, `onSubmit(value)` (arrow button or Enter; the field then blurs),
  `placeholder` ("Enter your email"), `label` ("Email address"), `submitLabel` ("Submit email"), `duration` (600 ms), `easing`
  (`cubic-bezier(0.22, 1.3, 0.71, 1)`, overshooting), `crossBlur` (2 px), `gap` (20 px when open), `blur` (8), `contrast` (22),
  `shadow` (`0 0 0 1px var(--border) inset, 0 2px 6px var(--gooey-drop)`), `className`.
- Structure: a 290×210 px liquid stage filled `--popover`. A 202×48 px pill holds the transparent email input (14 px, 16 px on
  coarse pointers, 18 px left padding); a 44 px round submit button with an 18 px arrow sits hidden inside the pill's right end.
  `--gooey-drop` is declared on the root (`oklch(0 0 0 / 0.08)`, dark `/ 0.24`).
- States / motion: focusing the input opens it — the field slides left by (44 + gap) / 2 px and the button slides right to sit
  `gap` px away, both over `duration` with `easing`, so the liquid stretches, necks and snaps into two drops; blur reverses it.
  The arrow fades in after 12 % of the duration, and on every open/close it passes through a blur pulse (0 → `crossBlur` at 35 %
  → 0). Reduced motion: no pulse.
- Keyboard: Enter submits; the button is only tabbable while open and pointer-down on it keeps the input focused.
