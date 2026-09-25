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

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
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

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/chamaac/registry/chamaac/light-speed/light-speed.tsx` — the component as the registry installs it
- `upstream/examples/light-speed-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/backgrounds/light-speed

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `three`, `@react-three/fiber`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### Light Speed — `light-speed.tsx`

Full-bleed warp tunnel: `particleCount` thin stretched spheres (instanced) fly toward the camera inside a cylinder, fade into exponential fog, and glow through a bloom pass. The `@react-three/postprocessing` Bloom is rebuilt on three.js's own `EffectComposer` + `UnrealBloomPass` (strength 0.4, radius 0.1, threshold 0.2, tuned to match); the frame delta is clamped to 0.1 s so returning to a background tab does not bunch the streaks. Named and default export.

- Props: `particleCount` (1000), `speed` (2.4), `lightColor` (`#b026ff`), `intensity` (3, multiplies the colour into bloom range), `radius` (25), `cylinderLength` (150), `backgroundColor` (`#000000`, scene and fog colour), `className`.
- States: none; purely decorative, `aria`-silent. The canvas is WebGL (three.js via @react-three/fiber); it resizes with its box.
- Interactions: none — the container has `pointer-events: none`.
- Keyboard: none (not focusable).
- Reduced motion: with `prefers-reduced-motion: reduce` the canvas renders one still frame (`frameloop="demand"`) instead of animating.
