# Fader

Linear slider control for gain and parameter adjustment with pointer, wheel, keyboard, orientation, and thumb mark variants.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (shadcn Base UI, Nova style, `@audio-ui/react` primitives); static HTML
- Framework: react
- Entry point: `ui/_sources/audio-ui/registry-audio/bases/base/audio/elements/fader.tsx`
- Nature: interactive; reuse the control, its interaction model and layout, adapt literal values to the target project.
- Added: 2026-09-25T08:37:12Z
- Curation: pending
- Use when: Linear slider control for gain and parameter adjustment with pointer, wheel, keyboard, orientation, and thumb mark variants.
- Provides: Fader with 4 documented examples
- Requires: React, Tailwind v4 with the shadcn tokens and a shadcn style (`cn-*` slots), `@audio-ui/react` 0.1.2
- Variants: fader-vertical-demo, fader-horizontal-demo, fader-size-variants-demo, fader-thumb-marks-variants-demo
- Upstream: Audio UI · fader
- Preferred install: `npx shadcn@latest add @audio/fader`
- Local source fallback: `ui/_sources/audio-ui/registry-audio/bases/base/audio/elements/fader.tsx`

## How an agent uses this reference

- **React + shadcn target** — add the `@audio` registry (`https://audio-ui.xyz/docs/registry`) and install as above; the demos in
  `upstream/examples/` show the exact usage. The elements live in `ui/_sources/audio-ui/registry-audio/bases/base/audio/`.
- **Any other stack** — `static/<example>.html` is the rendered DOM against `ui/_sources/audio-ui/styles.css` (the
  site's Tailwind build with the Nova style); keep the markup, re-implement drag/keyboard behavior from the docs.

## Examples

- `upstream/examples/fader-vertical-demo.tsx` — Vertical fader · static: `static/fader-vertical-demo.html`
- `upstream/examples/fader-horizontal-demo.tsx` — Fader component example with horizontal orientation · static: `static/fader-horizontal-demo.html`
- `upstream/examples/fader-size-variants-demo.tsx` — Fader size variants (sm, default, lg) · static: `static/fader-size-variants-demo.html`
- `upstream/examples/fader-thumb-marks-variants-demo.tsx` — Fader thumb marks variants (off, 1, 4) · static: `static/fader-thumb-marks-variants-demo.html`

## Files

- `ui/_sources/audio-ui/registry-audio/bases/base/audio/elements/fader.tsx` — the element as the registry installs it
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://audio-ui.xyz/docs/components/base/fader
