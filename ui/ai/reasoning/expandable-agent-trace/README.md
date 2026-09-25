# Expandable Agent Trace

Agent reasoning, search, coding, or multi-step work should expand into a readable trace without dominating the conversation.

## Classification

- Category: `ai` — agent reasoning trace
- Medium: React + TypeScript + Tailwind CSS v4
- Entry point: `reference.tsx`
- Nature: interactive; reuse the one-line header that expands into a rail-lined trace (steps, reasoning, search, coding)
- Use when: agent reasoning, search, coding, or multi-step work should expand into a readable trace without dominating the conversation.

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx`
- `reference.tsx` — upstream capture and dashboard entry point
- `preview.png` — capture from the original site
- Shared styles: `ui/_sources/beautiful-ui/styles.css` (token mapping in `ui/_sources/beautiful-ui/SOURCE.md`)

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--foreground`, `--muted-foreground`,
`--border`, `--primary`, `--destructive`, …). It imports only `react`, `clsx` and `tailwind-merge`; `agent-trace.css` holds
the `fade-in`, `fade-up`, `shimmer-text` and `spin` keyframes and the link underline. `src/demo.tsx` is sample data and
the scripted run only (opens at 0.8 s, first two rows at 1.4 s, all rows + settled at 3.2 s, collapses at 5.8 s), one per variant.

### AgentTrace — `agent-trace.tsx`

- Props: `variant` (`steps` | `reasoning` | `search` | `coding`), `working`, `activeLabel`, `doneLabel`, `rows`
  (`{ primary, secondary?, mono?, add?, del?, href? }[]` — the rows produced so far), `query` (search line),
  `moreLabel` (e.g. "+7 more"), `autoExpanded` (the open state the agent suggests), `onToggle(expanded)`, `className`.
- Structure: a column (max-width 380 px, min-height 176 px). Header button (padding 4×6 px, `rounded-md`, hover
  `--foreground` at 8 %): a 16 px four-point sparkle filled `--muted-foreground`, the label (13 px medium, no wrap) and a
  14 px chevron that rotates 180° in 300 ms when open. Trace (5 px left offset, 16 px left padding): a 1 px `--border` rail at
  x = 3 px starting 8 px above the first row whose height follows the rows (500 ms `cubic-bezier(0.23,1,0.32,1)`), then
  rows (min-height 28 px, `rounded-sm`, 4 px gap, 12.5 px text). Per variant: `steps` — a 14 px check, or on the last row
  while working a 12 px spinner (1.5 px `--input` ring, `--muted-foreground` top, `spin` 700 ms linear); `reasoning` —
  wrapping prose, relaxed line-height, `--muted-foreground`; `search` — a magnifier + query line, then link rows with a
  14 px globe dot cycling `--primary` / `--warning` / `--success` and an underline that grows from the left on hover
  (280 ms `cubic-bezier(0.16,1,0.3,1)`); `coding` — toggle rows with the tool name, a mono secondary (11.5 px) and
  `+add` (`--success`) / `−del` (`--destructive`) counts.
- States: while `working`, the label is the shimmering `activeLabel` (gradient `--muted-foreground → --foreground →
  --muted-foreground`, 1.4 s linear); afterwards `doneLabel` in `--muted-foreground` with `fade-in` 350 ms. Open/close animates
  `grid-template-rows` 0fr↔1fr and opacity over 400 ms `cubic-bezier(0.23,1,0.32,1)`. Rows enter with `fade-up` 320 ms,
  staggered 120 ms. A selected coding row sits on `--muted`; others hover `--accent`. `--success` / `--warning` are declared
  on the root with the snapshot values.
- Interactions: the header toggles the trace; once toggled, the user's choice overrides `autoExpanded`. Coding rows toggle
  a selected state; search rows open their `href` in a new tab.
- Keyboard: header is a `<button>` with `aria-expanded`; coding rows are buttons with `aria-pressed`; search rows are links.
