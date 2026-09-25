import E0 from "./examples/LayoutContentShowcase.tsx";
import E1 from "./examples/LayoutFooterShowcase.tsx";
import E2 from "./examples/LayoutHeaderShowcase.tsx";
import E3 from "./examples/LayoutPanelShowcase.tsx";
import E4 from "./examples/LayoutShowcase.tsx";
import E5 from "./examples/LayoutBasicCardLayout.tsx";
import E6 from "./examples/LayoutContentBasic.tsx";
import E7 from "./examples/LayoutContentOnlyLayout.tsx";
import E8 from "./examples/LayoutContentWidth.tsx";
import E9 from "./examples/LayoutDualPanelLayout.tsx";
import E10 from "./examples/LayoutFooterActions.tsx";
import E11 from "./examples/LayoutFullBleedContent.tsx";
import E12 from "./examples/LayoutHeaderWithActions.tsx";
import E13 from "./examples/LayoutPanelNavigation.tsx";
import E14 from "./examples/LayoutSidebarLayout.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "LayoutContentShowcase", title: "Layout Content", component: E0 },
  { name: "LayoutFooterShowcase", title: "Layout Footer", component: E1 },
  { name: "LayoutHeaderShowcase", title: "Layout Header", component: E2 },
  { name: "LayoutPanelShowcase", title: "Layout Panel", component: E3 },
  { name: "LayoutShowcase", title: "Layout", component: E4 },
  { name: "LayoutBasicCardLayout", title: "Layout — Basic Card", component: E5 },
  { name: "LayoutContentBasic", title: "LayoutContent — Basic", component: E6 },
  { name: "LayoutContentOnlyLayout", title: "Layout — Content Only", component: E7 },
  { name: "LayoutContentWidth", title: "Layout — Content Width", component: E8 },
  { name: "LayoutDualPanelLayout", title: "Layout — Dual Panel", component: E9 },
  { name: "LayoutFooterActions", title: "LayoutFooter — Actions", component: E10 },
  { name: "LayoutFullBleedContent", title: "Layout — Full Bleed Content", component: E11 },
  { name: "LayoutHeaderWithActions", title: "LayoutHeader — With Actions", component: E12 },
  { name: "LayoutPanelNavigation", title: "LayoutPanel — Navigation", component: E13 },
  { name: "LayoutSidebarLayout", title: "Layout — Sidebar Navigation", component: E14 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
