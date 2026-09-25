# Hover Arrow Button

A button with a smooth hover arrow swap animation.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `src/examples/hover-arrow-button-demo.tsx`
- Nature: interactive; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A button with a smooth hover arrow swap animation.
- Provides: Hover Arrow Button
- Requires: `motion`, `clsx`, `tailwind-merge`, `@tabler/icons-react`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/hover-arrow-button.json`
- Registry: https://www.chamaac.com/r/hover-arrow-button.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/hover-arrow-button/hover-arrow-button.tsx`

## How an agent uses this reference

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `src/examples/`, changing only import paths.
- **Any other stack** — `static/hover-arrow-button.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `"Get Started"` | The text to be displayed inside the button |
| `duration` | `number` | `0.3` | Duration of the arrow swap animation in seconds |
| `iconSize` | `number` | `24` | Size of the arrow icon in pixels |
| `className` | `string` | `""` | Custom class names for styling |
| `onClick` | `() => void` | `-` | Click handler function |

## Files

- `ui/_sources/chamaac/registry/chamaac/hover-arrow-button/hover-arrow-button.tsx` — the component as the registry installs it
- `src/examples/hover-arrow-button-demo.tsx` — the site's demo
- `src/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/buttons/hover-arrow-button
