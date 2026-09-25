# Tooltip Group

Delayed once, instant after that.

## Classification

- Category: `overlay` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/tooltip-group.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/tooltip-group.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/tooltip-group

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### TooltipGroup / Tooltip — `tooltip-group.tsx`

- `TooltipGroup` props: `children`, `openDelay` (200 ms), `closeDelay` (120 ms), `skipDelay` (400 ms — how long the group stays
  "warm" after the last tooltip closes), `onWarmChange(warm)`, `className`. Tooltips inside share one store: only one is open
  at a time, and while the group is warm the next one opens instantly.
- `Tooltip` props: `label`, `children` (a single element to clone as the trigger; its own handlers are chained),
  `side` (`top` default | `bottom`), `disabled`, `openDelay` / `closeDelay` / `skipDelay` (used when there is no group),
  `className`, `contentClassName`. Also exports `useTooltip(options)`.
- Structure: the bubble is centred 7 px above (or below) the trigger: `role="tooltip"`, max 220 px, 8 × 4 px padding, 11.5 px
  medium `--foreground`, on a `--popover` layer with a `--border` ring, `shadow-md`, radius `--radius − 2px`. The trigger gets
  `aria-describedby` while it is open.
- States / motion: a cold open rises from 7 px with scale 0.9 and a 4 px blur (spring 560 / 34 / 0.6); a warm hand-off keeps one
  shared surface that glides and resizes to the new trigger (layout spring 520 / 40 / 0.75) while the new label slides in 14 px
  from the direction of travel (spring 700 / 44 / 0.5); closing fades, shrinks to 0.96 and blurs 2 px in 120 ms
  (`cubic-bezier(0.4, 0, 1, 1)`). Window blur or a hidden tab closes everything.
- Interactions / keyboard: pointer enter opens after `openDelay` (instantly when warm), pointer leave closes after `closeDelay`;
  pressing the trigger dismisses its tooltip until the pointer leaves; keyboard focus (`:focus-visible` only) opens immediately
  and blur closes; Escape dismisses.
