# Synthesis

A professional, multi-layered cosmic flow background with extensive warping customization.

## Classification

- Category: `effects` — decorative
- Medium: React + TypeScript + Tailwind CSS v4 + three.js (@react-three/fiber, GLSL shaders); static HTML
- Framework: react
- Entry point: `upstream/examples/synthesis-demo.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A professional, multi-layered cosmic flow background with extensive warping customization.
- Provides: Synthesis
- Requires: `three`, `@react-three/fiber`, `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/synthesis.json`
- Registry: https://www.chamaac.com/r/synthesis.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/synthesis/synthesis.tsx`

## How an agent uses this reference

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/synthesis.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`. Shader backgrounds draw on a canvas at runtime: port the GLSL from the component source, not the markup.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `-` | Additional CSS classes for the container |
| `speed` | `number` | `0.4` | Overall animation speed multiplier |
| `color1` | `string` | `"#0f172a"` | First background color theme |
| `color2` | `string` | `"#3b0764"` | Second color theme |
| `color3` | `string` | `"#0ea5e9"` | Third color theme / Accent highlight |
| `scale` | `number` | `1.0` | Internal mapping scale multiplier (zoom) |
| `complexity` | `number` | `6.0` | Number of domain warping iterations (1.0 - 20.0) |
| `distortion` | `number` | `0.6` | Magnitude of the warp displacement field |
| `glowIntensity` | `number` | `0.4` | Final core glow additive mix factor |
| `flowFrequency` | `number` | `3.0` | Spatial frequency of the interference pattern |
| `contrast` | `number` | `1.2` | Final smoothstep contrast threshold |

## Files

- `ui/_sources/chamaac/registry/chamaac/synthesis/synthesis.tsx` — the component as the registry installs it
- `upstream/examples/synthesis-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/backgrounds/synthesis
