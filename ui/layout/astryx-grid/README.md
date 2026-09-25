# Grid

A CSS grid layout container for arranging children in rows and columns. Use Grid for card galleries, dashboards, and any multi-column layout. Supports fixed column counts and responsive columns that reflow based on available width.

## Classification

- Category: `layout` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Grid.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A CSS grid layout container for arranging children in rows and columns.
- Avoid when: Write manual CSS grid; Grid handles spacing and responsive behavior for you. Use `HStack` with wrapping for grids; use Grid instead.
- Provides: Grid container, Spanning item
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: GridShowcase, GridSpanShowcase, GridDashboardLayout, GridGalleryExample, GridResponsiveAutoFit, GridSpanColumns, GridWithGridSpan
- Upstream: Astryx core · Layout
- Keywords: grid, columns, responsive, auto-fill, auto-fit, masonry, tiles, row, col, simplegrid, responsive grid, card grid

## How an agent uses this reference

- **React 19 target** — install `@astryxdesign/core` + a theme and copy the example from
  `src/examples/` as-is, or read `src/` to own the component (upstream calls this "swizzle").
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the
  rendered DOM of each example with every class resolved by the local stylesheets in
  `ui/_sources/astryx/` (`frame.css` pulls fonts, reset, component CSS and all seven themes).
  Keep the markup, the `data-astryx-theme` wrapper and the `--*` tokens; re-implement behavior
  from the Props / Accessibility sections below, never from the minified class names.
- Design rules shared by every component: `ui/_sources/astryx/docs/` (principles, tokens, color,
  spacing, typography, motion, layout).

## Examples

- `src/examples/GridShowcase.tsx` — Grid · static: `static/GridShowcase.html`
- `src/examples/GridSpanShowcase.tsx` — Grid Span: GridSpan lets a grid item span multiple columns or rows within an Grid, enabling masonry-style and asymmetric layouts. · static: `static/GridSpanShowcase.html`
- `src/examples/GridDashboardLayout.tsx` — Grid — Dashboard Layout: Dashboard layout with mixed-size widgets and a full-width summary row · static: `static/GridDashboardLayout.html`
- `src/examples/GridGalleryExample.tsx` — Grid — Card Gallery: Card gallery with responsive columns that maintain consistent widths · static: `static/GridGalleryExample.html`
- `src/examples/GridResponsiveAutoFit.tsx` — Grid — Responsive Auto-Fit: Responsive grid where cards stretch to fill remaining space · static: `static/GridResponsiveAutoFit.html`
- `src/examples/GridSpanColumns.tsx` — GridSpan — Columns: Grid items spanning two of three columns. Wrap a grid child in GridSpan to make it occupy multiple columns for asymmetric layouts. · static: `static/GridSpanColumns.html`
- `src/examples/GridWithGridSpan.tsx` — Grid — Column Spanning: Grid with featured items spanning multiple columns and rows · static: `static/GridWithGridSpan.html`

## Documentation

### Grid

A CSS grid layout container for arranging children in rows and columns. Use Grid for card galleries, dashboards, and any multi-column layout. Supports fixed column counts and responsive columns that reflow based on available width.

**Do**

- Use responsive columns for layouts that should adapt to screen size: `columns={{minWidth: 280}}`.
- Cap the column count with `max` to prevent rows from getting too wide on large screens.
- Use `repeat: 'fill'` (the default) for consistent item widths. Use `'fit'` when items should stretch to fill leftover space.
- Track templates use CSS-variable indirection (not raw inline styles), so `xstyle` overrides of `gridTemplateColumns` (including inside `@media` queries) take effect.

**Don't**

- Write manual CSS grid; Grid handles spacing and responsive behavior for you.
- Use `HStack` with wrapping for grids; use Grid instead.

**Anatomy**

- Grid container (required) — Two-dimensional layout container that arranges caller-supplied items in rows and columns.
- Spanning item — Optional GridSpan wrapper that changes one item's column or row participation.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` | `number \| {minWidth: number, max?: number, repeat?: 'fill' \| 'fit'}` |  | Column configuration. Use a number for fixed columns (e.g. `columns={3}`). Use an object for responsive columns: `minWidth` sets the minimum column width in px, `repeat` controls track behavior (`"fill"` preserves empty tracks for consistent widths, `"fit"` collapses empty tracks so items stretch; defaults to `"fill"`), and `max` caps the maximum number of columns. |
| `width` | `SizeValue` |  | Container width. Numbers are treated as pixels, strings are used as-is. |
| `height` | `SizeValue` |  | Container height. Numbers are treated as pixels, strings are used as-is. |
| `maxWidth` | `SizeValue` |  | Maximum container width. Numbers are treated as pixels, strings are used as-is. |
| `minHeight` | `SizeValue` |  | Minimum container height. Numbers are treated as pixels, strings are used as-is. |
| `gap` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Spacing between all items. |
| `rowGap` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Row spacing; overrides `gap` for the row axis. |
| `columnGap` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Column spacing; overrides `gap` for the column axis. |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Vertical alignment of items. |
| `justify` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Horizontal alignment of items. |
| `children` | `ReactNode` |  | Grid content. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value: not an inline style object like style={{}}. |

Styling hook class: `.astryx-grid`, `.astryx-grid-span`

### Grid Span

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` | `number \| 'full'` |  | Columns to span; use `'full'` to span the entire row. |
| `rows` | `number` |  | Rows to span. |
| `children` | `ReactNode` |  | Content. |

### Grid Span

### Grid Span

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` | `number \| 'full'` |  | 要跨越的列数；使用 `'full'` 跨越整行。 |
| `rows` | `number` |  | 要跨越的行数。 |
| `children` | `ReactNode` |  | 内容。 |

## Files

- `src/Grid.doc.mjs`
- `src/Grid.spec.md`
- `src/Grid.tsx`
- `src/GridSpan.doc.mjs`
- `src/GridSpan.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Grid
