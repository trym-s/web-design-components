# Tabs Sliding

A segmented control / tab bar where the active pill slides between options — view switchers, filter segments, small mutually-exclusive button sets.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the sliding pill and keyboard roving

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`). `tabs-sliding.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### SlidingTabs — `tabs-sliding.tsx`

- Props: `tabs` (labels), `value` / `defaultValue` (0) / `onValueChange(index)`, `aria-label`, `className`.
- Structure: a `role="tablist"` pill (`--secondary`, 3 px padding, 3 px gap, 14 px text) with 30 px `role="tab"` buttons
  (12 px side padding, `--foreground` at 80 %, active `--foreground`) over one sliding `--background` pill with `shadow-xs`.
- Motion: the pill's `translateX` and `width` follow the active tab over `--tabs-dur` (250 ms, `cubic-bezier(0.22, 1, 0.36, 1)`);
  the first placement and window resizes jump without animation.
- Keyboard: roving tabindex — only the active tab is tabbable; ArrowLeft / ArrowRight select the previous / next tab
  (wrapping) and move focus.
