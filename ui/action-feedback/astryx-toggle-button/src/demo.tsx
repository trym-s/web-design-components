import E0 from "./examples/ToggleButtonGroupShowcase.tsx";
import E1 from "./examples/ToggleButtonShowcase.tsx";
import E2 from "./examples/ToggleButtonColor.tsx";
import E3 from "./examples/ToggleButtonGroup.tsx";
import E4 from "./examples/ToggleButtonGroupVertical.tsx";
import E5 from "./examples/ToggleButtonIconSwap.tsx";
import E6 from "./examples/ToggleButtonLabel.tsx";
import E7 from "./examples/ToggleButtonStates.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "ToggleButtonGroupShowcase", title: "Toggle Button Group", component: E0 },
  { name: "ToggleButtonShowcase", title: "Toggle Button", component: E1 },
  { name: "ToggleButtonColor", title: "ToggleButton — Color", component: E2 },
  { name: "ToggleButtonGroup", title: "ToggleButton — Group", component: E3 },
  { name: "ToggleButtonGroupVertical", title: "ToggleButtonGroup — Vertical", component: E4 },
  { name: "ToggleButtonIconSwap", title: "ToggleButton — Icon Swap", component: E5 },
  { name: "ToggleButtonLabel", title: "ToggleButton — Label", component: E6 },
  { name: "ToggleButtonStates", title: "ToggleButton — States", component: E7 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
