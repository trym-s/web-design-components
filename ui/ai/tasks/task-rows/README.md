# Task Rows

Live agent tasks need running, failed, and completed status in capsule or list layouts.

## Classification

- Category: `ai` — agent task status
- Medium: React + TypeScript + Tailwind CSS v4
- Entry point: `reference.tsx`
- Nature: interactive; reuse the status badges, pills and expandable detail steps
- Use when: live agent tasks need running, failed, and completed status in capsule or list layouts.

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx`
- `reference.tsx` — upstream capture and dashboard entry point
- `preview.png` — capture from the original site
- Shared styles: `ui/_sources/beautiful-ui/styles.css` (token mapping in `ui/_sources/beautiful-ui/SOURCE.md`)

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--foreground`, `--border`, …).
It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`); `task-rows.css` holds the `spin`, `pop-in`,
`fade-in` and `fade-up` keyframes. `src/demo.tsx` drives the upstream status run (sample data and timers only).

### TaskRows — `task-rows.tsx`

- Props: `tasks` (`{ id, label, amount?, status: "pending" | "running" | "failed" | "done", step?, details?: { label, meta? }[] }[]`),
  `variant` (`capsules` default, `list`), `open` (`Record<id, boolean>` — rows the caller opens, e.g. while a task runs),
  `onOpenChange(id, open)`, `labels` (`{ done: "Completed", failed: "Failed" }`), `className`.
- Structure: a column up to 440 px wide. `capsules`: one card per row (`--card`, `shadow-xs` + 1 px `--border` ring, 8 px
  gap, min-height 196 px), radius `--radius + 12px` (22 px) closed and `--radius + 4px` (14 px) open, animated 300 ms.
  `list`: one card (radius `--radius`) with 1 px `--border` dividers. Row header: a 44 px high button (10 px side padding,
  10 px gaps): 24 px status badge, label (13 px medium, `--foreground`, truncates), amount (12.5 px tabular,
  `--muted-foreground`), status pill, 15 px chevron. Details: a 24 px column with a 1 px `--border` rule, then one line per step
  (12 px label left, 11.5 px mono meta right, both `--muted-foreground`), 6 px apart, 10 px bottom margin.
- States: badge — `pending`: 24 px ring (2 px `--border` stroke) with `step` centred (10.5 px semibold); `running`: the same
  ring spinning (1.1 s linear) with a `--muted-foreground` arc covering 28 %; `done`: 22 px `--success` circle with a white
  check; `failed`: 22 px `--destructive` circle with a white ×; both pop in (scale 0.95→1, 300 ms). Pill — `done`:
  "Completed" on `--success` at 12 %, `--success` text; `failed`: "Failed" plus a spinning retry icon (1.2 s) on
  `--destructive` at 10 %; pills fade in over 200 ms; 22 px high, fully rounded, 11.5 px medium. `--success` is declared on
  the root: `oklch(0.603 0.155 150.9)`, dark `oklch(0.705 0.154 153.8)`.
- Motion: rows fade up (8 px, 450 ms `cubic-bezier(0.23,1,0.32,1)`) staggered 80 ms; the details panel animates
  `grid-template-rows` 0fr↔1fr and opacity over 300 ms with the same curve, each step fading up 300 ms with 120 ms + 100 ms × index
  delay; the chevron rotates 180° when open. Hovering a header fills it with `--muted`.
- Interactions: clicking a header toggles its details; after the user toggles a row, that choice wins over `open`.
- Keyboard: headers are native buttons with `aria-expanded`; Tab moves between them, Enter/Space toggles.
