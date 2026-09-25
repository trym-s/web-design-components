import E0 from "./examples/HStackShowcase.tsx";
import E1 from "./examples/StackItemShowcase.tsx";
import E2 from "./examples/VStackShowcase.tsx";
import E3 from "./examples/HStackBasic.tsx";
import E4 from "./examples/StackAlignment.tsx";
import E5 from "./examples/StackDirections.tsx";
import E6 from "./examples/StackFillItem.tsx";
import E7 from "./examples/StackItemFill.tsx";
import E8 from "./examples/VStackBasic.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "HStackShowcase", title: "H Stack", component: E0 },
  { name: "StackItemShowcase", title: "Stack Item", component: E1 },
  { name: "VStackShowcase", title: "V Stack", component: E2 },
  { name: "HStackBasic", title: "HStack — Basic", component: E3 },
  { name: "StackAlignment", title: "Stack — Alignment", component: E4 },
  { name: "StackDirections", title: "Stack — Directions", component: E5 },
  { name: "StackFillItem", title: "Stack — Fill Item", component: E6 },
  { name: "StackItemFill", title: "StackItem — Fill", component: E7 },
  { name: "VStackBasic", title: "VStack — Basic", component: E8 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
