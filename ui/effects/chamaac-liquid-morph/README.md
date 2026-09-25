# Liquid Morph

Liquid Morph shader background (in the Chamaac registry source, not on the site).

> In the Chamaac registry source but not on the site and without a demo; the bank mounts it with its default props.

## Classification

- Category: `effects` — decorative
- Medium: React + TypeScript + Tailwind CSS v4; static HTML
- Framework: react
- Entry point: `ui/_sources/chamaac/registry/chamaac/liquid-morph/liquid-morph.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: Liquid Morph shader background (in the Chamaac registry source, not on the site).
- Provides: Liquid Morph
- Requires: React and Tailwind v4
- Variants: default
- Upstream: Chamaac UI · source-only
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/liquid-morph/liquid-morph.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/liquid-morph.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://github.com/amarnathdhumal/chamaacui/tree/main/registry/chamaac/liquid-morph

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `three`, `@react-three/fiber`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### Liquid Morph — `liquid-morph.tsx`

Full-bleed layered Perlin noise banded into three colours with a glow in the upper right. Colours are passed to the shader as raw sRGB channels, as upstream did.

- Props: `speed` (0.5), `color1` (`#4338ca`), `color2` (`#db2777`), `color3` (`#f59e0b`), `backgroundColor` (`#000000`), `className`.
- States: none; purely decorative, `aria`-silent. The canvas is WebGL (three.js via @react-three/fiber); it resizes with its box.
- Interactions: none by default (`pointer-events: none`). Pass `className="pointer-events-auto"` to let the pointer shift the pattern (eased at 0.1 per frame); the cursor is then a crosshair.
- Keyboard: none (not focusable).
- Reduced motion: with `prefers-reduced-motion: reduce` the canvas renders one still frame (`frameloop="demand"`) instead of animating.
