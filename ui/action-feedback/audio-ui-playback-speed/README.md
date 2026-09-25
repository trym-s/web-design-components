# Audio Player

A composable audio player. One component, one install, fully owned by you.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (shadcn Base UI, Nova style, `@audio-ui/react` primitives); static HTML
- Framework: react
- Entry point: `ui/_sources/audio-ui/registry-audio/bases/base/audio/player.tsx`
- Nature: interactive; reuse the control, its interaction model and layout, adapt literal values to the target project.
- Added: 2026-09-25T08:37:12Z
- Curation: pending
- Use when: A composable audio player.
- Provides: Audio Player with 1 documented example
- Requires: React, Tailwind v4 with the shadcn tokens and a shadcn style (`cn-*` slots), `@audio-ui/react` 0.1.2
- Variants: player-playback-speed-demo
- Upstream: Audio UI · playback-speed
- Preferred install: `npx shadcn@latest add @audio/player`
- Local source fallback: `ui/_sources/audio-ui/registry-audio/bases/base/audio/player.tsx`

## How an agent uses this reference

- **React + shadcn target** — add the `@audio` registry (`https://audio-ui.xyz/docs/registry`) and install as above; the demos in
  `src/examples/` show the exact usage. The elements live in `ui/_sources/audio-ui/registry-audio/bases/base/audio/`.
- **Any other stack** — `static/<example>.html` is the rendered DOM against `ui/_sources/audio-ui/styles.css` (the
  site's Tailwind build with the Nova style); keep the markup, re-implement drag/keyboard behavior from the docs.

## Examples

- `src/examples/player-playback-speed-demo.tsx` — Playback speed component example · static: `static/player-playback-speed-demo.html`

## Files

- `ui/_sources/audio-ui/registry-audio/bases/base/audio/player.tsx` — the element as the registry installs it
- `ui/_sources/audio-ui/registry-audio/bases/base/hooks/use-audio-provider.ts` — the element as the registry installs it
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://audio-ui.xyz/docs/components/base/player
