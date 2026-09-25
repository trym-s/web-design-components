import E0 from "./examples/StepShowcase.tsx";
import E1 from "./examples/StepContent.tsx";
import E2 from "./examples/StepIndicator.tsx";
import E3 from "./examples/StepStates.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "StepShowcase", title: "Step", component: E0 },
  { name: "StepContent", title: "Step — Content Slot", component: E1 },
  { name: "StepIndicator", title: "Step — Indicator", component: E2 },
  { name: "StepStates", title: "Step — States", component: E3 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
