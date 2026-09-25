import { CheckboxIndicator, CheckIndicator, RadioIndicator } from "@astryxdesign/core/Indicator";
import { AstryxFrame } from "../../../_sources/astryx/frame";

// Indicator is a family, not one component: show each member in every state it can draw.
const examples = [{ name: "states", title: "Every indicator, every state", component: () => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 16, alignItems: "center" }}>
    <CheckboxIndicator state="unchecked" /><CheckboxIndicator state="checked" /><CheckboxIndicator state="indeterminate" />
    <RadioIndicator state="unchecked" /><RadioIndicator state="checked" /><span />
    <CheckIndicator state="unchecked" /><CheckIndicator state="checked" /><span />
  </div>
) }];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
