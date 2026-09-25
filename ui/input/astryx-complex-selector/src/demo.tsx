import E0 from "./examples/ComplexSelectorShowcase.tsx";
import E1 from "./examples/ComplexSelectorDeadlinePicker.tsx";
import E2 from "./examples/ComplexSelectorTreeSearch.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "ComplexSelectorShowcase", title: "Complex Selector", component: E0 },
  { name: "ComplexSelectorDeadlinePicker", title: "Complex Selector — Deadline Picker", component: E1 },
  { name: "ComplexSelectorTreeSearch", title: "Complex Selector — Tree Search", component: E2 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
