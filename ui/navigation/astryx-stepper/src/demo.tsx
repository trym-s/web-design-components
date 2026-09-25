import E0 from "./examples/StepperShowcase.tsx";
import E1 from "./examples/StepperCustomContent.tsx";
import E2 from "./examples/StepperIndicatorModes.tsx";
import E3 from "./examples/StepperOnTrackHorizontal.tsx";
import E4 from "./examples/StepperOnTrackVertical.tsx";
import E5 from "./examples/StepperStatus.tsx";
import E6 from "./examples/StepperWidthResponsiveCollapse.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "StepperShowcase", title: "Stepper — Checkout Progress", component: E0 },
  { name: "StepperCustomContent", title: "Stepper — Custom Content", component: E1 },
  { name: "StepperIndicatorModes", title: "Stepper — Indicator Modes", component: E2 },
  { name: "StepperOnTrackHorizontal", title: "Stepper — On-Track Horizontal", component: E3 },
  { name: "StepperOnTrackVertical", title: "Stepper — On-Track Vertical", component: E4 },
  { name: "StepperStatus", title: "Stepper — Validation Status", component: E5 },
  { name: "StepperWidthResponsiveCollapse", title: "Stepper — Horizontal Narrow Collapsed", component: E6 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
