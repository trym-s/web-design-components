# Shimmer Button

A button with a shimmering text animation effect.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS v4; static HTML
- Framework: react
- Entry point: `upstream/examples/shimmer-button-demo.tsx`
- Nature: interactive; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A button with a shimmering text animation effect.
- Provides: Shimmer Button
- Requires: `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/shimmer-button.json`
- Registry: https://www.chamaac.com/r/shimmer-button.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/shimmer-button/shimmer-button.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/shimmer-button.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `"Book a Free Call"` | The text to display inside the button |
| `className` | `string` | `-` | Additional CSS classes for the button |
| `duration` | `number` | `1.2` | Duration of the animation cycle in seconds |
| `onClick` | `() => void` | `-` | Click handler function |

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/chamaac/registry/chamaac/shimmer-button/shimmer-button.tsx` — the component as the registry installs it
- `upstream/examples/shimmer-button-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/buttons/shimmer-button

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `motion`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### ShimmerButton — `shimmer-button.tsx`

An outlined `--background` pill whose label is `--muted-foreground` text with a `--foreground` highlight band sweeping through it (clipped gradient, 200 % wide, 110°).

- Props: `text` ("Book a Free Call"), `duration` (1.2 s per sweep), `onClick`, `className`.
- States: constant sweep; hover scales to 1.02, press to 0.98.
- Interactions: click.
- Keyboard: native button with a `--ring` focus ring.
- Reduced motion: the sweep keeps running (it is a background-position animation, which `MotionConfig` does not suppress); set `duration` very high to calm it.
