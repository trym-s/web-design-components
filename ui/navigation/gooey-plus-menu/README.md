# Gooey plus menu

Pinned interactive demo from Liquid Gooey. It preserves the upstream Morph behavior,
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

### GooeyPlusMenu — `gooey-plus-menu.tsx`

- Props: `items` (`{ label, icon, x, y, onSelect? }[]` — each satellite's open offset from the main button, px), `open` /
  `defaultOpen` / `onOpenChange(open)`, `openLabel` ("Open menu"), `closeLabel` ("Close menu"), `openDuration` (550 ms),
  `openEasing` (`cubic-bezier(0.34, 1.56, 0.64, 1)`), `openStagger` (40 ms), `closeDuration` (250 ms), `closeEasing`
  (`cubic-bezier(0.22, 1, 0.36, 1)`), `closeStagger` (0), `spread` (×1 on every offset), `iconFade` (180 ms), `iconDelay` (120 ms),
  `anticipationDistance` (5 px), `anticipationDuration` (700 ms), `blur` (6), `contrast` (18), `shadow`, `className`.
- Structure: a 200×140 px liquid stage filled `--popover`; the 40 px round main button (20 px "+") and every satellite (40 px, 16 px
  icon) start stacked at (80, 80), so closed they are one blob.
- States / motion: opening flies each satellite to its offset (staggered, springy easing) — the liquid stretches and pinches off
  into separate drops; icons stay hidden while merged, then fade in from a 2 px blur after `iconDelay` (+ stagger). The "+" turns
  45° into a ×. Closing flies them back (ease-out) and the whole liquid layer plus the main button dips `anticipationDistance` px
  and settles over `anticipationDuration`. Satellites get a `--foreground` 5 % hover.
- Keyboard: the main button has `aria-expanded` and swaps its label; satellites are labelled buttons, tabbable only while open;
  selecting one calls `onSelect` and closes.
