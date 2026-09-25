# Table

Table displays structured data in rows and columns with consistent dimensionality. It supports rich cell content, sorting, selection, pagination, and column management through a composable plugin system. Use Table for data sets with uniform structure; for simpler or inconsistent data, consider a list or card layout instead.

## Classification

- Category: `data-display` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/Table.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Table displays structured data in rows and columns with consistent dimensionality.
- Avoid when: Use a table for data without consistent columns. Use a list or card layout for heterogeneous content. Enable every plugin at once. Add only the features your use case requires to keep the interface focused. Omit width on text-heavy columns; without an explicit proportional() width they have no minimum and can squish to near-zero on mobile.
- Provides: Table, Scroll region, Header section, Column header cell, Sort control, Sort indicator glyph, Sort priority, Selection control, Body section, Row, Cell, Default empty state, Expansion control, Expansion glyph, Expanded detail panel, Footer section
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: TableShowcase, ColumnResizeHookUsage, StickyColumnsHookUsage, TableColumnSettingsTable, TableFilterableTable, TableGridDividersTable, TableGroupedRowsTable, TableInCard, TableInlineFilterTable, TablePaginatedTable, TableResizableTable, TableRichCellTable, TableRowExpansionTable, TableRowIndexTable, TableRowStatusTable, TableSelectableTable, TableSortableTable, TableStripedTable, TableTreeTable
- Upstream: Astryx core · Table & List
- Keywords: table, datatable, datagrid, spreadsheet, sorting, virtualized, columns, rows, selection, pinning

## How an agent uses this reference

- **React 19 target** — install `@astryxdesign/core` + a theme and copy the example from
  `upstream/examples/` as-is, or read `upstream/` to own the component (upstream calls this "swizzle").
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the
  rendered DOM of each example with every class resolved by the local stylesheets in
  `ui/_sources/astryx/` (`frame.css` pulls fonts, reset, component CSS and all seven themes).
  Keep the markup, the `data-astryx-theme` wrapper and the `--*` tokens; re-implement behavior
  from the Props / Accessibility sections below, never from the minified class names.
- Design rules shared by every component: `ui/_sources/astryx/docs/` (principles, tokens, color,
  spacing, typography, motion, layout).

## Examples

- `upstream/examples/TableShowcase.tsx` — Table: Data-driven table with proportional and pixel column widths and hover highlighting. · static: `static/TableShowcase.html`
- `upstream/examples/ColumnResizeHookUsage.tsx` — useTableColumnResize — Draggable Columns: A Table using useTableColumnResize. Drag the right edge of any column header to resize; widths are committed on release. The last proportional column flexes to fill remaining space. · static: `static/ColumnResizeHookUsage.html`
- `upstream/examples/StickyColumnsHookUsage.tsx` — useTableStickyColumns — Pinned Columns: A Table using useTableStickyColumns to pin the Name column to the start edge and Status to the end edge. Scroll horizontally; pinned columns stay in view with a soft shadow over the scrolling content. · static: `static/StickyColumnsHookUsage.html`
- `upstream/examples/TableColumnSettingsTable.tsx` — Table — Column Settings: Table with a column visibility picker in the toolbar. Toggle columns on and off. · static: `static/TableColumnSettingsTable.html`
- `upstream/examples/TableFilterableTable.tsx` — Table — Popover Filters: Table with popover filter controls triggered by icons in column headers. · static: `static/TableFilterableTable.html`
- `upstream/examples/TableGridDividersTable.tsx` — Table — Grid Dividers: Compact table with grid dividers showing both row and column borders, suited for dense numeric data. · static: `static/TableGridDividersTable.html`
- `upstream/examples/TableGroupedRowsTable.tsx` — useTableGroupedRows — Collapsible Groups: A table grouped into collapsible sections with useTableGroupedRows. Each group gets a full-width header with a chevron, label, and member count; click to collapse/expand. · static: `static/TableGroupedRowsTable.html`
- `upstream/examples/TableInCard.tsx` — Table — In Card: Table composed inside a card with a heading, demonstrating container bleed alignment. · static: `static/TableInCard.html`
- `upstream/examples/TableInlineFilterTable.tsx` — Table — Inline Filters: Table with inline filter controls rendered directly below each column header. · static: `static/TableInlineFilterTable.html`
- `upstream/examples/TablePaginatedTable.tsx` — Table — Paginated Data: Paginated data table navigating through a larger dataset page by page. · static: `static/TablePaginatedTable.html`
- `upstream/examples/TableResizableTable.tsx` — Table — Resizable Columns: Table with draggable column resize handles. Drag the right edge of any header to resize. · static: `static/TableResizableTable.html`
- `upstream/examples/TableRichCellTable.tsx` — Table — Rich Cell Content: Table with rich cell content using Link for emails and Badge for role labels. · static: `static/TableRichCellTable.html`
- `upstream/examples/TableRowExpansionTable.tsx` — useTableRowExpansion — Tree Table: A tree table using useTableRowExpansion with inherited columns. Child rows use the same columns as parents, indented by depth. Click the chevron or right-click to expand/collapse. · static: `static/TableRowExpansionTable.html`
- `upstream/examples/TableRowIndexTable.tsx` — useTableRowIndex — Numbered Rows: A table with a prepended row-number column via useTableRowIndex. Numbering is monospaced, right-aligned, and follows the rendered data order. · static: `static/TableRowIndexTable.html`
- `upstream/examples/TableRowStatusTable.tsx` — useTableRowStatus - Semantic and Custom Markers: A job table using both row-status paths: status resolves themed semantic glyphs and tones, while color stays a custom paint choice with an optional caller-selected icon or the stable dot. · static: `static/TableRowStatusTable.html`
- `upstream/examples/TableSelectableTable.tsx` — Table — Row Selection: Table with row selection checkboxes and a select-all header checkbox. · static: `static/TableSelectableTable.html`
- `upstream/examples/TableSortableTable.tsx` — Table — Sortable Columns: Table with sortable columns, click headers to sort ascending or descending. · static: `static/TableSortableTable.html`
- `upstream/examples/TableStripedTable.tsx` — Table — Striped Rows: Table with alternating row colors and hover highlighting for easy scanning. · static: `static/TableStripedTable.html`
- `upstream/examples/TableTreeTable.tsx` — useTableTreeData: Tree Table: A file-tree table built from nested data. useTableTreeState flattens the tree into the visible rows and owns the expanded set; useTableTreeData draws the per-level indent and the expand/collapse chevron in the tree column. The two hooks are designed to work together, so this one example covers both. hasExpandAllControl adds the expand-all/collapse-all toggle to the tree column header. Collapsed branches are unmounted, not hidden. · static: `static/TableTreeTable.html`

