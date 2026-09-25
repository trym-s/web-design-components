import { SwitchDemo as E0 } from "./examples/switch-demo";
import { SwitchDescription as E1 } from "./examples/switch-description";
import { SwitchChoiceCard as E2 } from "./examples/switch-choice-card";
import { SwitchDisabled as E3 } from "./examples/switch-disabled";
import { SwitchInvalid as E4 } from "./examples/switch-invalid";
import { SwitchSizes as E5 } from "./examples/switch-sizes";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "switch-demo", title: "Switch Demo", component: E0 },
  { name: "switch-description", title: "Switch Description", component: E1 },
  { name: "switch-choice-card", title: "Switch Choice Card", component: E2 },
  { name: "switch-disabled", title: "Switch Disabled", component: E3 },
  { name: "switch-invalid", title: "Switch Invalid", component: E4 },
  { name: "switch-sizes", title: "Switch Sizes", component: E5 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
