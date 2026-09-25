import E0 from "./examples/SpinnerShowcase.tsx";
import E1 from "./examples/SpinnerOnMedia.tsx";
import E2 from "./examples/SpinnerSizes.tsx";
import E3 from "./examples/SpinnerWithLabel.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "SpinnerShowcase", title: "Spinner", component: E0 },
  { name: "SpinnerOnMedia", title: "Spinner — On Media Shade", component: E1 },
  { name: "SpinnerSizes", title: "Spinner — Sizes", component: E2 },
  { name: "SpinnerWithLabel", title: "Spinner — With Label", component: E3 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
