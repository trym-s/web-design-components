import { BubbleDemo as E0 } from "./examples/bubble-demo";
import { BubbleVariantsDemo as E1 } from "./examples/bubble-variants";
import { BubbleAlignmentDemo as E2 } from "./examples/bubble-alignment";
import { BubbleGroupDemo as E3 } from "./examples/bubble-group-demo";
import { BubbleLinkButtonDemo as E4 } from "./examples/bubble-link-button";
import { BubbleReactionsDemo as E5 } from "./examples/bubble-reactions";
import { BubbleCollapsible as E6 } from "./examples/bubble-collapsible";
import { BubbleTooltipDemo as E7 } from "./examples/bubble-tooltip";
import { BubblePopoverDemo as E8 } from "./examples/bubble-popover";
import { BubbleMarkdownDemo as E9 } from "./examples/bubble-markdown";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "bubble-demo", title: "Bubble Demo (radix-rhea)", component: E0 },
  { name: "bubble-variants", title: "Bubble Variants (radix-rhea)", component: E1 },
  { name: "bubble-alignment", title: "Bubble Alignment (radix-rhea)", component: E2 },
  { name: "bubble-group-demo", title: "Bubble Group Demo (radix-rhea)", component: E3 },
  { name: "bubble-link-button", title: "Bubble Link Button (radix-rhea)", component: E4 },
  { name: "bubble-reactions", title: "Bubble Reactions (radix-rhea)", component: E5 },
  { name: "bubble-collapsible", title: "Bubble Collapsible (radix-rhea)", component: E6 },
  { name: "bubble-tooltip", title: "Bubble Tooltip (radix-rhea)", component: E7 },
  { name: "bubble-popover", title: "Bubble Popover (radix-rhea)", component: E8 },
  { name: "bubble-markdown", title: "Bubble Markdown · not on docs page", component: E9 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
