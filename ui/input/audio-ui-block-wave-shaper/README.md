# Wave Shaper

Wave shaper synth with distortion, tone, and detune controls

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (shadcn Base UI, Nova style, `@audio-ui/react` primitives); static HTML
- Framework: react
- Entry point: `upstream/examples/block-wave-shaper.tsx`
- Nature: interactive; reuse the control, its interaction model and layout, adapt literal values to the target project.
- Added: 2026-09-25T08:37:12Z
- Curation: pending
- Use when: Wave shaper synth with distortion, tone, and detune controls
- Provides: Wave Shaper block
- Requires: React, Tailwind v4 with the shadcn tokens and a shadcn style (`cn-*` slots), `@audio-ui/react` 0.1.2
- Variants: block-wave-shaper
- Upstream: Audio UI · synth, xypad
- Preferred install: `npx shadcn@latest add @audio/block-wave-shaper`
- Local source fallback: `ui/_sources/audio-ui/registry-audio/bases/base/audio/elements/xypad.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (it vendors the `@audio-ui/react` primitives it needs and
  imports only allowlisted packages); `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + shadcn target** — add the `@audio` registry (`https://audio-ui.xyz/docs/registry`) and install as above; the demos in
  `upstream/examples/` show the exact usage. The elements live in `ui/_sources/audio-ui/registry-audio/bases/base/audio/`.
- **Any other stack** — `static/<example>.html` is the rendered DOM against `ui/_sources/audio-ui/styles.css` (the
  site's Tailwind build with the Nova style); keep the markup, re-implement drag/keyboard behavior from the docs.

## Examples

- `upstream/examples/block-wave-shaper.tsx` — Wave shaper synth with distortion, tone, and detune controls · static: `static/block-wave-shaper.html`

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/audio-ui/registry-audio/bases/base/audio/elements/xypad.tsx` — the element as the registry installs it
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://github.com/ouestlabs/audio-ui/tree/main/apps/www/src/registry-audio/bases/base/components/synth/block-wave-shaper.tsx

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--primary`, `--ring`, …).
It imports only `react`, `@base-ui/react`, `class-variance-authority`, `clsx`, `tailwind-merge` and `lucide-react`. `src/audio-ui/` is a
vendored copy of `@audio-ui/react` 0.1.2 (MIT, Ouest Labs; licence in `src/audio-ui/LICENSE`). `src/ui/` holds the shadcn/ui
components it builds on; point those imports at the target's own copies when it has them. `src/demo.tsx` is sample
data and wiring only.

### BlockWaveShaper — `block-wave-shaper.tsx`

- Props: `position` / `onPositionChange` / `onRelease`, `waveform` / `onWaveformChange`, `params` (`{ drive 0…100, tone 0…100, detune −50…50 cents, mix 0…100 % }`) / `onParamChange(key, value)`, `volume` / `onVolumeChange`, `formatPosition`, `className`.
- Layout: A `--card` panel: the XY pad, the waveform toggle group, a row of four small knobs (Drive, Tone, Detune centre-anchored, Mix %) and a horizontal volume strip. `demo.tsx` wires two detuned oscillators, a wave shaper, a dry/wet mix and a low-pass filter (x → 55–880 Hz, y → Q 0.5–15.5) as an example.

### Knob — `knob.tsx`

- Props: `value` / `defaultValue` (number; uncontrolled default is the midpoint), `min` (0), `max` (100), `step` (1),
  `onValueChange(value)` on every change, `onValueCommit(value)` when a drag ends or a wheel/key step lands, `disabled`,
  `anchor` (the value the arc grows from — 0 for a bipolar pan), `size` (`sm` 44 px, `default` 48 px, `lg` 64 px, `xl` 96 px),
  `dragSensitivity` (`arc`: pointer travel along the sweep maps to `min…max`; `revolution`: one full turn maps to `min…max`),
  `dragOptions.verticalPanEnabled` (a mostly vertical drag moves the value like a fader, `(max−min)/150` per pixel),
  `aria-label` / `aria-labelledby` / `aria-describedby`, `id`, `className`.
