# Premium Button

A high-quality button with a dynamic arrow animation.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS v4; static HTML
- Framework: react
- Entry point: `upstream/examples/premium-button-demo.tsx`
- Nature: interactive; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A high-quality button with a dynamic arrow animation.
- Provides: Premium Button
- Requires: `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/premium-button.json`
- Registry: https://www.chamaac.com/r/premium-button.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/premium-button/premium-button.tsx`

## How an agent uses this reference

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/premium-button.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `"Premium Button"` | The text to display inside the button |
| `className` | `string` | `-` | Additional CSS classes for the button |
| `onClick` | `() => void` | `-` | Click handler function |

## Files

- `ui/_sources/chamaac/registry/chamaac/premium-button/premium-button.tsx` — the component as the registry installs it
- `upstream/examples/premium-button-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/buttons/premium-button
