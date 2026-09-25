import { DataTableDemo as E0 } from "./examples/data-table-demo";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "data-table-demo", title: "Data Table Demo", component: E0 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
