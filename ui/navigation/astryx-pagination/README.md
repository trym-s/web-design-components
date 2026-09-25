# Pagination

Pagination lets users step through pages of content. Place it below a table, list, or card grid so users can move forward and backward through results. Pick a variant to match the context: numbered pages for data tables, a count for large lists, compact for tight spaces, or dots for carousels.

## Classification

- Category: `navigation` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Pagination.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Pagination lets users step through pages of content.
- Avoid when: Show pagination when all items fit on a single page; there is nothing to paginate. Use the dots variant for more than about 10 pages; the dots become too small to be useful. Place pagination above the content; users expect it at the bottom.
- Provides: Pagination, Page-size selector, First/last buttons, Previous/next buttons, Page number button, Ellipsis, Count readout, Compact readout, Dot, Page input label, Page input, Page input total
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: PaginationDotsCarousel, PaginationPageSize, PaginationVariants, PaginationWithTable
- Upstream: Astryx core · Navigation
- Keywords: pagination, pager, paginator, pagenavigation, paging, paginate, pages, pagecontrol

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

- `src/examples/PaginationDotsCarousel.tsx` — Pagination — Dots Carousel: A review carousel using dot pagination to step through testimonial cards. Use the dots variant for carousels, galleries, and any paged content where the total is small and visible position matters more than a page number. · static: `static/PaginationDotsCarousel.html`
- `src/examples/PaginationPageSize.tsx` — Pagination — Page Size Selector: A transactions table with pagination and a page size dropdown at the bottom. Shows how pagination works as a footer below real content, with adjustable rows per page. · static: `static/PaginationPageSize.html`
- `src/examples/PaginationVariants.tsx` — Pagination — Variants: All four display variants stacked: dots, compact, count, and pages. A quick visual reference for choosing the right variant. · static: `static/PaginationVariants.html`
- `src/examples/PaginationWithTable.tsx` — Pagination — With Table: Pagination below a data table with client-side page slicing. Use the count variant with small size for dense data views where users need to see item ranges. · static: `static/PaginationWithTable.html`

## Documentation

### Pagination

Pagination lets users step through pages of content. Place it below a table, list, or card grid so users can move forward and backward through results. Pick a variant to match the context: numbered pages for data tables, a count for large lists, compact for tight spaces, or dots for carousels.

**Do**

- Place pagination below the content it controls so users see results before navigating.
- Use the pages variant for data tables where users need to jump to a specific page.
- Use the count variant with a page size selector when users need to control how many items they see at once.
- Use the dots variant for carousels and walkthroughs where the total is small and position matters more than a number.
- Pass totalItems when the total is known so users can see how much content remains.

**Don't**

- Show pagination when all items fit on a single page; there is nothing to paginate.
- Use the dots variant for more than about 10 pages; the dots become too small to be useful.
- Place pagination above the content; users expect it at the bottom.

**Anatomy**

