# Interactive Grid Background

A highly interactive, mouse-sensitive grid background.

## Classification

- Category: `effects` — decorative
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `src/examples/interactive-grid-demo.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A highly interactive, mouse-sensitive grid background.
- Provides: Interactive Grid Background
- Requires: React and Tailwind v4
- Variants: default
- Upstream: Chamaac UI · published
- Local source fallback: `src/examples/interactive-grid-demo.tsx`

## How an agent uses this reference

- **React + Tailwind target** — copy the component from `ui/_sources/chamaac/` and the demo from `src/examples/`, changing only import paths.
- **Any other stack** — `static/interactive-grid.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `gridGap` | `number` | `40` | Distance between grid dots in pixels |
| `dotSize` | `number` | `1.5` | Radius of the dots |
| `radius` | `number` | `300` | Radius of the mouse interaction zone |
| `color` | `string` | `"#737373"` | Base color of the dots |
| `highlightColor` | `string` | `"#FFFF00"` | Color of the dots active hover |

## Files

- `src/examples/interactive-grid-demo.tsx` — the site's demo
- `src/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/backgrounds/interactive-grid