## Documentation

### Table

Table displays structured data in rows and columns with consistent dimensionality. It supports rich cell content, sorting, selection, pagination, and column management through a composable plugin system. Use Table for data sets with uniform structure; for simpler or inconsistent data, consider a list or card layout instead.

**Do**

- Use density and divider variants to match the information density and scanning needs of your data.
- Compose rich cell content with Astryx components like Badge, StatusDot, and Avatar via renderCell.
- In children mode, put every row inside TableHeader, TableBody, or TableFooter. <table> cannot contain a <tr> directly: the HTML parser inserts an implied <tbody> for server-rendered markup and React does not on the client, so unwrapped rows mismatch on hydration.
- Set explicit width on every column using proportional() or pixel(). proportional(1) gives equal flex distribution with a 120px minimum that prevents columns from collapsing on narrow viewports. Omitting width skips the minimum.
- Use the data-driven API from React Server Components: proportional(), pixel(), and column definitions without function props are server-safe. Columns using renderCell (or any function prop) need the table wrapped in a "use client" component, since functions cannot cross the server-client boundary.

**Don't**

- Use a table for data without consistent columns. Use a list or card layout for heterogeneous content.
- Enable every plugin at once. Add only the features your use case requires to keep the interface focused.
- Omit width on text-heavy columns; without an explicit proportional() width they have no minimum and can squish to near-zero on mobile.

**Anatomy**

