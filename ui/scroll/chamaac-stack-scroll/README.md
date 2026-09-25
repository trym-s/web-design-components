# Stack Scroll

Stack Scroll (work in progress in the Chamaac repository).

> Work in progress in the Chamaac repository (`app/in-progress/`); not on the site yet.

## Classification

- Category: `scroll` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `upstream/examples/stack-scroll-demo.tsx`
- Nature: interactive; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: Stack Scroll (work in progress in the Chamaac repository).
- Provides: Stack Scroll
- Requires: React and Tailwind v4
- Variants: default
- Upstream: Chamaac UI · in-progress
- Local source fallback: `upstream/examples/stack-scroll-demo.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/stack-scroll.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/examples/stack-scroll-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://github.com/amarnathdhumal/chamaacui/tree/main/app/in-progress/border-animation.tsx/stack-scroll

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `motion`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only; `src/demo-assets/` holds its sample media. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### StackScroll — `stack-scroll.tsx`

A centred column (max 600 px) of photo cards that stick as the window scrolls and pile up: card *i* is 70 + 5·*i* % wide, sticks 10·*i* px from the top, and scales from 0.8 to 1 (moving down 10·*i* px) while it travels from the viewport bottom to the top. Each photo has a bottom scrim (`--stack-scroll-scrim`, black 40 %) under a bold caption (`--stack-scroll-caption`, white). Upstream kept the cards inside its demo with react-responsive (whose breakpoint changed nothing); the stack is now its own component.

- Props: `items` ({image, title}[]), `className`.
- States: scroll-linked only.
- Interactions: page scroll.
- Keyboard: none (scrolls with the page).
- Reduced motion: wrapped in `MotionConfig reducedMotion="user"`, so transform and layout animations jump to their end state when the user asks for reduced motion; opacity and colour still fade.
