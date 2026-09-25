# Loading Button

Label to state without layout shift.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/loading-button.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/loading-button.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/loading-button

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--ring`, …). It imports only `react` and `motion` (`motion/react`). It declares `--success` on the button (`oklch(0.596 0.145 163.2)`, dark `oklch(0.765 0.177 163.2)`); override it to rebrand. `src/demo.tsx` is sample data and wiring only.

### LoadingButton — `loading-button.tsx`

- Props: `onAction()` (may return a promise; resolve → success, reject → error), `children` (idle label, string), `pendingLabel` (defaults to `children`), `successLabel` (`"Done"`), `errorLabel` (`"Try again"`), `resetAfter` (1400 ms in success/error before returning to idle), `disabled`, `onError(error)`, `className`. The file also exports `useAsyncAction({ action, resetAfter, onError })` → `{ status, run, reset, pending }`.
- Structure: a `<button>` 36 px high, `px-3.5`, 13 px medium text, radius `calc(var(--radius) - 1px)`, 1 px `--border`, `--card` fill, `shadow-xs`. All four faces (label, spinner + label, check + label, alert + label; 12 px icons, `gap-1.5`) are stacked in one grid cell, so the width fits the widest and never jumps. The `aria-label` follows the current face; a hidden `role="status" aria-live="polite"` announces success / error.
- States: `idle` (`--foreground`), `pending` (`--muted-foreground`, 12 px spinner — 22 %-opacity ring plus a quarter arc — rotating once per 850 ms, `aria-busy`, `aria-disabled`), `success` (`--success`, check), `error` (`--destructive`, alert mark). The active face is at opacity 1, y 0, blur 0; others at opacity 0, y 3 px, blur 3 px; spring stiffness 260, damping 34, mass 0.8. Hover fill `--accent`; focus-visible: border `--primary` + 3 px `--primary`/20 % ring; disabled 50 % opacity. Reduced motion: instant swaps, still spinner.
- Interactions: click runs `onAction`; clicks while pending are ignored. A press nudges the button 1 px down (spring 520 / 34 / 0.45). A newer run or unmount discards stale results.
- Keyboard: native button — Enter / Space run.
