import E0 from "./examples/SideNavCollapseButtonShowcase.tsx";
import E1 from "./examples/SideNavHeadingShowcase.tsx";
import E2 from "./examples/SideNavItemShowcase.tsx";
import E3 from "./examples/SideNavSectionShowcase.tsx";
import E4 from "./examples/SideNavShowcase.tsx";
import E5 from "./examples/SideNavCollapseButtonBasic.tsx";
import E6 from "./examples/SideNavEndContent.tsx";
import E7 from "./examples/SideNavHeadingBasic.tsx";
import E8 from "./examples/SideNavItemBasic.tsx";
import E9 from "./examples/SideNavNestedItems.tsx";
import E10 from "./examples/SideNavSectionBasic.tsx";
import E11 from "./examples/SideNavWithHeaderMenu.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "SideNavCollapseButtonShowcase", title: "Side Nav Collapse Button", component: E0 },
  { name: "SideNavHeadingShowcase", title: "Side Nav Heading", component: E1 },
  { name: "SideNavItemShowcase", title: "Side Nav Item", component: E2 },
  { name: "SideNavSectionShowcase", title: "Side Nav Section", component: E3 },
  { name: "SideNavShowcase", title: "Side Nav", component: E4 },
  { name: "SideNavCollapseButtonBasic", title: "SideNavCollapseButton — Basic", component: E5 },
  { name: "SideNavEndContent", title: "SideNav — End Content", component: E6 },
  { name: "SideNavHeadingBasic", title: "SideNavHeading — Basic", component: E7 },
  { name: "SideNavItemBasic", title: "SideNavItem — Basic", component: E8 },
  { name: "SideNavNestedItems", title: "SideNav — Nested Items", component: E9 },
  { name: "SideNavSectionBasic", title: "SideNavSection — Basic", component: E10 },
  { name: "SideNavWithHeaderMenu", title: "SideNav — Header with Menu", component: E11 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
