# Hold to Confirm

A guard rail in front of destructive actions.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/hold-to-confirm.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/hold-to-confirm.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/hold-to-confirm

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--ring`, …). It imports only `react`, `motion` (`motion/react`), `clsx` and `tailwind-merge` (through `src/lib/utils.ts`, shadcn's `cn` — point it at the target's own `@/lib/utils` when it has one). `src/demo.tsx` is sample data and wiring only.

### HoldToConfirm — `hold-to-confirm.tsx`

- Props: `onConfirm()` (called once the hold completes), `children` (the idle label), `onAbort()` (called when a hold is released early), `confirmLabel` (`"Confirmed"`), `duration` (1800 ms of holding), `resetAfter` (1600 ms after confirming before it re-arms; ≤ 0 keeps it confirmed), `steps` (20 progress steps), `releaseRate` (2.5 — progress drains 2.5× faster than it fills), `disabled`, `className`. The file also exports `useHoldToConfirm(options)` → `{ bind, step, steps, phase, progress, reset }` (options add `moveTolerance`, 10 px, and `haptic`, true — `navigator.vibrate(14)` on confirm).
- Structure: a `<button>` 40 px high (`h-10`), `px-4`, 13 px medium text, radius `calc(var(--radius) - 1px)`, 1 px `--border`, `--card` fill, `--foreground` text, `overflow: hidden`. Two identical face stacks are layered: the base one and an inverted copy (`--primary` fill, `--primary-foreground` text) clipped with `clip-path: inset(0 X% 0 0)`, so the dark fill sweeps left → right. Each face stack crossfades between `children` and a 12 px check + `confirmLabel` (spring stiffness 260, damping 34, mass 0.8). `aria-describedby` points at a hidden hint ("Press and hold for N seconds to confirm. Releasing early cancels…"); a hidden `role="status" aria-live="polite"` span announces `confirmLabel`.
- States (`phase`): `idle` → `holding` (sweep grows linearly over the remaining part of `duration`) → `committed` (sweep snaps to full in 120 ms, face shows the check, `aria-disabled`) → back to `idle` after `resetAfter`; `releasing` (sweep drains over `duration × progress / releaseRate` with ease `cubic-bezier(0.23, 1, 0.32, 1)`). Disabled → 50 % opacity, `cursor: not-allowed`, `aria-disabled`. Focus-visible: 2 px `--ring` ring. Reduced motion: the sweep jumps to full while holding and to empty on release.
- Interactions: primary-pointer press starts the hold (pointer capture); moving more than 10 px, pointer up/cancel/leave, window blur, or the tab becoming hidden releases it. Clicks are prevented (the hold is the only way to fire); the context menu and iOS touch callout are suppressed; `touch-action: manipulation`.
- Keyboard: Space / Enter held down holds (key repeat ignored); key up releases; Escape while holding or draining resets to idle at once; blur releases.
