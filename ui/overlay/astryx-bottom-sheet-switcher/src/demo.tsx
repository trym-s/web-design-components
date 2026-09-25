import E0 from "./examples/BottomSheetSwitcherShowcase.tsx";
import E1 from "./examples/BottomSheetSwitcherReviewFlow.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "BottomSheetSwitcherShowcase", title: "Bottom Sheet Switcher", component: E0 },
  { name: "BottomSheetSwitcherReviewFlow", title: "Bottom Sheet Switcher — Review flow", component: E1 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
