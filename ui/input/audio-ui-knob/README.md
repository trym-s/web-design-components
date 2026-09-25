# Knob

Rotary control for parameters - drag, wheel, keyboard, optional fader-style vertical pan, and reset via double-tap.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (shadcn Base UI, Nova style, `@audio-ui/react` primitives); static HTML
- Framework: react
- Entry point: `ui/_sources/audio-ui/registry-audio/bases/base/audio/elements/knob.tsx`
- Nature: interactive; reuse the control, its interaction model and layout, adapt literal values to the target project.
- Added: 2026-09-25T08:37:12Z
- Curation: pending
- Use when: Rotary control for parameters - drag, wheel, keyboard, optional fader-style vertical pan, and reset via double-tap.
- Provides: Knob with 11 documented examples
- Requires: React, Tailwind v4 with the shadcn tokens and a shadcn style (`cn-*` slots), `@audio-ui/react` 0.1.2
- Variants: knob-demo, knob-disabled-demo, knob-size-variants-demo, knob-fine-step-demo, knob-filter-control-demo, knob-change-vs-commit-demo, knob-arc-and-anchor-demo, knob-circular-arc-demo, knob-double-tap-reset-demo, knob-revolution-drag-demo, knob-vertical-drag-demo
- Upstream: Audio UI · knob
- Preferred install: `npx shadcn@latest add @audio/knob`
- Local source fallback: `ui/_sources/audio-ui/registry-audio/bases/base/audio/elements/knob.tsx`

## How an agent uses this reference

- **React + shadcn target** — add the `@audio` registry (`https://audio-ui.xyz/docs/registry`) and install as above; the demos in
  `src/examples/` show the exact usage. The elements live in `ui/_sources/audio-ui/registry-audio/bases/base/audio/`.
- **Any other stack** — `static/<example>.html` is the rendered DOM against `ui/_sources/audio-ui/styles.css` (the
  site's Tailwind build with the Nova style); keep the markup, re-implement drag/keyboard behavior from the docs.

## Examples

- `src/examples/knob-demo.tsx` — Knob component example · static: `static/knob-demo.html`
- `src/examples/knob-disabled-demo.tsx` — Knob disabled vs enabled comparison · static: `static/knob-disabled-demo.html`
- `src/examples/knob-size-variants-demo.tsx` — Knob component example with size variants · static: `static/knob-size-variants-demo.html`
- `src/examples/knob-fine-step-demo.tsx` — Knob with fine-grained step control (0.01) · static: `static/knob-fine-step-demo.html`
- `src/examples/knob-filter-control-demo.tsx` — Knob component example with filter control · static: `static/knob-filter-control-demo.html`
- `src/examples/knob-change-vs-commit-demo.tsx` — Knob live value vs committed value callbacks · static: `static/knob-change-vs-commit-demo.html`
- `src/examples/knob-arc-and-anchor-demo.tsx` — Knob value arc (rail + highlight) and optional anchor range · static: `static/knob-arc-and-anchor-demo.html`
- `src/examples/knob-circular-arc-demo.tsx` — Knob with default arc pointer mapping and live value · static: `static/knob-circular-arc-demo.html`
- `src/examples/knob-double-tap-reset-demo.tsx` — Knob double-tap / double-click reset to defaultValue · static: `static/knob-double-tap-reset-demo.html`
- `src/examples/knob-revolution-drag-demo.tsx` — Knob with revolution (360°) drag sensitivity · static: `static/knob-revolution-drag-demo.html`
- `src/examples/knob-vertical-drag-demo.tsx` — Knob with vertical fader-style pan via dragOptions.verticalPanEnabled · static: `static/knob-vertical-drag-demo.html`

## Files

- `ui/_sources/audio-ui/registry-audio/bases/base/audio/elements/knob.tsx` — the element as the registry installs it
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://audio-ui.xyz/docs/components/base/knob
