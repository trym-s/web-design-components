# Progress Bar

Indeterminate handing over to determinate.

## Classification

- Category: `async` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/progress-bar.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/progress-bar.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/progress-bar

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--ring`, …). It imports only `react` and `motion` (`motion/react`). It declares `--progress-bar-bevel` on the track (`inset 0 1px 0 oklch(1 0 0 / 0.35), inset 0 -1px 0 oklch(0.216 0.006 56 / 0.2)`), used as the fill's bevel shadow. `src/demo.tsx` is sample data and wiring only.

### ProgressBar — `progress-bar.tsx`

- Props: `value` (number, or `null` for indeterminate), `max` (100), `label` (`"Progress"`), `pendingLabel` (`"Working"`, shown while indeterminate), `completeLabel` (`"Complete"`, announced at 100 %), `className`.
- Structure: a header row (label: 13 px medium `--foreground`, truncated; right: 12 px `--muted-foreground` slot stacking `pendingLabel` and a mono tabular `N%`), then 8 px below a `role="progressbar"` track (`aria-labelledby` the label, `aria-valuemin` 0, `aria-valuemax` = `max`, `aria-valuenow` / `aria-valuetext` "N%" only when determinate): `--foreground` at 10 % fill, 2 px padding, `shadow-inner`, radius `calc(var(--radius) - 6px)`, wrapping an 8 px bar lane (radius `calc(var(--radius) - 8px)`). A hidden `aria-live="polite"` span announces `pendingLabel` / `completeLabel`.
- States: determinate — a full-width `--primary` fill scaled on X from the left to `value / max` (clamped 0–1) with a spring (stiffness 210, damping 34, mass 0.9); indeterminate — the fill is at 0 and a 40 %-wide `--primary` sliver sweeps from −100 % to 250 % every 1.25 s (ease-in-out, repeating). The header text crossfades between `pendingLabel` and the percentage (spring 260 / 34 / 0.8). Reduced motion: instant fill changes, no sweep.
- Interactions: none (display only).
- Keyboard: none; not focusable.
