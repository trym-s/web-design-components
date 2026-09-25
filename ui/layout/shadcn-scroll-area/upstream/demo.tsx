import { ScrollAreaDemo as E0 } from "./examples/scroll-area-demo";
import { ScrollAreaHorizontalDemo as E1 } from "./examples/scroll-area-horizontal-demo";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "scroll-area-demo", title: "Scroll Area Demo", component: E0 },
  { name: "scroll-area-horizontal-demo", title: "Scroll Area Horizontal Demo", component: E1 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
