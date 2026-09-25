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

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
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

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/chamaac/registry/chamaac/stats-cards/stats-cards.tsx` — the component as the registry installs it
- `upstream/examples/stats-cards-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/sections/stats-cards

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `motion`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only; `src/demo-assets/` holds its sample media. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### StatsCards — `stats-cards.tsx`

Four overlapping cards on an accent-tinted strip, each slightly rotated (−3°, 2°, 8°, −4°): a `--card` stat card in the accent colour, a photo with a badge (top-left), an accent-filled stat card, and a photo with a badge (bottom-right). Upstream hard-coded the copy; it is now props. Named and default export.

- Props: `stats` ([card 1, card 3], each {value, label, description}), `images` ([card 2, card 4], each {src, alt, badge}), `width` (`w-70`), `height` (`h-84`), `className`. Colours: `--stats-cards-accent` (`#FF4400`), `--stats-cards-accent-foreground` (white), `--stats-cards-surface` (Tailwind orange-50); font `--font-stats-cards` (Inter, then the system sans).
- States: hovered card straightens, scales to 1.05 (accent card 1.02) and comes to the front.
- Interactions: hover.
- Keyboard: none.
- Reduced motion: wrapped in `MotionConfig reducedMotion="user"`, so transform and layout animations jump to their end state when the user asks for reduced motion; opacity and colour still fade.
