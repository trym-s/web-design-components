# Gif Text

A stunning text effect that uses a GIF as the fill color.

## Classification

- Category: `animation` — decorative
- Medium: React + TypeScript + Tailwind CSS v4; static HTML
- Framework: react
- Entry point: `upstream/examples/gif-text-demo.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A stunning text effect that uses a GIF as the fill color.
- Provides: Gif Text
- Requires: `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/gif-text.json`
- Registry: https://www.chamaac.com/r/gif-text.json
- Local source fallback: `upstream/examples/gif-text-demo.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/gif-text.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `"CHAMAAC"` | The text content to mask the video. |
| `gif` | `string` | `URL` | The source URL of the background image or GIF. |
| `className` | `string` | `undefined` | Additional classes for the text element. |
| `containerClassName` | `string` | `undefined` | Additional classes for the container. |

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/examples/gif-text-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/text-animations/gif-text

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only; `src/demo-assets/` holds its sample media. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### GifText — `gif-text.tsx`

A huge uppercase heading (`clamp(80px, 12vw, 150px)`, extra-bold) whose letters are windows onto an image or animated GIF (`background-clip: text`), on a `--background` container. `gif` is required — upstream defaulted to a GIF on the author's CDN; the demo passes a local, downscaled copy.

- Props: `text` ("CHAMAAC"), `gif` (image URL), `className` (heading), `containerClassName` (e.g. `h-full`).
- States: loading — text in `--muted-foreground`, pulsing; loaded — transparent text over the cover-fitted image.
- Interactions: none.
- Keyboard: none.
- Reduced motion: the loading pulse is disabled; an animated GIF keeps playing (swap in a still image if needed).
