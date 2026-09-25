# How It Works

A 5-step process flow with cards and connecting lines.

## Classification

- Category: `page` — structural
- Medium: React + TypeScript + Tailwind CSS v4; static HTML
- Framework: react
- Entry point: `upstream/examples/how-it-works-demo.tsx`
- Nature: structural; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A 5-step process flow with cards and connecting lines.
- Provides: How It Works
- Requires: React and Tailwind v4
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/how-it-works.json`
- Registry: https://www.chamaac.com/r/how-it-works.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/how-it-works/how-it-works.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/how-it-works.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `features` | `Step[]` | `Default steps` | Array of step objects { title, description, colorTheme, colors }. |
| `stepPositions` | `StepPosition[]` | `Default positions` | Array of position objects { className, rotate }. |
| `className` | `string` | `-` | Optional className for styling. |

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/chamaac/registry/chamaac/how-it-works/how-it-works.tsx` — the component as the registry installs it
- `upstream/examples/how-it-works-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/sections/how-it-works

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `motion`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### HowItWorks — `how-it-works.tsx`

A ruled-paper board (`--foreground` lines every 32 px at 8 %, fading to `--background` at both sides) of pinned step cards, alternately tilted and placed absolutely (md+), joined by a dashed `--foreground`/20 path whose dashes march forever (3 s loop). Below md the cards stack and the path is hidden. Each card: `--card` shell with a soft shadow (`--how-it-works-shadow`, `#D3D3D3`; none in dark), a pin, and an accent panel with a handwritten number (`--font-handwriting`, then Comic Sans MS / Chalkboard SE), title and description.

- Props: `features` (1–5 steps: {title, description, colorTheme `orange`|`blue`|`purple` or `colors` {bg, text, border} classes}; upstream fell back to built-in samples, now required), `stepPositions` ({className, rotate}[] — defaults to upstream's zig-zag with ±8°), `className`. Board height follows the count (400/450/800/900/1130 px).
- States: hovered card scales to 1.05 and comes forward.
- Interactions: hover.
- Keyboard: none.
- Reduced motion: wrapped in `MotionConfig reducedMotion="user"`, so transform and layout animations jump to their end state when the user asks for reduced motion; opacity and colour still fade.
