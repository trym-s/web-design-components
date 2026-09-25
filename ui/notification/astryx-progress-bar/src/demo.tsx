import E0 from "./examples/ProgressBarShowcase.tsx";
import E1 from "./examples/ProgressBarCustomFormat.tsx";
import E2 from "./examples/ProgressBarIndeterminate.tsx";
import E3 from "./examples/ProgressBarSemanticVariants.tsx";
import E4 from "./examples/ProgressBarWithValueLabel.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "ProgressBarShowcase", title: "Progress Bar", component: E0 },
  { name: "ProgressBarCustomFormat", title: "ProgressBar — Custom Format", component: E1 },
  { name: "ProgressBarIndeterminate", title: "ProgressBar — Indeterminate", component: E2 },
  { name: "ProgressBarSemanticVariants", title: "ProgressBar — Semantic Variants", component: E3 },
  { name: "ProgressBarWithValueLabel", title: "ProgressBar — With Value Label", component: E4 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
