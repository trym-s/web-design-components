import E0 from "./examples/CenterShowcase.tsx";
import E1 from "./examples/CenterHorizontal.tsx";
import E2 from "./examples/CenterInsideACard.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "CenterShowcase", title: "Center", component: E0 },
  { name: "CenterHorizontal", title: "Center — Horizontal Center", component: E1 },
  { name: "CenterInsideACard", title: "Center — Vertical & Horizontal Center", component: E2 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
