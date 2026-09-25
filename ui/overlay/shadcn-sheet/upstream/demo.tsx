import E0 from "./examples/sheet-demo";
import E1 from "./examples/sheet-side";
import E2 from "./examples/sheet-no-close-button";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "sheet-demo", title: "Sheet Demo", component: E0 },
  { name: "sheet-side", title: "Sheet Side", component: E1 },
  { name: "sheet-no-close-button", title: "Sheet No Close Button", component: E2 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
