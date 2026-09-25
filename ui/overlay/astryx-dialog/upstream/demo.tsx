import E0 from "./examples/DialogHeaderShowcase.tsx";
import E1 from "./examples/DialogShowcase.tsx";
import E2 from "./examples/DialogAdaptivePresentation.tsx";
import E3 from "./examples/DialogConfirmationDialog.tsx";
import E4 from "./examples/DialogFormDialog.tsx";
import E5 from "./examples/DialogFullscreenDialog.tsx";
import E6 from "./examples/DialogHeaderBasic.tsx";
import E7 from "./examples/DialogScrollingContent.tsx";
import E8 from "./examples/DialogWithSubtitle.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "DialogHeaderShowcase", title: "Dialog Header", component: E0 },
  { name: "DialogShowcase", title: "Dialog", component: E1 },
  { name: "DialogAdaptivePresentation", title: "Dialog — Adaptive presentation", component: E2 },
  { name: "DialogConfirmationDialog", title: "Dialog — Confirmation", component: E3 },
  { name: "DialogFormDialog", title: "Dialog — Form", component: E4 },
  { name: "DialogFullscreenDialog", title: "Dialog — Fullscreen", component: E5 },
  { name: "DialogHeaderBasic", title: "DialogHeader — Basic", component: E6 },
  { name: "DialogScrollingContent", title: "Dialog — Scrollable", component: E7 },
  { name: "DialogWithSubtitle", title: "Dialog — Required", component: E8 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
