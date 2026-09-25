import E0 from "./examples/VisuallyHiddenShowcase.tsx";
import E1 from "./examples/VisuallyHiddenLiveRegion.tsx";
import E2 from "./examples/VisuallyHiddenStructuralHeading.tsx";
import E3 from "./examples/VisuallyHiddenSupplementaryContext.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "VisuallyHiddenShowcase", title: "VisuallyHidden", component: E0 },
  { name: "VisuallyHiddenLiveRegion", title: "VisuallyHidden — Live Region", component: E1 },
  { name: "VisuallyHiddenStructuralHeading", title: "VisuallyHidden — Structural Heading", component: E2 },
  { name: "VisuallyHiddenSupplementaryContext", title: "VisuallyHidden — Supplementary Context", component: E3 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
