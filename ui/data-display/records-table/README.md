# Records Table

A dense CRM table needs tags, sorting, selection, relationship status, links, and a sticky first column.

## Classification

- Category: `data-display` — functional
- Medium: React + TypeScript + Tailwind CSS v4
- Entry point: `reference.tsx`
- Nature: functional; reuse the gridlines, tag palette, sticky first column/header/footer, selection and sorting.
- Use when: a dense CRM table needs tags, sorting, selection, relationship status, links, and a sticky first column.

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx`
- `reference.tsx` — upstream capture and dashboard entry point
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--muted`, `--primary`, `--destructive`, `--border`, `--input`, …).
It imports only `react`, `clsx` and `tailwind-merge`. `src/demo.tsx` is sample data only (26 companies and the
tag → colour table).

### RecordsTable — `records-table.tsx`

- Props: `rows` (`{ id, name, tags: { label, color? }[], last, strength, website? }`, `strength` ∈
  `strong | weak | veryweak | none`), `strengthLabels` (defaults "Very strong", "Weak", "Very weak", "No communication"),
  `noContactLabel` ("No contact" — that `last` value renders muted), `defaultSort` (`{ key: "name", dir: 1 }`),
  `onSortChange(sort)`, `selected` / `onSelectedChange(set)` (uncontrolled when `selected` is omitted),
  `onAddCalculation()`, `className`.
- Colours declared on the root: `--success` / `--warning` (light `oklch(0.603 0.155 150.9)` / `oklch(0.689 0.179 49.9)`,
  dark `oklch(0.705 0.154 153.8)` / `oklch(0.746 0.156 55.6)`), a tag palette `--tag-orange` `oklch(0.757 0.153 66.4)`,
  `--tag-lime` `oklch(0.727 0.164 123.9)`, `--tag-rose` `oklch(0.680 0.169 17.0)`, `--tag-magenta` `oklch(0.611 0.176 344.0)`,
  `--tag-cyan` `oklch(0.671 0.118 219.4)`, `--tag-violet` `oklch(0.627 0.230 296.7)`, `--tag-blue` `oklch(0.611 0.210 263.9)`,
  `--tag-green` `oklch(0.652 0.131 162.9)`, and `--records-sticky-shadow` (`5px 0 8px -10px oklch(0 0 0 / 0.4)`).
- Structure: shell `--card`, 1 px `--border`, `rounded-lg`, `shadow-xs`, overflow hidden; inside a scroller (max height
  438 px, both axes, stable scrollbar gutter). Table: fixed layout, min width 990 px, columns 270 / 275 / 190 / 210 /
  175 px, 12 px `--foreground`; every cell has right and bottom 1 px borders in `--border` at 78 % (no right border on the
  last column). Header (42 px, sticky top, `--card`, 12 px semibold `--muted-foreground`): the first cell holds the
  select-all checkbox and "Company" (6 px left padding); the others are full-width buttons (gap 8 px, padding 0 12 px) with a
  15 px outline icon, the label and, on sortable columns (Last interaction, Connection strength), a 12 px down-arrow
  pushed right. Body cells are 42 px, padding 0 12 px, single-line with ellipsis. Column 1 is sticky left (`--card` fill,
  sticky shadow): checkbox, a 20 px `--muted` letter mark (`rounded-sm`, 10 px, weight 650, `--muted-foreground`) and the
  name (12.5 px medium; a link when `website` is set). Column 2: up to four tags (23 px, `rounded-sm`, 7 px padding, 11 px
  medium, max 115 px; border = tag colour 24 % into `--card`, fill 13 %, text 82 % into `--foreground`, a 5 px dot) and a
  `+N` chip (`--muted`, `--input` border). Column 3: `last`. Column 4: an 8 px dot (`--success`, `--warning`,
  `--destructive`, `--muted-foreground` for strong → none) and the label in `--muted-foreground`. Column 5: the website as
  a `--primary` underlined link (underline at 35 %, offset 3 px) with a 12 px arrow, or a muted dash. Footer row (38 px,
  sticky bottom, `--muted`, 11.5 px `--muted-foreground`): row count, "Add calculation" (+ icon), a dash, the average
  strength (`rank / 3` as %, `--warning` dot), the link count.
- States: checkbox 18 px, `rounded-sm`, 1 px `--input` border on `--card` (dark: `--input` at 30 %); checked/mixed →
  `--primary` fill and border, `--primary-foreground` check (12 px) or an 8×1.5 px dash; 140 ms transitions. Row hover →
  every cell `--accent`; selected row → cells `--primary` 7 % over `--card` (wins over hover). Sort arrow: hidden until the
  header hovers or the column is the active sort; rotated 180° for descending (160 ms `cubic-bezier(.23,1,.32,1)`).
- Interactions: clicking a sortable header sorts by it ascending, again toggles direction (name: locale compare; last:
  string compare; strength: rank). Row checkbox toggles that row; header checkbox selects all visible rows or clears them.
  Name hover (with a website) turns `--primary` and underlines; link hover turns `--foreground`. Pressed checkbox / Add
  calculation scale to 0.96.
- Keyboard: the scroller is focusable (arrow keys scroll; focus ring 2 px `--primary` inset). Checkboxes are native
  inputs (Space toggles, focus-visible outline 2 px `--primary` offset 2 px); header buttons and links are native.
