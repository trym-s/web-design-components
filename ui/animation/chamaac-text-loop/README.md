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

- `upstream/examples/text-loop-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/text-animations/text-loop
