import E0 from "./examples/RadioListItemShowcase.tsx";
import E1 from "./examples/RadioListShowcase.tsx";
import E2 from "./examples/RadioListHorizontalLayout.tsx";
import E3 from "./examples/RadioListItemBasic.tsx";
import E4 from "./examples/RadioListPricingTier.tsx";
import E5 from "./examples/RadioListWithDescriptions.tsx";
import E6 from "./examples/RadioListWithValidation.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "RadioListItemShowcase", title: "Radio List Item", component: E0 },
  { name: "RadioListShowcase", title: "Radio List", component: E1 },
  { name: "RadioListHorizontalLayout", title: "RadioList — Horizontal Layout", component: E2 },
  { name: "RadioListItemBasic", title: "RadioListItem — Basic", component: E3 },
  { name: "RadioListPricingTier", title: "RadioList — Pricing Tier", component: E4 },
  { name: "RadioListWithDescriptions", title: "RadioList — With Descriptions", component: E5 },
  { name: "RadioListWithValidation", title: "RadioList — With Validation", component: E6 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
