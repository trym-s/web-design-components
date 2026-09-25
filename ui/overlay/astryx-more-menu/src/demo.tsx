import E0 from "./examples/MoreMenuShowcase.tsx";
import E1 from "./examples/MoreMenuBottomSheet.tsx";
import E2 from "./examples/MoreMenuDefaultMoreMenu.tsx";
import E3 from "./examples/MoreMenuWithDividers.tsx";
import E4 from "./examples/MoreMenuWithSections.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "MoreMenuShowcase", title: "More Menu", component: E0 },
  { name: "MoreMenuBottomSheet", title: "MoreMenu — Bottom Sheet", component: E1 },
  { name: "MoreMenuDefaultMoreMenu", title: "MoreMenu — Default", component: E2 },
  { name: "MoreMenuWithDividers", title: "MoreMenu — With Dividers", component: E3 },
  { name: "MoreMenuWithSections", title: "MoreMenu — With Sections", component: E4 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
