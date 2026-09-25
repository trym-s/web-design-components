import E0 from "./examples/TopNavHeadingShowcase.tsx";
import E1 from "./examples/TopNavItemShowcase.tsx";
import E2 from "./examples/TopNavMegaMenuFeaturedCardShowcase.tsx";
import E3 from "./examples/TopNavMegaMenuItemShowcase.tsx";
import E4 from "./examples/TopNavMegaMenuShowcase.tsx";
import E5 from "./examples/TopNavMenuShowcase.tsx";
import E6 from "./examples/TopNavShowcase.tsx";
import E7 from "./examples/TopNavCenteredNavigation.tsx";
import E8 from "./examples/TopNavEnterpriseDashboard.tsx";
import E9 from "./examples/TopNavHeadingBasic.tsx";
import E10 from "./examples/TopNavHoverMenu.tsx";
import E11 from "./examples/TopNavItemBasic.tsx";
import E12 from "./examples/TopNavMegaMenu.tsx";
import E13 from "./examples/TopNavMegaMenuBasic.tsx";
import E14 from "./examples/TopNavMegaMenuFeaturedCardBasic.tsx";
import E15 from "./examples/TopNavMegaMenuItemBasic.tsx";
import E16 from "./examples/TopNavMenuBasic.tsx";
import E17 from "./examples/TopNavMultipleDropdowns.tsx";
import E18 from "./examples/TopNavWithLogo.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "TopNavHeadingShowcase", title: "Top Nav Heading", component: E0 },
  { name: "TopNavItemShowcase", title: "Top Nav Item", component: E1 },
  { name: "TopNavMegaMenuFeaturedCardShowcase", title: "Top Nav Mega Menu Featured Card", component: E2 },
  { name: "TopNavMegaMenuItemShowcase", title: "Top Nav Mega Menu Item", component: E3 },
  { name: "TopNavMegaMenuShowcase", title: "Top Nav Mega Menu", component: E4 },
  { name: "TopNavMenuShowcase", title: "Top Nav Menu", component: E5 },
  { name: "TopNavShowcase", title: "Top Nav", component: E6 },
  { name: "TopNavCenteredNavigation", title: "TopNav — Centered Navigation", component: E7 },
  { name: "TopNavEnterpriseDashboard", title: "TopNav — Enterprise Dashboard", component: E8 },
  { name: "TopNavHeadingBasic", title: "TopNavHeading — Basic", component: E9 },
  { name: "TopNavHoverMenu", title: "TopNav — Hover Menu", component: E10 },
  { name: "TopNavItemBasic", title: "TopNavItem — Basic", component: E11 },
  { name: "TopNavMegaMenu", title: "TopNav — Mega Menu", component: E12 },
  { name: "TopNavMegaMenuBasic", title: "TopNavMegaMenu — Basic", component: E13 },
  { name: "TopNavMegaMenuFeaturedCardBasic", title: "TopNavMegaMenuFeaturedCard — Basic", component: E14 },
  { name: "TopNavMegaMenuItemBasic", title: "TopNavMegaMenuItem — Basic", component: E15 },
  { name: "TopNavMenuBasic", title: "TopNavMenu — Basic", component: E16 },
  { name: "TopNavMultipleDropdowns", title: "TopNav — Multiple Dropdowns", component: E17 },
  { name: "TopNavWithLogo", title: "TopNav — With Logo", component: E18 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
