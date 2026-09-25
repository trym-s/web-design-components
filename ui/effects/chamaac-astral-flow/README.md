# Astral Flow

A majestic, constantly breathing radial shader with deep cosmic wisps and a beautiful flowing continuous animation.

## Classification

- Category: `effects` — decorative
- Medium: React + TypeScript + Tailwind CSS v4 + three.js (@react-three/fiber, GLSL shaders); static HTML
- Framework: react
- Entry point: `upstream/examples/astral-flow-demo.tsx`
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

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
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

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/chamaac/registry/chamaac/astral-flow/astral-flow.tsx` — the component as the registry installs it
- `upstream/examples/astral-flow-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/backgrounds/astral-flow

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `three`, `@react-three/fiber`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### Astral Flow — `astral-flow.tsx`

Full-bleed smoke that breathes outward from the centre: simplex fbm warped twice, the flow distance oscillating between `flowMin` and `flowMax`, with a vignette and an SVG film-grain overlay (`mix-blend-overlay`, 40 %). The container background is `color1`, so there is no flash before WebGL starts.

- Props: `speed` (1.5), `color1` base (`#05070a`), `color2` mid (`#2e1a38`), `color3` wisps (`#a0769a`), `flowMin` (3), `flowMax` (7), `className`.
- States: none; purely decorative, `aria`-silent. The canvas is WebGL (three.js via @react-three/fiber); it resizes with its box.
- Interactions: none — the container has `pointer-events: none`.
- Keyboard: none (not focusable).
- Reduced motion: with `prefers-reduced-motion: reduce` the canvas renders one still frame (`frameloop="demand"`) instead of animating.
