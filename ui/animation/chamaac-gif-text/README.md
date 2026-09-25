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

- `upstream/examples/gif-text-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/text-animations/gif-text
