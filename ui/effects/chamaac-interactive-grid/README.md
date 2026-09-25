# Interactive Grid Background

A highly interactive, mouse-sensitive grid background.

## Classification

- Category: `effects` — decorative
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `upstream/examples/interactive-grid-demo.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A highly interactive, mouse-sensitive grid background.
- Provides: Interactive Grid Background
- Requires: React and Tailwind v4
- Variants: default
- Upstream: Chamaac UI · published
- Local source fallback: `upstream/examples/interactive-grid-demo.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/interactive-grid.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `gridGap` | `number` | `40` | Distance between grid dots in pixels |
| `dotSize` | `number` | `1.5` | Radius of the dots |
| `radius` | `number` | `300` | Radius of the mouse interaction zone |
| `color` | `string` | `"#737373"` | Base color of the dots |
| `highlightColor` | `string` | `"#FFFF00"` | Color of the dots active hover |

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/examples/interactive-grid-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/backgrounds/interactive-grid

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### InteractiveGridBackground — `interactive-grid-background.tsx`

A section background: a 2D canvas of dots on a `--background` surface with `children` layered above (children get `pointer-events: none`; re-enable on buttons). Named and default export.

- Props: `gridGap` (40 px), `dotSize` (1.5 px), `color` (resting dots; default the `--interactive-grid-dot` variable, declared as `--muted-foreground`), `highlightColor` (default `--interactive-grid-highlight`, declared `yellow`), `radius` (300 px), `className` (default height `h-screen`), any `div` attribute, `children`.
- States: resting dots at 50 % opacity; within `radius` of the pointer each dot grows by up to 2 px and gains opacity linearly; in the inner half it switches to the highlight colour.
- Interactions: `mousemove` over the container moves the influence point; `mouseleave` resets it. The canvas is redrawn every animation frame and resized with the window.
- Keyboard: none.
- Reduced motion: nothing moves on its own; the response follows the pointer only.
