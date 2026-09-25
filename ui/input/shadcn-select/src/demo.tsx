import { SelectDemo as E0 } from "./examples/select-demo";
import { SelectAlignItem as E1 } from "./examples/select-align-item";
import { SelectGroups as E2 } from "./examples/select-groups";
import { SelectScrollable as E3 } from "./examples/select-scrollable";
import { SelectDisabled as E4 } from "./examples/select-disabled";
import { SelectInvalid as E5 } from "./examples/select-invalid";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "select-demo", title: "Select Demo", component: E0 },
  { name: "select-align-item", title: "Select Align Item", component: E1 },
  { name: "select-groups", title: "Select Groups", component: E2 },
  { name: "select-scrollable", title: "Select Scrollable", component: E3 },
  { name: "select-disabled", title: "Select Disabled", component: E4 },
  { name: "select-invalid", title: "Select Invalid", component: E5 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
