import { TooltipDemo as E0 } from "./examples/tooltip-demo";
import { TooltipSides as E1 } from "./examples/tooltip-sides";
import { TooltipKeyboard as E2 } from "./examples/tooltip-keyboard";
import { TooltipDisabled as E3 } from "./examples/tooltip-disabled";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "tooltip-demo", title: "Tooltip Demo", component: E0 },
  { name: "tooltip-sides", title: "Tooltip Sides", component: E1 },
  { name: "tooltip-keyboard", title: "Tooltip Keyboard", component: E2 },
  { name: "tooltip-disabled", title: "Tooltip Disabled", component: E3 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
