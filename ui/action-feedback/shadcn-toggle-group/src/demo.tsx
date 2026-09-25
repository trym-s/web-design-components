import { ToggleGroupDemo as E0 } from "./examples/toggle-group-demo";
import { ToggleGroupOutline as E1 } from "./examples/toggle-group-outline";
import { ToggleGroupSizes as E2 } from "./examples/toggle-group-sizes";
import { ToggleGroupSpacing as E3 } from "./examples/toggle-group-spacing";
import { ToggleGroupVertical as E4 } from "./examples/toggle-group-vertical";
import { ToggleGroupDisabled as E5 } from "./examples/toggle-group-disabled";
import { ToggleGroupFontWeightSelector as E6 } from "./examples/toggle-group-font-weight-selector";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "toggle-group-demo", title: "Toggle Group Demo", component: E0 },
  { name: "toggle-group-outline", title: "Toggle Group Outline", component: E1 },
  { name: "toggle-group-sizes", title: "Toggle Group Sizes", component: E2 },
  { name: "toggle-group-spacing", title: "Toggle Group Spacing", component: E3 },
  { name: "toggle-group-vertical", title: "Toggle Group Vertical", component: E4 },
  { name: "toggle-group-disabled", title: "Toggle Group Disabled", component: E5 },
  { name: "toggle-group-font-weight-selector", title: "Toggle Group Font Weight Selector", component: E6 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
