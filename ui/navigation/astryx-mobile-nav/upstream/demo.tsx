import E0 from "./examples/MobileNavShowcase.tsx";
import E1 from "./examples/MobileNavToggleShowcase.tsx";
import E2 from "./examples/MobileNavBasicMobileNav.tsx";
import E3 from "./examples/MobileNavEndSideMobileNav.tsx";
import E4 from "./examples/MobileNavToggleBasic.tsx";
import E5 from "./examples/MobileNavWithoutTitleMobileNav.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "MobileNavShowcase", title: "Mobile Nav", component: E0 },
  { name: "MobileNavToggleShowcase", title: "Mobile Nav Toggle", component: E1 },
  { name: "MobileNavBasicMobileNav", title: "MobileNav — Basic Drawer", component: E2 },
  { name: "MobileNavEndSideMobileNav", title: "MobileNav — End Side Drawer", component: E3 },
  { name: "MobileNavToggleBasic", title: "MobileNavToggle — Basic", component: E4 },
  { name: "MobileNavWithoutTitleMobileNav", title: "MobileNav — Without Title", component: E5 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
