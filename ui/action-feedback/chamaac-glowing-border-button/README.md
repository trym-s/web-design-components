# Glowing Border Button

A stylish glowing border button with a gradient border and glowing effects.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS v4; static HTML
- Framework: react
- Entry point: `upstream/examples/glowing-border-button-demo.tsx`
- Nature: interactive; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A stylish glowing border button with a gradient border and glowing effects.
- Provides: Glowing Border Button
- Requires: `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/glowing-border-button.json`
- Registry: https://www.chamaac.com/r/glowing-border-button.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/glowing-border-button/glowing-border-button.tsx`

## How an agent uses this reference

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/glowing-border-button.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `-` | Additional CSS classes to style the button |
| `onClick` | `() => void` | `-` | Click handler function |

## Files

- `ui/_sources/chamaac/registry/chamaac/glowing-border-button/glowing-border-button.tsx` — the component as the registry installs it
- `upstream/examples/glowing-border-button-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/buttons/glowing-border-button
