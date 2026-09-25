# Feature Steps

A dynamic feature showcase component with auto-playing steps and synchronized image transitions.

## Classification

- Category: `page` — structural
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `src/examples/feature-steps-demo.tsx`
- Nature: structural; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A dynamic feature showcase component with auto-playing steps and synchronized image transitions.
- Provides: Feature Steps
- Requires: `motion`, `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/feature-steps.json`
- Registry: https://www.chamaac.com/r/feature-steps.json
- Local source fallback: `src/examples/feature-steps-demo.tsx`

## How an agent uses this reference

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `src/examples/`, changing only import paths.
- **Any other stack** — `static/feature-steps.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `features` | `Feature[]` | `-` | Array of feature objects containing title, content, and image. |
| `autoPlayInterval` | `number` | `6000` | Interval in milliseconds for auto-playing steps. |
| `imageClassName` | `string` | `"h-[400px]"` | Tailwind class for the height of the image container, useful for mobile responsiveness. |
| `className` | `string` | `""` | Additional classes for the container. |

## Files

- `src/examples/feature-steps-demo.tsx` — the site's demo
- `src/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/sections/feature-steps
