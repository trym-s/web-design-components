# Iridescent Windows

Iridescent Windows shader background (in the Chamaac registry source, not on the site).

> In the Chamaac registry source but not on the site and without a demo; the bank mounts it with its default props.

## Classification

- Category: `effects` — decorative
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `ui/_sources/chamaac/registry/chamaac/iridescent-windows/iridescent-windows.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: Iridescent Windows shader background (in the Chamaac registry source, not on the site).
- Provides: Iridescent Windows
- Requires: React and Tailwind v4
- Variants: default
- Upstream: Chamaac UI · source-only
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/iridescent-windows/iridescent-windows.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/iridescent-windows.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://github.com/amarnathdhumal/chamaacui/tree/main/registry/chamaac/iridescent-windows

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `three`, `@react-three/fiber`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### Iridescent Windows — `iridescent-windows.tsx`

Block-level panel (fills its parent, at least 400 px tall): a grid of 'windows' from a complex-valued `tan()` field, filled with swirling bands in a three-tone palette and crossed by a travelling squiggle.

- Props: `speed` (1.5), `scale` (15), `themeColors` [dark, mid, light] (`#4c6663`, `#6f8f8a`, `#b8cbc8`), `color` (`#8d9db3`; derives the palette when `themeColors` is omitted — note the default `themeColors` always wins), `backgroundColor` (`#000000`), `className`.
- States: none; purely decorative, `aria`-silent. The canvas is WebGL (three.js via @react-three/fiber); it resizes with its box.
- Interactions: none — the container has `pointer-events: none`.
- Keyboard: none (not focusable).
- Reduced motion: with `prefers-reduced-motion: reduce` the canvas renders one still frame (`frameloop="demand"`) instead of animating.