- Structure: a round root (1 px ring in `--foreground` at 10 %) holding a focusable `role="slider"` element
  (`aria-valuemin/max/now`, `aria-disabled`) whose face is `--secondary`, clipped to a circle; inside it an inset `--card` disc,
  an SVG in a 48×48 viewBox with a track arc and a `--primary` value arc from `anchor` (or `min`) to the value, and a
  `--primary` indicator line rotated to the value. The sweep is 288°: it starts at bottom-left, runs clockwise over the
  top and leaves a 72° gap at the bottom.
- States: hover and focus-within add a 3 px `--ring` ring at 50 %; while pressed the border turns `--ring` and the face gets
  an inset shadow (`--knob-press`, declared on the control with a default); `data-disabled="true"` → 50 % opacity, no pointer events.
- Interactions: drag around the centre (a small dead zone at the hub is ignored); wheel ±`step`; double-click / double-tap
  (two taps within 320 ms and 12 px) resets to `defaultValue`, or the midpoint when it is not set.
- Keyboard (slider focused): ArrowUp/ArrowRight +`step`, ArrowDown/ArrowLeft −`step`, PageUp/PageDown ±10 steps, Home → `min`, End → `max`; every value is clamped to `min…max` and rounded to `step`.

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

### XY Pad — `xypad.tsx`

- Props: `value` / `defaultValue` (`{ x, y }`), `minX` / `maxX` / `minY` / `maxY`, `stepX` / `stepY`, `onValueChange({ x, y })`,
  `onValueCommit({ x, y })` (pointer released or key step), `disabled`, `size` (height `sm` 160 px, `default` 192 px, `lg` 256 px,
  `xl` 384 px; width follows the container), `valueDisplay` (`visible` | `hidden`), `formatValue({ x, y })` for the readout.
- Structure: a `role="group"` pad (radius `rounded-xl`, `--card` fill, 1 px `--foreground`/10 % ring; named "XY Pad" and
  described by "Use arrow keys to adjust X and Y values" unless `aria-*` is given); four evenly spaced vertical and
  horizontal `--border` grid lines at 30 %; `--primary` crosshair lines at 50 % through the cursor; a 20 px cursor puck made
  of a blurred `--primary` glow (20 %), a `--primary` dot and a `--primary-foreground` highlight (30 %); a readout chip in the
  top-right corner (`--background` at 90 %, mono xs, `--muted-foreground`, `aria-live="polite"`). y grows upwards.
- States: hover, focus-visible and press add a 3 px `--ring` ring at 50 %; disabled → 50 % opacity.
- Interactions: press or drag anywhere to move the cursor to the pointer; the wheel moves it by the scroll distance.
- Keyboard: ArrowLeft / ArrowRight ±`stepX`, ArrowUp / ArrowDown ±`stepY`, PageUp / PageDown ±10 × `stepY`,
  Home → top-left (`minX`, `maxY`), End → bottom-right (`maxX`, `minY`).

### Channel strip — `channel-strip.tsx`

- Parts: `ChannelStrip` (root; `orientation` `vertical` default | `horizontal`, passed down to faders and seek bars inside),
  `ChannelStripHeader` (title, medium sm), `ChannelStripContent` (`layout` `stack` default | `row` for side-by-side sections),
  `ChannelStripSection` (one control with its label and value), `ChannelStripLabel` (xs uppercase, `--muted-foreground`),
  `ChannelStripValue` (sm tabular numbers, `--muted-foreground`), `ChannelStripFooter` (xs, `--muted-foreground`).
- Layout: vertical strips centre everything in a column with 16 px gaps; horizontal strips stretch to the container, put the
  label, control and value on one row, and from the `md` breakpoint move the header and footer into a left column beside
  the content. Colours come from `--card-foreground` and `--muted-foreground`.
