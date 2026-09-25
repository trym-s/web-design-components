# Pagination

The window moves, the row does not.

## Classification

- Category: `navigation` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/pagination.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/pagination.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/pagination

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### Pagination — `pagination.tsx`

- Props: `count`, `page` / `defaultPage` (1) / `onPageChange(page)`, `siblings` (1 page each side of the current),
  `boundaries` (1 page at each end), `label` ("Pagination"), `className`. Also exports `paginate(page, count, siblings,
  boundaries)` (the item list with `gap-l` / `gap-r` ellipses; shows every page when `count ≤ 2·boundaries + 2·siblings + 3`)
  and `usePagination(options)`.
- Structure: a `<nav>` row (4 px gaps): a 32 px ‹ button, an ordered list of equal slots (width `max(32, 18 + 8 × digits)` px,
  32 px high, 12.5 px tabular), a 32 px › button. Ellipsis slots show "…". A single `--primary` thumb (radius
  `--radius − 1px`) sits under the current page.
- States / motion: the thumb slides to the current slot (spring 520 / 34 / 0.45); the current number is
  `--primary-foreground` medium, others `--muted-foreground` (hover `--accent` / `--foreground`). When the page changes, the
  numbers roll in 8 px from the travel direction with a fade (180 ms, `cubic-bezier(0.23, 1, 0.32, 1)`). Arrows at the ends
  are `aria-disabled` and dimmed to 60 %. Focus-visible: 1 px `--primary` inset ring on `--primary` at 6 %.
- Keyboard / a11y: every control is a button (Tab, Enter/Space); pages are labelled "Page n", the current one
  `aria-current="page"`; a status region says "Page n of m" 500 ms after a change.
