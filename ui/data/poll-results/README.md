# Poll Results

The winner lands last.

## Classification

- Category: `data` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/poll-results.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/poll-results.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/poll-results

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--primary`, `--card`, `--muted`, `--accent`,
`--border`, `--foreground`, `--muted-foreground`, `--radius`). It imports only `react` and `motion` (`motion/react`). Each
option button declares `--poll-bevel`, the fill's inset highlight, with defaults
`inset 0 1px 0 oklch(1 0 0 / 0.5), inset 0 -1px 0 oklch(0.216 0.006 56 / 0.1)` (dark:
`inset 0 1px 0 oklch(1 0 0 / 0.14), inset 0 -1px 0 oklch(0 0 0 / 0.3)`). `src/demo.tsx` is sample data and wiring only
(four options; `onVote` adds one vote locally).

### PollResults — `poll-results.tsx`

- Props: `options` (`{ id, label, votes }[]`), `label` (question text and group `aria-label`), `value` / `defaultValue`
  (the id voted for, `null` = not voted; controlled or not), `onVote(id)`, `className`. `usePollResults(options)` is exported
  and returns `{ rows (with share, winner, mine), total, chosen, revealed, vote }`.
- Structure: `role="group"`; a 13 px medium `--foreground` question (10 px below it the list, `space-y-1.5`); each option is a
  full-width `h-9` button, radius `calc(var(--radius) - 2px)`, 1 px `--border`. Inside, a fill bar inset 3 px (radius
  `calc(var(--radius) - 5px)`) revealed with `clip-path: inset(0 <100−share>% 0 0 round 5px)`: `--primary` at 22 % for your
  vote, `--foreground` at 10 % for others, both with `--poll-bevel`; over it the 13 px label, a 16 px slot for an 11 px tick,
  and an 11 px mono percentage (`--muted-foreground`, width reserved by an invisible "100%"). Under the list a 10.5 px mono
  "N votes" line fades in 400 ms after reveal.
- States: before voting — `--card`, `shadow-xs`, hover `--accent`, press `translate-y-px` + `shadow-inner`, labels
  `--muted-foreground` → `--foreground` on hover. After voting (`aria-disabled`, `aria-pressed` on your option) — `--muted` at
  70 %, `shadow-inner`, `cursor-default`; bars grow from 0 to their share with a spring (stiffness 210 / damping 34 / mass 0.9)
  while the percentage counts along; the winner's label turns medium `--foreground` and its tick pops in (spring 640 / 22 / 0.7)
  after its bar lands. Percentages fade in over 200 ms (`cubic-bezier(0.23, 1, 0.32, 1)`). 700 ms after reveal a status
  region announces "Results: <winner> leads with N percent of M votes". Reduced motion: bars jump, fades are instant.
- Interactions: one vote; clicks after voting do nothing.
- Keyboard: native buttons (Tab, Enter/Space). Focus-visible draws an inner overlay: `--primary` 6 % fill + 1 px inset `--primary` ring.
