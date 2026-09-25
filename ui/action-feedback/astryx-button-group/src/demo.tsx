import E0 from "./examples/ButtonGroupShowcase.tsx";
import E1 from "./examples/ButtonGroupBasic.tsx";
import E2 from "./examples/ButtonGroupFloating.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "ButtonGroupShowcase", title: "Button Group", component: E0 },
  { name: "ButtonGroupBasic", title: "ButtonGroup — Basic", component: E1 },
  { name: "ButtonGroupFloating", title: "ButtonGroup — Floating", component: E2 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
