# Nebula

A mesmerizing, shader-driven nebula animation using domain warping for a deep space effect.

## Classification

- Category: `effects` — decorative
- Medium: React + TypeScript + Tailwind CSS v4 + three.js (@react-three/fiber, GLSL shaders); static HTML
- Framework: react
- Entry point: `upstream/examples/nebula-demo.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A mesmerizing, shader-driven nebula animation using domain warping for a deep space effect.
- Provides: Nebula
- Requires: `three`, `@react-three/fiber`, `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/nebula.json`
- Registry: https://www.chamaac.com/r/nebula.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/nebula/nebula.tsx`

## How an agent uses this reference

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/nebula.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`. Shader backgrounds draw on a canvas at runtime: port the GLSL from the component source, not the markup.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `-` | Additional CSS classes for the container |
| `speed` | `number` | `2.0` | Overall animation speed multiplier |
| `color1` | `string` | `"#5efff4"` | Highlight/fracture color |
| `color2` | `string` | `"#763b65"` | Main nebula cloud color |
| `color3` | `string` | `"#1a0b2e"` | Deep space background color |

## Files

- `ui/_sources/chamaac/registry/chamaac/nebula/nebula.tsx` — the component as the registry installs it
- `upstream/examples/nebula-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/backgrounds/nebula
