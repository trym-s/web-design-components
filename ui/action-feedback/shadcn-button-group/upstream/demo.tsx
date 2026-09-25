import E0 from "./examples/button-group-demo";
import E1 from "./examples/button-group-orientation";
import E2 from "./examples/button-group-size";
import { ButtonGroupNested as E3 } from "./examples/button-group-nested";
import E4 from "./examples/button-group-separator";
import E5 from "./examples/button-group-split";
import E6 from "./examples/button-group-input";
import E7 from "./examples/button-group-input-group";
import E8 from "./examples/button-group-dropdown";
import E9 from "./examples/button-group-select";
import E10 from "./examples/button-group-popover";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "button-group-demo", title: "Button Group Demo", component: E0 },
  { name: "button-group-orientation", title: "Button Group Orientation", component: E1 },
  { name: "button-group-size", title: "Button Group Size", component: E2 },
  { name: "button-group-nested", title: "Button Group Nested", component: E3 },
  { name: "button-group-separator", title: "Button Group Separator", component: E4 },
  { name: "button-group-split", title: "Button Group Split", component: E5 },
  { name: "button-group-input", title: "Button Group Input", component: E6 },
  { name: "button-group-input-group", title: "Button Group Input Group", component: E7 },
  { name: "button-group-dropdown", title: "Button Group Dropdown", component: E8 },
  { name: "button-group-select", title: "Button Group Select", component: E9 },
  { name: "button-group-popover", title: "Button Group Popover", component: E10 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
