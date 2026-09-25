import E0 from "./examples/resizable-demo";
import { ResizableVertical as E1 } from "./examples/resizable-vertical";
import E2 from "./examples/resizable-handle";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "resizable-demo", title: "Resizable Demo", component: E0 },
  { name: "resizable-vertical", title: "Resizable Vertical", component: E1 },
  { name: "resizable-handle", title: "Resizable Handle", component: E2 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
