# Error State Shake

Form validation feedback — invalid email, wrong password, missing required field, mismatched confirmation.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the shake, error colour and timed revert

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`). `error-state-shake.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### InputShake — `error-state-shake.tsx`

- Props: `children` (the borderless field), `message` (error text), `shakeKey` (each change to a non-zero value triggers the
  error), `onErrorChange(error)`, `className`.
- Structure: a wrapper; the bordered field box (border `--input`, `--destructive` while in error) and a message line below
  (12 px `--destructive`, `role="alert"`), hidden until the error.
- Motion: on error the field shakes: translateX 0 → `--shake-distance` (6 px) → −6 px → `--shake-overshoot` (4 px) → 0, in
  segments of `--shake-dur-a` (80 ms) ×2 and `--shake-dur-b` (60 ms) ×2 with `cubic-bezier(0.22, 1, 0.36, 1)`; the border
  switches to `--destructive` and the message fades in over `--revert-dur` (280 ms). After `--revert-hold` (3 s), or when the
  user types, both fade back (280 ms) and `onErrorChange(false)` fires. Reduced motion: no shake.
- Keyboard: none added; the field keeps its own behaviour.
