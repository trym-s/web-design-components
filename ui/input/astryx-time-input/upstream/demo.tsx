import E0 from "./examples/TimeInputShowcase.tsx";
import E1 from "./examples/TimeInputConstrained.tsx";
import E2 from "./examples/TimeInputFormats.tsx";
import E3 from "./examples/TimeInputIncrement.tsx";
import E4 from "./examples/TimeInputStates.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "TimeInputShowcase", title: "Time Input", component: E0 },
  { name: "TimeInputConstrained", title: "TimeInput — Constrained", component: E1 },
  { name: "TimeInputFormats", title: "TimeInput — Formats", component: E2 },
  { name: "TimeInputIncrement", title: "TimeInput — Increment", component: E3 },
  { name: "TimeInputStates", title: "TimeInput — States", component: E4 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
