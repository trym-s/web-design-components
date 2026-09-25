import E0 from "./examples/SegmentedControlItemShowcase.tsx";
import E1 from "./examples/SegmentedControlShowcase.tsx";
import E2 from "./examples/SegmentedControlDisabledItem.tsx";
import E3 from "./examples/SegmentedControlFillLayout.tsx";
import E4 from "./examples/SegmentedControlIconOnly.tsx";
import E5 from "./examples/SegmentedControlItemBasic.tsx";
import E6 from "./examples/SegmentedControlWithIcons.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "SegmentedControlItemShowcase", title: "Segmented Control Item", component: E0 },
  { name: "SegmentedControlShowcase", title: "Segmented Control", component: E1 },
  { name: "SegmentedControlDisabledItem", title: "SegmentedControl — Disabled Item", component: E2 },
  { name: "SegmentedControlFillLayout", title: "SegmentedControl — Fill Layout", component: E3 },
  { name: "SegmentedControlIconOnly", title: "SegmentedControl — Icon Only", component: E4 },
  { name: "SegmentedControlItemBasic", title: "SegmentedControlItem — Basic", component: E5 },
  { name: "SegmentedControlWithIcons", title: "SegmentedControl — With Icons", component: E6 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
