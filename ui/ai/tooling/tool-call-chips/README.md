# Tool Call Chips

Code edits, tool calls, and their running or completed states need compact transcript chips.

## Classification

- Category: `ai` — agent transcript
- Medium: React + TypeScript + Tailwind CSS v4
- Entry point: `reference.tsx`
- Nature: interactive; reuse the collapsible run header, tool rows with inline chips and the file-diff chips
- Use when: code edits, tool calls, and their running or completed states need compact transcript chips.

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx`
- `reference.tsx` — upstream capture and dashboard entry point
- `preview.png` — capture from the original site
- Shared styles: `ui/_sources/beautiful-ui/styles.css` (token mapping in `ui/_sources/beautiful-ui/SOURCE.md`)

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--foreground`, `--border`, …).
It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`); `tool-call-chips.css` holds the `pop-in`,
`fade-in` and `fade-up` keyframes. `src/demo.tsx` streams sample calls in every 700 ms, then shows the diffs.

### ToolCallChips — `tool-call-chips.tsx`

- Props: `calls` (`{ icon: "think" | "write" | "run" | "read", label, chip, mono?, detail?: { text, tone?: "add" }[], detailMono? }[]`
  — append to stream), `diffs` (`{ file, add, del }[]`, shown when set), `summary` (header text), `defaultOpen` (true),
  `moreLabel` (trailing link, e.g. "+2 more"), `onDiffClick(diff)`, `onMoreClick()`, `className`.
- Structure: a column up to 320 px wide (min-height 220 px). Header: a 12.5 px `--muted-foreground` button with a 12 px
  chevron and the summary. Rows (4 px apart): a 28 px button — 16 px icon slot (`--muted-foreground`; the sparkle icon is
  filled, the others stroked), label (12.5 px medium `--foreground`), and a chip filling the rest (22 px high, `rounded-sm`,
  `--foreground` at 8 % fill, 1 px `--border` ring, 11.5 px `--foreground` at 80 %, truncates; `font-mono` when `mono`;
  dark: `--muted` fill, `--muted-foreground` text). Details: indented 8 px, 1 px `--border` left rule, 14 px padding,
  11.5 px lines at 1.6 line-height, `--muted-foreground` or `--success` for `add` lines. Diff chips (after a 1 px
  `--border` rule, 10 px padding-top, 6 px gaps, wrapping): 28 px, `rounded-sm`, `--card`, `shadow-xs` + 1 px `--input` ring,
  mono 11.5 px file name, `+add` in `--success`, `−del` in `--destructive` (only when > 0); then the `moreLabel` link.
- States: the header chevron points down when open and right (−90°) when closed; the row list collapses via
  `grid-template-rows` 1fr↔0fr with opacity over 300 ms. On row hover (or while the row is open) the icon fades out and a
  chevron fades in (150 ms); open rows show their detail (300 ms, `cubic-bezier(0.23,1,0.32,1)`). Hover fills: header and
  rows `--foreground` at 8 %, chips `--input`, diff chips `--accent`. `--success` is declared on the root
  (`oklch(0.603 0.155 150.9)`, dark `oklch(0.705 0.154 153.8)`).
- Motion: each new row fades up 8 px in 300 ms; diff chips pop in (scale 0.95→1, 250 ms) staggered 80 ms; the more link
  fades in 300 ms after the last chip.
- Keyboard: header, rows, diff chips and the more link are native buttons (`aria-expanded` on header and rows); Tab moves
  through them, Enter/Space toggles or activates.
