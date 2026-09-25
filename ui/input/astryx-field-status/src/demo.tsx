import E0 from "./examples/FieldStatusShowcase.tsx";
import E1 from "./examples/FieldStatusBasic.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "FieldStatusShowcase", title: "Field Status", component: E0 },
  { name: "FieldStatusBasic", title: "FieldStatus — Basic", component: E1 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
