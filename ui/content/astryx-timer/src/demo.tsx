import E0 from "./examples/TimerShowcase.tsx";
import E1 from "./examples/TimerFormats.tsx";
import E2 from "./examples/TimerInline.tsx";
import E3 from "./examples/TimerTypography.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "TimerShowcase", title: "Timer", component: E0 },
  { name: "TimerFormats", title: "Timer — Formats", component: E1 },
  { name: "TimerInline", title: "Timer — Inline", component: E2 },
  { name: "TimerTypography", title: "Timer — Typography", component: E3 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
