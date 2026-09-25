import E0 from "./examples/CalendarShowcase.tsx";
import E1 from "./examples/CalendarConstraints.tsx";
import E2 from "./examples/CalendarRangeWithValue.tsx";
import E3 from "./examples/CalendarSingle.tsx";
import E4 from "./examples/CalendarTwoMonths.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "CalendarShowcase", title: "Calendar", component: E0 },
  { name: "CalendarConstraints", title: "Calendar — Constraints", component: E1 },
  { name: "CalendarRangeWithValue", title: "Calendar — Range", component: E2 },
  { name: "CalendarSingle", title: "Calendar — Single", component: E3 },
  { name: "CalendarTwoMonths", title: "Calendar — Two Months", component: E4 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
