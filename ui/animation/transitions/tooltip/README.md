# Tooltip

A hover/focus tooltip that fades + scales in with a short appear-delay but disappears immediately on leave.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the delayed scale-fade

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`). `tooltip.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### Tooltip — `tooltip.tsx`

- Props: `content`, `children` (render prop receiving `{ "aria-describedby", className }` to spread on the trigger), `className`.
- Structure: an inline-block wrapper; the `role="tooltip"` bubble sits 8 px above the trigger, centred (`--popover`,
  `rounded-md`, 8 × 12 px padding, 12 px text, `shadow-md` + faint `--foreground` ring), no wrapping.
- Motion: hidden at opacity 0 / scale `--tt-scale` (0.98) from its bottom centre; on hover of the wrapper or keyboard focus of
  the trigger it appears after `--tt-delay` (80 ms) over `--tt-in-dur` (150 ms, `ease-out`) and hides over `--tt-out-dur`
  (50 ms). Reduced motion: instant.
- Keyboard: shows on `:focus-visible` of the trigger; the trigger references the bubble through `aria-describedby`.
