import E0 from "./examples/ContextMenuItemShowcase.tsx";
import E1 from "./examples/ContextMenuShowcase.tsx";
import E2 from "./examples/ContextMenuBasic.tsx";
import E3 from "./examples/ContextMenuBottomSheet.tsx";
import E4 from "./examples/ContextMenuItemBasic.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "ContextMenuItemShowcase", title: "Context Menu Item", component: E0 },
  { name: "ContextMenuShowcase", title: "Context Menu", component: E1 },
  { name: "ContextMenuBasic", title: "ContextMenu — Basic", component: E2 },
  { name: "ContextMenuBottomSheet", title: "ContextMenu — Bottom Sheet", component: E3 },
  { name: "ContextMenuItemBasic", title: "ContextMenuItem — Basic", component: E4 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
