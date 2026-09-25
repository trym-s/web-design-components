import E0 from "./examples/NumberInputShowcase.tsx";
import E1 from "./examples/NumberInputClearableNumberInput.tsx";
import E2 from "./examples/NumberInputRangeNumberInput.tsx";
import E3 from "./examples/NumberInputStatuses.tsx";
import E4 from "./examples/NumberInputWithUnits.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "NumberInputShowcase", title: "Number Input", component: E0 },
  { name: "NumberInputClearableNumberInput", title: "NumberInput — Clearable", component: E1 },
  { name: "NumberInputRangeNumberInput", title: "NumberInput — Range Constrained", component: E2 },
  { name: "NumberInputStatuses", title: "NumberInput — Status Variants", component: E3 },
  { name: "NumberInputWithUnits", title: "NumberInput — With Units", component: E4 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
