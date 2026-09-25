# Svg Animation

Svg Animation (work in progress in the Chamaac repository).

> Work in progress in the Chamaac repository (`app/in-progress/`); not on the site yet.

## Classification

- Category: `animation` — decorative
- Medium: React + TypeScript + Tailwind CSS v4; static HTML
- Framework: react
- Entry point: `upstream/examples/svg-animation-demo.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: Svg Animation (work in progress in the Chamaac repository).
- Provides: Svg Animation
- Requires: React and Tailwind v4
- Variants: default
- Upstream: Chamaac UI · in-progress
- Local source fallback: `upstream/examples/svg-animation-demo.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/svg-animation.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/examples/svg-animation-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://github.com/amarnathdhumal/chamaacui/tree/main/app/in-progress/svg-animaiton

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `motion`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only; `src/demo-assets/` holds its sample media. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### SvgAnimation — `svg-animation.tsx`

A 600 px tall `--background` band: a column of capability rows (423×74 px, `--foreground` at 5 % fill, 10 % border, mono labels, an icon each), six curved connectors (309×422 SVG) converging on a 100 px circular image. A coloured pulse slides along every connector forever (gradient endpoints animated; 2–3 s per path).

- Props: `trends` ({id, name, icon}[]; any icon component taking `size` / `className` — lucide in the demo instead of Tabler), `imageSrc` (required), `imageAlt`, `delay` (0.1 s stagger), `accents` (six [colour, colour] pairs for the pulses; defaults to upstream's palette), `onSelect(id)`, `className` (replaces upstream's `backgroundColor` class prop). The connector base colour is `--svg-animation-line` (default `#313131`).
- States: rows and image fade/slide in when scrolled into view.
- Interactions: clicking a row calls `onSelect`.
- Keyboard: rows are buttons (Tab, Enter/Space) with a `--ring` focus ring.
- Reduced motion: wrapped in `MotionConfig reducedMotion="user"`, so transform and layout animations jump to their end state when the user asks for reduced motion; opacity and colour still fade.
