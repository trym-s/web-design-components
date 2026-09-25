import E0 from "./examples/CardShowcase.tsx";
import E1 from "./examples/CardCallout.tsx";
import E2 from "./examples/CardElevations.tsx";
import E3 from "./examples/CardVariants.tsx";
import E4 from "./examples/CardWithInnerLayout.tsx";
import E5 from "./examples/CardWithSimpleContent.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "CardShowcase", title: "Card", component: E0 },
  { name: "CardCallout", title: "Card — Callout", component: E1 },
  { name: "CardElevations", title: "Card — Elevations", component: E2 },
  { name: "CardVariants", title: "Card — Variants", component: E3 },
  { name: "CardWithInnerLayout", title: "Card — Layout", component: E4 },
  { name: "CardWithSimpleContent", title: "Card — Simple", component: E5 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
