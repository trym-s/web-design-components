import E0 from "./examples/ToolbarBulkActions.tsx";
import E1 from "./examples/ToolbarCardHeader.tsx";
import E2 from "./examples/ToolbarSizes.tsx";
import E3 from "./examples/ToolbarTableFilter.tsx";
import E4 from "./examples/ToolbarThreeSlot.tsx";
import E5 from "./examples/ToolbarWithTabs.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "ToolbarBulkActions", title: "Toolbar — Bulk Actions", component: E0 },
  { name: "ToolbarCardHeader", title: "Toolbar — Card Header", component: E1 },
  { name: "ToolbarSizes", title: "Toolbar — Sizes", component: E2 },
  { name: "ToolbarTableFilter", title: "Toolbar — Table Filter", component: E3 },
  { name: "ToolbarThreeSlot", title: "Toolbar — Three Slot", component: E4 },
  { name: "ToolbarWithTabs", title: "Toolbar — Tab Navigation", component: E5 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
