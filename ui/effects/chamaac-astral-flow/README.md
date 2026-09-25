# Astral Flow

A majestic, constantly breathing radial shader with deep cosmic wisps and a beautiful flowing continuous animation.

## Classification

- Category: `effects` — decorative
- Medium: React + TypeScript + Tailwind CSS v4 + three.js (@react-three/fiber, GLSL shaders); static HTML
- Framework: react
- Entry point: `src/examples/astral-flow-demo.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A majestic, constantly breathing radial shader with deep cosmic wisps and a beautiful flowing continuous animation.
- Provides: Astral Flow
- Requires: `three`, `@react-three/fiber`, `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/astral-flow.json`
- Registry: https://www.chamaac.com/r/astral-flow.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/astral-flow/astral-flow.tsx`

## How an agent uses this reference

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `src/examples/`, changing only import paths.
- **Any other stack** — `static/astral-flow.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`. Shader backgrounds draw on a canvas at runtime: port the GLSL from the component source, not the markup.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `-` | Additional CSS classes for the container |
| `color1` | `string` | `"#05070a"` | Deep void blue-black base color |
| `color2` | `string` | `"#2e1a38"` | Moody dark plum/purple mid-tones |
| `color3` | `string` | `"#a0769a"` | Glowing ethereal mauve/silver highlights |
| `speed` | `number` | `1.5` | Overall animation speed multiplier |
| `flowMin` | `number` | `3.0` | Minimum limit for the structural breathe oscillation. |
| `flowMax` | `number` | `7.0` | Maximum limit for the structural breathe oscillation. |

## Files

- `ui/_sources/chamaac/registry/chamaac/astral-flow/astral-flow.tsx` — the component as the registry installs it
- `src/examples/astral-flow-demo.tsx` — the site's demo
- `src/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/backgrounds/astral-flow
