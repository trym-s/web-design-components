import E0 from "./examples/native-select-demo";
import E1 from "./examples/native-select-groups";
import { NativeSelectDisabled as E2 } from "./examples/native-select-disabled";
import { NativeSelectInvalid as E3 } from "./examples/native-select-invalid";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "native-select-demo", title: "Native Select Demo", component: E0 },
  { name: "native-select-groups", title: "Native Select Groups", component: E1 },
  { name: "native-select-disabled", title: "Native Select Disabled", component: E2 },
  { name: "native-select-invalid", title: "Native Select Invalid", component: E3 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
