# Number Pop In

Counters, prices, balances, or any number that updates and should re-enter from a direction with blur.

## Classification

- Category: `animation` — decorative
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: decorative; reuse the staggered per-digit pop

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`). `number-pop-in.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### NumberPopIn — `number-pop-in.tsx`

- Props: `value` (string; each character animates), `replayKey` (change to replay), `className`.
- Structure: an inline-flex `role="img"` group labelled with the value; each character is an inline-block span (tabular nums).
- Motion: whenever `value` or `replayKey` changes, every character rises from `--digit-distance` (8 px) along
  (`--digit-dir-x` 0, `--digit-dir-y` 1) — i.e. from below — with opacity 0 and `--digit-blur` (2 px) to rest over
  `--digit-dur` (500 ms) on the overshooting `cubic-bezier(0.34, 1.45, 0.64, 1)`; characters 2 and 3 start
  `--digit-stagger` (70 ms) and 140 ms later; the CSS defines no delay beyond the third character. Reduced motion: static.
- Keyboard: none.
