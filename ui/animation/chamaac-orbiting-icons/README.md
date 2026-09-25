# Orbiting Icons

Orbiting Icons (work in progress in the Chamaac repository).

> Work in progress in the Chamaac repository (`app/in-progress/`); not on the site yet.

## Classification

- Category: `animation` — decorative
- Medium: React + TypeScript + Tailwind CSS v4; static HTML
- Framework: react
- Entry point: `upstream/examples/orbiting-icons-demo.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: Orbiting Icons (work in progress in the Chamaac repository).
- Provides: Orbiting Icons
- Requires: React and Tailwind v4
- Variants: default
- Upstream: Chamaac UI · in-progress
- Local source fallback: `upstream/examples/orbiting-icons-demo.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/orbiting-icons.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/examples/orbiting-icons-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://github.com/amarnathdhumal/chamaacui/tree/main/app/in-progress/orbiting-icons

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `motion`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only; `src/demo-assets/` holds its sample media. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### OrbitingIcons — `orbiting-icons.tsx`

A 300×300 (md: 375×350) rounded `--muted` card: a ring of radius `radius` centred 70 px from the top turns once per `duration`, carrying icon discs (`--card`, 50/65 px) that face the direction of travel; title (`--foreground`) and description (`--muted-foreground`) sit at the bottom. The ring holds `⌊2πr / 72⌋` icons, repeating `icons` so neighbours never match.

- Props: `icons` (image URLs), `radius` (250), `duration` (40 s), `title`, `description`, `className`.
- States: none.
- Interactions: none.
- Keyboard: none (decorative icons have empty `alt`).
- Reduced motion: wrapped in `MotionConfig reducedMotion="user"`, so transform and layout animations jump to their end state when the user asks for reduced motion; opacity and colour still fade.
