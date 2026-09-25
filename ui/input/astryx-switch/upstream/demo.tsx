import E0 from "./examples/SwitchShowcase.tsx";
import E1 from "./examples/SwitchDisabled.tsx";
import E2 from "./examples/SwitchSettingsPanel.tsx";
import E3 from "./examples/SwitchWithDescription.tsx";
import E4 from "./examples/SwitchWithStatus.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "SwitchShowcase", title: "Switch", component: E0 },
  { name: "SwitchDisabled", title: "Switch — Disabled", component: E1 },
  { name: "SwitchSettingsPanel", title: "Switch — Settings Panel", component: E2 },
  { name: "SwitchWithDescription", title: "Switch — With Description", component: E3 },
  { name: "SwitchWithStatus", title: "Switch — With Status", component: E4 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
