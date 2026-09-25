# Gooey tabs

Pinned interactive demo from Liquid Gooey. It preserves the upstream Move behavior,
values, accessibility roles, pointer handling, and controls. Use the visual/interaction decisions
as a reference and translate them into the target project's framework and conventions.

## Classification

- Category: navigation
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

### GooeyTabs — `gooey-tabs.tsx`

- Props: `tabs` (`{ value, label }[]`), `value` / `defaultValue` (first) / `onValueChange(value)`, `aria-label` ("Mode"), `duration`
  (250 ms), `easing` (`cubic-bezier(0.3, 1.05, 0.4, 1)`), `springiness` (0.5 — how tightly the liquid chases the indicator),
  `trail` (0.575 — size of the trailing droplet), `blur` (3.5), `contrast` (18), `shadow` (two soft drops in the declared
  `--gooey-tab-shadow-1/2`), `className`.
- Structure: an inline pill row (3 px padding and gaps) of 30 px `role="tab"` buttons (12 px side padding, 13 px medium; active
  `--primary-foreground`, others `--foreground` at 75 %, hover full). The only surface is the liquid indicator filled `--primary`,
  a 30 px pill carried under the active tab.
- States / motion: selecting a tab slides the indicator's position and width over `duration` with `easing`; the liquid follows it
  with a spring (`springiness`) and leaves a droplet trailing behind that melts back in, so the pill appears to pour between
  tabs. Tab text colours cross-fade over 250 ms.
- Keyboard: tabs are buttons in a `role="tablist"` (Tab / Enter / Space; add arrow-key roving in the host if needed);
  focus-visible 2 px `--ring` outline.