- Table (required) — Semantic table element that groups the table sections, rows, and cells.
- Scroll region (required) — Outer region that scrolls horizontally, enters the keyboard order, and contains overscroll only while the columns overflow.
- Header section — Column-heading section generated when data-driven columns are present or supplied with TableHeader in children mode.
- Column header cell — Cell that identifies one column and may contain sorting or bulk-selection controls.
- Sort control — Button that wraps a sortable column label and changes that column's sort direction.
- Sort indicator glyph — Directional symbol rendered by Icon inside a Sort control.
- Sort priority — Number shown for a sorted column when multi-column sorting is active.
- Selection control — CheckboxInput rendered in the header and selectable body rows by the selection plugin.
- Body section (required) — Section containing data rows or the current empty state; data-driven mode renders it automatically.
- Row — Repeated TableRow that groups cells in a standard header, body, or footer row.
- Cell — TableCell containing one value or caller-provided content in a standard body or footer row.
- Default empty state — Compact EmptyState shown for an empty data array unless it is replaced or disabled.
- Expansion control — Button in a leading cell that expands or collapses one expandable row.
- Expansion glyph — Directional symbol rendered by Icon inside an Expansion control.
- Expanded detail panel — Detail row and spanning cell rendered below an expanded row around caller-provided content.
- Footer section — Optional summary or totals section supplied with TableFooter in children mode.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `T[]` |  | Array of data items to render as rows. T must extend Record<string, unknown> (use `interface MyRow extends Record<string, unknown>` for custom types). |
| `columns` | `TableColumn<T>[]` |  | Column definitions: each column has {key, header, width?, align?, renderCell?}. The `header` field sets the column heading text. If omitted, columns are auto-generated from data object keys. The `width` field is typed as `ColumnWidth` (not a number); use `proportional(n)` or `pixel(n)` helpers imported from `@astryxdesign/core/Table`. Example: `width: pixel(120)` for 120px fixed, `width: proportional(1)` for flex distribution. |
| `idKey` | `(keyof T & string) \| ((item: T) => string \| number)` |  | Row key for React reconciliation. Pass a property name string or a function. Falls back to row index if omitted. |
| `density` | `'compact' \| 'balanced' \| 'spacious'` | `'balanced'` | Row density controlling cell padding and font size. |
| `dividers` | `'rows' \| 'columns' \| 'grid' \| 'none'` | `'rows'` | Divider style rendered between cells. |
| `isStriped` | `boolean` | `false` | Applies a background wash to even-numbered rows. |
| `hasHover` | `boolean` | `false` | Applies a hover highlight background to rows on pointer devices. |
| `verticalAlign` | `'middle' \| 'top' \| 'bottom'` | `'middle'` | Vertical alignment for body row cells. Controls `vertical-align` on the `<td>` elements. |
| `textOverflow` | `'wrap' \| 'truncate'` | `'wrap'` | How body cell text behaves when it exceeds the column width. 'wrap' lets text wrap and the row grow taller; 'truncate' clips with an ellipsis (default-rendered cells show a tooltip on hover when truncated). Header cells always truncate. |
| `plugins` | `Record<string, TablePlugin<T>>` |  | Named plugins that extend table behavior via the transform pipeline. Converted to an ordered array internally. |
| `rowIndexStart` | `number` | `1` | ARIA row index (1-based) for the first rendered body row. The row ordinal is an accessibility concern independent of any visible index column, so setting this (or rowCount) makes the table emit aria-rowindex on body rows and aria-rowcount on the table. For a paginated/windowed view, pass the offset of the first visible row (e.g. (page - 1) * pageSize + 1) so aria-rowindex reflects position in the full dataset. Data-driven mode only. |
| `rowCount` | `number` |  | Total number of body rows across all pages/windows, used for aria-rowcount so assistive tech can announce "row X of Y" against the full dataset. When omitted but rowIndexStart is set (windowed view with an unknown total), aria-rowcount is set to -1 per the ARIA unknown-count convention. Data-driven mode only. |
| `children` | `ReactNode` |  | Children mode: compose the table yourself from TableHeader / TableBody / TableFooter, each holding TableRow and TableCell, instead of using data-driven rendering. The children are passed straight to the <table>, so the section is yours to supply. A TableRow placed directly in Table emits <table><tr>, which is invalid HTML and mismatches on hydration (the parser inserts an implied <tbody> for server-rendered markup; React does not on the client). Data-driven mode renders the sections for you. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value: not an inline style object like style={{}}. |

Styling hook class: `.astryx-table`, `.astryx-table-scroll-wrapper`, `.astryx-table-header`, `.astryx-table-body`, `.astryx-table-footer`, `.astryx-table-row`, `.astryx-table-cell`, `.astryx-table-header-cell`, `.astryx-base-table`

### Table Body

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | The <tbody> rows. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. Must be a stylex.create() value: not an inline style object like style={{}}. |

Styling hook class: `.astryx-table-body`

### Table Body

### Table Cell

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` |  | Cell content. |

### Table Cell

### Table Cell

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` |  | 单元格内容。 |

### Table Footer

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | The <tfoot> rows. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. Must be a stylex.create() value: not an inline style object like style={{}}. |

Styling hook class: `.astryx-table-footer`

### Table Footer

### Table Header

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | The <thead> rows. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. Must be a stylex.create() value: not an inline style object like style={{}}. |

Styling hook class: `.astryx-table-header`

### Table Header

### Table Header Cell

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` |  | Header cell content. |

### Table Header Cell

### Table Header Cell

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` |  | 表头单元格内容。 |

### Table Row

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | Row cell elements. |

### Table Row

### Table Row

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | 行单元格元素。 |

### useTableColumnResize

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `columnWidths` | `Record<string, number>` |  | Controlled pixel-width overrides keyed by column key. When a key is present it overrides the column's declared width. |
| `onColumnResizeEnd` | `(updates: Record<string, number>) => void` |  | Called when a resize completes (pointerup / Enter). Receives a map of every column key whose width changed; merge it into your columnWidths state. |
| `minWidth` | `number` |  | Global minimum column width in pixels during resize. Overrides per-column defaults when set. |
| `maxWidth` | `number` | `Infinity` | Global maximum column width in pixels during resize. |
| `columns` | `TableColumn<T>[]` |  | Column definitions, needed to derive per-column min widths and detect proportional vs pixel columns for neighbor/last-column resize behavior. |

### useTableColumnResize

