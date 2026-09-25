import E0 from "./examples/sidebar-demo";
import E1 from "./examples/sidebar-controlled";
import E2 from "./examples/sidebar-footer";
import E3 from "./examples/sidebar-group-action";
import E4 from "./examples/sidebar-group-collapsible";
import E5 from "./examples/sidebar-group";
import E6 from "./examples/sidebar-header";
import E7 from "./examples/sidebar-menu-action";
import E8 from "./examples/sidebar-menu-badge";
import E9 from "./examples/sidebar-menu-collapsible";
import E10 from "./examples/sidebar-menu-sub";
import E11 from "./examples/sidebar-menu";
import E12 from "./examples/sidebar-rsc";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "sidebar-demo", title: "Sidebar Demo", component: E0 },
  { name: "sidebar-controlled", title: "Sidebar Controlled · not on docs page", component: E1 },
  { name: "sidebar-footer", title: "Sidebar Footer · not on docs page", component: E2 },
  { name: "sidebar-group-action", title: "Sidebar Group Action · not on docs page", component: E3 },
  { name: "sidebar-group-collapsible", title: "Sidebar Group Collapsible · not on docs page", component: E4 },
  { name: "sidebar-group", title: "Sidebar Group · not on docs page", component: E5 },
  { name: "sidebar-header", title: "Sidebar Header · not on docs page", component: E6 },
  { name: "sidebar-menu-action", title: "Sidebar Menu Action · not on docs page", component: E7 },
  { name: "sidebar-menu-badge", title: "Sidebar Menu Badge · not on docs page", component: E8 },
  { name: "sidebar-menu-collapsible", title: "Sidebar Menu Collapsible · not on docs page", component: E9 },
  { name: "sidebar-menu-sub", title: "Sidebar Menu Sub · not on docs page", component: E10 },
  { name: "sidebar-menu", title: "Sidebar Menu · not on docs page", component: E11 },
  { name: "sidebar-rsc", title: "Sidebar Rsc · not on docs page", component: E12 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
