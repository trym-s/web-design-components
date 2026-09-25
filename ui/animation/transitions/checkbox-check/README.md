# Checkbox Check

A checkbox needs a clear completion cue: fill the box, then draw its checkmark.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the fill-then-draw check

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`). `checkbox-check.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### CheckboxCheck — `checkbox-check.tsx`

- Props: `checked` / `defaultChecked` / `onCheckedChange(checked)`, `disabled`, `id`, `aria-label`, `className`.
- Structure: a small `role="checkbox"` button with `aria-checked`; unchecked it shows an inset `--input` ring, checked it
  fills with `--primary` and draws a `--primary-foreground` checkmark (a 10 px SVG path stroked with a dash equal to its
  length).
- Motion: the box fill and ring transition over `--check-box` (150 ms); on check the path's `stroke-dashoffset` animates to 0
  over `--check-draw` (350 ms) after `--check-delay` (0 ms); on uncheck it retracts over `--check-uncheck` (150 ms); easing
  `cubic-bezier(0.22, 1, 0.36, 1)`. Reduced motion: instant.
- Keyboard: native button — Space/Enter toggles; disabled removes it from interaction.
