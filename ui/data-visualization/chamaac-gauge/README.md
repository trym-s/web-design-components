# Gauge

A customizable semi-circular gauge component for visualizing metrics and performance scores.

## Classification

- Category: `data-visualization` — structural
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `src/examples/gauge-demo.tsx`
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
- Local source fallback: `src/examples/gauge-demo.tsx`

## How an agent uses this reference

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `src/examples/`, changing only import paths.
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

- `src/examples/gauge-demo.tsx` — the site's demo
- `src/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/sections/gauge
