import { MessageDemo as E0 } from "./examples/message-demo";
import { MessageAvatarDemo as E1 } from "./examples/message-avatar";
import { MessageGroupDemo as E2 } from "./examples/message-group";
import { MessageHeaderFooterDemo as E3 } from "./examples/message-header-footer";
import { MessageActionsDemo as E4 } from "./examples/message-actions";
import { MessageAttachmentDemo as E5 } from "./examples/message-attachment";
import { MessageMarkdownDemo as E6 } from "./examples/message-markdown";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "message-demo", title: "Message Demo (radix-rhea)", component: E0 },
  { name: "message-avatar", title: "Message Avatar (radix-rhea)", component: E1 },
  { name: "message-group", title: "Message Group (radix-rhea)", component: E2 },
  { name: "message-header-footer", title: "Message Header Footer (radix-rhea)", component: E3 },
  { name: "message-actions", title: "Message Actions (radix-rhea)", component: E4 },
  { name: "message-attachment", title: "Message Attachment (radix-rhea)", component: E5 },
  { name: "message-markdown", title: "Message Markdown · not on docs page", component: E6 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
