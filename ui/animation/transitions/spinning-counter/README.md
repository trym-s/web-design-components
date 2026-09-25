# Spinning Counter

A compact numeric value should visibly roll to its next value, such as a score, price, or live count.

## Classification

- Category: `animation` — decorative
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: decorative; reuse the reel roll with staggered columns

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`). `spinning-counter.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### SpinningCounter — `spinning-counter.tsx`

- Props: `value` (non-negative integer; truncated), `stagger` (60 ms between columns), `className` (set the font size so a digit
  fits `--reel-cell`).
- Structure: an inline-flex `role="img"` labelled with the number; one column per digit, `--reel-cell` (30 px) tall, clipped
  and masked top/bottom (transparent → opaque at 22 % / 78 % → transparent); each column holds a strip of 0–9 twice.
- Motion: on change every column jumps (no transition) to its previous digit, then rolls forward to the new digit in the
  second copy of the strip — always spinning downward through the reel — over `--reel-dur` (1400 ms,
  `cubic-bezier(0.16, 1, 0.3, 1)`), column i delayed i × `stagger`. The first render places digits without motion. Reduced
  motion: instant.
- Keyboard: none.
