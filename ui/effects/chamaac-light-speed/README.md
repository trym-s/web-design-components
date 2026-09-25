# Light Speed

A Warp/Light-Speed hyperspace animation inspired by the Ducky3D Blender tutorial.

## Classification

- Category: `effects` — decorative
- Medium: React + TypeScript + Tailwind CSS v4 + three.js (@react-three/fiber, GLSL shaders); static HTML
- Framework: react
- Entry point: `upstream/examples/light-speed-demo.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A Warp/Light-Speed hyperspace animation inspired by the Ducky3D Blender tutorial.
- Provides: Light Speed
- Requires: `three`, `@react-three/fiber`, `@react-three/postprocessing`, `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/light-speed.json`
- Registry: https://www.chamaac.com/r/light-speed.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/light-speed/light-speed.tsx`

## How an agent uses this reference

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/light-speed.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`. Shader backgrounds draw on a canvas at runtime: port the GLSL from the component source, not the markup.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `-` | Additional CSS classes for the container |
| `speed` | `number` | `2.4` | Warp speed multiplier |
| `particleCount` | `number` | `1000` | Number of stars/streaks in the scene |
| `lightColor` | `string` | `"#b026ff"` | Base color of the emitted light streaks |
| `intensity` | `number` | `3.0` | Glow multiplier to create HDR bloom |
| `radius` | `number` | `25` | Maximum radius of the particle spawns (tunnel width) |
| `cylinderLength` | `number` | `150` | Depth of the field before looping starts |

## Files

- `ui/_sources/chamaac/registry/chamaac/light-speed/light-speed.tsx` — the component as the registry installs it
- `upstream/examples/light-speed-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/backgrounds/light-speed
