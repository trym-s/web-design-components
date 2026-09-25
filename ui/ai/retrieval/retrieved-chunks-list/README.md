# Retrieved Chunks List

Retrieved knowledge chunks need compact previews with source type, filename, and character count.

## Classification

- Category: `ai` — retrieval context
- Medium: React + TypeScript + Tailwind CSS v4
- Entry point: `reference.tsx`
- Nature: structural; reuse the chunk card (title bar, excerpt, source chip) and the count header
- Use when: retrieved knowledge chunks need compact previews with source type, filename, and character count.

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx`
- `reference.tsx` — upstream capture and dashboard entry point
- `preview.png` — capture from the original site
- Shared styles: `ui/_sources/beautiful-ui/styles.css` (token mapping in `ui/_sources/beautiful-ui/SOURCE.md`)

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--muted`, `--border`, `--input`,
`--destructive`, …). It imports only `react`, `clsx` and `tailwind-merge`; `chunks-list.css` holds the `fade-in` and
`fade-up` keyframes. `src/demo.tsx` is sample data only.

### ChunksList — `chunks-list.tsx`

- Props: `title` ("All chunks"), `count` (header badge; omitted → no badge), `chunks` (`{ title, chars, body, source, badge,
  tone?: "destructive" | "success" | "warning" | "primary" | "muted", href? }[]`), `onOpenSource(chunk)`, `className`.
- Structure: a column, max-width 380 px, 8 px gap. Header: title (13 px semibold `--foreground`) and a 20 px-high count
  badge (`--muted`, `rounded-sm`, 1 px `--border` ring, 11.5 px medium `--muted-foreground`, tabular figures). One card per
  chunk (`--card`, `rounded-lg`, `shadow-xs` + 1 px `--border` ring): a title bar (10×12 px padding, bottom border) with an
  11 px "lines" icon, the title (13 px medium, truncates) and the size caption right-aligned (12 px `--muted-foreground`);
  the excerpt (12.5 px, relaxed, `--muted-foreground`, padding 8 px 12 px 4 px); then a 24 px-high round source chip
  (`--muted`, `shadow-xs` + `--input` ring, 12 px medium) holding a 14 px square badge (4 px radius, 7 px bold white
  text on the tone fill), the file name and a 9 px ↗ arrow. `--success` / `--warning` are declared on the root with the
  snapshot values.
- States: header fades in (400 ms ease-out); cards `fade-up` 400 ms `cubic-bezier(0.23,1,0.32,1)`, staggered 100 ms. Source
  chips start at opacity 0 / scale 0.95 and transition in 300 ms after a 700 ms mount delay, staggered 80 ms. Chip hover →
  `--accent`.
- Interactions: the chip is a link (new tab) when the chunk has `href`, otherwise a button; both call `onOpenSource`.
- Keyboard: chips are native links/buttons in document order.
