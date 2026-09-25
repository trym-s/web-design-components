import E0 from "./examples/SectionVariants.tsx";
import E1 from "./examples/SectionWashHighlight.tsx";
import E2 from "./examples/SectionWithDividers.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "SectionVariants", title: "Section — Variants", component: E0 },
  { name: "SectionWashHighlight", title: "Section — Default with Wash", component: E1 },
  { name: "SectionWithDividers", title: "Section — With Dividers", component: E2 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
