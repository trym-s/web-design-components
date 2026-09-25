# XY Pad

Two-dimensional control surface for mapping and automating X/Y parameters with pointer, wheel, and keyboard input.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (shadcn Base UI, Nova style, `@audio-ui/react` primitives); static HTML
- Framework: react
- Entry point: `ui/_sources/audio-ui/registry-audio/bases/base/audio/elements/xypad.tsx`
- Nature: interactive; reuse the control, its interaction model and layout, adapt literal values to the target project.
- Added: 2026-09-25T08:37:12Z
- Curation: pending
- Use when: Two-dimensional control surface for mapping and automating X/Y parameters with pointer, wheel, and keyboard input.
- Provides: XY Pad with 10 documented examples
- Requires: React, Tailwind v4 with the shadcn tokens and a shadcn style (`cn-*` slots), `@audio-ui/react` 0.1.2
- Variants: xypad-live-value-demo, xypad-size-sm-demo, xypad-size-default-demo, xypad-size-lg-demo, xypad-size-xl-demo, xypad-disabled-demo, xypad-format-value-demo, xypad-bipolar-range-demo, xypad-change-vs-commit-demo, xypad-hide-value-demo
- Upstream: Audio UI · xypad
- Preferred install: `npx shadcn@latest add @audio/xypad`
- Local source fallback: `ui/_sources/audio-ui/registry-audio/bases/base/audio/elements/xypad.tsx`

## How an agent uses this reference

- **React + shadcn target** — add the `@audio` registry (`https://audio-ui.xyz/docs/registry`) and install as above; the demos in
  `src/examples/` show the exact usage. The elements live in `ui/_sources/audio-ui/registry-audio/bases/base/audio/`.
- **Any other stack** — `static/<example>.html` is the rendered DOM against `ui/_sources/audio-ui/styles.css` (the
  site's Tailwind build with the Nova style); keep the markup, re-implement drag/keyboard behavior from the docs.

## Examples

- `src/examples/xypad-live-value-demo.tsx` — XYPad with live x/y readout · static: `static/xypad-live-value-demo.html`
- `src/examples/xypad-size-sm-demo.tsx` — XYPad size small example · static: `static/xypad-size-sm-demo.html`
- `src/examples/xypad-size-default-demo.tsx` — XYPad size default example · static: `static/xypad-size-default-demo.html`
- `src/examples/xypad-size-lg-demo.tsx` — XYPad size large example · static: `static/xypad-size-lg-demo.html`
- `src/examples/xypad-size-xl-demo.tsx` — XYPad size extra large example · static: `static/xypad-size-xl-demo.html`
- `src/examples/xypad-disabled-demo.tsx` — XYPad disabled state example · static: `static/xypad-disabled-demo.html`
- `src/examples/xypad-format-value-demo.tsx` — XYPad component example with formatted value · static: `static/xypad-format-value-demo.html`
- `src/examples/xypad-bipolar-range-demo.tsx` — XYPad with bipolar pan/mix style ranges · static: `static/xypad-bipolar-range-demo.html`
- `src/examples/xypad-change-vs-commit-demo.tsx` — XYPad live value vs committed value callbacks · static: `static/xypad-change-vs-commit-demo.html`
- `src/examples/xypad-hide-value-demo.tsx` — XYPad component example with hidden value · static: `static/xypad-hide-value-demo.html`

## Files

- `ui/_sources/audio-ui/registry-audio/bases/base/audio/elements/xypad.tsx` — the element as the registry installs it
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://audio-ui.xyz/docs/components/base/xypad
