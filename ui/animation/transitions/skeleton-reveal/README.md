# Skeleton Reveal

A placeholder that loads then reveals real content — list rows, cards, profile headers.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the pulse and blur cross-fade

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`). `skeleton-reveal.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### SkeletonReveal — `skeleton-reveal.tsx`

- Props: `loading`, `skeleton` (placeholder markup), `children` (real content), `className` (give it a size — both layers are
  absolutely stacked).
- Structure: a relative box with the skeleton layer under the content layer; `aria-busy` while loading, content `aria-hidden`
  until revealed.
- Motion: while loading the skeleton pulses (opacity 1 → `--pulse-min` 0.5 → 1 over `--pulse-dur` 1000 ms, repeating until
  the content is ready). Revealing cross-fades: skeleton to opacity 0 + blur `--reveal-blur` (2 px), content from that to
  sharp, over `--reveal-dur` (400 ms) `ease-in-out`. Setting `loading` again snaps back without a transition and restarts
  the pulse.
- Keyboard: none.
