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

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
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

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/chamaac/registry/chamaac/nebula/nebula.tsx` — the component as the registry installs it
- `upstream/examples/nebula-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/backgrounds/nebula

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `three`, `@react-three/fiber`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### Nebula — `nebula.tsx`

Full-bleed domain-warped fbm noise (6 octaves) mixing three colours, darkened toward the edges; `position: absolute; inset: 0`, so place it in a positioned box. Frame updates are capped at ~30 fps.

- Props: `speed` (2), `color1` highlight (`#5efff4`), `color2` cloud (`#763b65`), `color3` deep space (`#1a0b2e`) — any CSS colour three.js parses; `className`.
- States: none; purely decorative, `aria`-silent. The canvas is WebGL (three.js via @react-three/fiber); it resizes with its box.
- Interactions: none — the container has `pointer-events: none`.
- Keyboard: none (not focusable).
- Reduced motion: with `prefers-reduced-motion: reduce` the canvas renders one still frame (`frameloop="demand"`) instead of animating.
