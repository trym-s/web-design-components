# Text Loop

An animated text loop with typewriter and gradient effect.

## Classification

- Category: `animation` — decorative
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `upstream/examples/text-loop-demo.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: An animated text loop with typewriter and gradient effect.
- Provides: Text Loop
- Requires: `motion`, `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/text-loop.json`
- Registry: https://www.chamaac.com/r/text-loop.json
- Local source fallback: `upstream/examples/text-loop-demo.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/text-loop.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `staticText` | `string` | `"Design"` | The static text that appears before the animating loop. |
| `rotatingTexts` | `string[]` | `["Limitless", "Timeless", "Flawless"]` | The list of words to cycle through. |
| `className` | `string` | `""` | Additional CSS classes for the container. |
| `interval` | `number` | `3000` | Time in milliseconds between word changes. |
| `transition` | `Transition` | `{ duration: 0.8, ease: "easeInOut" }` | Motion transition object for the animation. |
| `staticTextClassName` | `string` | `""` | Additional CSS classes for the static text. |
| `rotatingTextClassName` | `string` | `""` | Additional CSS classes for the rotating text (use to override gradient). |
| `backgroundClassName` | `string` | `""` | Additional CSS classes for the background gradient box. |
| `cursorClassName` | `string` | `""` | Additional CSS classes for the cursor line (width, color). |

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/examples/text-loop-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/text-animations/text-loop

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `motion`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### TextLoop — `text-loop.tsx`

"Design **Limitless**|": a static word, then a rotating word that wipes open from zero width with a fade, on a soft highlight box, followed by a blinking caret. Colours are variables with Tailwind defaults: `--text-loop-from` / `--text-loop-to` (word gradient, violet-400 → violet-800, dark violet-600), `--text-loop-highlight` (purple-200, dark violet-950) and `--text-loop-caret` (violet-500).

- Props: `staticText` ("Design"), `rotatingTexts` (["Limitless", "Timeless", "Flawless"]), `interval` (3000 ms), `transition` (0.8 s ease-in-out), `className`, `staticTextClassName`, `rotatingTextClassName`, `backgroundClassName`, `cursorClassName`.
- States: one word visible; on each tick the current word collapses and the next expands (`AnimatePresence mode="wait"`); the rotating word is an `aria-live="polite"` region.
- Interactions: none.
- Keyboard: none.
- Reduced motion: wrapped in `MotionConfig reducedMotion="user"`, so transform and layout animations jump to their end state when the user asks for reduced motion; opacity and colour still fade.
