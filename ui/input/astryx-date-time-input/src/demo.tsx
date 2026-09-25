import E0 from "./examples/DateTimeInputShowcase.tsx";
import E1 from "./examples/DateTimeInputWithValidation.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "DateTimeInputShowcase", title: "Date Time Input", component: E0 },
  { name: "DateTimeInputWithValidation", title: "DateTimeInput — Validation", component: E1 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
