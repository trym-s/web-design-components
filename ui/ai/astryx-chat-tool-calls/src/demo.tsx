import E0 from "./examples/ChatTokenizedTextShowcase.tsx";
import E1 from "./examples/ChatToolCallsShowcase.tsx";
import E2 from "./examples/ChatTokenizedTextBasic.tsx";
import E3 from "./examples/ChatTokenizedTextColors.tsx";
import E4 from "./examples/ChatToolCallsInteractiveToolCalls.tsx";
import E5 from "./examples/ChatToolCallsStatuses.tsx";
import E6 from "./examples/ChatToolCallsToolCallsWithNodes.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "ChatTokenizedTextShowcase", title: "Chat Tokenized Text", component: E0 },
  { name: "ChatToolCallsShowcase", title: "Chat Tool Calls", component: E1 },
  { name: "ChatTokenizedTextBasic", title: "ChatTokenizedText — Basic", component: E2 },
  { name: "ChatTokenizedTextColors", title: "ChatTokenizedText — Colors", component: E3 },
  { name: "ChatToolCallsInteractiveToolCalls", title: "ChatToolCalls — Expandable", component: E4 },
  { name: "ChatToolCallsStatuses", title: "ChatToolCalls — Statuses", component: E5 },
  { name: "ChatToolCallsToolCallsWithNodes", title: "ChatToolCalls — Simple", component: E6 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
