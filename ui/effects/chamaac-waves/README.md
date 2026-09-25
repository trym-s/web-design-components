# Waves

A smooth, shader-based wave animation component.

## Classification

- Category: `effects` — decorative
- Medium: React + TypeScript + Tailwind CSS v4 + three.js (@react-three/fiber, GLSL shaders); static HTML
- Framework: react
- Entry point: `upstream/examples/waves-demo.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A smooth, shader-based wave animation component.
- Provides: Waves
- Requires: `three`, `@react-three/fiber`, `@react-three/drei`, `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/waves.json`
- Registry: https://www.chamaac.com/r/waves.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/waves/waves.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/waves.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`. Shader backgrounds draw on a canvas at runtime: port the GLSL from the component source, not the markup.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `-` | Additional CSS classes for the container |
| `backgroundColor` | `string` | `"#000000"` | Background color of the canvas |
| `waveColor1` | `string` | `"#071697"` | Primary wave color (Teal/Blue) |
| `waveColor2` | `string` | `"#00d4ff"` | Highlight wave color (Cyan) |
| `waveColor3` | `string` | `"#000000"` | Deep/Valley wave color (Black) |
| `waveSpeedX` | `number` | `0.0125` | Speed on X axis |
| `waveSpeedY` | `number` | `0.005` | Speed on Y axis |
| `waveAmpX` | `number` | `32` | Amplitude on X axis |

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/chamaac/registry/chamaac/waves/waves.tsx` — the component as the registry installs it
- `upstream/examples/waves-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/backgrounds/waves

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `three`, `@react-three/fiber`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### Waves — `waves.tsx`

Full-bleed 3D surface: a 128×128 plane tilted back 0.2 rad, displaced by 3D simplex noise and coloured valley → mid → peak. drei's `shaderMaterial` is replaced by a plain `THREE.ShaderMaterial`.

- Props: `backgroundColor` (`#000000`), `waveColor1` mid (`#071697`), `waveColor2` peak (`#00d4ff`), `waveColor3` valley (`#000000`), `waveSpeedX` (0.0125), `waveSpeedY` (0.005), `waveAmpX` (32), `className`.
- States: none; purely decorative, `aria`-silent. The canvas is WebGL (three.js via @react-three/fiber); it resizes with its box.
- Interactions: none — the container has `pointer-events: none`.
- Keyboard: none (not focusable).
- Reduced motion: with `prefers-reduced-motion: reduce` the canvas renders one still frame (`frameloop="demand"`) instead of animating.
