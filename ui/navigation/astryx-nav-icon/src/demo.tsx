import E0 from "./examples/NavIconShowcase.tsx";
import E1 from "./examples/NavIconBasic.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "NavIconShowcase", title: "Nav Icon", component: E0 },
  { name: "NavIconBasic", title: "NavIcon — Basic", component: E1 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
