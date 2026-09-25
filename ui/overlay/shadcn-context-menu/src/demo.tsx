import { ContextMenuDemo as E0 } from "./examples/context-menu-demo";
import { ContextMenuBasic as E1 } from "./examples/context-menu-basic";
import { ContextMenuSubmenu as E2 } from "./examples/context-menu-submenu";
import { ContextMenuShortcuts as E3 } from "./examples/context-menu-shortcuts";
import { ContextMenuGroups as E4 } from "./examples/context-menu-groups";
import { ContextMenuIcons as E5 } from "./examples/context-menu-icons";
import { ContextMenuCheckboxes as E6 } from "./examples/context-menu-checkboxes";
import { ContextMenuRadio as E7 } from "./examples/context-menu-radio";
import { ContextMenuDestructive as E8 } from "./examples/context-menu-destructive";
import { ContextMenuSides as E9 } from "./examples/context-menu-sides";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "context-menu-demo", title: "Context Menu Demo", component: E0 },
  { name: "context-menu-basic", title: "Context Menu Basic", component: E1 },
  { name: "context-menu-submenu", title: "Context Menu Submenu", component: E2 },
  { name: "context-menu-shortcuts", title: "Context Menu Shortcuts", component: E3 },
  { name: "context-menu-groups", title: "Context Menu Groups", component: E4 },
  { name: "context-menu-icons", title: "Context Menu Icons", component: E5 },
  { name: "context-menu-checkboxes", title: "Context Menu Checkboxes", component: E6 },
  { name: "context-menu-radio", title: "Context Menu Radio", component: E7 },
  { name: "context-menu-destructive", title: "Context Menu Destructive", component: E8 },
  { name: "context-menu-sides", title: "Context Menu Sides · not on docs page", component: E9 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
