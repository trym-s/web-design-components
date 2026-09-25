# Carousel

A smooth, auto-playing 3D carousel component with layout animations using Framer Motion.

## Classification

- Category: `content` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `src/examples/coursel-demo.tsx`
- Nature: interactive; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A smooth, auto-playing 3D carousel component with layout animations using Framer Motion.
- Provides: Carousel
- Requires: `motion`, `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/carousel.json`
- Registry: https://www.chamaac.com/r/carousel.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/carousel/carousel.tsx`

## How an agent uses this reference

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `src/examples/`, changing only import paths.
- **Any other stack** — `static/carousel.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `images` | `string[]` | `-` | Array of image URLs to display in the carousel |
| `className` | `string` | `""` | Custom class names for the carousel container |
| `cardWidth` | `string \| number` | `"250px"` | Width of each carousel card |
| `cardHeight` | `string \| number` | `"284px"` | Height of each carousel card |
| `duration` | `number` | `0.5` | Animation duration in seconds for card transitions |
| `rotationAngle` | `number` | `45` | 3D rotation angle in degrees for side cards (rotateY) |

## Files

- `ui/_sources/chamaac/registry/chamaac/carousel/carousel.tsx` — the component as the registry installs it
- `src/examples/coursel-demo.tsx` — the site's demo
- `src/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/carousels/carousel
