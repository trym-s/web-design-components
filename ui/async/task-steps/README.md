# Task Steps

The system narrates its work.

## Classification

- Category: `async` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/task-steps.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/task-steps.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/task-steps

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--ring`, …). It imports only `react` and `motion` (`motion/react`). It declares `--success` on its root (`oklch(0.596 0.145 163.2)`, dark `oklch(0.765 0.177 163.2)`). `src/demo.tsx` is sample data and wiring only.

### TaskSteps — `task-steps.tsx`

- Props: `steps` (array of `{ id, label, meta? }`; `meta` is shown once the step is done, e.g. a duration), `current` (index of the running step; `≥ steps.length` means all done), `failed` (the current step failed), `label` (`"Task progress"`, the list's `aria-label`), `className`. The file also exports `useTaskSteps({ steps, current, failed })` → `{ rows, complete, failed, sentence }`.
- Structure: an `<ol>` of 28 px rows (`gap-2.5`, `px-1`, 2 px apart), each with a 16×16 status cell, a truncated 12.5 px label and a right-aligned mono 10.5 px tabular `meta`. The active row has `aria-current="step"`. A hidden `role="status"` span speaks "<label>, step N of M" / "All N steps complete" / "Failed at <label>" 500 ms after each change; a second hidden live span says "Run complete" / "Run failed".
- States: `pending` (5 px `--foreground`/10 % dot, `--muted-foreground` label), `active` (12 px spinner — 25 % ring plus a quarter arc — turning once per 800 ms; label is a shimmer: `--muted-foreground` → `--foreground` → `--muted-foreground` gradient clipped to text, 220 % wide, sweeping every 1.6 s), `done` (16 px tile, radius `calc(var(--radius) - 5px)`, `--success` at 14 % fill with a `--success` tick, popping in from scale 0.4 on a spring stiffness 640, damping 22, mass 0.7; `--muted-foreground` label; `meta` fades in over 200 ms), `error` (same tile in `--destructive` at 12 % with a cross; `--destructive` medium label). Reduced motion: no pop, no spin, no shimmer.
- Interactions: none (display only).
- Keyboard: none; not focusable.
