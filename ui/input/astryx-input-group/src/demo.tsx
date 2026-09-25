import E0 from "./examples/InputGroupShowcase.tsx";
import E1 from "./examples/InputGroupBasic.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "InputGroupShowcase", title: "Input Group", component: E0 },
  { name: "InputGroupBasic", title: "InputGroup — Basic", component: E1 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
