import E0 from "./examples/ResizableShowcase.tsx";
import E1 from "./examples/ResizableSidebar.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "ResizableShowcase", title: "Resizable", component: E0 },
  { name: "ResizableSidebar", title: "Resizable — Collapsible with snap points", component: E1 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
