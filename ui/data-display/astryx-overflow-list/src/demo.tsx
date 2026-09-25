import E0 from "./examples/OverflowListShowcase.tsx";
import E1 from "./examples/OverflowListCappedToolbar.tsx";
import E2 from "./examples/OverflowListCollapseFromStartList.tsx";
import E3 from "./examples/OverflowListMultiRowTags.tsx";
import E4 from "./examples/OverflowListOverflowBadges.tsx";
import E5 from "./examples/OverflowListOverflowDropdownActions.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "OverflowListShowcase", title: "Overflow List", component: E0 },
  { name: "OverflowListCappedToolbar", title: "OverflowList — Capped Toolbar", component: E1 },
  { name: "OverflowListCollapseFromStartList", title: "OverflowList — Collapse From Start", component: E2 },
  { name: "OverflowListMultiRowTags", title: "OverflowList — Multi-row Tags", component: E3 },
  { name: "OverflowListOverflowBadges", title: "OverflowList — Badge Tags", component: E4 },
  { name: "OverflowListOverflowDropdownActions", title: "OverflowList — Dropdown Actions", component: E5 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
