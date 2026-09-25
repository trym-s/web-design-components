import { ToggleDemo as E0 } from "./examples/toggle-demo";
import { ToggleOutline as E1 } from "./examples/toggle-outline";
import { ToggleText as E2 } from "./examples/toggle-text";
import { ToggleSizes as E3 } from "./examples/toggle-sizes";
import { ToggleDisabled as E4 } from "./examples/toggle-disabled";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "toggle-demo", title: "Toggle Demo", component: E0 },
  { name: "toggle-outline", title: "Toggle Outline", component: E1 },
  { name: "toggle-text", title: "Toggle Text", component: E2 },
  { name: "toggle-sizes", title: "Toggle Sizes", component: E3 },
  { name: "toggle-disabled", title: "Toggle Disabled", component: E4 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
