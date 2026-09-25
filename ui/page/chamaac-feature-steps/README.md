# Feature Steps

A dynamic feature showcase component with auto-playing steps and synchronized image transitions.

## Classification

- Category: `page` — structural
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `upstream/examples/feature-steps-demo.tsx`
- Nature: structural; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A dynamic feature showcase component with auto-playing steps and synchronized image transitions.
- Provides: Feature Steps
- Requires: `motion`, `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/feature-steps.json`
- Registry: https://www.chamaac.com/r/feature-steps.json
- Local source fallback: `upstream/examples/feature-steps-demo.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/feature-steps.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `features` | `Feature[]` | `-` | Array of feature objects containing title, content, and image. |
| `autoPlayInterval` | `number` | `6000` | Interval in milliseconds for auto-playing steps. |
| `imageClassName` | `string` | `"h-[400px]"` | Tailwind class for the height of the image container, useful for mobile responsiveness. |
| `className` | `string` | `""` | Additional classes for the container. |

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/examples/feature-steps-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/sections/feature-steps

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `motion`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only; `src/demo-assets/` holds its sample media. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### FeatureSteps — `feature-steps.tsx`

Two bordered columns (stacked below md): a list of features (title `--foreground`, text `--muted-foreground`, dividers at `--foreground` 10 %) and an image panel showing the current feature's image.

- Props: `features` ({step?, title, content, image}[]), `autoPlayInterval` (3000 ms), `imageClassName` (image column height, `h-[400px]`), `className`.
- States: the current row shows a 1 px `--foreground` line filling its bottom edge over `autoPlayInterval` (ease-in); then the next feature becomes current and its image slides up from below (0.3 s).
- Interactions: clicking a row makes it current and restarts the timer.
- Keyboard: rows are `role="button"` with `tabIndex=0`; Enter or Space selects; `aria-current` marks the current row.
- Reduced motion: wrapped in `MotionConfig reducedMotion="user"`, so transform and layout animations jump to their end state when the user asks for reduced motion; opacity and colour still fade.
