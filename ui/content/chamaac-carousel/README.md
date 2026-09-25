# Carousel

A smooth, auto-playing 3D carousel component with layout animations using Framer Motion.

## Classification

- Category: `content` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `upstream/examples/coursel-demo.tsx`
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

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
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

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/chamaac/registry/chamaac/carousel/carousel.tsx` — the component as the registry installs it
- `upstream/examples/coursel-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/carousels/carousel

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `motion`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only; `src/demo-assets/` holds its sample media. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### Carousel — `carousel.tsx`

Three photo cards in a row with 1200 px perspective: the left and right ones turned inward by `rotationAngle` and scaled to 0.9, the centre one full size and on top. Every `interval` the set advances by one and cards glide to their new slots (shared-layout animation). Upstream named it `Coursel`.

- Props: `images` (URLs, at least 3), `cardWidth` (`250px`), `cardHeight` (`284px`), `duration` (0.5 s), `rotationAngle` (45°), `interval` (3000 ms), `className`.
- States: none beyond the current index.
- Interactions: none (autoplay only).
- Keyboard: none.
- Reduced motion: wrapped in `MotionConfig reducedMotion="user"`, so transform and layout animations jump to their end state when the user asks for reduced motion; opacity and colour still fade.
