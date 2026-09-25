# Dancing Letters

Physics-based interactive text animations.

## Classification

- Category: `animation` — decorative
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `src/examples/dancing-letters-demo.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: Physics-based interactive text animations.
- Provides: Dancing Letters
- Requires: `motion`, `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/dancing-letters.json`
- Registry: https://www.chamaac.com/r/dancing-letters.json
- Local source fallback: `src/examples/dancing-letters-demo.tsx`

## How an agent uses this reference

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `src/examples/`, changing only import paths.
- **Any other stack** — `static/dancing-letters.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `"ANIMATE"` | The text to display and animate. Each letter gets a unique animation. |
| `className` | `string` | `""` | Additional CSS classes for the container |
| `letterClassName` | `string` | `""` | Additional CSS classes applied to each letter |

## Files

- `src/examples/dancing-letters-demo.tsx` — the site's demo
- `src/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/text-animations/dancing-letters
