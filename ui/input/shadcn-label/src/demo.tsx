import E0 from "./examples/label-demo";
import E1 from "./examples/field-demo";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "label-demo", title: "Label Demo", component: E0 },
  { name: "field-demo", title: "Field Demo", component: E1 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
