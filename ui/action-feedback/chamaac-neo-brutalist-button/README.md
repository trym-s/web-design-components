# Neo Brutalist Button

A bold, retro-styled button with skewed design, offset shadow, and shimmer effect.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS v4; static HTML
- Framework: react
- Entry point: `src/examples/neo-brutalist-button-demo.tsx`
- Nature: interactive; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A bold, retro-styled button with skewed design, offset shadow, and shimmer effect.
- Provides: Neo Brutalist Button
- Requires: `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/neo-brutalist-button.json`
- Registry: https://www.chamaac.com/r/neo-brutalist-button.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/neo-brutalist-button/neo-brutalist-button.tsx`

## How an agent uses this reference

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `src/examples/`, changing only import paths.
- **Any other stack** — `static/neo-brutalist-button.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `"Neo Brutalist"` | The text to display inside the button |
| `className` | `string` | `-` | Additional CSS classes for styling (colors, shadows, borders, etc.) |
| `onClick` | `() => void` | `-` | Click handler function |

## Files

- `ui/_sources/chamaac/registry/chamaac/neo-brutalist-button/neo-brutalist-button.tsx` — the component as the registry installs it
- `src/examples/neo-brutalist-button-demo.tsx` — the site's demo
- `src/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/buttons/neo-brutalist-button
