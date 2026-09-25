import E0 from "./examples/TabListShowcase.tsx";
import E1 from "./examples/TabMenuShowcase.tsx";
import E2 from "./examples/TabShowcase.tsx";
import E3 from "./examples/TabListTabsFillLayout.tsx";
import E4 from "./examples/TabListTabsWithActions.tsx";
import E5 from "./examples/TabListTabsWithBadge.tsx";
import E6 from "./examples/TabListTabsWithIcons.tsx";
import E7 from "./examples/TabListTabsWithMenu.tsx";
import E8 from "./examples/TabListTabsWithStatusDot.tsx";
import E9 from "./examples/TabMenuBasic.tsx";
import E10 from "./examples/TabWithSelectedIcon.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "TabListShowcase", title: "Tab List", component: E0 },
  { name: "TabMenuShowcase", title: "Tab Menu", component: E1 },
  { name: "TabShowcase", title: "Tab", component: E2 },
  { name: "TabListTabsFillLayout", title: "TabList — Fill Layout", component: E3 },
  { name: "TabListTabsWithActions", title: "TabList — With Actions", component: E4 },
  { name: "TabListTabsWithBadge", title: "TabList — With Badge", component: E5 },
  { name: "TabListTabsWithIcons", title: "TabList — With Icons", component: E6 },
  { name: "TabListTabsWithMenu", title: "TabList — With Overflow Menu", component: E7 },
  { name: "TabListTabsWithStatusDot", title: "TabList — With Status Dot", component: E8 },
  { name: "TabMenuBasic", title: "TabMenu — Basic", component: E9 },
  { name: "TabWithSelectedIcon", title: "Tab — Selected Icon", component: E10 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
