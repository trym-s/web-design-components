import E0 from "./examples/TooltipShowcase.tsx";
import E1 from "./examples/TooltipActionBarTooltips.tsx";
import E2 from "./examples/TooltipHookUsage.tsx";
import E3 from "./examples/TooltipInlineTextTooltips.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "TooltipShowcase", title: "Tooltip", component: E0 },
  { name: "TooltipActionBarTooltips", title: "Tooltip — Action Bar", component: E1 },
  { name: "TooltipHookUsage", title: "Tooltip — Hook Usage", component: E2 },
  { name: "TooltipInlineTextTooltips", title: "Tooltip — Inline Text", component: E3 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
