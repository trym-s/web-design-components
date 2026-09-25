import E0 from "./examples/NavHeadingMenuShowcase.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "NavHeadingMenuShowcase", title: "Nav Heading Menu", component: E0 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
