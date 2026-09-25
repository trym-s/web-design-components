import { TableDemo as E0 } from "./examples/table-demo";
import { TableFooterExample as E1 } from "./examples/table-footer";
import { TableActions as E2 } from "./examples/table-actions";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "table-demo", title: "Table Demo", component: E0 },
  { name: "table-footer", title: "Table Footer", component: E1 },
  { name: "table-actions", title: "Table Actions", component: E2 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
