# Learn More Hover

A compact “learn more” action needs a restrained hover cue rather than a separate loading or navigation animation.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the chevron spread hover

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`). `learn-more-hover.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### LearnMoreHover — `learn-more-hover.tsx`

- Props: every `<button>` prop; `children` defaults to "Learn more".
- Structure: a 36 px pill button (`--card`, `shadow-sm` + 1 px `--border` ring, 14 px medium) with a 16 px chevron drawn as two
  separate arms in `--muted-foreground`.
- Motion: on hover the chevron slides right `--learn-shift` (2 px) and its arms rotate apart by `--learn-spread` (±8°) about the
  tip, over `--learn-in` (350 ms); leaving reverses over `--learn-out` (350 ms); `cubic-bezier(0.22, 1, 0.36, 1)`. Reduced
  motion: static.
- Keyboard: native button with a focus ring (`--ring`).
