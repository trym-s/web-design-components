# Code Block

Agent-written code should stream line by line with filename, language, and copy controls.

## Classification

- Category: `code` — interactive
- Medium: React + TypeScript + Tailwind CSS v4
- Entry point: `reference.tsx`
- Nature: interactive; reuse the header/copy layout and the line-by-line streaming reveal.
- Use when: agent-written code should stream line by line with filename, language, and copy controls.

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx`
- `reference.tsx` — upstream capture and dashboard entry point
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--muted`, `--primary`, `--border`, …).
It imports only `react`, `clsx` and `tailwind-merge`; `code-block.css` holds the `fade-up` keyframes. `src/demo.tsx` is
sample data and the simulated stream only (a line every 240 ms after a 400 ms start, a 3.2 s hold on the full block, then a restart).

### CodeBlock — `code-block.tsx`

- Props: `filename`, `language` (optional caption), `lines` (array of lines, each an array of `{ text, kind? }` tokens,
  `kind` ∈ `keyword | string | number | function | punctuation`), `visibleLines` (how many lines are shown, default all),
  `streaming` (shows a caret after the last visible line), `copyText` (clipboard text, default the joined tokens),
  `onCopy(text)`, `className`.
- Structure: a card up to 380 px wide (`max-w-95`), `--card` fill, `rounded-lg`, `shadow-xs` + 1 px `--border` ring,
  overflow hidden. Header bar (padding 10×12 px, bottom border `--border`): filename in `font-mono` 12 px medium
  `--foreground`, language 11.5 px `--muted-foreground`, baseline-aligned with an 8 px gap; on the right a 24 px-high copy
  button (11.5 px medium, 10 px copy/check icon, `rounded-sm`). Body: a `<pre>` at least 137 px high, `--muted` fill,
  padding 10×12 px, `font-mono` 11.5 px, line-height 1.7. Each line: a 20 px right-aligned line number (10.5 px,
  `--muted-foreground` at 60 %, not selectable), then the tokens after 10 px, `white-space: pre`. Token colours:
  keyword `--primary`, string `--success`, number `--warning`, function `--foreground`, punctuation and plain text
  `--muted-foreground`. `--success` / `--warning` are declared on the root (light `oklch(0.603 0.155 150.9)` /
  `oklch(0.689 0.179 49.9)`, dark `oklch(0.705 0.154 153.8)` / `oklch(0.746 0.156 55.6)`).
- States: each newly shown line runs `fade-up` (opacity 0→1, translateY 8 px→0) over 250 ms with
  `cubic-bezier(0.23,1,0.32,1)`; while `streaming`, a 3×12 px `--primary` pill caret follows the last line. Copied: the
  button turns `--success`, shows a check and "Copied" for 1.5 s.
- Interactions: the copy button writes `copyText` to the clipboard, then calls `onCopy`. Hover on the button: `--accent`
  fill, text `--foreground` (100 ms colour transition).
- Keyboard: the copy button is a native `<button>` (Tab to focus, Enter/Space to copy), labelled "Copy code".
