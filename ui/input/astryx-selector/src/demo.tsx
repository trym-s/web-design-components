import E0 from "./examples/SelectorOptionShowcase.tsx";
import E1 from "./examples/SelectorShowcase.tsx";
import E2 from "./examples/SelectorBottomSheet.tsx";
import E3 from "./examples/SelectorClearable.tsx";
import E4 from "./examples/SelectorGhostToolbar.tsx";
import E5 from "./examples/SelectorOptionBasic.tsx";
import E6 from "./examples/SelectorOptionDescriptions.tsx";
import E7 from "./examples/SelectorWithSections.tsx";
import E8 from "./examples/SelectorWithStatus.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "SelectorOptionShowcase", title: "Selector Option", component: E0 },
  { name: "SelectorShowcase", title: "Selector", component: E1 },
  { name: "SelectorBottomSheet", title: "Selector — Bottom Sheet", component: E2 },
  { name: "SelectorClearable", title: "Selector — Clearable", component: E3 },
  { name: "SelectorGhostToolbar", title: "Selector — Ghost Toolbar", component: E4 },
  { name: "SelectorOptionBasic", title: "SelectorOption — Basic", component: E5 },
  { name: "SelectorOptionDescriptions", title: "Selector — Option descriptions", component: E6 },
  { name: "SelectorWithSections", title: "Selector — Grouped Sections", component: E7 },
  { name: "SelectorWithStatus", title: "Selector — Validation States", component: E8 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
