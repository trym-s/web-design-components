# Hover Arrow Button

A button with a smooth hover arrow swap animation.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `upstream/examples/hover-arrow-button-demo.tsx`
- Nature: interactive; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A button with a smooth hover arrow swap animation.
- Provides: Hover Arrow Button
- Requires: `motion`, `clsx`, `tailwind-merge`, `@tabler/icons-react`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/hover-arrow-button.json`
- Registry: https://www.chamaac.com/r/hover-arrow-button.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/hover-arrow-button/hover-arrow-button.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/hover-arrow-button.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `"Get Started"` | The text to be displayed inside the button |
| `duration` | `number` | `0.3` | Duration of the arrow swap animation in seconds |
| `iconSize` | `number` | `24` | Size of the arrow icon in pixels |
| `className` | `string` | `""` | Custom class names for styling |
| `onClick` | `() => void` | `-` | Click handler function |

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/chamaac/registry/chamaac/hover-arrow-button/hover-arrow-button.tsx` — the component as the registry installs it
- `upstream/examples/hover-arrow-button-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/buttons/hover-arrow-button

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `motion`, `lucide-react`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### HoverArrowButton — `hover-arrow-button.tsx`

A `--primary` pill with the label and a trailing arrow (lucide `ArrowRight`, replacing Tabler's `IconArrowRight`).

- Props: `text` ("Get Started"), `duration` (0.3 s), `iconSize` (24 px), `className`, every motion `button` prop.
- States: hover or focus — the trailing arrow slides out to the right and collapses while a leading arrow slides in from the left (ease `[0.165, 0.84, 0.44, 1]`); leaving reverses it.
- Interactions: hover / tap.
- Keyboard: native button; focus plays the hover state and shows a `--ring` ring.
- Reduced motion: wrapped in `MotionConfig reducedMotion="user"`, so transform and layout animations jump to their end state when the user asks for reduced motion; opacity and colour still fade.
