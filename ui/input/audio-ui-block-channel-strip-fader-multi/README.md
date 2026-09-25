# Channel Strip Fader Multi

Multiple fader channel strips in a row

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (shadcn Base UI, Nova style, `@audio-ui/react` primitives); static HTML
- Framework: react
- Entry point: `upstream/examples/block-channel-strip-fader-multi.tsx`
- Nature: interactive; reuse the control, its interaction model and layout, adapt literal values to the target project.
- Added: 2026-09-25T08:37:12Z
- Curation: pending
- Use when: Multiple fader channel strips in a row
- Provides: Channel Strip Fader Multi block
- Requires: React, Tailwind v4 with the shadcn tokens and a shadcn style (`cn-*` slots), `@audio-ui/react` 0.1.2
- Variants: block-channel-strip-fader-multi
- Upstream: Audio UI · channel-strip, fader
- Preferred install: `npx shadcn@latest add @audio/block-channel-strip-fader-multi`
- Local source fallback: `ui/_sources/audio-ui/registry-audio/bases/base/audio/elements/channel-strip.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (it vendors the `@audio-ui/react` primitives it needs and
  imports only allowlisted packages); `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + shadcn target** — add the `@audio` registry (`https://audio-ui.xyz/docs/registry`) and install as above; the demos in
  `upstream/examples/` show the exact usage. The elements live in `ui/_sources/audio-ui/registry-audio/bases/base/audio/`.
- **Any other stack** — `static/<example>.html` is the rendered DOM against `ui/_sources/audio-ui/styles.css` (the
  site's Tailwind build with the Nova style); keep the markup, re-implement drag/keyboard behavior from the docs.

## Examples

- `upstream/examples/block-channel-strip-fader-multi.tsx` — Multiple fader channel strips in a row · static: `static/block-channel-strip-fader-multi.html`

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/audio-ui/registry-audio/bases/base/audio/elements/channel-strip.tsx` — the element as the registry installs it
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://audio-ui.xyz/docs/components/base/fader

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--primary`, `--ring`, …).
It imports only `react`, `@base-ui/react`, `class-variance-authority`, `clsx`, `tailwind-merge` and `lucide-react`. `src/audio-ui/` is a
vendored copy of `@audio-ui/react` 0.1.2 (MIT, Ouest Labs; licence in `src/audio-ui/LICENSE`). `src/ui/` holds the shadcn/ui
components it builds on; point those imports at the target's own copies when it has them. `src/demo.tsx` is sample
data and wiring only.

### BlockChannelStripFaderMulti — `block-channel-strip-fader-multi.tsx`

- Props: `channels` (`{ id, label, value }[]`), `onValueChange(id, value)`, `onValueCommit(id, value)`, `footer` ("Output"), `min`, `max`, `step`, `formatValue`.
- Layout: One vertical strip per channel side by side (12 px apart), each with its name as header, a fader, its value and the footer.

### Fader — `fader.tsx`

- Props: `value` / `defaultValue`, `min`, `max`, `step`, `onValueChange`, `onValueCommit`, `disabled`, `orientation`
  (`vertical` by default, or inherited from an enclosing channel strip; vertical is at least 160 px tall, horizontal at
  least 128 px wide), `size` (`sm` / `default` / `lg`: track 6 / 8 / 10 px, thumb 20×14 / 24×16 / 28×20 px), `thumbMarks`
  (grip lines on the thumb, default 3, `false` for none), `aria-*`, `id`, `className`.
- Structure: a `role="slider"` with `aria-orientation`; a fully rounded track in `--input` (90 %), filled from the bottom
  (vertical) or the left (horizontal) by a `--primary` range; a `--card` thumb with a 1 px `--ring` border, corner radius
  `min(var(--radius-md), 10px)`, carrying `--primary` grip lines at 50 %.
- States: the thumb gets a 3 px `--ring` ring at 50 % on hover, focus-visible and press; disabled → 50 % opacity.
- Interactions: pressing the track jumps the value there and keeps dragging; wheel ±`step`.
- Keyboard: ArrowUp/ArrowRight +`step`, ArrowDown/ArrowLeft −`step`, PageUp/PageDown ±10 steps, Home → `min`, End → `max`; every value is clamped to `min…max` and rounded to `step`.

### Channel strip — `channel-strip.tsx`

- Parts: `ChannelStrip` (root; `orientation` `vertical` default | `horizontal`, passed down to faders and seek bars inside),
  `ChannelStripHeader` (title, medium sm), `ChannelStripContent` (`layout` `stack` default | `row` for side-by-side sections),
  `ChannelStripSection` (one control with its label and value), `ChannelStripLabel` (xs uppercase, `--muted-foreground`),
  `ChannelStripValue` (sm tabular numbers, `--muted-foreground`), `ChannelStripFooter` (xs, `--muted-foreground`).
- Layout: vertical strips centre everything in a column with 16 px gaps; horizontal strips stretch to the container, put the
  label, control and value on one row, and from the `md` breakpoint move the header and footer into a left column beside
  the content. Colours come from `--card-foreground` and `--muted-foreground`.
