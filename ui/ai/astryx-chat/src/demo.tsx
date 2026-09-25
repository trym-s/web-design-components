import E0 from "./examples/ChatComposerDrawerShowcase.tsx";
import E1 from "./examples/ChatComposerInputShowcase.tsx";
import E2 from "./examples/ChatComposerShowcase.tsx";
import E3 from "./examples/ChatLayoutShowcase.tsx";
import E4 from "./examples/ChatMessageBubbleShowcase.tsx";
import E5 from "./examples/ChatMessageListShowcase.tsx";
import E6 from "./examples/ChatMessageMetadataShowcase.tsx";
import E7 from "./examples/ChatMessageShowcase.tsx";
import E8 from "./examples/ChatSendButtonShowcase.tsx";
import E9 from "./examples/ChatSystemMessageShowcase.tsx";
import E10 from "./examples/ChatComposerAttachments.tsx";
import E11 from "./examples/ChatComposerDrawerAttachments.tsx";
import E12 from "./examples/ChatComposerDrawerCollapsible.tsx";
import E13 from "./examples/ChatComposerDrawerFeedback.tsx";
import E14 from "./examples/ChatComposerDrawerWithProgress.tsx";
import E15 from "./examples/ChatComposerFlat.tsx";
import E16 from "./examples/ChatComposerFooterActions.tsx";
import E17 from "./examples/ChatComposerFullFeatured.tsx";
import E18 from "./examples/ChatComposerInputControlledInput.tsx";
import E19 from "./examples/ChatComposerInputDisabled.tsx";
import E20 from "./examples/ChatComposerInputMentionTrigger.tsx";
import E21 from "./examples/ChatComposerInputMultipleTriggers.tsx";
import E22 from "./examples/ChatComposerInputSlashCommands.tsx";
import E23 from "./examples/ChatComposerSimple.tsx";
import E24 from "./examples/ChatComposerStreaming.tsx";
import E25 from "./examples/ChatComposerValidation.tsx";
import E26 from "./examples/ChatLayoutPanelChat.tsx";
import E27 from "./examples/ChatLayoutScrollButtonLabels.tsx";
import E28 from "./examples/ChatLayoutScrollButtonStates.tsx";
import E29 from "./examples/ChatMessageAvatarName.tsx";
import E30 from "./examples/ChatMessageBubbleCustomContent.tsx";
import E31 from "./examples/ChatMessageBubbleDensity.tsx";
import E32 from "./examples/ChatMessageBubbleGrouping.tsx";
import E33 from "./examples/ChatMessageBubbleMetadata.tsx";
import E34 from "./examples/ChatMessageBubbleVariants.tsx";
import E35 from "./examples/ChatMessageGhost.tsx";
import E36 from "./examples/ChatMessageListDensity.tsx";
import E37 from "./examples/ChatMessageListFullFeatured.tsx";
import E38 from "./examples/ChatMessageMetadataFooter.tsx";
import E39 from "./examples/ChatMessageMetadataStatus.tsx";
import E40 from "./examples/ChatMessageMetadataTimestamp.tsx";
import E41 from "./examples/ChatMessageMultiBubble.tsx";
import E42 from "./examples/ChatSendButtonCustomIcon.tsx";
import E43 from "./examples/ChatSendButtonInComposer.tsx";
import E44 from "./examples/ChatSendButtonStates.tsx";
import E45 from "./examples/ChatSystemMessageStatusUpdates.tsx";
import E46 from "./examples/ChatSystemMessageVariants.tsx";
import E47 from "./examples/ChatSystemMessageWithIcon.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "ChatComposerDrawerShowcase", title: "Chat Composer Drawer", component: E0 },
  { name: "ChatComposerInputShowcase", title: "Chat Composer Input", component: E1 },
  { name: "ChatComposerShowcase", title: "Chat Composer", component: E2 },
  { name: "ChatLayoutShowcase", title: "Chat Layout", component: E3 },
  { name: "ChatMessageBubbleShowcase", title: "Chat Message Bubble", component: E4 },
  { name: "ChatMessageListShowcase", title: "Chat Message List", component: E5 },
  { name: "ChatMessageMetadataShowcase", title: "Chat Message Metadata", component: E6 },
  { name: "ChatMessageShowcase", title: "Chat Message", component: E7 },
  { name: "ChatSendButtonShowcase", title: "Chat Send Button", component: E8 },
  { name: "ChatSystemMessageShowcase", title: "Chat System Message", component: E9 },
  { name: "ChatComposerAttachments", title: "ChatComposer — Attachments", component: E10 },
  { name: "ChatComposerDrawerAttachments", title: "ChatComposerDrawer — Attachments", component: E11 },
  { name: "ChatComposerDrawerCollapsible", title: "ChatComposerDrawer — Collapsible", component: E12 },
  { name: "ChatComposerDrawerFeedback", title: "ChatComposerDrawer — Feedback", component: E13 },
  { name: "ChatComposerDrawerWithProgress", title: "ChatComposerDrawer — With Progress", component: E14 },
  { name: "ChatComposerFlat", title: "ChatComposer — Flat", component: E15 },
  { name: "ChatComposerFooterActions", title: "ChatComposer — Footer Actions", component: E16 },
  { name: "ChatComposerFullFeatured", title: "ChatComposer — Full Featured", component: E17 },
  { name: "ChatComposerInputControlledInput", title: "ChatComposerInput — Controlled", component: E18 },
  { name: "ChatComposerInputDisabled", title: "ChatComposerInput — Disabled", component: E19 },
  { name: "ChatComposerInputMentionTrigger", title: "ChatComposerInput — Mentions", component: E20 },
  { name: "ChatComposerInputMultipleTriggers", title: "ChatComposerInput — Multiple Triggers", component: E21 },
  { name: "ChatComposerInputSlashCommands", title: "ChatComposerInput — Slash Commands", component: E22 },
  { name: "ChatComposerSimple", title: "ChatComposer — Simple", component: E23 },
  { name: "ChatComposerStreaming", title: "ChatComposer — Streaming", component: E24 },
  { name: "ChatComposerValidation", title: "ChatComposer — Validation", component: E25 },
  { name: "ChatLayoutPanelChat", title: "ChatLayout — Panel View", component: E26 },
  { name: "ChatLayoutScrollButtonLabels", title: "ChatLayoutScrollButton — Labels", component: E27 },
  { name: "ChatLayoutScrollButtonStates", title: "Chat Layout Scroll Button", component: E28 },
  { name: "ChatMessageAvatarName", title: "ChatMessage — Avatar & Name", component: E29 },
  { name: "ChatMessageBubbleCustomContent", title: "ChatMessageBubble — Custom Content", component: E30 },
  { name: "ChatMessageBubbleDensity", title: "ChatMessageBubble — Density", component: E31 },
  { name: "ChatMessageBubbleGrouping", title: "ChatMessageBubble — Grouping", component: E32 },
  { name: "ChatMessageBubbleMetadata", title: "ChatMessageBubble — Metadata", component: E33 },
  { name: "ChatMessageBubbleVariants", title: "ChatMessageBubble — Variants", component: E34 },
  { name: "ChatMessageGhost", title: "ChatMessage — Ghost", component: E35 },
  { name: "ChatMessageListDensity", title: "ChatMessageList — Density", component: E36 },
  { name: "ChatMessageListFullFeatured", title: "ChatMessageList — Full Featured", component: E37 },
  { name: "ChatMessageMetadataFooter", title: "ChatMessageMetadata — Footer Actions", component: E38 },
  { name: "ChatMessageMetadataStatus", title: "ChatMessageMetadata — Status", component: E39 },
  { name: "ChatMessageMetadataTimestamp", title: "ChatMessageMetadata — Timestamps", component: E40 },
  { name: "ChatMessageMultiBubble", title: "ChatMessage — Multi-Bubble", component: E41 },
  { name: "ChatSendButtonCustomIcon", title: "ChatSendButton — Custom Icon", component: E42 },
  { name: "ChatSendButtonInComposer", title: "ChatSendButton — In Composer", component: E43 },
  { name: "ChatSendButtonStates", title: "ChatSendButton — States", component: E44 },
  { name: "ChatSystemMessageStatusUpdates", title: "ChatSystemMessage — Status Updates", component: E45 },
  { name: "ChatSystemMessageVariants", title: "ChatSystemMessage — Variants", component: E46 },
  { name: "ChatSystemMessageWithIcon", title: "ChatSystemMessage — Icon", component: E47 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
