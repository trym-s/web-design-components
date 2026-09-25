# Slide Up Button

An animated button with a slide-up text effect on hover.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `src/examples/slide-up-button-demo.tsx`
- Nature: interactive; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: An animated button with a slide-up text effect on hover.
- Provides: Slide Up Button
- Requires: `motion`, `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/slideup-button.json`
- Registry: https://www.chamaac.com/r/slideup-button.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/slideup-button/slideup-button.tsx`

## How an agent uses this reference

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `src/examples/`, changing only import paths.
- **Any other stack** — `static/slideup-button.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `-` | The content to be displayed inside the button |
| `className` | `string` | `""` | Custom class names for styling |
| `textDuration` | `number` | `0.25` | Duration in seconds for the original text slide-up animation |
| `cloneDuration` | `number` | `0.5` | Duration in seconds for the clone text slide-in animation |
| `cloneDelay` | `number` | `0.12` | Delay in seconds before the clone text animation starts |
| `buttonScale` | `number` | `0.98` | Scale value for the button on hover (1 = no scale) |
| `buttonOpacity` | `number` | `0.8` | Opacity value for the button on hover (0-1) |
| `onClick` | `() => void` | `-` | Click handler function |

## Files

- `ui/_sources/chamaac/registry/chamaac/slideup-button/slideup-button.tsx` — the component as the registry installs it
- `src/examples/slide-up-button-demo.tsx` — the site's demo
- `src/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/buttons/slideup-button
