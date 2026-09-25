# Sidebar Nav

Workspace navigation needs quick search, primary actions, grouped links, counts, and active state.

## Classification

- Category: `navigation` — workspace sidebar
- Medium: React + TypeScript + Tailwind CSS v4
- Entry point: `reference.tsx`
- Nature: interactive; reuse the grouped nav with a gliding highlight, count badges and hover add buttons
- Use when: workspace navigation needs quick search, primary actions, grouped links, counts, and active state.

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx`
- `reference.tsx` — upstream capture and dashboard entry point
- `preview.png` — capture from the original site
- Shared styles: `ui/_sources/beautiful-ui/styles.css` (token mapping in `ui/_sources/beautiful-ui/SOURCE.md`)

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--accent`, `--primary`, …).
It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`); `sidebar-nav.css` holds the `pop-in`
keyframes. `src/demo.tsx` holds the sample workspace, sections and counts.

### SidebarNav — `sidebar-nav.tsx`

- Props: `workspace` (`{ name, subtitle, initial }`), `onWorkspaceClick()`, `sections` (`{ label, items: { key, label, icon, count?,
  onAdd? }[] }[]`), `active` / `defaultActive` (first item) / `onActiveChange(key)`, `search` + `onSearchChange(value)`,
  `searchPlaceholder` ("Quick search"), `actionLabel` + `onAction()` (primary action row, hidden without a label), `className`.
- Structure: a 240 px `--card` panel (radius `--radius`, 8 px padding, `shadow-sm` + 1 px `--border` ring). Workspace button:
  32 px `--foreground` square with the `--background` initial, name (13 px medium) over subtitle (11 px `--muted-foreground`),
  an up/down chevron. Search: 32 px `--muted` field with a 1 px `--border` ring, 12 px magnifier, 12.5 px input and a 18 px
  "/" key cap (`--card`). Action row: 13 px medium `--primary` text with a 16 px `--primary` circle "+", hover `--primary` at
  10 %. Sections: 10.5 px uppercase `--muted-foreground` labels (0.08 em tracking), items 13 px with a 13 px icon, 1 px apart,
  radius `--radius − 3px`; optional count pill (18 px, 10.5 px semibold tabular) and an 18 px add button.
- States: one `--accent` highlight glides to the hovered/focused item, else the active one (top/height 220 ms
  `cubic-bezier(0.23,1,0.32,1)`). Active item: `--foreground` icon and medium label, `aria-current="page"`, count on `--card` with a
  `--border` ring, add button always visible; inactive: `--muted-foreground`, count on `--primary` 10 % with `--primary` text,
  add button visible on hover. Counts pop in (scale 0.95→1, 250 ms) whenever they change. Pressed rows scale to 0.96.
- Interactions: clicking an item selects it; the add button calls `item.onAdd` without selecting.
- Keyboard: items and the workspace/action rows are native buttons (Tab, Enter/Space); focus moves the highlight like hover.
  The "/" key cap is a hint only — bind the shortcut in the host app.
