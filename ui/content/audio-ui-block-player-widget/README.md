# Player Widget

Audio player with track list

## Classification

- Category: `content` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (shadcn Base UI, Nova style, `@audio-ui/react` primitives); static HTML
- Framework: react
- Entry point: `upstream/examples/block-player-widget.tsx`
- Nature: interactive; reuse the control, its interaction model and layout, adapt literal values to the target project.
- Added: 2026-09-25T08:37:12Z
- Curation: pending
- Use when: Audio player with track list
- Provides: Player Widget block
- Requires: React, Tailwind v4 with the shadcn tokens and a shadcn style (`cn-*` slots), `@audio-ui/react` 0.1.2
- Variants: block-player-widget
- Upstream: Audio UI · player, widget
- Preferred install: `npx shadcn@latest add @audio/block-player-widget`
- Local source fallback: `ui/_sources/audio-ui/registry-audio/bases/base/audio/player.tsx`

## How an agent uses this reference

- **React + shadcn target** — add the `@audio` registry (`https://audio-ui.xyz/docs/registry`) and install as above; the demos in
  `upstream/examples/` show the exact usage. The elements live in `ui/_sources/audio-ui/registry-audio/bases/base/audio/`.
- **Any other stack** — `static/<example>.html` is the rendered DOM against `ui/_sources/audio-ui/styles.css` (the
  site's Tailwind build with the Nova style); keep the markup, re-implement drag/keyboard behavior from the docs.

## Examples

- `upstream/examples/block-player-widget.tsx` — Audio player with track list · static: `static/block-player-widget.html`

## Files

- `ui/_sources/audio-ui/registry-audio/bases/base/audio/player.tsx` — the element as the registry installs it
- `ui/_sources/audio-ui/registry-audio/bases/base/hooks/use-audio-provider.ts` — the element as the registry installs it
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://github.com/ouestlabs/audio-ui/tree/main/apps/www/src/registry-audio/bases/base/components/player/block-player-widget.tsx
