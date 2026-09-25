# Invoice Card

Invoice Card (work in progress in the Chamaac repository).

> Work in progress in the Chamaac repository (`app/in-progress/`); not on the site yet.

## Classification

- Category: `data-display` — structural
- Medium: React + TypeScript + Tailwind CSS v4; static HTML
- Framework: react
- Entry point: `upstream/examples/invoice-card-demo.tsx`
- Nature: structural; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: Invoice Card (work in progress in the Chamaac repository).
- Provides: Invoice Card
- Requires: React and Tailwind v4
- Variants: default
- Upstream: Chamaac UI · in-progress
- Local source fallback: `upstream/examples/invoice-card-demo.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/invoice-card.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/examples/invoice-card-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://github.com/amarnathdhumal/chamaacui/tree/main/app/in-progress/invoice-card

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `motion`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### InvoiceCard — `invoice-card.tsx`

A 350 px+ `--card` panel (20 px radius, `--border`): title, big total with an optional struck-through original amount, item rows (name, description, price), a divider, Subtotal, optional Tax (percent) and Total. Every row slides in from the left (−150 px, 0.3 s) staggered by `delay`. Subtotal and tax are computed from `items`; `total` is shown as given.

- Props: `title` ("Invoice"), `total`, `originalAmount`, `items` ({name, description, price}[]), `taxRate` (0 hides the row), `taxLabel` ("Tax"), `delay` (0.1 s), `format` (default `$` + `toLocaleString()`), `className` (outer box, default 500 px tall, centred).
- States: none after the entrance.
- Interactions: none.
- Keyboard: none.
- Reduced motion: wrapped in `MotionConfig reducedMotion="user"`, so transform and layout animations jump to their end state when the user asks for reduced motion; opacity and colour still fade.
