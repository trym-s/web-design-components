import { DrawerDemo as E0 } from "./examples/drawer-demo";
import { DrawerScrollableContent as E1 } from "./examples/drawer-scrollable-content";
import { DrawerWithSides as E2 } from "./examples/drawer-sides";
import { DrawerDialogDemo as E3 } from "./examples/drawer-dialog";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "drawer-demo", title: "Drawer Demo", component: E0 },
  { name: "drawer-scrollable-content", title: "Drawer Scrollable Content", component: E1 },
  { name: "drawer-sides", title: "Drawer Sides", component: E2 },
  { name: "drawer-dialog", title: "Drawer Dialog", component: E3 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
