# Dancing Letters

Physics-based interactive text animations.

## Classification

- Category: `animation` — decorative
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `upstream/examples/dancing-letters-demo.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: Physics-based interactive text animations.
- Provides: Dancing Letters
- Requires: `motion`, `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/dancing-letters.json`
- Registry: https://www.chamaac.com/r/dancing-letters.json
- Local source fallback: `upstream/examples/dancing-letters-demo.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/dancing-letters.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `"ANIMATE"` | The text to display and animate. Each letter gets a unique animation. |
| `className` | `string` | `""` | Additional CSS classes for the container |
| `letterClassName` | `string` | `""` | Additional CSS classes applied to each letter |

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/examples/dancing-letters-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/text-animations/dancing-letters

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `motion`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### DancingLetters — `dancing-letters.tsx`

A word (default `text-5xl`→`8xl`, bold, `--foreground`) whose letters stagger in (50 ms apart), then settle with a spring. Upstream loaded Outfit via next/font but never applied it, so the letters use the inherited font.

- Props: `text` ("ANIMATE"), `className`, `letterClassName`.
- States: each letter idles until triggered, then plays one of eight animations chosen by position (rubber band, hinge fall, squash-and-jump, 3D flip, elastic slide, shake, pop, levitate with a text shadow from `--dancing-letters-shadow`) and returns to rest; the active letter is raised above its neighbours.
- Interactions: hovering a letter plays it once; clicking replays it even mid-animation.
- Keyboard: none (letters are not focusable; the word is plain text for assistive tech).
- Reduced motion: wrapped in `MotionConfig reducedMotion="user"`, so transform and layout animations jump to their end state when the user asks for reduced motion; opacity and colour still fade.
