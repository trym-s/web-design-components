# Toast

Toasts, snackbars, and transient confirmations that rise into view from the bottom edge — “Saved”, “Copied”, “Message sent”.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the rise-scale-blur entrance

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `lucide-react` (demo icon), `clsx` and `tailwind-merge` (through `lib/utils.ts`). `toast.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### Toast — `toast.tsx`

- Props: `open`, `children`, `className`. The caller positions it (e.g. fixed bottom-centre) and times its dismissal.
- Structure: a `role="status"` pill (`--popover`, `rounded-xl`, 16 × 10 px padding, 14 px medium, `shadow-lg` + ring);
  `aria-hidden` while closed.
- Motion: closed it rests `--toast-distance` (16 px) low, scaled `--toast-scale` (0.97), blurred `--toast-blur` (2 px) and
  transparent; opening moves it to rest over `--toast-open` (350 ms), closing reverses over `--toast-close` (250 ms);
  `cubic-bezier(0.22, 1, 0.36, 1)`.
- Keyboard: none (live status); put actions in the toast as buttons if needed.
