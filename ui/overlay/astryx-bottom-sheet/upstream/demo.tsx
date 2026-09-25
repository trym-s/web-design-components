import E0 from "./examples/BottomSheetShowcase.tsx";
import E1 from "./examples/BottomSheetHeights.tsx";
import E2 from "./examples/BottomSheetMobileKeyboard.tsx";
import E3 from "./examples/BottomSheetNoScrim.tsx";
import E4 from "./examples/BottomSheetSnapPoints.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "BottomSheetShowcase", title: "Bottom Sheet", component: E0 },
  { name: "BottomSheetHeights", title: "Bottom Sheet — Height variants", component: E1 },
  { name: "BottomSheetMobileKeyboard", title: "Bottom Sheet — Mobile keyboard", component: E2 },
  { name: "BottomSheetNoScrim", title: "Bottom Sheet — No scrim", component: E3 },
  { name: "BottomSheetSnapPoints", title: "Bottom Sheet — Snap points", component: E4 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