### useTableColumnResize

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `columnWidths` | `Record<string, number>` |  | 受控的像素宽度覆盖，按列键索引。存在某键时会覆盖该列声明的宽度。 |
| `onColumnResizeEnd` | `(updates: Record<string, number>) => void` |  | 调整完成时（pointerup / Enter）调用。接收所有宽度发生变化的列键的映射——将其合并到你的 columnWidths 状态中。 |
| `minWidth` | `number` |  | 调整期间的全局最小列宽（像素）。设置后覆盖每列默认值。 |
| `maxWidth` | `number` | `Infinity` | 调整期间的全局最大列宽（像素）。 |
| `columns` | `TableColumn<T>[]` |  | 列定义——用于推导每列最小宽度，并区分比例列与像素列以确定相邻列/末列的调整行为。 |

### useTableColumnSettings

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` * | `ColumnSettingsOption[]` |  | All available columns with metadata for the settings UI. Each entry has key, label, optional isAlwaysVisible and group. |
| `activeColumnKeys` * | `string[]` |  | Currently active column keys, in display order. Only columns with keys in this array are shown. |
| `onChangeActiveColumnKeys` * | `(keys: string[]) => void` |  | Called when active columns change (toggle, reorder). |
| `defaultColumnKeys` | `string[]` |  | Default column set for "Reset to default". When omitted, reset shows all columns. |

### useTableColumnSettings

### useTableColumnSettings

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` * | `ColumnSettingsOption[]` |  | 所有可用列及其设置 UI 的元数据。每个条目包含 key、label、可选的 isAlwaysVisible 和 group。 |
| `activeColumnKeys` * | `string[]` |  | 当前活动的列键，按显示顺序排列。 |
| `onChangeActiveColumnKeys` * | `(keys: string[]) => void` |  | 活动列更改时调用。 |

### useTableFilterState

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `initialState` | `TableFilterState` |  | Optional initial filter state map. |

### useTableFilterState

### useTableFilterState

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `initialState` | `TableFilterState` |  | 可选的初始筛选状态映射。 |

### useTableFiltering

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `filters` * | `TableFilterState` |  | Current filter state: map from column key to filter value. |
| `onFilterChange` * | `(columnKey: string, value: TableFilterValue \| null) => void` |  | Called when the user changes a filter value. null clears the filter. |
| `variant` | `'popover' \| 'inline' \| 'inline-compact'` | `'popover'` | Display variant for filter controls. |

### useTableFiltering

### useTableFiltering

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `filters` * | `TableFilterState` |  | 当前筛选状态——列键到筛选值的映射。 |
| `onFilterChange` * | `(columnKey: string, value: TableFilterValue \| null) => void` |  | 用户更改筛选值时调用。null 清除筛选。 |
| `variant` | `'popover' \| 'inline' \| 'inline-compact'` | `'popover'` | 筛选控件的显示变体。 |

### useTableGroupedRows

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` * | `T[]` |  | The flat data to group. |
| `groupBy` * | `(item: T) => string` |  | Derive the group key for a row. Rows with the same key share a section. |
| `collapsedGroups` * | `Set<string>` |  | Set of currently-collapsed group keys. |
| `onToggleGroup` * | `(groupKey: string) => void` |  | Called with a group key when its header is toggled. |
| `renderGroupHeader` | `(groupKey: string, count: number, collapsed: boolean) => ReactNode` |  | Custom renderer for a group header's content (right of the chevron). Defaults to `<groupKey> (<count>)`. |
| `getRowKey` | `(item: T) => string` |  | Stable key for a real row. Falls back to a positional key when omitted. |
| `groupOrder` | `string[]` |  | Explicit group ordering; groups not listed keep first-seen order after these. |

### useTablePagination

Call useTablePagination with a config object containing page state and callback. Pass the returned plugin to Table via the plugins prop.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `page` * | `number` |  | Current page number (1-based). |
| `onPageChange` * | `(page: number) => void` |  | Called when the page changes. |
| `totalItems` | `number` |  | Total number of items across all pages. Used to calculate total page count. |
| `totalPages` | `number` |  | Total number of pages. Use when you know the page count but not item count. |
| `hasMore` | `boolean` |  | Whether more pages exist. Use for cursor-based pagination where the total is unknown. |
| `pageSize` | `number` | `10` | Number of items per page. |
| `onPageSizeChange` | `(pageSize: number) => void` |  | Called when the user changes the page size. Shows a page size dropdown when provided with pageSizeOptions. |
| `pageSizeOptions` | `number[]` |  | Available page size options. Shows a page size selector when provided. |
| `variant` | `'pages' \| 'count' \| 'compact' \| 'dots' \| 'none'` | `'pages'` | Visual variant for the pagination controls. |
| `position` | `'below' \| 'above' \| 'both' \| 'none'` | `'below'` | Where to render pagination controls relative to the table. |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Horizontal alignment of the pagination controls. |
| `label` | `string` | `'Table pagination'` | Accessible name for the pagination nav landmark. With position='both' the two navs get distinct names (the label suffixed as '(top)' and '(bottom)') so same-type landmarks stay unique (axe landmark-unique). |

### useTablePagination

### useTablePagination

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `page` * | `number` |  | 当前页码（从 1 开始）。 |
| `onPageChange` * | `(page: number) => void` |  | 页面更改时调用。 |
| `totalItems` | `number` |  | 所有页面的总项目数。用于计算总页数。 |
| `pageSize` | `number` | `10` | 每页项目数。 |
| `variant` | `'pages' \| 'count' \| 'compact' \| 'dots' \| 'none'` | `'pages'` | 分页控件的视觉变体。 |
| `position` | `'below' \| 'above' \| 'both' \| 'none'` | `'below'` | 分页控件相对于表格的渲染位置。 |

### useTableRowExpansion

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `expandedKeys` * | `Set<string>` |  | Set of currently-expanded row keys. Consumer-owned. |
| `onToggle` * | `(key: string) => void` |  | Called with a row key when its expansion is toggled (chevron click or context-menu action). |
| `getRowKey` * | `(item: T) => string` |  | Derive a stable unique key from a row item. |
| `renderExpanded` * | `(item: T) => ReactNode` |  | Render the detail content shown in a full-width panel below the row when it is expanded. Receives the row item. |
| `getIsItemExpandable` | `(item: T) => boolean` |  | Control which rows are expandable. Non-expandable rows show no chevron, no context-menu action, and never render a panel. Defaults to all rows expandable. |

**Example — Master-detail order rows**

```tsx
const [expandedKeys, setExpandedKeys] = useState(new Set());
const expansion = useTableRowExpansion({
  expandedKeys,
  onToggle: key =>
    setExpandedKeys(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    }),
  getRowKey: item => item.id,
  renderExpanded: item => <OrderDetails order={item} />,
});

