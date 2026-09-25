# Toggle

A binary switch should feel physical, with a thumb travel and subtle overshoot.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the overshooting thumb

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`). `toggle.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### Toggle — `toggle.tsx`

- Props: `checked` / `defaultChecked` / `onCheckedChange(checked)`, `disabled`, `id`, `aria-label`, `className`.
- Structure: a `role="switch"` button, 32.66 × 18 px, fully rounded, `--input` track (`--primary` when on), 2 px padding, with a
  14 px `--background` thumb (`shadow-sm`).
- Motion: the thumb travels `--toggle-travel` (14.66 px) over `--toggle-dur` (350 ms) with keyframed overshoot: past the end by
  `--toggle-ov1` (1 px) at 55 %, settling via `--toggle-ov2` (0 px) at 80 %, on `cubic-bezier(0.34, 1.35, 0.64, 1)`; the
  track colour changes over `--toggle-track` (0 ms). The initial state renders without animation. Reduced motion: no bounce.
- Keyboard: native button with `aria-checked`; Space/Enter toggles.
