import E0 from "./examples/TimestampShowcase.tsx";
import E1 from "./examples/TimestampAutoFormat.tsx";
import E2 from "./examples/TimestampColors.tsx";
import E3 from "./examples/TimestampFormats.tsx";
import E4 from "./examples/TimestampRelativeFormat.tsx";
import E5 from "./examples/TimestampTimezone.tsx";
import E6 from "./examples/TimestampTooltipTimezones.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "TimestampShowcase", title: "Timestamp", component: E0 },
  { name: "TimestampAutoFormat", title: "Timestamp — Auto", component: E1 },
  { name: "TimestampColors", title: "Timestamp — Colors", component: E2 },
  { name: "TimestampFormats", title: "Timestamp — Formats", component: E3 },
  { name: "TimestampRelativeFormat", title: "Timestamp — Relative", component: E4 },
  { name: "TimestampTimezone", title: "Timestamp — Timezone", component: E5 },
  { name: "TimestampTooltipTimezones", title: "Timestamp — Tooltip time zones", component: E6 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