<Table data={orders} columns={columns} idKey="id" plugins={{expansion}} />;
```

**Example — Migrating from tree rows to the tree plugin**

```tsx
// useTableRowExpansion is now for DETAIL PANELS, not tree rows. If you used
// it to render nested child rows that reuse the parent columns, move to
// useTableTreeData + useTableTreeState.

// BEFORE (tree rows via useTableRowExpansion + useTableRowExpansionState):
const {data, expansionConfig} = useTableRowExpansionState({
  baseData: tree,
  getChildren: item => item.children ?? [],
  getRowKey: item => item.id,
  expandedKeys,
  setExpandedKeys,
});
const expansion = useTableRowExpansion(expansionConfig);
<Table data={data} columns={columns} idKey="id" plugins={{expansion}} />;

// AFTER (tree rows via the tree plugin):
const {visibleData, treeConfig} = useTableTreeState({
  data: tree,                   // nested data
  idKey: 'id',                  // or a function: idKey={item => item.id}
  childrenKey: 'children',      // replaces getChildren
  defaultExpandedIds: ['root'], // or controlled: expandedIds + onExpandedIdsChange
});
const tree = useTableTreeData({
  ...treeConfig,
  hasExpandAllControl: true,    // was isAllExpanded + onToggleExpandAll
  hasRowClickExpansion: true,   // same prop name
});
<Table data={visibleData} columns={columns} idKey="id" plugins={{tree}} />;
```

### useTableRowIndex

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` * | `T[]` |  | The data array currently rendered by the table (post sort/filter/page). Numbering follows this order. |
| `getRowKey` | `(item: T) => string` |  | Optional key extractor returning a unique string per row. When provided, index lookup is keyed by the returned string; otherwise items are matched by reference identity. Memoize with useCallback for a stable plugin identity. |
| `label` | `ReactNode` | `'#'` | Header label for the index column. |
| `startFrom` | `number` | `1` | First index value. |

### useTableRowStatus

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `getStatus` * | `(item: T) => ({ status: 'success' \| 'warning' \| 'error'; color?: never; icon?: never; label: string } \| { status?: never; color: 'accent' \| 'success' \| 'error' \| 'warning' \| 'red' \| 'orange' \| 'green' \| 'yellow' \| 'blue' \| 'gray' \| string; icon?: IconName; label: string }) \| null` |  | Derive either a semantic outcome or a custom marker. {status, label} accepts the closed success/error/warning vocabulary and resolves its glyph and tone through the active theme. {color, icon?, label} preserves the stable custom-marker path: color always selects paint, no icon renders an 8px dot, and icon renders the explicit caller glyph. Even color values named success/error/warning remain dots without icon. Valid icon names: close, chevronDown, chevronLeft, chevronRight, chevronsLeft, chevronsRight, check, success, error, warning, info, calendar, clock, externalLink, menu, moreHorizontal, search, arrowUp, arrowDown, arrowsUpDown, funnel, eyeSlash, viewColumns, copy, checkDouble, wrench, stop, microphone. The branches are exclusive, label is required and announced via role="img", and null leaves the row status cell empty. Memoize with useCallback for a stable plugin identity. |

