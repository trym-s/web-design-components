import E0 from "./examples/CheckboxInputShowcase.tsx";
import E1 from "./examples/CheckboxInputBasic.tsx";
import E2 from "./examples/CheckboxInputIndeterminateState.tsx";
import E3 from "./examples/CheckboxInputStatusVariations.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "CheckboxInputShowcase", title: "Checkbox Input", component: E0 },
  { name: "CheckboxInputBasic", title: "CheckboxInput — States", component: E1 },
  { name: "CheckboxInputIndeterminateState", title: "CheckboxInput — Indeterminate", component: E2 },
  { name: "CheckboxInputStatusVariations", title: "CheckboxInput — Status", component: E3 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
