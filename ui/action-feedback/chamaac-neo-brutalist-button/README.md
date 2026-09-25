# Neo Brutalist Button

A bold, retro-styled button with skewed design, offset shadow, and shimmer effect.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS v4; static HTML
- Framework: react
- Entry point: `upstream/examples/neo-brutalist-button-demo.tsx`
- Nature: interactive; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A bold, retro-styled button with skewed design, offset shadow, and shimmer effect.
- Provides: Neo Brutalist Button
- Requires: `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/neo-brutalist-button.json`
- Registry: https://www.chamaac.com/r/neo-brutalist-button.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/neo-brutalist-button/neo-brutalist-button.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/neo-brutalist-button.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `"Neo Brutalist"` | The text to display inside the button |
| `className` | `string` | `-` | Additional CSS classes for styling (colors, shadows, borders, etc.) |
| `onClick` | `() => void` | `-` | Click handler function |

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/chamaac/registry/chamaac/neo-brutalist-button/neo-brutalist-button.tsx` — the component as the registry installs it
- `upstream/examples/neo-brutalist-button-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/buttons/neo-brutalist-button

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### NeoBrutalistButton — `neo-brutalist-button.tsx`

A button skewed −10° (label counter-skewed upright) with a flat fill, 1.5 px ink border and a hard 4 px offset shadow. Colours: `--neo-brutalist-fill` (default `#ff90e8`) and `--neo-brutalist-ink` (default black).

- Props: `text` ("Click Me"), `onClick`, `className`.
- States: hover or focus — the shadow grows to 8 px; on hover a white sheen sweeps across once in 0.2 s (upstream's styled-jsx keyframes, rebuilt as a one-way CSS transition that snaps back when the pointer leaves).
- Interactions: hover, click.
- Keyboard: native button.
- Reduced motion: the sheen is hidden.
