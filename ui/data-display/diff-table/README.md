# Diff Table

AI-proposed edits to tabular data need clear before-and-after rows and an animated review state.

## Classification

- Category: `data-display` — interactive
- Medium: React + TypeScript + Tailwind CSS v4
- Entry point: `reference.tsx`
- Nature: functional; reuse the removed-row tint/strike-through and the expanding added row as a review pattern.
- Use when: AI-proposed edits to tabular data need clear before-and-after rows and an animated review state.

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx`
- `reference.tsx` — upstream capture and dashboard entry point
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--destructive`, `--border`, …).
It imports only `react`, `clsx` and `tailwind-merge`. `src/demo.tsx` is sample data and the one-shot review timeline
(plain for 1.8 s, removals shown at 1.8 s, the addition at 2.8 s, then it rests).

### DiffTable — `diff-table.tsx`

- Props: `title`, `columns` (three header labels), `rows` (`{ id, name, tag: { label, tone }, detail, change? }`,
  `tone` ∈ `primary | muted | warning | success`, `change` ∈ `removed | added`), `showRemovals`, `showAdditions`, `className`.
- Structure: wrapper up to 380 px wide; card with `--card` fill, `rounded-lg`, `shadow-xs` + 1 px `--border` ring,
  overflow hidden. Title bar (padding 10×12 px, bottom border) with the title at 12.5 px medium `--foreground`. A
  fixed-layout table, columns 34 % / 30 % / 36 %, every cell padded 10×12 px; header cells 12 px medium
  `--muted-foreground`; rows separated by `--border` (none after the last). Column 1: 13 px medium, tabular numbers.
  Column 2: a 22 px pill (`rounded-full`, `--muted` fill, 1 px `--border` ring, 11.5 px medium, 8 px horizontal padding)
  with a 6 px dot (`--primary`, `--muted-foreground`, `--warning` or `--success` by tone) and a `--muted-foreground`
  label. Column 3: 12.5 px `--muted-foreground`, no wrap. Added rows sit in one full-width cell as a 34/30/36 grid with
  a top border, `--success` at 12 % fill, `--success` text (13 px) and a `--card` pill. `--success` / `--warning` are
  declared on the root (light `oklch(0.603 0.155 150.9)` / `oklch(0.689 0.179 49.9)`, dark `oklch(0.705 0.154 153.8)` /
  `oklch(0.746 0.156 55.6)`).
- States: a row with `change: "removed"` and `showRemovals` gets a `--destructive` 10 % fill, `--destructive` text in
  columns 1 and 3, a line-through in column 3 (decoration `--destructive` at 50 %) and its pill at 55 % opacity — colour
  and opacity transition over 400 ms. Added rows collapse to 0 height (grid rows `0fr`, opacity 0) and expand to `1fr`,
  opacity 1 over 400 ms `cubic-bezier(0.23, 1, 0.32, 1)` once `showAdditions`.
- Interactions: row hover fills `--accent` (not on removed rows while tinted). No other input.
- Keyboard: none — the table is display-only.
