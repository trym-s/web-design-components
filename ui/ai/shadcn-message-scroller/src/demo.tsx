import { MessageScrollerDemo as E0 } from "./examples/message-scroller-demo";
import { MessageScrollerAnchoring as E1 } from "./examples/message-scroller-anchoring";
import { MessageScrollerGroupChat as E2 } from "./examples/message-scroller-group-chat";
import { MessageScrollerPreviousContext as E3 } from "./examples/message-scroller-previous-context";
import { MessageScrollerStreaming as E4 } from "./examples/message-scroller-streaming";
import { MessageScrollerOpeningPosition as E5 } from "./examples/message-scroller-opening-position";
import { MessageScrollerLoadHistory as E6 } from "./examples/message-scroller-load-history";
import { MessageScrollerAnimation as E7 } from "./examples/message-scroller-animation";
import { MessageScrollerCommands as E8 } from "./examples/message-scroller-commands";
import { MessageScrollerVisibility as E9 } from "./examples/message-scroller-visibility";
import { MessageScrollerScrollable as E10 } from "./examples/message-scroller-scrollable";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "message-scroller-demo", title: "Message Scroller Demo (radix-rhea)", component: E0 },
  { name: "message-scroller-anchoring", title: "Message Scroller Anchoring (radix-rhea)", component: E1 },
  { name: "message-scroller-group-chat", title: "Message Scroller Group Chat (radix-rhea)", component: E2 },
  { name: "message-scroller-previous-context", title: "Message Scroller Previous Context (radix-rhea)", component: E3 },
  { name: "message-scroller-streaming", title: "Message Scroller Streaming (radix-rhea)", component: E4 },
  { name: "message-scroller-opening-position", title: "Message Scroller Opening Position (radix-rhea)", component: E5 },
  { name: "message-scroller-load-history", title: "Message Scroller Load History (radix-rhea)", component: E6 },
  { name: "message-scroller-animation", title: "Message Scroller Animation (radix-rhea)", component: E7 },
  { name: "message-scroller-commands", title: "Message Scroller Commands (radix-rhea)", component: E8 },
  { name: "message-scroller-visibility", title: "Message Scroller Visibility (radix-rhea)", component: E9 },
  { name: "message-scroller-scrollable", title: "Message Scroller Scrollable (radix-rhea)", component: E10 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