### useTableSelection

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `getIsItemSelected` * | `(item: T) => boolean` |  | Returns whether the given item is currently selected. |
| `onSelectItem` * | `(event: {item: T; isSelected: boolean}) => void` |  | Called when a row checkbox is toggled. isSelected is the new desired state. |
| `onSelectAll` * | `(event: {isAllSelected: boolean}) => void` |  | Called when the select-all header checkbox is toggled. |
| `getIsAllSelected` * | `() => boolean` |  | Returns whether all selectable items are currently selected. |
| `getIsIndeterminate` | `() => boolean` |  | Returns whether selection is partial (some but not all). Renders the select-all checkbox in indeterminate state. |
| `getIsItemSelectable` | `(item: T) => boolean` | `() => true` | Returns whether a row should show a checkbox. Non-selectable rows render nothing in the selection cell. |
| `getIsItemEnabled` | `(item: T) => boolean` | `() => true` | Returns whether a row checkbox is interactive. Disabled rows show a disabled checkbox. |
| `getRowLabel` | `(item: T) => string` |  | Derives a human-readable identity for a row; the row checkbox's hidden label becomes `Select ${getRowLabel(item)}` so screen readers announce which row each checkbox selects. Falls back to "Select row" when omitted. |
| `hasRowHighlight` | `boolean` | `true` | Paints checked rows with the accent wash. Set false when the surrounding UI already uses row background to mean something else (a row open in a detail panel, say). The wash is an inline style, so it cannot be overridden from userland. Only the background is dropped: aria-selected is still set on checked rows either way. |

**Example — Accessible per-row checkbox names**

```tsx

const selectionPlugin = useTableSelection({
  getIsItemSelected: item => selectedIds.has(item.id),
  onSelectItem: ({item, isSelected}) => toggle(item.id, isSelected),
  onSelectAll: ({isAllSelected}) => selectAll(isAllSelected),
  getIsAllSelected: () => selectedIds.size === users.length,
  // Screen readers announce "Select Alice", "Select Bob", ...
  // instead of an undifferentiated "Select row" for every checkbox.
  getRowLabel: item => item.name,
});

<Table
  data={users}
  columns={columns}
  idKey="id"
  plugins={{selection: selectionPlugin}}
/>;

```

**Example — Opt out of the checked-row wash**

```tsx

// This table already uses row background to mean "open in the detail
// panel". Turning the selection wash off keeps that meaning unambiguous;
// the checkbox and aria-selected still carry the selection.
const selectionPlugin = useTableSelection({
  getIsItemSelected: item => selectedIds.has(item.id),
  onSelectItem: ({item, isSelected}) => toggle(item.id, isSelected),
  onSelectAll: ({isAllSelected}) => selectAll(isAllSelected),
  getIsAllSelected: () => selectedIds.size === users.length,
  hasRowHighlight: false,
});

```

### useTableSelection

### useTableSelection

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `getIsItemSelected` * | `(item: T) => boolean` |  | 返回给定项是否当前被选中。 |
| `onSelectItem` * | `(event: {item: T; isSelected: boolean}) => void` |  | 当行复选框被切换时调用。isSelected 为新的期望状态。 |
| `onSelectAll` * | `(event: {isAllSelected: boolean}) => void` |  | 当全选表头复选框被切换时调用。 |
| `getIsAllSelected` * | `() => boolean` |  | 返回所有可选择项是否当前都被选中。 |
| `getIsIndeterminate` | `() => boolean` |  | 返回选择是否为部分选中（部分但非全部）。将全选复选框渲染为不确定状态。 |
| `getIsItemSelectable` | `(item: T) => boolean` | `() => true` | 返回行是否应显示复选框。不可选择的行在选择单元格中不渲染任何内容。 |
| `getIsItemEnabled` | `(item: T) => boolean` | `() => true` | 返回行复选框是否可交互。禁用的行显示禁用状态的复选框。 |
| `getRowLabel` | `(item: T) => string` |  | 为行派生人类可读的标识；行复选框的隐藏标签变为 `Select ${getRowLabel(item)}`，让屏幕阅读器播报每个复选框选择的是哪一行。省略时回退为 "Select row"。 |
| `hasRowHighlight` | `boolean` | `true` | 为选中的行绘制强调色背景。当周围的界面已用行背景表达其他含义（例如该行已在详情面板中打开）时设为 false —— 该背景是内联样式，无法从业务代码覆盖。仅去掉背景：无论如何选中的行仍会设置 aria-selected。 |

