# Ripple

Touch feedback from the pointer origin.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/ripple.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/ripple.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/ripple

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--ring`, …). It imports only `react` and `motion` (`motion/react`). `src/demo.tsx` is sample data and wiring only.

### Ripple — `ripple.tsx`

- Props: `children`, `onPress()` (click handler), `disabled`, `max` (4 concurrent ripples; the oldest is dropped), `tintClassName` (`"bg-primary/15"`), `className`. The file also exports `useRipple({ disabled, max, minVisible, fade })` → `{ bind, ripples, fadeDuration }` (`minVisible` 220 ms, `fade` 320 ms).
- Structure: a `<button>` with `px-3.5 py-2`, 13 px medium `--foreground` text, radius `calc(var(--radius) - 1px)`, 1 px `--border`, `--card` fill, `isolation: isolate`. An `aria-hidden` clip layer (`overflow: hidden`, inherited radius) holds the ripples: 40 px `rounded-full` discs centred on the press point and scaled so they reach the farthest corner. Content sits above in a relative span.
- States: each ripple blooms from scale 0 to full in 500 ms (linear) while fading in over 70 ms; on release it stays at least `minVisible` ms from its start, then fades out over `fade` ms with ease `cubic-bezier(0.23, 1, 0.32, 1)` and is removed. Focus-visible: 2 px `--ring` ring. Disabled: 50 % opacity, no ripples. Reduced motion: the disc appears at full size (no bloom), still fades.
- Interactions: each primary pointer (multi-touch aware) spawns a ripple at its position, with pointer capture; pointer up / cancel / lost capture releases it; window blur or a hidden tab releases all. `touch-action: manipulation`, no tap highlight.
- Keyboard: Space / Enter spawn a centred ripple (repeat ignored); key up (or Escape) releases it; blur releases all; native activation fires `onPress`.
