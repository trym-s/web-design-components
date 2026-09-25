# Filter Table

Status filter chips should reorganize a compact task table without losing row context.

## Classification

- Category: `data-display` — interactive
- Medium: React + TypeScript + Tailwind CSS v4
- Entry point: `reference.tsx`
- Nature: interactive; reuse the counted status chips and the collapsing-row filter transition.
- Use when: status filter chips should reorganize a compact task table without losing row context.

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx`
- `reference.tsx` — upstream capture and dashboard entry point
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--muted`, `--accent`, `--border`, `--input`, …).
It imports only `react`, `clsx` and `tailwind-merge`. `src/demo.tsx` is sample data only.

### FilterTable — `filter-table.tsx`

- Props: `statuses` (`{ value, label, color }`, `color` any CSS colour — the root declares `--filter-todo`
  `oklch(0.757 0.153 66.4)`, `--filter-progress` `oklch(0.671 0.118 219.4)`, `--filter-done` `oklch(0.652 0.131 162.9)`,
  the upstream hues), `rows` (`{ id, task, date, status, owner }`), `columns` (four header labels, default
  "Task name / Date / Status / Advisor"), `allLabel` ("All"), `value` / `defaultValue` (`"all"` or a status value) with
  `onValueChange(value)`, `className`.
- Structure: wrapper up to 420 px wide. Chip row (4 px gaps, horizontally scrollable, scrollbar hidden): one chip per
  filter, 26 px high, `rounded-full`, 10 px horizontal padding, 12 px medium; a 6 px dot in the status colour (none for
  "All"), the label, and a count (10.5 px tabular, 4 px radius, 4 px padding) computed from `rows`. Table card:
  `--card`, `rounded-lg`, `shadow-xs` + 1 px `--border` ring, horizontally scrollable (min content width 420 px);
  a 4-column grid `1.3fr 0.6fr 0.95fr 0.9fr`, padding 8×12 px. Header 11.5 px medium `--muted-foreground` with a bottom
  border. Rows 12 px: task medium `--foreground` (truncated), date tabular `--muted-foreground`, a status badge (20 px
  high, 5 px radius, 6 px padding, 11 px medium, 1 px border; text = status colour mixed 92 % with `--foreground`, fill
  20 % with `--card`, border 34 % with `--card`), owner `--muted-foreground` truncated.
- States: active chip `--card` fill, `--foreground` text, `shadow-xs` + 1 px `--input` ring, its count on `--muted`;
  inactive chips `--muted-foreground`. Rows not matching the filter collapse (grid rows `1fr → 0fr`, opacity 1 → 0) over
  300 ms `cubic-bezier(0.23, 1, 0.32, 1)`; chip colours transition over 200 ms.
- Interactions: clicking a chip selects it (`aria-pressed`); inactive chip hover fills `--accent`; row hover fills
  `--accent` (100 ms).
- Keyboard: chips are native buttons (Tab, Enter/Space). The table region (`role="region"`, "Scrollable task table") is
  focusable so it can be scrolled with arrow keys.
