import E0 from "./examples/FieldLabelShowcase.tsx";
import E1 from "./examples/FieldShowcase.tsx";
import E2 from "./examples/FieldLabelBasic.tsx";
import E3 from "./examples/FieldRequired.tsx";
import E4 from "./examples/FieldStatusVariants.tsx";
import E5 from "./examples/FieldWithDescription.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "FieldLabelShowcase", title: "Field Label", component: E0 },
  { name: "FieldShowcase", title: "Field", component: E1 },
  { name: "FieldLabelBasic", title: "FieldLabel — Basic", component: E2 },
  { name: "FieldRequired", title: "Field — Required & Optional", component: E3 },
  { name: "FieldStatusVariants", title: "Field — Validation States", component: E4 },
  { name: "FieldWithDescription", title: "Field — Description", component: E5 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
