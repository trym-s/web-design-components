# Gauge

A customizable semi-circular gauge component for visualizing metrics and performance scores.

## Classification

- Category: `data-visualization` — structural
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `upstream/examples/gauge-demo.tsx`
- Nature: structural; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A customizable semi-circular gauge component for visualizing metrics and performance scores.
- Provides: Gauge
- Requires: `motion`, `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/gauge.json`
- Registry: https://www.chamaac.com/r/gauge.json
- Local source fallback: `upstream/examples/gauge-demo.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/gauge.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | `70` | The current value to display (0-100 by default) |
| `min` | `number` | `0` | Minimum value of the gauge |
| `max` | `number` | `100` | Maximum value of the gauge |
| `size` | `number` | `400` | Diameter of the gauge in pixels |
| `gap` | `number` | `4` | Gap between bars in degrees |
| `thickness` | `number` | `10` | Thickness of the gauge bars in pixels |
| `activeColor` | `string` | `"bg-blue-600"` | Tailwind class for the active bar color |
| `inactiveColor` | `string` | `"bg-blue-100"` | Tailwind class for the inactive bar color |
| `showValue` | `boolean` | `true` | Whether to display the value text |
| `label` | `string` | `"Performance"` | Label text displayed below the value |
| `delay` | `number` | `25` | Delay in milliseconds between each bar's animation |

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/examples/gauge-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/sections/gauge

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `motion`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### Gauge — `gauge.tsx`

A semicircle of `180 / gap` rounded bars (length size/8) around a centre readout. After mount the bars up to the value light one by one (`delay` ms apart) while the percentage counts up over the same time. Below a 640 px viewport it switches to 280 px / 6 px bars; below md it is scaled to 70 %.

- Props: `value` (70), `min` (0), `max` (100), `size` (400 px), `gap` (4°), `thickness` (10 px), `activeColor` / `inactiveColor` (classes; defaults use `--gauge-active` = Tailwind blue-600 and `--gauge-inactive` = blue-100), `showValue` (true), `label` ("Performance"), `delay` (25 ms), `className`.
- States: unlit → lit bars; the readout is `--foreground`.
- Interactions: none.
- Keyboard: none; the gauge is `role="meter"` with `aria-valuemin/max/now` and `aria-label`.
- Reduced motion: bars light together and the count completes immediately.
