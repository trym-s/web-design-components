# Liquid Chrome

A smooth, liquid metal shader effect.

## Classification

- Category: `effects` — decorative
- Medium: React + TypeScript + Tailwind CSS v4 + three.js (@react-three/fiber, GLSL shaders); static HTML
- Framework: react
- Entry point: `upstream/examples/liquid-chrome-demo.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A smooth, liquid metal shader effect.
- Provides: Liquid Chrome
- Requires: `three`, `@react-three/fiber`, `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/liquid-chrome.json`
- Registry: https://www.chamaac.com/r/liquid-chrome.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/liquid-chrome/liquid-chrome.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/liquid-chrome.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`. Shader backgrounds draw on a canvas at runtime: port the GLSL from the component source, not the markup.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `-` | Additional CSS classes for the container |
| `speed` | `number` | `0.35` | Overall animation speed multiplier |
| `timeScale` | `number` | `0.225` | Intensity of the liquid warping |
| `color` | `string` | `"#C0C0C0"` | Color 1 (Silver/Chrome) |
| `color2` | `string` | `"#4A4A4A"` | Color 2 (Dark Gray) |

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/chamaac/registry/chamaac/liquid-chrome/liquid-chrome.tsx` — the component as the registry installs it
- `upstream/examples/liquid-chrome-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/backgrounds/liquid-chrome

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `three`, `@react-three/fiber`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### Liquid Chrome — `liquid-chrome.tsx`

Full-bleed metallic liquid: simplex-noise heightfield lit with a specular highlight, mapped between a shadow and a chrome colour.

- Props: `speed` (0.35), `timeScale` (0.225), `color` highlight (`#C0C0C0`), `color2` shadow (`#4A4A4A`), `className`.
- States: none; purely decorative, `aria`-silent. The canvas is WebGL (three.js via @react-three/fiber); it resizes with its box.
- Interactions: none — the container has `pointer-events: none`.
- Keyboard: none (not focusable).
- Reduced motion: with `prefers-reduced-motion: reduce` the canvas renders one still frame (`frameloop="demand"`) instead of animating.
