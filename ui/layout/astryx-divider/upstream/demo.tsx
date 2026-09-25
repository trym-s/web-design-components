import E0 from "./examples/DividerShowcase.tsx";
import E1 from "./examples/DividerFullBleed.tsx";
import E2 from "./examples/DividerVariants.tsx";
import E3 from "./examples/DividerVertical.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "DividerShowcase", title: "Divider — Variants", component: E0 },
  { name: "DividerFullBleed", title: "Divider — Full Bleed", component: E1 },
  { name: "DividerVariants", title: "Divider — Variants", component: E2 },
  { name: "DividerVertical", title: "Divider — Vertical", component: E3 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
