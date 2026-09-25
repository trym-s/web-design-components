# Slider Detents

Stops you can feel.

## Classification

- Category: `gesture` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/slider-detents.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/slider-detents.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/slider-detents

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--primary`, `--background`, `--foreground`,
`--muted-foreground`, `--radius`). It imports only `react` and `motion` (`motion/react`). `src/demo.tsx` is sample data and
wiring only (a controlled value with labelled detents).

### SliderDetents — `slider-detents.tsx`

- Props: `value`, `onValueChange(value)` (controlled), `min` (0), `max` (100), `step` (1), `detents` (numbers or
  `{ value, label? }`), `pull` (snap radius in value units, default 4.5 % of the range), `label` ("Value"), `format(value)`,
  `disabled`, `haptic` (6 ms vibration on landing on a detent, true), `className`. `useSliderDetents(options)` is exported
  and returns `{ trackRef, trackProps, detents, activeDetent, percent, dragging, valueText }`.
- Structure: a header row (`mb-2.5`) with the 12.5 px `--muted-foreground` label and an 11 px mono readout (`--foreground`, plus
  " · <detent label>" in `--muted-foreground` that cross-fades, spring 260 / 34 / 0.8; width reserved for the widest string).
  Below, an `h-9` `role="slider"` track (`tabIndex=0`, `aria-valuemin/max/now`, `aria-valuetext` = "value, detent label",
  `aria-labelledby` the label): a 10 px rail at `top: 9px`, radius `calc(var(--radius) - 5px)`, `--foreground` at 10 %, filled
  with `--primary` up to the value; 2 × 5 px detent ticks at `top: 26px` in `--primary` at 35 %; an 18 × 20 px thumb at
  `top: 4px`, radius `calc(var(--radius) - 4px)`, `--primary` fill with a 2 px `--background` border. Rail fill and thumb
  ride one spring (stiffness 520 / damping 34 / mass 0.45); travel is inset by half the thumb width on both ends.
- States: dragging — `cursor-grabbing`, thumb scales to 1.08 (spring 700 / 46 / 0.5); disabled — 50 % opacity, no pointer
  events. Reduced motion: the thumb jumps.
- Interactions: press anywhere on the track to jump and drag (pointer capture, `touch-action: none`); within `pull` of a detent
  the value snaps to it, otherwise it rounds to `step`.
- Keyboard: ArrowRight/ArrowUp +`step`, ArrowLeft/ArrowDown −`step`; Shift+Arrow or PageUp/PageDown jump to the next/previous
  detent (or to max/min past the last); Home → `min`, End → `max`. Focus-visible: `--primary` 6 % fill + 1 px inset `--primary` ring.
