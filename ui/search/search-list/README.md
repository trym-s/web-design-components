# Search List

Command search needs live filtering, suggested prompts, keyboard-friendly results, and an empty state.

## Classification

- Category: `search` — filterable list
- Medium: React + TypeScript + Tailwind CSS v4
- Entry point: `reference.tsx`
- Nature: interactive; reuse the search field with clear button, suggestion list and empty state
- Use when: command search needs live filtering, suggested prompts, keyboard-friendly results, and an empty state.

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx`
- `reference.tsx` — upstream capture and dashboard entry point
- `preview.png` — capture from the original site
- Shared styles: `ui/_sources/beautiful-ui/styles.css` (token mapping in `ui/_sources/beautiful-ui/SOURCE.md`)

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--accent`, `--border`, …).
It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`); `search-list.css` holds the `fade-in`
keyframes. `src/demo.tsx` holds the sample items.

### SearchList — `search-list.tsx`

- Props: `items` (strings), `value` / `defaultValue` / `onValueChange(query)`, `onSelect(item)`, `placeholder` ("Search flavors…";
  also the input's label without the ellipsis), `suggestionCount` (5 — items shown while the query is empty), `emptyTitle`
  ("No results found"), `emptyHint` ("Adjust your search to try again"), `className`.
- Structure: a column up to 288 px (min-height 248 px) holding a `--card` panel (radius `--radius`, `shadow-sm` + 1 px `--border`
  ring). Header: 40 px row with a 1 px `--border` bottom rule, 14 px magnifier, 13 px input, and a 22 px round clear ×
  (only while there is a query). Results: 4 px padding, 32 px rows (13 px `--foreground`, radius `--radius − 4px`). Empty state:
  centred, 32 px padding: a 32 px `--muted` tile with a magnifier, the title (13 px medium) and hint (12 px
  `--muted-foreground`).
- States: empty query → first `suggestionCount` items; otherwise case-insensitive substring matches; the empty state shows only
  when the query is longer than 2 characters and nothing matches. Rows, clear button and empty state fade in (150–250 ms).
  Hover: header and rows fill with `--accent`; clear button `--border` at 70 %.
- Interactions: typing filters; clicking a row puts it in the field and calls `onSelect`; × clears.
- Keyboard: native input and buttons — Tab moves from the field to the clear button and each row; Enter/Space picks a row.
