# Glassy Boxes

Glassy Boxes shader background (in the Chamaac registry source, not on the site).

> In the Chamaac registry source but not on the site and without a demo; the bank mounts it with its default props.

## Classification

- Category: `effects` — decorative
- Medium: React + TypeScript + Tailwind CSS v4; static HTML
- Framework: react
- Entry point: `ui/_sources/chamaac/registry/chamaac/glassy-boxes/glassy-boxes.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: Glassy Boxes shader background (in the Chamaac registry source, not on the site).
- Provides: Glassy Boxes
- Requires: React and Tailwind v4
- Variants: default
- Upstream: Chamaac UI · source-only
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/glassy-boxes/glassy-boxes.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/glassy-boxes.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://github.com/amarnathdhumal/chamaacui/tree/main/registry/chamaac/glassy-boxes

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `three`, `@react-three/fiber`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### Glassy Boxes — `glassy-boxes.tsx`

Block-level panel (fills its parent). Three drifting colour points blend by inverse-square weight, fading to white toward the top; along the sides and bottom a grid of frosted rounded boxes (100 px on a 154 px pitch, device pixels) refracts the gradient with a top-left highlight.

- Props: `color1` (`#2c73d2`), `color2` (`#00a6a6`), `color3` (`#f1e3a0`), `className`.
- States: none; purely decorative, `aria`-silent. The canvas is WebGL (three.js via @react-three/fiber); it resizes with its box.
- Interactions: none — the container has `pointer-events: none`.
- Keyboard: none (not focusable).
- Reduced motion: with `prefers-reduced-motion: reduce` the canvas renders one still frame (`frameloop="demand"`) instead of animating.
