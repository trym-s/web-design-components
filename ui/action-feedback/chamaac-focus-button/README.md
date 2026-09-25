# Focus Button

A minimal button with corner dash accents that expand on hover.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS v4; static HTML
- Framework: react
- Entry point: `upstream/examples/focus-button-demo.tsx`
- Nature: interactive; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A minimal button with corner dash accents that expand on hover.
- Provides: Focus Button
- Requires: `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/focus-button.json`
- Registry: https://www.chamaac.com/r/focus-button.json
- Local source fallback: `upstream/examples/focus-button-demo.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/focus-button.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `-` | Button content |
| `className` | `string` | `""` | Custom class names for styling |
| `dashColor` | `string` | `"black" \| "white"` | Custom color for the corner dashes |
| `onClick` | `() => void` | `-` | Click handler function |

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/examples/focus-button-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/buttons/focus-button

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### FocusButton — `focus-button.tsx`

A square-cornered outlined button (`--border` frame, `--foreground` text) with two small `--foreground` corner brackets, top-right and bottom-left.

- Props: `children`, `dashColor` (bracket colour, default `--foreground`), `className`, every `<button>` attribute.
- States: hover or keyboard focus — both brackets grow over 300 ms to cover the whole frame.
- Interactions: hover.
- Keyboard: native button (Tab, Enter/Space); `:focus-visible` shows the grown-frame state.
- Reduced motion: the bracket transition is removed (`motion-reduce:transition-none`).
