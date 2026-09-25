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

- `ui/_sources/chamaac/registry/chamaac/waves/waves.tsx` — the component as the registry installs it
- `upstream/examples/waves-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/backgrounds/waves
