# Deform Tunnel

Deform Tunnel (work in progress in the Chamaac repository).

> Work in progress in the Chamaac repository (`app/in-progress/`); not on the site yet.

## Classification

- Category: `effects` — decorative
- Medium: React + TypeScript + Tailwind CSS v4; static HTML
- Framework: react
- Entry point: `upstream/examples/deform-tunnel-demo.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: Deform Tunnel (work in progress in the Chamaac repository).
- Provides: Deform Tunnel
- Requires: React and Tailwind v4
- Variants: default
- Upstream: Chamaac UI · in-progress
- Local source fallback: `upstream/examples/deform-tunnel-demo.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/deform-tunnel.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/examples/deform-tunnel-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://github.com/amarnathdhumal/chamaacui/tree/main/app/in-progress/deform-tunnel

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `three`, `@react-three/fiber`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only; `src/demo-assets/` holds its sample media. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### Deform Tunnel — `deform-tunnel.tsx`

Full-bleed ray-marched tunnel (64 steps) whose walls sample `imageSrc` with mirrored repeat, wobbling over time with a glow decay. The texture is required — upstream defaulted to a remote Unsplash photo; the demo passes a local copy.

- Props: `imageSrc` (required URL), `speed` (1), `wobble` [2.5, 1.2], `depth` (5), `scale` (0.3), `decay` (0.8), `exposure` (8.5), `backgroundColor` (`#000000`), `className`.
- States: none; purely decorative, `aria`-silent. The canvas is WebGL (three.js via @react-three/fiber); it resizes with its box.
- Interactions: hovering the canvas (crosshair cursor) eases a local ripple in (damping 0.05) that deepens and bends the tunnel toward the pointer; leaving eases it out.
- Keyboard: none (not focusable).
- Reduced motion: with `prefers-reduced-motion: reduce` the canvas renders one still frame (`frameloop="demand"`) instead of animating.
