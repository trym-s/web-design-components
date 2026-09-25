# Electric Mist

A high-energy glowing lightning shader with waves and smoke effects.

## Classification

- Category: `effects` — decorative
- Medium: React + TypeScript + Tailwind CSS v4 + three.js (@react-three/fiber, GLSL shaders); static HTML
- Framework: react
- Entry point: `upstream/examples/electric-mist-demo.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A high-energy glowing lightning shader with waves and smoke effects.
- Provides: Electric Mist
- Requires: `three`, `@react-three/fiber`, `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/electric-mist.json`
- Registry: https://www.chamaac.com/r/electric-mist.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/electric-mist/electric-mist.tsx`

## How an agent uses this reference

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/electric-mist.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`. Shader backgrounds draw on a canvas at runtime: port the GLSL from the component source, not the markup.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `-` | Additional CSS classes for the container |
| `color` | `string` | `"#191970"` | Base color of the lighting effect |
| `speed` | `number` | `1.0` | Overall animation speed multiplier |
| `detail` | `number` | `1.5` | Frequency and detail of the smoke pattern |
| `distortion` | `number` | `3.0` | Intensity of the energy distortion |
| `brightness` | `number` | `1.0` | Glow intensity threshold |

## Files

- `ui/_sources/chamaac/registry/chamaac/electric-mist/electric-mist.tsx` — the component as the registry installs it
- `upstream/examples/electric-mist-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/backgrounds/electric-mist
