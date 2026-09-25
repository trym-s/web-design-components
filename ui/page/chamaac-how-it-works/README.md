# How It Works

A 5-step process flow with cards and connecting lines.

## Classification

- Category: `page` — structural
- Medium: React + TypeScript + Tailwind CSS v4; static HTML
- Framework: react
- Entry point: `upstream/examples/how-it-works-demo.tsx`
- Nature: structural; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A 5-step process flow with cards and connecting lines.
- Provides: How It Works
- Requires: React and Tailwind v4
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/how-it-works.json`
- Registry: https://www.chamaac.com/r/how-it-works.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/how-it-works/how-it-works.tsx`

## How an agent uses this reference

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/how-it-works.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `features` | `Step[]` | `Default steps` | Array of step objects { title, description, colorTheme, colors }. |
| `stepPositions` | `StepPosition[]` | `Default positions` | Array of position objects { className, rotate }. |
| `className` | `string` | `-` | Optional className for styling. |

## Files

- `ui/_sources/chamaac/registry/chamaac/how-it-works/how-it-works.tsx` — the component as the registry installs it
- `upstream/examples/how-it-works-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/sections/how-it-works
