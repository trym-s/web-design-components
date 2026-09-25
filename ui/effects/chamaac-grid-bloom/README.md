# Grid Bloom

A mesmerizing, shader-driven background with dual pulsing wave origins that create interference patterns across an animated rotating grid.

## Classification

- Category: `effects` — decorative
- Medium: React + TypeScript + Tailwind CSS v4 + three.js (@react-three/fiber, GLSL shaders); static HTML
- Framework: react
- Entry point: `src/examples/grid-bloom-demo.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A mesmerizing, shader-driven background with dual pulsing wave origins that create interference patterns across an animated rotating grid.
- Provides: Grid Bloom
- Requires: `three`, `@react-three/fiber`, `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/grid-bloom.json`
- Registry: https://www.chamaac.com/r/grid-bloom.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/grid-bloom/grid-bloom.tsx`

## How an agent uses this reference

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `src/examples/`, changing only import paths.
- **Any other stack** — `static/grid-bloom.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`. Shader backgrounds draw on a canvas at runtime: port the GLSL from the component source, not the markup.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `-` | Additional CSS classes for the container |
| `color` | `string` | `"#e040fb"` | Color of the blooming pulse pattern |
| `speed` | `number` | `1.0` | Overall animation speed multiplier |
| `gridScale` | `number` | `12.0` | Grid tile density — higher values create smaller, denser tiles |
| `rotationSpeed` | `number` | `0.0` | Speed of the slow continuous grid rotation |
| `fadeFalloff` | `number` | `10.0` | Controls how quickly the bloom fades out to the edges. Lower = sharper fade. Higher = softer/no fade. |
| `distortionAmount` | `number` | `0.05` | Amount of noise-based distortion applied to the grid lines. Setting to 0.0 gives rigid, straight lines. |
| `flowSpeedX` | `number` | `-0.2` | Horizontal scrolling speed of the grid. |
| `flowSpeedY` | `number` | `-0.4` | Vertical scrolling speed of the grid. |
| `hoverLightRadius` | `number` | `0.5` | Radius of the light illumination under the mouse. Higher = larger light aura. |
| `hoverRepulsionRadius` | `number` | `1.0` | Radius of the structural push effect from the mouse. |
| `hoverRepulsionStrength` | `number` | `0.6` | Strength of the geometric push effect from the mouse. Setting to 0.0 disables the warp. |
| `enableMouseInteraction` | `boolean` | `true` | Enables or disables mouse hover interaction (light aura and grid repulsion effect). Set to false to disable all mouse-driven effects. |

## Files

- `ui/_sources/chamaac/registry/chamaac/grid-bloom/grid-bloom.tsx` — the component as the registry installs it
- `src/examples/grid-bloom-demo.tsx` — the site's demo
- `src/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/backgrounds/grid-bloom
