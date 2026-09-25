# Premium Button

A high-quality button with a dynamic arrow animation.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS v4; static HTML
- Framework: react
- Entry point: `upstream/examples/premium-button-demo.tsx`
- Nature: interactive; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A high-quality button with a dynamic arrow animation.
- Provides: Premium Button
- Requires: `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/premium-button.json`
- Registry: https://www.chamaac.com/r/premium-button.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/premium-button/premium-button.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/premium-button.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `"Premium Button"` | The text to display inside the button |
| `className` | `string` | `-` | Additional CSS classes for the button |
| `onClick` | `() => void` | `-` | Click handler function |

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/chamaac/registry/chamaac/premium-button/premium-button.tsx` — the component as the registry installs it
- `upstream/examples/premium-button-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/buttons/premium-button

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### PremiumButton — `premium-button.tsx`

A 44 px dark button with a 36 px accent tile on the left holding a 5×5 dot matrix in which an arrow marches left to right (one step per 100 ms, 14-step loop). Colours: `--premium-button-fill` (default black), `--premium-button-foreground` (white), `--premium-button-accent` (Tailwind rose-500); in dark mode it gains a `--border` outline.

- Props: `text` ("Premium Button"), `onClick`, `className`.
- States: hover scales to 1.02, press to 0.98; focus-visible shows a `--ring` ring.
- Interactions: click.
- Keyboard: native button.
- Reduced motion: the arrow stands still in the centre and the hover scale is disabled.