- Pagination (required) — Navigation landmark containing the current paging controls and optional page-size selector.
- Page-size selector — Optional Selector for choosing how many items appear per page.
- First/last buttons — Optional Button controls that jump to the first or last known page.
- Previous/next buttons (required) — Button controls that move backward or forward through the pages.
- Page number button — Button for one directly selectable page in the numbered presentation.
- Ellipsis — Visual omission marker between non-adjacent page-number buttons.
- Count readout — Text showing the current item range and total item count.
- Compact readout — Text showing the current page and total page count.
- Dot — Page indicator control that reflects and changes the active page.
- Page input label — Leading visible label for the editable page-number field.
- Page input — NumberInput used to enter a page directly.
- Page input total — Trailing text showing the known total page count.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `page` * | `number` |  | Current page number (1-based). Page 1 is the first page. |
| `onChange` * | `(page: number) => void` |  | Called when the page changes. |
| `changeAction` | `(page: number) => void \| Promise<void>` |  | Async action on page change. Fires after onChange and uses React transitions for built-in loading state. |
| `totalItems` | `number` |  | Total number of items. Used to calculate page count. Takes precedence over totalPages if both provided. |
| `totalPages` | `number` |  | Total number of pages. Use when you know page count but not item count. |
| `hasMore` | `boolean` |  | Whether more pages exist after the current one. Use for cursor-based pagination where total is unknown. |
| `pageSize` | `number` | `10` | Number of items per page. Coerced to a positive integer; non-finite values fall back to the default. |
| `pageSizeOptions` | `number[]` |  | Available page size options. Shows a page size selector dropdown when provided. |
| `onPageSizeChange` | `(pageSize: number) => void` |  | Called when the page size changes. Automatically resets to page 1. |
| `variant` | `'pages' \| 'count' \| 'compact' \| 'dots' \| 'input' \| 'none'` | `'pages'` | Visual variant controlling what appears between prev/next buttons. 'pages' shows page number buttons with ellipsis, 'count' shows 'X-Y of Z' text, 'compact' shows 'Page X of Y', 'dots' shows dot indicators, 'input' shows an editable page-number box with a leading label ('Page [ n ] / N') flanked by first/last buttons by default (the box needs a known total to clamp against, so it is disabled in cursor/hasMore mode), 'none' shows just prev/next buttons. |
| `pageLabel` | `string` |  | The noun rendered before the editable box in the 'input' variant, e.g. 'Page' or 'Row'. Navigation is always page-based (via onChange); this only relabels the box. Defaults to the localized 'Page'. |
| `hasFirstLast` | `boolean` | `true` | Whether to show first/last («/») double-chevron buttons flanking prev/next. Only applies to the 'input' variant; omitted when the page count is unknown (cursor/hasMore pagination). |
| `step` | `number` | `1` | Number of pages the previous/next buttons advance per click. Clamped to the valid page range, so a step that would overshoot lands on the first/last page. When greater than 1, the buttons' accessible names reflect the stride. Non-integer or values < 1 fall back to 1. |
| `siblingCount` | `number` | `1` | Number of page buttons to show on each side of the current page. Only applies when variant='pages'. |
| `size` | `'sm' \| 'md'` | `'md'` | Size of the pagination controls. |
| `isDisabled` | `boolean` | `false` | Whether the component is disabled. |
| `label` | `string` | `'Pagination'` | Accessible label for the navigation landmark. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-pagination`, `.astryx-pagination-dot`, `.astryx-pagination-input-label`, `.astryx-pagination-input-total`

### Pagination

Pagination lets users step through pages of content. Place it below a table, list, or card grid so users can move forward and backward through results. Pick a variant to match the context: numbered pages for data tables, a count for large lists, compact for tight spaces, or dots for carousels.

**Do**

- Place pagination below the content it controls so users see results before navigating.
- Use the pages variant for data tables where users need to jump to a specific page.
- Use the count variant with a page size selector when users need to control how many items they see at once.
- Use the dots variant for carousels and walkthroughs where the total is small and position matters more than a number.
- Pass totalItems when the total is known so users can see how much content remains.

**Don't**

- Show pagination when all items fit on a single page; there is nothing to paginate.
- Use the dots variant for more than about 10 pages; the dots become too small to be useful.
- Place pagination above the content; users expect it at the bottom.

**Anatomy**

- Pagination (required) — Navigation landmark containing the current paging controls and optional page-size selector.
- Page-size selector — Optional Selector for choosing how many items appear per page.
- First/last buttons — Optional Button controls that jump to the first or last known page.
- Previous/next buttons (required) — Button controls that move backward or forward through the pages.
- Page number button — Button for one directly selectable page in the numbered presentation.
- Ellipsis — Visual omission marker between non-adjacent page-number buttons.
- Count readout — Text showing the current item range and total item count.
- Compact readout — Text showing the current page and total page count.
- Dot — Page indicator control that reflects and changes the active page.
- Page input label — Leading visible label for the editable page-number field.
- Page input — NumberInput used to enter a page directly.
- Page input total — Trailing text showing the known total page count.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `page` * | `number` |  | 当前页码（从 1 开始）。第 1 页为首页。 |
| `onChange` * | `(page: number) => void` |  | 页码变化时调用。 |
| `changeAction` | `(page: number) => void \| Promise<void>` |  | 页码变化时的异步操作。在 onChange 之后触发，使用 React transitions 实现内置加载状态。 |
| `totalItems` | `number` |  | 总项目数。用于计算页数。同时提供时优先于 totalPages。 |
| `totalPages` | `number` |  | 总页数。当你知道页数但不知道项目数时使用。 |
| `hasMore` | `boolean` |  | 当前页之后是否还有更多页。用于总数未知的游标分页。 |
| `pageSize` | `number` | `10` | 每页项目数。强制转换为正整数；非有限值回退到默认值。 |
| `pageSizeOptions` | `number[]` |  | 可用的每页大小选项。提供时显示每页大小选择器下拉菜单。 |
| `onPageSizeChange` | `(pageSize: number) => void` |  | 每页大小变化时调用。自动重置到第 1 页。 |
| `variant` | `'pages' \| 'count' \| 'compact' \| 'dots' \| 'input' \| 'none'` | `'pages'` | 控制上一页/下一页按钮之间显示内容的视觉变体。'pages' 显示带省略号的页码按钮，'count' 显示 'X-Y of Z' 文本，'compact' 显示 'Page X of Y'，'dots' 显示点指示器，'input' 显示带前置标签的可编辑页码框——'Page [ n ] / N'——默认两侧带首页/末页按钮，'none' 仅显示上一页/下一页按钮。 |
| `pageLabel` | `string` |  | 'input' 变体中可编辑框前显示的名词，如 'Page' 或 'Row'。导航始终基于页码（通过 onChange）；此项仅用于重新标注。默认为本地化的 'Page'。 |
| `hasFirstLast` | `boolean` | `true` | 是否显示首页/末页（«/»）双箭头按钮，位于上一页/下一页两侧。仅适用于 'input' 变体；当页数未知（游标/hasMore 分页）时省略。 |
| `step` | `number` | `1` | 上一页/下一页按钮每次点击前进的页数。会被限制在有效页码范围内，因此超出范围的步进会落在首页/末页。大于 1 时，按钮的无障碍名称会反映跨步页数。非整数或小于 1 的值回退为 1。 |
| `siblingCount` | `number` | `1` | 当前页两侧显示的页码按钮数量。仅在 variant='pages' 时生效。 |
| `size` | `'sm' \| 'md'` | `'md'` | 分页控件的尺寸。 |
| `isDisabled` | `boolean` | `false` | 组件是否禁用。 |
| `label` | `string` | `'Pagination'` | 导航地标的无障碍标签。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义（外边距、定位、尺寸）的 StyleX 样式。必须是 stylex.create() 的值，而非内联样式对象如 style={{}}。 |

Styling hook class: `.astryx-pagination`, `.astryx-pagination-dot`, `.astryx-pagination-input-label`, `.astryx-pagination-input-total`

## Files

- `src/Pagination.doc.mjs`
- `src/Pagination.spec.md`
- `src/Pagination.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Pagination
