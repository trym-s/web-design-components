import E0 from "./examples/TableShowcase.tsx";
import E1 from "./examples/ColumnResizeHookUsage.tsx";
import E2 from "./examples/StickyColumnsHookUsage.tsx";
import E3 from "./examples/TableColumnSettingsTable.tsx";
import E4 from "./examples/TableFilterableTable.tsx";
import E5 from "./examples/TableGridDividersTable.tsx";
import E6 from "./examples/TableGroupedRowsTable.tsx";
import E7 from "./examples/TableInCard.tsx";
import E8 from "./examples/TableInlineFilterTable.tsx";
import E9 from "./examples/TablePaginatedTable.tsx";
import E10 from "./examples/TableResizableTable.tsx";
import E11 from "./examples/TableRichCellTable.tsx";
import E12 from "./examples/TableRowExpansionTable.tsx";
import E13 from "./examples/TableRowIndexTable.tsx";
import E14 from "./examples/TableRowStatusTable.tsx";
import E15 from "./examples/TableSelectableTable.tsx";
import E16 from "./examples/TableSortableTable.tsx";
import E17 from "./examples/TableStripedTable.tsx";
import E18 from "./examples/TableTreeTable.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "TableShowcase", title: "Table", component: E0 },
  { name: "ColumnResizeHookUsage", title: "useTableColumnResize — Draggable Columns", component: E1 },
  { name: "StickyColumnsHookUsage", title: "useTableStickyColumns — Pinned Columns", component: E2 },
  { name: "TableColumnSettingsTable", title: "Table — Column Settings", component: E3 },
  { name: "TableFilterableTable", title: "Table — Popover Filters", component: E4 },
  { name: "TableGridDividersTable", title: "Table — Grid Dividers", component: E5 },
  { name: "TableGroupedRowsTable", title: "useTableGroupedRows — Collapsible Groups", component: E6 },
  { name: "TableInCard", title: "Table — In Card", component: E7 },
  { name: "TableInlineFilterTable", title: "Table — Inline Filters", component: E8 },
  { name: "TablePaginatedTable", title: "Table — Paginated Data", component: E9 },
  { name: "TableResizableTable", title: "Table — Resizable Columns", component: E10 },
  { name: "TableRichCellTable", title: "Table — Rich Cell Content", component: E11 },
  { name: "TableRowExpansionTable", title: "useTableRowExpansion — Tree Table", component: E12 },
  { name: "TableRowIndexTable", title: "useTableRowIndex — Numbered Rows", component: E13 },
  { name: "TableRowStatusTable", title: "useTableRowStatus - Semantic and Custom Markers", component: E14 },
  { name: "TableSelectableTable", title: "Table — Row Selection", component: E15 },
  { name: "TableSortableTable", title: "Table — Sortable Columns", component: E16 },
  { name: "TableStripedTable", title: "Table — Striped Rows", component: E17 },
  { name: "TableTreeTable", title: "useTableTreeData: Tree Table", component: E18 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
