# Channel Strip Transport

Channel strip with transport seek bar in horizontal orientation

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (shadcn Base UI, Nova style, `@audio-ui/react` primitives); static HTML
- Framework: react
- Entry point: `upstream/examples/block-channel-strip-transport.tsx`
- Nature: interactive; reuse the control, its interaction model and layout, adapt literal values to the target project.
- Added: 2026-09-25T08:37:12Z
- Curation: pending
- Use when: Channel strip with transport seek bar in horizontal orientation
- Provides: Channel Strip Transport block
- Requires: React, Tailwind v4 with the shadcn tokens and a shadcn style (`cn-*` slots), `@audio-ui/react` 0.1.2
- Variants: block-channel-strip-transport
- Upstream: Audio UI · channel-strip, transport
- Preferred install: `npx shadcn@latest add @audio/block-channel-strip-transport`
- Local source fallback: `ui/_sources/audio-ui/registry-audio/bases/base/audio/elements/channel-strip.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (it vendors the `@audio-ui/react` primitives it needs and
  imports only allowlisted packages); `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + shadcn target** — add the `@audio` registry (`https://audio-ui.xyz/docs/registry`) and install as above; the demos in
  `upstream/examples/` show the exact usage. The elements live in `ui/_sources/audio-ui/registry-audio/bases/base/audio/`.
- **Any other stack** — `static/<example>.html` is the rendered DOM against `ui/_sources/audio-ui/styles.css` (the
  site's Tailwind build with the Nova style); keep the markup, re-implement drag/keyboard behavior from the docs.

## Examples

- `upstream/examples/block-channel-strip-transport.tsx` — Channel strip with transport seek bar in horizontal orientation · static: `static/block-channel-strip-transport.html`

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/audio-ui/registry-audio/bases/base/audio/elements/channel-strip.tsx` — the element as the registry installs it
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://audio-ui.xyz/docs/components/base/transport

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--primary`, `--ring`, …).
It imports only `react`, `@base-ui/react`, `class-variance-authority`, `clsx`, `tailwind-merge` and `lucide-react`. `src/audio-ui/` is a
vendored copy of `@audio-ui/react` 0.1.2 (MIT, Ouest Labs; licence in `src/audio-ui/LICENSE`). `src/ui/` holds the shadcn/ui
components it builds on; point those imports at the target's own copies when it has them. `src/demo.tsx` is sample
data and wiring only.

### BlockChannelStripTransport — `block-channel-strip-transport.tsx`

- Props: `title` ("Track 1"), `currentTime` s, `duration` s, `bufferedTime` s, `onSeek(seconds)`; `formatTime(seconds)` is exported.
- Layout: A horizontal seek bar in a strip with `current / total` (m:ss) as the footer.

### Transport (seek bar) — `transport.tsx`

- Props: `value` (playhead, `min…max`, default 0…100), `bufferedValue` (buffered-ahead position), `onSeek(value)`, `min`, `max`,
  `step`, `disabled`, `orientation` (`horizontal` by default, or inherited from a channel strip), `size` (`sm` / `default` / `lg`),
  `freezeValuesWhileDragging` (ignore incoming `value` updates mid-drag, for a live clock), `aria-*`.
- Structure: a `role="slider"` over a rounded `--input` (90 %) track holding a `--primary` (40 %) buffered range behind a
  `--primary` played range, and a `--card` thumb with a `--ring` border and one `--primary` grip line.
- States: thumb ring on hover / focus-visible / press as the fader; disabled → 50 % opacity.
- Interactions: press the track to jump, drag the thumb to scrub.
- Keyboard: ArrowUp/ArrowRight +`step`, ArrowDown/ArrowLeft −`step`, PageUp/PageDown ±10 steps, Home → `min`, End → `max`; every value is clamped to `min…max` and rounded to `step`.

### Channel strip — `channel-strip.tsx`

- Parts: `ChannelStrip` (root; `orientation` `vertical` default | `horizontal`, passed down to faders and seek bars inside),
  `ChannelStripHeader` (title, medium sm), `ChannelStripContent` (`layout` `stack` default | `row` for side-by-side sections),
  `ChannelStripSection` (one control with its label and value), `ChannelStripLabel` (xs uppercase, `--muted-foreground`),
  `ChannelStripValue` (sm tabular numbers, `--muted-foreground`), `ChannelStripFooter` (xs, `--muted-foreground`).
- Layout: vertical strips centre everything in a column with 16 px gaps; horizontal strips stretch to the container, put the
  label, control and value on one row, and from the `md` breakpoint move the header and footer into a left column beside
  the content. Colours come from `--card-foreground` and `--muted-foreground`.
