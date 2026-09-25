import { FilterTable, type FilterRow, type FilterStatus } from "./filter-table";

const STATUSES: FilterStatus[] = [
  { value: "todo", label: "To do", color: "var(--filter-todo)" },
  { value: "progress", label: "In Progress", color: "var(--filter-progress)" },
  { value: "done", label: "Completed", color: "var(--filter-done)" },
];

const ROWS: FilterRow[] = [
  { id: "1", task: "Restock mango sorbet", date: "Dec 03", status: "todo", owner: "Mango Moon Gelato" },
  { id: "2", task: "Churn black sesame", date: "Sep 22", status: "progress", owner: "Kumo Creamery" },
  { id: "3", task: "Print summer menu", date: "Jan 02", status: "todo", owner: "Coral Coast Sorbet" },
  { id: "4", task: "Taste-test batch 42", date: "Nov 08", status: "progress", owner: "Maple Orbit" },
  { id: "5", task: "Order waffle cones", date: "Apr 14", status: "done", owner: "Aurora Scoops" },
];

export default function Demo() {
  return <FilterTable statuses={STATUSES} rows={ROWS} />;
}
