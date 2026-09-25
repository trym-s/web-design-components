import E0 from "./examples/DateRangeInputShowcase.tsx";
import E1 from "./examples/DateRangeInputWithPresets.tsx";
import E2 from "./examples/DateRangeInputWithValidation.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "DateRangeInputShowcase", title: "Date Range Input", component: E0 },
  { name: "DateRangeInputWithPresets", title: "DateRangeInput — With Presets", component: E1 },
  { name: "DateRangeInputWithValidation", title: "DateRangeInput — Validation", component: E2 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
