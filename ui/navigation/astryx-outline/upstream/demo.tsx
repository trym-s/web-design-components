import E0 from "./examples/OutlineShowcase.tsx";
import E1 from "./examples/OutlineControlled.tsx";
import E2 from "./examples/OutlineDeepNesting.tsx";
import E3 from "./examples/OutlineDensity.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "OutlineShowcase", title: "Outline", component: E0 },
  { name: "OutlineControlled", title: "Outline — Controlled", component: E1 },
  { name: "OutlineDeepNesting", title: "Outline — Deep Nesting", component: E2 },
  { name: "OutlineDensity", title: "Outline — Density", component: E3 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
