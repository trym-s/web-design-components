# Slide Up Button

An animated button with a slide-up text effect on hover.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `upstream/examples/slide-up-button-demo.tsx`
- Nature: interactive; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: An animated button with a slide-up text effect on hover.
- Provides: Slide Up Button
- Requires: `motion`, `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/slideup-button.json`
- Registry: https://www.chamaac.com/r/slideup-button.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/slideup-button/slideup-button.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/slideup-button.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `-` | The content to be displayed inside the button |
| `className` | `string` | `""` | Custom class names for styling |
| `textDuration` | `number` | `0.25` | Duration in seconds for the original text slide-up animation |
| `cloneDuration` | `number` | `0.5` | Duration in seconds for the clone text slide-in animation |
| `cloneDelay` | `number` | `0.12` | Delay in seconds before the clone text animation starts |
| `buttonScale` | `number` | `0.98` | Scale value for the button on hover (1 = no scale) |
| `buttonOpacity` | `number` | `0.8` | Opacity value for the button on hover (0-1) |
| `onClick` | `() => void` | `-` | Click handler function |

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/chamaac/registry/chamaac/slideup-button/slideup-button.tsx` — the component as the registry installs it
- `upstream/examples/slide-up-button-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/buttons/slideup-button

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `motion`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### SlideUpButton — `slideup-button.tsx`

A rounded button whose label is stacked with a hidden copy. Colours: `--slide-up-fill` (default `#f73b20`) and `--slide-up-foreground` (white); a `className` with its own `bg-*` / `text-*` overrides them.

- Props: `children`, `textDuration` (0.25 s), `cloneDuration` (0.5 s), `cloneDelay` (0.12 s), `buttonScale` (0.98), `buttonOpacity` (0.8), `onClick`, `className`.
- States: hover or focus — the label rises out (y −200 %) while the copy rises from +200 % and untilts from 20°; the button shrinks to `buttonScale` and dims to `buttonOpacity`.
- Interactions: hover, click.
- Keyboard: native button; focus plays the hover state.
- Reduced motion: wrapped in `MotionConfig reducedMotion="user"`, so transform and layout animations jump to their end state when the user asks for reduced motion; opacity and colour still fade.