### useTableSelectionState

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` * | `T[]` |  | The full data array rendered in the table. |
| `idKey` * | `(keyof T & string) \| ((item: T) => string)` |  | Key extractor: property name or function returning a unique string ID. |
| `selectedKeys` * | `Set<string>` |  | Controlled set of selected item IDs. |
| `setSelectedKeys` * | `Dispatch<SetStateAction<Set<string>>>` |  | Setter for the controlled selected keys. |
| `getIsItemSelectable` | `(item: T) => boolean` | `() => true` | Should this row show a checkbox? Non-selectable rows are excluded from select-all. |
| `getIsItemEnabled` | `(item: T) => boolean` | `() => true` | Is this row checkbox interactive? Disabled rows are frozen: select-all preserves their state. |

### useTableSelectionState

### useTableSortable

Call useTableSortable with a config object containing sort state and callback. Pass the returned plugin to Table via the plugins prop.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `sort` * | `Array<{sortKey: TSortKey, direction: 'ascending' \| 'descending'}>` |  | Current sort state (TableSortState<TSortKey>). Ordered array of entries; the first is the primary sort, the rest are tiebreakers. An empty array means unsorted. Direction is the full word: 'ascending' / 'descending', not 'asc' / 'desc'. |
| `onSortChange` * | `(sort: Array<{sortKey: TSortKey, direction: 'ascending' \| 'descending'}>) => void` |  | Called when the user clicks a header cell to change sort. Receives the next sort state. |
| `allowUnsortedState` | `boolean` | `false` | Allow cycling back to unsorted. When true: 'ascending', 'descending', unsorted. When false: 'ascending', 'descending', 'ascending'. |
| `isMultiSortEnabled` | `boolean` | `false` | Enable multi-sort via Shift+click. Regular click still replaces the entire sort state. |

### useTableSortable

### useTableSortable

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `sort` * | `Array<{sortKey: TSortKey, direction: 'ascending' \| 'descending'}>` |  | 当前排序状态。{sortKey, direction} 条目的有序数组。第一个条目是主排序。方向值为完整单词 'ascending' / 'descending'，不是 'asc' / 'desc'。 |
| `onSortChange` * | `(sort: Array<{sortKey: TSortKey, direction: 'ascending' \| 'descending'}>) => void` |  | 用户点击表头单元格更改排序时调用。 |
| `allowUnsortedState` | `boolean` | `false` | 允许循环回到未排序状态。为 true 时：'ascending'、'descending'、未排序。为 false 时：'ascending'、'descending'、'ascending'。 |
| `isMultiSortEnabled` | `boolean` | `false` | 通过 Shift+点击启用多列排序。普通点击仍替换整个排序状态。 |

### useTableStickyColumns

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `startKeys` | `string[]` |  | Column keys pinned to the start (inline-start / left in LTR) edge: the contiguous run from the first column through the last listed key. |
| `endKeys` | `string[]` |  | Column keys pinned to the end (inline-end / right in LTR) edge: the contiguous run from the first listed key through the last column. |

### useTableStickyColumns

### useTableStickyColumns

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `startKeys` | `string[]` |  | 固定到起始（inline-start / LTR 中为左侧）边缘的列键——从第一列到最后列出的键的连续范围。 |
| `endKeys` | `string[]` |  | 固定到结束（inline-end / LTR 中为右侧）边缘的列键——从第一个列出的键到最后一列的连续范围。 |

### useTableTreeData

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `getRowMeta` * | `(item: T) => TableTreeRowMeta \| undefined` |  | Structural meta for a visible row: {id, level (0-based), hasChildren, isExpanded}. |
| `onToggleItem` * | `(item: T) => void` |  | Toggle a row's expansion. |
| `hasExpandableRows` * | `boolean` |  | Whether any row in the dataset is expandable. When false the plugin is a no-op: no expanders, no indent, no tree ARIA. |
| `hasExpandAllControl` | `boolean` | `false` | Show an expand-all/collapse-all toggle in the tree column header. Requires isAllExpanded plus onExpandAll/onCollapseAll (all supplied by useTableTreeState). |
| `isAllExpanded` | `boolean \| 'indeterminate'` |  | Aggregate expansion state across every expandable row, driving the header expand-all toggle. true when all are expanded, false when none are, indeterminate when some are. |
| `onExpandAll` | `() => void` |  | Expand every expandable row. Wired to the header control. |
| `onCollapseAll` | `() => void` |  | Collapse every row. Wired to the header control. |
| `indent` | `'sm' \| 'md' \| 'lg'` | `'md'` | Indent step per level, mapped to the spacing-3 / spacing-4 / spacing-6 tokens. |
| `treeColumnKey` | `string` |  | Column that carries the indent + expander. Defaults to the first column. |
| `hasRowClickExpansion` | `boolean` | `false` | When true, clicking anywhere on an expandable row toggles its expansion, in addition to the chevron. A pointer-only convenience: keyboard and assistive-tech users toggle via the chevron button. Clicks on interactive cell content (buttons, links, form controls) or a text selection do not toggle. Leaf rows stay inert, and it is a no-op on flat data. |

**Example — File tree with expandable folders**

```tsx
const {visibleData, treeConfig} = useTableTreeState({
  data: files,          // rows may nest under 'children'
  idKey: 'id',
  defaultExpandedIds: ['src'],
});
const tree = useTableTreeData(treeConfig);

