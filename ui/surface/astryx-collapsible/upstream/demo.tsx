import E0 from "./examples/CollapsibleGroupShowcase.tsx";
import E1 from "./examples/CollapsibleShowcase.tsx";
import E2 from "./examples/CollapsibleControlledAccordion.tsx";
import E3 from "./examples/CollapsibleDividedAccordion.tsx";
import E4 from "./examples/CollapsibleGroupAccordion.tsx";
import E5 from "./examples/CollapsibleMultipleAccordion.tsx";
import E6 from "./examples/CollapsibleSingleAccordion.tsx";
import E7 from "./examples/CollapsibleWithoutCard.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "CollapsibleGroupShowcase", title: "Collapsible Group", component: E0 },
  { name: "CollapsibleShowcase", title: "Collapsible", component: E1 },
  { name: "CollapsibleControlledAccordion", title: "Collapsible — Controlled", component: E2 },
  { name: "CollapsibleDividedAccordion", title: "Collapsible — FAQ", component: E3 },
  { name: "CollapsibleGroupAccordion", title: "CollapsibleGroup — Density", component: E4 },
  { name: "CollapsibleMultipleAccordion", title: "Collapsible — Multiple Mode", component: E5 },
  { name: "CollapsibleSingleAccordion", title: "Collapsible — Single Mode", component: E6 },
  { name: "CollapsibleWithoutCard", title: "Collapsible — With Dividers", component: E7 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
