import E0 from "./examples/SelectableCardShowcase.tsx";
import E1 from "./examples/SelectableCardElevated.tsx";
import E2 from "./examples/SelectableCardMulti.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "SelectableCardShowcase", title: "Selectable Card", component: E0 },
  { name: "SelectableCardElevated", title: "Selectable Card — Elevated", component: E1 },
  { name: "SelectableCardMulti", title: "Selectable Card — Multi-select", component: E2 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