<Table data={visibleData} columns={columns} idKey="id" plugins={{tree}} />;
```

### useTableTreeData

### useTableTreeState

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` * | `T[]` |  | Nested data: rows may carry child rows under childrenKey. Flat data (no children anywhere) makes the plugin a no-op, so it can be adopted before the data becomes hierarchical. |
| `idKey` * | `(keyof T & string) \| ((item: T) => string \| number)` |  | Row ID accessor: property name or function returning a unique id. |
| `childrenKey` | `string` | `'children'` | Property holding each row's children array. |
| `defaultExpandedIds` | `Iterable<string>` |  | Initial expanded row ids for uncontrolled mode. Ignored when expandedIds is provided. |
| `expandedIds` | `ReadonlySet<string>` |  | Controlled set of expanded row ids. Pair with onExpandedIdsChange. |
| `onExpandedIdsChange` | `(ids: ReadonlySet<string>) => void` |  | Called with the next expanded set whenever expansion changes (both modes). In lazy-loading setups, trigger the children fetch here. |
| `isItemExpandable` | `(item: T) => boolean` |  | Should this row show an expander? Overrides the default non-empty-children check; use for lazy loading, where a row is expandable before its children have been fetched. |
| `sortSiblings` | `(siblings: T[]) => T[]` |  | Sort each sibling group independently during flattening; children always stay directly under their parent. Pass applySort from useTableSortableState to compose with column sorting. |
| `indent` | `'sm' \| 'md' \| 'lg'` | `'md'` | Indent step per level (spacing-3 / spacing-4 / spacing-6), forwarded to useTableTreeData. |
| `treeColumnKey` | `string` |  | Column that carries the indent + expander, forwarded to useTableTreeData. Defaults to the first column. |

### useTableTreeState

## Files

- `upstream/Table.doc.mjs`
- `upstream/Table.spec.md`
- `upstream/Table.tsx`
- `upstream/TableBody.doc.mjs`
- `upstream/TableBody.tsx`
- `upstream/TableCell.doc.mjs`
- `upstream/TableCell.tsx`
- `upstream/TableContext.ts`
- `upstream/TableFooter.doc.mjs`
- `upstream/TableFooter.tsx`
- `upstream/TableHeader.doc.mjs`
- `upstream/TableHeader.tsx`
- `upstream/TableHeaderCell.doc.mjs`
- `upstream/TableHeaderCell.tsx`
- `upstream/TableRow.doc.mjs`
- `upstream/TableRow.tsx`
- `upstream/plugins/columnResize/useTableColumnResize.tsx`
- `upstream/plugins/columnSettings/useTableColumnSettings.tsx`
- `upstream/plugins/columnSettings/useTableColumnSettingsState.tsx`
- `upstream/plugins/filtering/useTableFilterState.tsx`
- `upstream/plugins/filtering/useTableFiltering.tsx`
- `upstream/plugins/groupedRows/useTableGroupedRows.tsx`
- `upstream/plugins/pagination/useTablePagination.tsx`
- `upstream/plugins/rowExpansion/useTableRowExpansion.tsx`
- `upstream/plugins/rowIndex/useTableRowIndex.tsx`
- `upstream/plugins/rowStatus/useTableRowStatus.spec.md`
- `upstream/plugins/rowStatus/useTableRowStatus.tsx`
- `upstream/plugins/selection/useTableSelection.tsx`
- `upstream/plugins/selection/useTableSelectionState.tsx`
- `upstream/plugins/sortable/useTableSortable.tsx`
- `upstream/plugins/sortable/useTableSortableState.tsx`
- `upstream/plugins/stickyColumns/useTableStickyColumns.tsx`
- `upstream/plugins/tree/useTableTreeData.tsx`
- `upstream/plugins/tree/useTableTreeState.tsx`
- `upstream/useTableColumnResize.doc.mjs`
- `upstream/useTableColumnSettings.doc.mjs`
- `upstream/useTableFilterState.doc.mjs`
- `upstream/useTableFiltering.doc.mjs`
- `upstream/useTableGroupedRows.doc.mjs`
- `upstream/useTablePagination.doc.mjs`
- `upstream/useTableRowExpansion.doc.mjs`
- `upstream/useTableRowIndex.doc.mjs`
- `upstream/useTableRowStatus.doc.mjs`
- `upstream/useTableSelection.doc.mjs`
- `upstream/useTableSelectionState.doc.mjs`
- `upstream/useTableSortable.doc.mjs`
- `upstream/useTableStickyColumns.doc.mjs`
- `upstream/useTableTreeData.doc.mjs`
- `upstream/useTableTreeState.doc.mjs`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Table
