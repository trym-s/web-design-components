# Modal

Modal dialogs and full-overlay surfaces that scale up from center.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the centre scale in/out

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `lucide-react` (close icon), `clsx` and `tailwind-merge` (through `lib/utils.ts`). `modal.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### Modal — `modal.tsx`

- Props: `open`, `onOpenChange(open)`, `children`, `aria-label` / `aria-labelledby`, `className`.
- Structure: a `role="dialog"` `aria-modal` surface (max 384 px, `--popover`, `rounded-xl`, 20 px padding, `shadow-lg` + ring)
  with a 24 px round × button top-right. The caller supplies the backdrop / centring (the demo uses a `bg-black/50` scrim).
- Motion: mounted at scale `--modal-scale` (0.96) and opacity 0, then (next frame) scales to 1 / opacity 1 over
  `--modal-open-dur` (250 ms) from the centre; closing returns to `--modal-scale-close` (0.96) / 0 over `--modal-close-dur`
  (150 ms) and unmounts; `cubic-bezier(0.22, 1, 0.36, 1)`.
- Keyboard: focus moves to the dialog when it opens; Escape and × call `onOpenChange(false)`. Trap focus in the host if needed.
