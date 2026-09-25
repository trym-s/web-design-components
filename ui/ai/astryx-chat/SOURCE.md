# Source

- Site: https://astryx.atmeta.com/components/Chat
- Repository: https://github.com/facebook/astryx
- Captured commit: `e073c9f8df371455086b384a6c221acdcfdcd57c`
- Package build used by the live demo: `0.6.3-canary.e073c9f` (npm canary published from the same commit)
- License: MIT (`ui/_sources/astryx/LICENSE`)
- Captured: 2026-09-24T15:30:00Z

Component source and docs from `packages/core/src`; examples from the CLI block templates. Shared internals the source imports (hooks, theme, utils, i18n) live in `ui/_sources/astryx/src/core/`.

Upstream paths:

- `packages/core/src/Chat/Chat.doc.mjs`
- `packages/core/src/Chat/ChatComposer.doc.mjs`
- `packages/core/src/Chat/ChatComposerDrawer.doc.mjs`
- `packages/core/src/Chat/ChatComposerInput.doc.mjs`
- `packages/core/src/Chat/ChatComposerTokenElement.doc.mjs`
- `packages/core/src/Chat/ChatLayout.doc.mjs`
- `packages/core/src/Chat/ChatLayoutScrollButton.doc.mjs`
- `packages/core/src/Chat/ChatMessage.doc.mjs`
- `packages/core/src/Chat/ChatMessageBubble.doc.mjs`
- `packages/core/src/Chat/ChatMessageList.doc.mjs`
- `packages/core/src/Chat/ChatMessageMetadata.doc.mjs`
- `packages/core/src/Chat/ChatSendButton.doc.mjs`
- `packages/core/src/Chat/ChatSystemMessage.doc.mjs`
- `packages/core/src/Chat/ChatComposer.spec.md`
- `packages/core/src/Chat/ChatComposer.tsx`
- `packages/core/src/Chat/ChatComposerDrawer.spec.md`
- `packages/core/src/Chat/ChatComposerDrawer.tsx`
- `packages/core/src/Chat/ChatComposerInput.spec.md`
- `packages/core/src/Chat/ChatComposerInput.tsx`
- `packages/core/src/Chat/ChatComposerTokenElement.spec.md`
- `packages/core/src/Chat/ChatContext.tsx`
- `packages/core/src/Chat/ChatLayout.spec.md`
- `packages/core/src/Chat/ChatLayout.tsx`
- `packages/core/src/Chat/ChatLayoutScrollButton.spec.md`
- `packages/core/src/Chat/ChatLayoutScrollButton.tsx`
- `packages/core/src/Chat/ChatMessage.tsx`
- `packages/core/src/Chat/ChatMessageBubble.tsx`
- `packages/core/src/Chat/ChatMessageList.tsx`
- `packages/core/src/Chat/ChatMessageMetadata.tsx`
- `packages/core/src/Chat/ChatPastedTextToken.tsx`
- `packages/core/src/Chat/ChatSendButton.tsx`
- `packages/core/src/Chat/ChatSystemMessage.tsx`
- `packages/cli/assets/templates/blocks/components/ChatComposerDrawer/ChatComposerDrawerShowcase.tsx`
- `packages/cli/assets/templates/blocks/components/ChatComposerInput/ChatComposerInputShowcase.tsx`
- `packages/cli/assets/templates/blocks/components/ChatComposer/ChatComposerShowcase.tsx`
- `packages/cli/assets/templates/blocks/components/ChatLayout/ChatLayoutShowcase.tsx`
- `packages/cli/assets/templates/blocks/components/ChatMessageBubble/ChatMessageBubbleShowcase.tsx`
- `packages/cli/assets/templates/blocks/components/ChatMessageList/ChatMessageListShowcase.tsx`
- `packages/cli/assets/templates/blocks/components/ChatMessageMetadata/ChatMessageMetadataShowcase.tsx`
- `packages/cli/assets/templates/blocks/components/ChatMessage/ChatMessageShowcase.tsx`
- `packages/cli/assets/templates/blocks/components/ChatSendButton/ChatSendButtonShowcase.tsx`
- `packages/cli/assets/templates/blocks/components/ChatSystemMessage/ChatSystemMessageShowcase.tsx`
- `packages/cli/assets/templates/blocks/components/ChatComposer/ChatComposerAttachments.tsx`
- `packages/cli/assets/templates/blocks/components/ChatComposerDrawer/ChatComposerDrawerAttachments.tsx`
- `packages/cli/assets/templates/blocks/components/ChatComposerDrawer/ChatComposerDrawerCollapsible.tsx`
- `packages/cli/assets/templates/blocks/components/ChatComposerDrawer/ChatComposerDrawerFeedback.tsx`
- `packages/cli/assets/templates/blocks/components/ChatComposerDrawer/ChatComposerDrawerWithProgress.tsx`
- `packages/cli/assets/templates/blocks/components/ChatComposer/ChatComposerFlat.tsx`
- `packages/cli/assets/templates/blocks/components/ChatComposer/ChatComposerFooterActions.tsx`
- `packages/cli/assets/templates/blocks/components/ChatComposer/ChatComposerFullFeatured.tsx`
- `packages/cli/assets/templates/blocks/components/ChatComposerInput/ChatComposerInputControlledInput.tsx`
- `packages/cli/assets/templates/blocks/components/ChatComposerInput/ChatComposerInputDisabled.tsx`
- `packages/cli/assets/templates/blocks/components/ChatComposerInput/ChatComposerInputMentionTrigger.tsx`
- `packages/cli/assets/templates/blocks/components/ChatComposerInput/ChatComposerInputMultipleTriggers.tsx`
- `packages/cli/assets/templates/blocks/components/ChatComposerInput/ChatComposerInputSlashCommands.tsx`
- `packages/cli/assets/templates/blocks/components/ChatComposer/ChatComposerSimple.tsx`
- `packages/cli/assets/templates/blocks/components/ChatComposer/ChatComposerStreaming.tsx`
- `packages/cli/assets/templates/blocks/components/ChatComposer/ChatComposerValidation.tsx`
- `packages/cli/assets/templates/blocks/components/ChatLayout/ChatLayoutPanelChat.tsx`
- `packages/cli/assets/templates/blocks/components/ChatLayoutScrollButton/ChatLayoutScrollButtonLabels.tsx`
- `packages/cli/assets/templates/blocks/components/ChatLayoutScrollButton/ChatLayoutScrollButtonStates.tsx`
- `packages/cli/assets/templates/blocks/components/ChatMessage/ChatMessageAvatarName.tsx`
- `packages/cli/assets/templates/blocks/components/ChatMessageBubble/ChatMessageBubbleCustomContent.tsx`
- `packages/cli/assets/templates/blocks/components/ChatMessageBubble/ChatMessageBubbleDensity.tsx`
- `packages/cli/assets/templates/blocks/components/ChatMessageBubble/ChatMessageBubbleGrouping.tsx`
- `packages/cli/assets/templates/blocks/components/ChatMessageBubble/ChatMessageBubbleMetadata.tsx`
- `packages/cli/assets/templates/blocks/components/ChatMessageBubble/ChatMessageBubbleVariants.tsx`
- `packages/cli/assets/templates/blocks/components/ChatMessage/ChatMessageGhost.tsx`
- `packages/cli/assets/templates/blocks/components/ChatMessageList/ChatMessageListDensity.tsx`
- `packages/cli/assets/templates/blocks/components/ChatMessageList/ChatMessageListFullFeatured.tsx`
- `packages/cli/assets/templates/blocks/components/ChatMessageMetadata/ChatMessageMetadataFooter.tsx`
- `packages/cli/assets/templates/blocks/components/ChatMessageMetadata/ChatMessageMetadataStatus.tsx`
- `packages/cli/assets/templates/blocks/components/ChatMessageMetadata/ChatMessageMetadataTimestamp.tsx`
- `packages/cli/assets/templates/blocks/components/ChatMessage/ChatMessageMultiBubble.tsx`
- `packages/cli/assets/templates/blocks/components/ChatSendButton/ChatSendButtonCustomIcon.tsx`
- `packages/cli/assets/templates/blocks/components/ChatSendButton/ChatSendButtonInComposer.tsx`
- `packages/cli/assets/templates/blocks/components/ChatSendButton/ChatSendButtonStates.tsx`
- `packages/cli/assets/templates/blocks/components/ChatSystemMessage/ChatSystemMessageStatusUpdates.tsx`
- `packages/cli/assets/templates/blocks/components/ChatSystemMessage/ChatSystemMessageVariants.tsx`
- `packages/cli/assets/templates/blocks/components/ChatSystemMessage/ChatSystemMessageWithIcon.tsx`

Files are retained verbatim apart from image URLs, which point at the localized copies in
`ui/_sources/astryx/`. They are a pinned source snapshot, not an installable package.
