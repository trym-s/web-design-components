# Text Reveal

Words arrive in reading order.

## Classification

- Category: `content` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/text-reveal.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/text-reveal.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/text-reveal

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--foreground`, `--muted-foreground`). It imports
only `react` and `motion` (`motion/react`). `src/demo.tsx` is sample data and wiring only (a replay button re-keys the component).

### TextReveal — `text-reveal.tsx`

- Props: `text`, `by` (`word` | `character`), `stagger` (s between units, 0.055), `maxDuration` (s cap for the whole reveal, 1.6 —
  the stagger shrinks to fit), `startOnView` (true: start when `amount` 35 % is in view), `play` (gate, true), `once` (true),
  `amount` (0.35), `className`. `useTextReveal(options)` is exported and returns `{ ref, groups, step, count, started, reduced, duration }`.
- Structure: a `<span>` in `--foreground` holding an `sr-only` copy of the full text and an `aria-hidden` visual copy: each word is
  a `inline-block whitespace-nowrap` span (so character mode never breaks inside a word) of `inline-block` unit spans.
- States: hidden units are opacity 0, `translateY(10px)`, `blur(8px)`; when started each animates to opacity 1, y 0, `blur(0)` over
  600 ms, easing `cubic-bezier(0.23, 1, 0.32, 1)`, delayed `index × step` where `step = min(stagger, (maxDuration − 0.6) / (count − 1))`.
  Reduced motion: text is shown at once.
- Interactions: none; replay by remounting (change `key`).
- Keyboard: none.
