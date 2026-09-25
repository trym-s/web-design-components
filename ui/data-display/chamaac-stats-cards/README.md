# Stats Cards

A set of animated statistic cards with hover effects.

## Classification

- Category: `data-display` — structural
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `upstream/examples/stats-cards-demo.tsx`
- Nature: structural; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A set of animated statistic cards with hover effects.
- Provides: Stats Cards
- Requires: `motion`, `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/stats-cards.json`
- Registry: https://www.chamaac.com/r/stats-cards.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/stats-cards/stats-cards.tsx`

## How an agent uses this reference

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/stats-cards.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `""` | Additional classes for the container. |
| `width` | `string` | `"w-70"` | Width class for the cards. |
| `height` | `string` | `"h-84"` | Height class for the cards. |
| `images` | `string[]` | `["/images/models/1.png", "/images/models/2.png"]` | Array of image paths for the cards. |

## Files

- `ui/_sources/chamaac/registry/chamaac/stats-cards/stats-cards.tsx` — the component as the registry installs it
- `upstream/examples/stats-cards-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/sections/stats-cards
