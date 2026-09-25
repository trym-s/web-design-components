import E0 from "./examples/DateInputShowcase.tsx";
import E1 from "./examples/DateInputClearable.tsx";
import E2 from "./examples/DateInputDateRange.tsx";
import E3 from "./examples/DateInputFormats.tsx";
import E4 from "./examples/DateInputWithDescription.tsx";
import E5 from "./examples/DateInputWithValidation.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "DateInputShowcase", title: "Date Input", component: E0 },
  { name: "DateInputClearable", title: "DateInput — Clearable", component: E1 },
  { name: "DateInputDateRange", title: "DateInput — Min/Max Constraints", component: E2 },
  { name: "DateInputFormats", title: "DateInput — Formats", component: E3 },
  { name: "DateInputWithDescription", title: "DateInput — Description", component: E4 },
  { name: "DateInputWithValidation", title: "DateInput — Validation", component: E5 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
