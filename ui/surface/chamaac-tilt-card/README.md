# Tilt Card

Tilt Card (work in progress in the Chamaac repository).

> Work in progress in the Chamaac repository (`app/in-progress/`); not on the site yet.

## Classification

- Category: `surface` — interactive
- Medium: React + TypeScript + Tailwind CSS v4; static HTML
- Framework: react
- Entry point: `upstream/examples/tilt-card-demo.tsx`
- Nature: interactive; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: Tilt Card (work in progress in the Chamaac repository).
- Provides: Tilt Card
- Requires: React and Tailwind v4
- Variants: default
- Upstream: Chamaac UI · in-progress
- Local source fallback: `upstream/examples/tilt-card-demo.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/tilt-card.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/examples/tilt-card-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://github.com/amarnathdhumal/chamaacui/tree/main/app/in-progress/tilt-card

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `motion`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### TiltCard — `tilt-card.tsx`

Two stacked `--card` sheets (20 px radius, `--border`); the top one rests tilted by `initialRotate` and lists icon + title (`--foreground`) + description (`--muted-foreground`) rows.

- Props: `features` ({icon, title, description}[]; any icon component taking `className` — lucide in the demo instead of Tabler), `initialRotate` (7.1°), `hoverRotate` (0°), `duration` (0.3), `stiffness` (100), `damping` (5), `className`.
- States: rest (tilted) → hovered (springs to `hoverRotate` with a wobble).
- Interactions: hover the top sheet.
- Keyboard: none.
- Reduced motion: wrapped in `MotionConfig reducedMotion="user"`, so transform and layout animations jump to their end state when the user asks for reduced motion; opacity and colour still fade.
