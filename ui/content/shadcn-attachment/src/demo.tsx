import { AttachmentDemo as E0 } from "./examples/attachment-demo";
import { AttachmentImage as E1 } from "./examples/attachment-image";
import { AttachmentStates as E2 } from "./examples/attachment-states";
import { AttachmentSizes as E3 } from "./examples/attachment-sizes";
import { AttachmentGroupDemo as E4 } from "./examples/attachment-group";
import { AttachmentTriggerDemo as E5 } from "./examples/attachment-trigger";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "attachment-demo", title: "Attachment Demo (radix-rhea)", component: E0 },
  { name: "attachment-image", title: "Attachment Image (radix-rhea)", component: E1 },
  { name: "attachment-states", title: "Attachment States (radix-rhea)", component: E2 },
  { name: "attachment-sizes", title: "Attachment Sizes (radix-rhea)", component: E3 },
  { name: "attachment-group", title: "Attachment Group (radix-rhea)", component: E4 },
  { name: "attachment-trigger", title: "Attachment Trigger (radix-rhea)", component: E5 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
