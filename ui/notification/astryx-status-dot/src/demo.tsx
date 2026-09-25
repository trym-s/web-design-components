import E0 from "./examples/StatusDotShowcase.tsx";
import E1 from "./examples/StatusDotPulsing.tsx";
import E2 from "./examples/StatusDotStatusIndicators.tsx";
import E3 from "./examples/StatusDotVariants.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "StatusDotShowcase", title: "Status Dot", component: E0 },
  { name: "StatusDotPulsing", title: "StatusDot — Pulsing", component: E1 },
  { name: "StatusDotStatusIndicators", title: "StatusDot — Status Indicators", component: E2 },
  { name: "StatusDotVariants", title: "StatusDot — Variants", component: E3 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
