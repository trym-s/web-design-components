# Chat

Chat is a family of composable primitives for building AI and human chat experiences. Combine ChatLayout, ChatMessageList, ChatMessage, bubbles, system messages, tool calls, tokenized text, and ChatComposer to assemble complete conversations without reimplementing sender-aware layout, density, scrolling, or composer behavior.

## Classification

- Category: `ai` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/ChatComposer.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Chat is a family of composable primitives for building AI and human chat experiences.
- Avoid when: Don't use ChatSystemMessage for sender content; it has no avatar, alignment, or bubble. Use ChatMessage with a sender role instead. Don't put long or multi-line content in a system message; keep it to a single short sentence. If you need more, use a bubble or a card. Don't nest ChatMessage inside another ChatMessage; each message is a standalone article element with its own sender context. Don't apply a fixed height directly on the message list; wrap it in a sized container and let the list fill with flex: 1. Don't mix filled and ghost bubble variants within the same sender's messages; pick one style per side and use it consistently. Don't place metadata or names on both the bubble and the message wrapper; pick one based on whether the content has a bubble boundary.
- Provides: Message area, Frosted glass dock, Scroll-to-bottom button, Composer, Empty state, Avatar, Name, Content, Metadata
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ChatComposerDrawerShowcase, ChatComposerInputShowcase, ChatComposerShowcase, ChatLayoutShowcase, ChatMessageBubbleShowcase, ChatMessageListShowcase, ChatMessageMetadataShowcase, ChatMessageShowcase, ChatSendButtonShowcase, ChatSystemMessageShowcase, ChatComposerAttachments, ChatComposerDrawerAttachments, ChatComposerDrawerCollapsible, ChatComposerDrawerFeedback, ChatComposerDrawerWithProgress, ChatComposerFlat, ChatComposerFooterActions, ChatComposerFullFeatured, ChatComposerInputControlledInput, ChatComposerInputDisabled, ChatComposerInputMentionTrigger, ChatComposerInputMultipleTriggers, ChatComposerInputSlashCommands, ChatComposerSimple, ChatComposerStreaming, ChatComposerValidation, ChatLayoutPanelChat, ChatLayoutScrollButtonLabels, ChatLayoutScrollButtonStates, ChatMessageAvatarName, ChatMessageBubbleCustomContent, ChatMessageBubbleDensity, ChatMessageBubbleGrouping, ChatMessageBubbleMetadata, ChatMessageBubbleVariants, ChatMessageGhost, ChatMessageListDensity, ChatMessageListFullFeatured, ChatMessageMetadataFooter, ChatMessageMetadataStatus, ChatMessageMetadataTimestamp, ChatMessageMultiBubble, ChatSendButtonCustomIcon, ChatSendButtonInComposer, ChatSendButtonStates, ChatSystemMessageStatusUpdates, ChatSystemMessageVariants, ChatSystemMessageWithIcon
- Upstream: Astryx core · Chat
- Keywords: chat, message, bubble, conversation, ai, assistant, thread, system-message, composer, mention, trigger, typeahead, token, imperative, tokenized-text

## How an agent uses this reference

- **React 19 target** — install `@astryxdesign/core` + a theme and copy the example from
  `src/examples/` as-is, or read `src/` to own the component (upstream calls this "swizzle").
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the
  rendered DOM of each example with every class resolved by the local stylesheets in
  `ui/_sources/astryx/` (`frame.css` pulls fonts, reset, component CSS and all seven themes).
  Keep the markup, the `data-astryx-theme` wrapper and the `--*` tokens; re-implement behavior
  from the Props / Accessibility sections below, never from the minified class names.
- Design rules shared by every component: `ui/_sources/astryx/docs/` (principles, tokens, color,
  spacing, typography, motion, layout).

## Examples

- `src/examples/ChatComposerDrawerShowcase.tsx` — Chat Composer Drawer: Composer drawer with file tokens, a collapsible toggle, and header actions. Use as a starting point for any chat composer with attachments. · static: `static/ChatComposerDrawerShowcase.html`
- `src/examples/ChatComposerInputShowcase.tsx` — Chat Composer Input · static: `static/ChatComposerInputShowcase.html`
- `src/examples/ChatComposerShowcase.tsx` — Chat Composer · static: `static/ChatComposerShowcase.html`
- `src/examples/ChatLayoutShowcase.tsx` — Chat Layout · static: `static/ChatLayoutShowcase.html`
- `src/examples/ChatMessageBubbleShowcase.tsx` — Chat Message Bubble: Grouped user bubbles with filled styling and a ghost-variant agent response, with timestamps and delivery status. · static: `static/ChatMessageBubbleShowcase.html`
- `src/examples/ChatMessageListShowcase.tsx` — Chat Message List: Basic AI chat conversation with user and assistant messages. The simplest way to render a message list with alternating sender bubbles, metadata, and a date divider. · static: `static/ChatMessageListShowcase.html`
- `src/examples/ChatMessageMetadataShowcase.tsx` — Chat Message Metadata: Three-message conversation showcasing error status with retry, delivery status, and full footer actions with model label. · static: `static/ChatMessageMetadataShowcase.html`
- `src/examples/ChatMessageShowcase.tsx` — Chat Message: A user multi-bubble group with delivery status and an assistant ghost response with avatar, name, timestamp, and model info. · static: `static/ChatMessageShowcase.html`
- `src/examples/ChatSendButtonShowcase.tsx` — Chat Send Button: Ready, custom icon, and streaming states of the send button. · static: `static/ChatSendButtonShowcase.html`
- `src/examples/ChatSystemMessageShowcase.tsx` — Chat System Message: System messages for date dividers, status updates, and informational notices. Shows both default and divider variants in a realistic conversation flow. · static: `static/ChatSystemMessageShowcase.html`
- `src/examples/ChatComposerAttachments.tsx` — ChatComposer — Attachments: Chat composer with removable file tokens in a collapsible drawer. Use when users can attach files or context to their message. · static: `static/ChatComposerAttachments.html`
- `src/examples/ChatComposerDrawerAttachments.tsx` — ChatComposerDrawer — Attachments: Drawer with two rows: a scrollable carousel of image thumbnails and a row of removable file tokens. Omit count to keep the drawer always expanded. · static: `static/ChatComposerDrawerAttachments.html`
- `src/examples/ChatComposerDrawerCollapsible.tsx` — ChatComposerDrawer — Collapsible: Drawer with many items and a collapse toggle. Pass count to enable the toggle; collapsed state shows a badge with the total count and a label. · static: `static/ChatComposerDrawerCollapsible.html`
- `src/examples/ChatComposerDrawerFeedback.tsx` — ChatComposerDrawer — Feedback: Chat composer drawer with a feedback prompt and selectable lettered options. Use for user confirmation workflows that require explicit action before proceeding. · static: `static/ChatComposerDrawerFeedback.html`
- `src/examples/ChatComposerDrawerWithProgress.tsx` — ChatComposerDrawer — With Progress: Drawer paired with a context progress bar in the header. Show context window usage when attachments consume part of the available token budget. · static: `static/ChatComposerDrawerWithProgress.html`
- `src/examples/ChatComposerFlat.tsx` — ChatComposer — Flat: The composer is raised by default (`elevation="low"`). Set `elevation="none"` to flatten it; it then draws a border with the same rest / hover / focus treatment as a text input. · static: `static/ChatComposerFlat.html`
- `src/examples/ChatComposerFooterActions.tsx` — ChatComposer — Footer Actions: Chat composer with dropdown menus for a model selector and settings in the footer, and a mic button in the send actions slot. · static: `static/ChatComposerFooterActions.html`
- `src/examples/ChatComposerFullFeatured.tsx` — ChatComposer — Full Featured: Chat composer with all slots populated: collapsible attachment drawer, header actions, context progress bar, footer dropdown menus, and mic button. Shows the maximum composer configuration. · static: `static/ChatComposerFullFeatured.html`
- `src/examples/ChatComposerInputControlledInput.tsx` — ChatComposerInput — Controlled: Controlled chat input with live value display. Use controlled mode when you need to read or transform the input value outside the composer. · static: `static/ChatComposerInputControlledInput.html`
- `src/examples/ChatComposerInputDisabled.tsx` — ChatComposerInput — Disabled: Composer in a disabled state. Use when the input should be visible but not interactive, such as during streaming or when a prerequisite is unmet. · static: `static/ChatComposerInputDisabled.html`
- `src/examples/ChatComposerInputMentionTrigger.tsx` — ChatComposerInput — Mentions: Chat input with an @ trigger that opens a typeahead menu for mentioning users. Selected names appear as inline tokens. · static: `static/ChatComposerInputMentionTrigger.html`
- `src/examples/ChatComposerInputMultipleTriggers.tsx` — ChatComposerInput — Multiple Triggers: Chat input with both @ mentions and / commands. Each trigger type renders tokens in a distinct color so users can tell them apart at a glance. · static: `static/ChatComposerInputMultipleTriggers.html`
- `src/examples/ChatComposerInputSlashCommands.tsx` — ChatComposerInput — Slash Commands: Chat input with a / trigger for command selection. Use for AI assistants or bots that support structured commands. · static: `static/ChatComposerInputSlashCommands.html`
- `src/examples/ChatComposerSimple.tsx` — ChatComposer — Simple: Minimal chat composer with a placeholder and submit handler. The simplest way to drop a message input into a page. · static: `static/ChatComposerSimple.html`
- `src/examples/ChatComposerStreaming.tsx` — ChatComposer — Streaming: Chat composer with streaming state and a stop button. Use when the assistant is generating a response and the user can cancel. · static: `static/ChatComposerStreaming.html`
- `src/examples/ChatComposerValidation.tsx` — ChatComposer — Validation: Chat composer with error and warning status messages. Status can appear above or below the composer to surface validation or system feedback. · static: `static/ChatComposerValidation.html`
- `src/examples/ChatLayoutPanelChat.tsx` — ChatLayout — Panel View: Narrow sidebar chat in a constrained container that triggers compact density. Use for side panels, drawers, or embedded chat widgets where horizontal space is limited. · static: `static/ChatLayoutPanelChat.html`
- `src/examples/ChatLayoutScrollButtonLabels.tsx` — ChatLayoutScrollButton — Labels: Scroll button with different labels for context-specific notifications like new messages, unread replies, or a generic scroll prompt. · static: `static/ChatLayoutScrollButtonLabels.html`
- `src/examples/ChatLayoutScrollButtonStates.tsx` — Chat Layout Scroll Button: Scroll button in hidden, visible, and expanded (with label) states. The button fades in when the user scrolls up and expands when new messages arrive. · static: `static/ChatLayoutScrollButtonStates.html`
- `src/examples/ChatMessageAvatarName.tsx` — ChatMessage — Avatar & Name: Messages with avatars and sender names. Place the name on the bubble when using bubbles, or on the message wrapper for raw content. · static: `static/ChatMessageAvatarName.html`
- `src/examples/ChatMessageBubbleCustomContent.tsx` — ChatMessageBubble — Custom Content: Custom in-message content aligned to the bubble text column. An artifact card is wrapped in a ghost bubble with width="100%", so its left edge matches the bubble text and it spans the full message column instead of the default bubble width cap; the timestamp rides the bubble metadata slot. · static: `static/ChatMessageBubbleCustomContent.html`
- `src/examples/ChatMessageBubbleDensity.tsx` — ChatMessageBubble — Density: Compact, balanced, and spacious density modes side by side. Density controls bubble padding, corner radius, and spacing between grouped bubbles. · static: `static/ChatMessageBubbleDensity.html`
- `src/examples/ChatMessageBubbleGrouping.tsx` — ChatMessageBubble — Grouping: Multi-bubble messages using first, middle, and last group positions. Grouped bubbles tighten corner radius on the sender side for a continuous visual flow. · static: `static/ChatMessageBubbleGrouping.html`
- `src/examples/ChatMessageBubbleMetadata.tsx` — ChatMessageBubble — Metadata: Bubbles with name and metadata slots aligned to bubble padding. Put name on the first bubble and metadata on the last bubble in a message. · static: `static/ChatMessageBubbleMetadata.html`
- `src/examples/ChatMessageBubbleVariants.tsx` — ChatMessageBubble — Variants: Filled and ghost bubble variants for both user and assistant senders. Use filled for standard messages and ghost when content needs alignment without a visual boundary. · static: `static/ChatMessageBubbleVariants.html`
- `src/examples/ChatMessageGhost.tsx` — ChatMessage — Ghost: Ghost variant for messages without visible bubble boundaries. Keeps padding for alignment but renders a transparent background, useful for AI-style responses. · static: `static/ChatMessageGhost.html`
- `src/examples/ChatMessageListDensity.tsx` — ChatMessageList — Density: Side-by-side comparison of compact, balanced, and spacious densities. Use compact in sidebars or panels, balanced for most full-page chat, and spacious for long-form reading. Use gap when row spacing needs to differ from density. · static: `static/ChatMessageListDensity.html`
- `src/examples/ChatMessageListFullFeatured.tsx` — ChatMessageList — Full Featured: Conversation showcasing system messages, multi-bubble grouping, markdown, code blocks, and metadata. Combines date dividers, ghost bubbles, grouped messages, and rich content in a single example. · static: `static/ChatMessageListFullFeatured.html`
- `src/examples/ChatMessageMetadataFooter.tsx` — ChatMessageMetadata — Footer Actions: Assistant message with footer actions: copy, retry, thumbs up/down, and model label. Use for AI responses that need feedback or utility controls. · static: `static/ChatMessageMetadataFooter.html`
- `src/examples/ChatMessageMetadataStatus.tsx` — ChatMessageMetadata — Status: All 5 delivery statuses (sending, sent, delivered, read, and error), each with a timestamp. Use to show message delivery progress or surface failures. · static: `static/ChatMessageMetadataStatus.html`
- `src/examples/ChatMessageMetadataTimestamp.tsx` — ChatMessageMetadata — Timestamps: Timestamp-only metadata on user and assistant messages. Supports absolute time and relative formats via Timestamp. · static: `static/ChatMessageMetadataTimestamp.html`
- `src/examples/ChatMessageMultiBubble.tsx` — ChatMessage — Multi-Bubble: Grouped bubbles using the group prop for corner radius reduction. Use first, middle, and last to visually connect related bubbles from the same sender. · static: `static/ChatMessageMultiBubble.html`
- `src/examples/ChatSendButtonCustomIcon.tsx` — ChatSendButton — Custom Icon: Send buttons with custom icons via sendIcon and stopIcon props. Use to match the personality of the chat experience: a paper airplane for messaging, sparkles for AI generation, or a check mark for confirmation flows. · static: `static/ChatSendButtonCustomIcon.html`
- `src/examples/ChatSendButtonInComposer.tsx` — ChatSendButton — In Composer: Send button inside ChatComposer, where it reads state from context automatically. No wiring needed; the button enables when the input has content. · static: `static/ChatSendButtonInComposer.html`
- `src/examples/ChatSendButtonStates.tsx` — ChatSendButton — States: Disabled, ready, and streaming states at both sizes. The button automatically toggles between send (primary) and stop (secondary) based on streaming state. · static: `static/ChatSendButtonStates.html`
- `src/examples/ChatSystemMessageStatusUpdates.tsx` — ChatSystemMessage — Status Updates: Realistic status messages in a conversation flow showing membership changes, timestamps, and resolution notices. · static: `static/ChatSystemMessageStatusUpdates.html`
- `src/examples/ChatSystemMessageVariants.tsx` — ChatSystemMessage — Variants: Default and divider variants side by side. Use default for inline status updates and divider for date separators or section breaks. · static: `static/ChatSystemMessageVariants.html`
- `src/examples/ChatSystemMessageWithIcon.tsx` — ChatSystemMessage — Icon: System messages with a leading icon that reinforces the message type. Use icons to help users scan and identify message categories at a glance. · static: `static/ChatSystemMessageWithIcon.html`

## Documentation

### Chat

Chat is a family of composable primitives for building AI and human chat experiences. Combine ChatLayout, ChatMessageList, ChatMessage, bubbles, system messages, tool calls, tokenized text, and ChatComposer to assemble complete conversations without reimplementing sender-aware layout, density, scrolling, or composer behavior.

**Do**

- Compose messages using MessageList > Message > Bubble for consistent sender-aware styling and density.
- Set the density prop to control spacing globally: compact for sidebars, balanced for most views, spacious for long-form reading. Individual messages can override.
- Use gap when top-level rows are independent (for example, LLM tool events or streamed blocks) and list spacing needs to be tuned separately from density.
- Use the group prop on bubbles (first, middle, last) when a single sender sends multiple consecutive messages; it tightens corner radius to visually connect them.
- Use ChatSystemMessage with variant="divider" for date separators and default for inline status notices like joins, leaves, or topic changes.
- Put name on the first bubble and metadata on the last bubble in a message so they align with the bubble's inline padding.
- Wrap custom in-message content (cards, attachments, citations) in a ghost bubble so it aligns with the bubble text column; add width="100%" when it should span the full message column instead of the default bubble width cap.
- Provide an emptyState prop so new users see a clear prompt to start a conversation instead of a blank screen.
- Use the ghost bubble variant for AI-style responses that show rich content like code blocks or markdown without a visible boundary.

**Don't**

- Don't use ChatSystemMessage for sender content; it has no avatar, alignment, or bubble. Use ChatMessage with a sender role instead.
- Don't put long or multi-line content in a system message; keep it to a single short sentence. If you need more, use a bubble or a card.
- Don't nest ChatMessage inside another ChatMessage; each message is a standalone article element with its own sender context.
- Don't apply a fixed height directly on the message list; wrap it in a sized container and let the list fill with flex: 1.
- Don't mix filled and ghost bubble variants within the same sender's messages; pick one style per side and use it consistently.
- Don't place metadata or names on both the bubble and the message wrapper; pick one based on whether the content has a bubble boundary.

**Anatomy**

- Message area (required) — Scrollable region for messages. Renders children (typically ChatMessageList) in a flex column that pushes content to the bottom when the list is short.
- Frosted glass dock (required) — Sticky or fixed container at the bottom with a backdrop-blur layer. Houses the scroll button and composer.
- Scroll-to-bottom button — Appears when the user scrolls up or new messages arrive. Defaults to ChatLayoutScrollButton; pass null to hide or a custom element to override.
- Composer (required) — The input area for sending messages, typically ChatComposer. Docked at the bottom inside the frosted glass layer.
- Empty state — Centered placeholder shown when no messages exist. Use EmptyState for a consistent look.
- Avatar — A sender avatar rendered beside the message. Typically Avatar with size="md". Hidden for system messages.
- Name — Sender name above the message body. Place on the bubble when using bubbles, or on the message wrapper for raw content.
- Content (required) — The message body: one or more ChatMessageBubble elements, or any free-form ReactNode like images or tool calls. Wrap non-bubble content in a ghost bubble to align it with the bubble text column.
- Metadata — Timestamp, delivery status, and footer actions below the message. Place on the last bubble or on the message wrapper.

Styling hook class: `.astryx-chat-layout`, `.astryx-chat-composer`, `.astryx-chat-composer-input`, `.astryx-chat-composer-drawer`, `.astryx-chat-message`, `.astryx-chat-message-bubble`, `.astryx-chat-message-list`, `.astryx-chat-system-message`, `.astryx-chat-message-metadata`, `.astryx-chat-send-button`, `.astryx-chat-dictation-button`, `.astryx-chat-layout-scroll-button`, `.astryx-chat-tokenized-text`, `.astryx-chat-tool-calls`, `.astryx-trigger-menu`

### Chat Composer

ChatComposer is the message-entry shell for a chat surface. It coordinates a controlled or uncontrolled draft, provides a default token-capable input and send/stop action, and arranges optional drawer, header, footer, and status content. Custom inputs and send controls can join the same value, submission, disabled, stop, and focus contract through useChatComposerContext().

**Anatomy**

- Composer frame (required) — Outer composition root that groups the body with an optional status message above or below it.
- Composer body (required) — Rounded, elevated surface containing the header, input, and footer.
- Drawer — Content before the body for attachments or other expandable context, typically ChatComposerDrawer.
- Header — Row for start-aligned actions and end-aligned contextual information.
- Input (required) — Default ChatComposerInput or a custom editor connected through useChatComposerContext().
- Footer (required) — Row for caller-supplied footer and send actions plus the primary action.
- Send or stop action (required) — Default ChatSendButton or a custom sendButton; it submits the current draft or requests interruption.
- Status message — Error or warning feedback rendered before or after the composer body.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onSubmit` * | `(value: string) => void` |  | Called when the user submits a message. |
| `onStop` | `() => void` |  | Called when the user requests to stop generation. |
| `isStopShown` | `boolean` | `false` | Whether the stop button is shown instead of the send button. |
| `value` | `string` |  | Controlled input value. |
| `onChange` | `(value: string) => void` |  | Change handler for controlled mode. |
| `placeholder` | `string` | `'Type a message...'` | Placeholder text shown when the input is empty. |
| `isDisabled` | `boolean` | `false` | Disables the composer. |
| `density` | `'compact' \| 'balanced' \| 'spacious'` | `'balanced'` | Visual density. |
| `elevation` | `'none' \| 'low'` | `'low'` | Resting elevation of the composer body. `low` (the default) keeps today's raised look: low at rest, bumping to med on hover / focus. `none` flattens it and draws a border. Keyboard focus in the editor adds the shared focus ring in either presentation; pointer focus does not add that ring. |
| `drawer` | `ReactNode` |  | Slot: collapsible drawer above the input: attachments, context chips, etc. Use ChatComposerDrawer. |
| `headerActions` | `ReactNode` |  | Slot: left-aligned header actions (attach, mention buttons). Use icon-only size="sm" buttons. |
| `headerContext` | `ReactNode` |  | Slot: right-aligned contextual info in the header (context window usage, ProgressBar, supporting text). |
| `input` | `ReactNode` |  | Slot: custom input element. Replaces the default input. Use ChatComposerInput for trigger menus/tokens, or wire any input (plain textarea, rich editor) to the composition contract via useChatComposerContext(): read value/onChange/onSubmit/canSend and register a focus control on inputControlRef so body-click-to-focus works. |
| `footerActions` | `ReactNode` |  | Slot: left-aligned footer actions (model selector, etc). |
| `sendActions` | `ReactNode` |  | Slot: actions to the left of the send button. |
| `sendButton` | `ReactNode` |  | Slot: custom send button. Replaces the default send/stop button. |
| `status` | `{ type: 'error' \| 'warning'; message?: string }` |  | Status message rendered below (or above) the composer. |
| `statusPosition` | `'top' \| 'bottom'` | `'bottom'` | Where to render the status. |

### Chat Composer

### Chat Composer

### Chat Composer Drawer

Use ChatComposerDrawer in the ChatComposer drawer slot for supplementary content such as attachments, context chips, or previews. Provide count only when people should be able to collapse that content.

**Do**

- Give label a concrete plural noun such as "Attachments" so the expand and collapse actions have a useful accessible name.
- Use controlled isCollapsed with onCollapsedChange when another part of the page owns drawer state; otherwise use defaultIsCollapsed.

**Don't**

- Put primary composer actions in the drawer; use ChatComposer footer or send-action slots so those controls remain available when the drawer is collapsed.

**Anatomy**

- Root surface (required) — The drawer surface that composes above the ChatComposer body.
- Disclosure toggle — The keyboard- and pointer-operable collapse control rendered when count is provided.
- Collapsed summary — The default count Badge and label, or caller-provided visual content, presented while the drawer is collapsed.
- Content area (required) — The caller-provided supplementary content; collapsed descendants are unavailable to keyboard and assistive technology.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | Content to render inside the drawer: tokens, chips, previews, or any React elements. |
| `count` | `number` |  | Total item count shown in the collapsed badge. When provided, the drawer gains a collapse/expand toggle. |
| `label` | `string` | `'Items'` | Label shown next to the count in the default collapsed summary and used to name the expand/collapse action. |
| `collapsedSummary` | `ReactNode` |  | Visual content for the complete Collapsed summary anatomy part. When count enables collapse, this replaces the default neutral Badge and label while the component retains disclosure behavior and accessible naming. |
| `isCollapsed` | `boolean` |  | Controlled collapsed state. Use with `onCollapsedChange` for external control. |
| `defaultIsCollapsed` | `boolean` | `false` | Initial collapsed state for uncontrolled usage. |
| `onCollapsedChange` | `(isCollapsed: boolean) => void` |  | Callback fired when the user toggles the drawer. |

Styling hook class: `.astryx-chat-composer-drawer`

### Chat Composer Drawer

### Chat Composer Drawer

### Chat Composer Input

Pass ChatComposerInput to ChatComposer's input slot when the draft needs trigger menus, inline tokens, history recall, dictation insertion, or file intake.

**Do**

- Use handleRef for programmatic text or token insertion; inserted text follows the same onChange pipeline as typing.
- Use onFiles for files pasted or dropped onto the editor, and keep file validation and upload progress in the product layer.

**Don't**

- Use custom token rendering for ordinary mentions or commands; prefer the structured badge form so tokens remain predictable and themeable.

**Anatomy**

- Input root (required) — The themed container that forwards the root ref and BaseProps styling seams.
- Editable surface (required) — The labeled contenteditable textbox or combobox that owns text, selection, keyboard, paste, and drop behavior.
- Placeholder — Visual guidance shown only while the serialized draft is empty.
- Trigger menu — The suggestion popup rendered while a configured trigger is active.
- Inline token — A non-editable badge or custom rendering with a stable serialized value.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `handleRef` | `React.Ref<ChatComposerInputHandle>` |  | Imperative handle for programmatic control: insertToken, expandToken, insertText, focus, and getValue. |
| `value` | `string` |  | Controlled input value. Pair with onChange for two-way binding. |
| `onChange` | `(value: string) => void` |  | Called when the input value changes. The serialized string includes token placeholders. |
| `placeholder` | `string` | `'Type a message...'` | Placeholder text shown when the input is empty. |
| `maxRows` | `number` | `8` | Maximum visible rows before the input scrolls. Use a lower value in compact layouts. |
| `triggers` | `ChatComposerTrigger[]` |  | Trigger definitions for typeahead menus. Each trigger specifies a character (@ or /), a search source, and an onSelect handler that returns the token to insert. |
| `debounceMs` | `number` | `150` | Debounce delay for async search sources to avoid excessive network requests. |
| `hasHistory` | `boolean` | `true` | Enable ArrowUp/Down to recall previously submitted messages. |
| `label` | `string` | `'Message input'` | Accessible label announced by screen readers. |
| `isDisabled` | `boolean` | `false` | Disables the input. Use during streaming or when a prerequisite is unmet. |
| `onPaste` | `(event, text) => boolean \| void` |  | Called when plain text is pasted. Return true after handling the text yourself; otherwise ChatComposerInput inserts it or applies paste-as-token behavior. |
| `pasteAsToken` | `UseChatPasteAsTokenReturn \| false` |  | Paste-as-token behavior. By default, plain-text pastes over 200 characters become expandable tokens. Pass false to keep every text paste inline, or provide useChatPasteAsToken() to customize the conversion. |
| `onFiles` | `(files: File[]) => void` |  | Called when files are pasted or dropped onto the input. Use to handle attachments. |
| `onSubmit` | `(value: string) => void` |  | Called when the user presses Enter without Shift. The serialized value includes token placeholders. |
| `onKeyDown` | `(event) => void` |  | Key-down handler invoked before the built-in Enter/history behavior (after any open trigger menu). The seam for platform-specific keys: call event.preventDefault() to suppress the default submit (e.g. newline on a touch keyboard), or act on the event yourself to add behavior (e.g. submit on Cmd/Ctrl+Enter). IME composition is always respected; Enter never submits mid-composition. |

### Chat Composer Input

### Chat Composer Input

### Chat Composer Token Element

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `token` * | `ChatComposerToken` |  | The token to render. Pass a badge config ({ value, label, variant?, icon? }) for the common case, or a custom render ({ value, render }) for full control. |

### Chat Composer Token Element

### Chat Composer Token Element

### Chat Layout

ChatLayout is the layout shell for full-page chat interfaces. It renders messages in normal page flow and docks the composer to the bottom with a frosted glass blur layer. Set the density prop to control spacing; it defaults to balanced. Use it to wrap ChatMessageList and ChatComposer for a complete chat experience with built-in auto-scroll and a scroll-to-bottom button.

**Do**

- Pass ChatMessageList as children and ChatComposer as the composer prop for a complete chat interface.
- Provide an emptyState so new conversations show a prompt instead of a blank screen.
- Use scrollRef when the chat is embedded in a page where a parent element handles scrolling.

**Don't**

- Don't apply a fixed height on the layout; let it fill its container with flex: 1.
- Don't render multiple ChatLayout instances in the same scroll container; each expects to own its scroll context.

**Anatomy**

- Message area (required) — Scrollable region for messages. Renders children (typically ChatMessageList) in a flex column that pushes content to the bottom when the list is short.
- Frosted glass dock (required) — Sticky or fixed container at the bottom with a backdrop-blur layer. Houses the scroll button and composer.
- Scroll-to-bottom button — Appears when the user scrolls up or new messages arrive. Defaults to ChatLayoutScrollButton; pass null to hide or a custom element to override.
- Composer (required) — The input area for sending messages, typically ChatComposer. Docked at the bottom inside the frosted glass layer.
- Empty state — Centered placeholder shown when no messages exist. Use EmptyState for a consistent look.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | Message content: typically ChatMessageList. Flows naturally in the page and scrolls with the container. |
| `composer` * | `ReactNode` |  | Composer element: typically ChatComposer. Fixed to the bottom with a frosted glass dock. |
| `emptyState` | `ReactNode` |  | Content shown when children is empty. Centered vertically in the message area. |
| `scrollButton` | `ReactNode \| null` |  | Scroll-to-bottom button rendered above the composer. Defaults to ChatLayoutScrollButton with auto-scroll integration. Pass null to hide. |
| `scrollRef` | `React.RefObject<HTMLElement \| null>` |  | External scroll container ref. When provided, auto-scroll and scroll-to-bottom target this element instead of the layout root. Use when the chat is embedded in a page where a parent element or the document body scrolls. |
| `density` | `'compact' \| 'balanced' \| 'spacious'` | `'balanced'` | Visual density: controls dock padding, message-area max-width and inline padding, and the height of the frosted glass blur layer. |

### Chat Layout

**Do**

- Pass ChatMessageList as children and ChatComposer as composer prop for complete chat.
- Provide emptyState so new conversations show a prompt, not blank screen.
- Use scrollRef when chat is embedded in a page where a parent element handles scrolling.

**Don't**

- Apply fixed height on layout; let it fill container with flex: 1.
- Render multiple ChatLayout instances in same scroll container; each expects to own its scroll context.

### Chat Layout

### Chat Layout Scroll Button

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `isVisible` * | `boolean` |  | Whether the button is visible. Bind to a scroll-position check so the button only appears when the user has scrolled up. |
| `label` | `string` |  | Optional label that expands the button (e.g. "New messages"). Use to signal unread content below the fold. |
| `onClick` * | `() => void` |  | Click handler: typically scrolls to bottom and dismisses the new message indicator. |

### Chat Layout Scroll Button

### Chat Layout Scroll Button

### Chat Message

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `sender` * | `'user' \| 'assistant' \| 'system'` |  | Who sent this message: controls alignment and layout. |
| `children` * | `ReactNode` |  | Free-form content: bubbles, asset lists, tool calls, images. Custom (non-bubble) children render flush with the message edge; wrap them in a ghost ChatMessageBubble to align them with the bubble text column. |
| `avatar` | `ReactNode` |  | Avatar element rendered beside the message. Typically Avatar. |
| `name` | `ReactNode` |  | Sender name rendered above the message body. Use when the first child is raw content (not a bubble). If the first child is a bubble, put the name on the bubble's `name` prop instead. |
| `metadata` | `ReactNode` |  | Metadata rendered below the message body. Use when the last child is raw content (not a bubble). If the last child is a bubble, put metadata on the bubble's `metadata` prop instead. |
| `density` | `'compact' \| 'balanced' \| 'spacious'` |  | Visual density. Inherited from list context if not set. |

### Chat Message

### Chat Message

### Chat Message Bubble

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | Bubble content: text, Markdown, or any ReactNode. |
| `variant` | `'filled' \| 'ghost'` | `'filled'` | Visual variant. 'filled' renders sender-colored background (default). 'ghost' renders transparent background but keeps padding for alignment. |
| `name` | `ReactNode` |  | Sender name rendered above the bubble, aligned with bubble text padding. Use on the first bubble in a message. If the first content is raw (no bubble), use ChatMessage's `name` prop instead. |
| `metadata` | `ReactNode` |  | Metadata content rendered below the bubble, aligned with bubble text padding. Use on the last bubble in a message. If the last content is raw (no bubble), use ChatMessage's `metadata` prop instead. |
| `group` | `'first' \| 'middle' \| 'last'` |  | Position within a multi-bubble group. Controls corner radius reduction on the sender side. Leave unset for standalone bubbles (full radius). |
| `width` | `SizeValue` |  | Width of the bubble (number = pixels, string = used as-is). When set, replaces the default max(80%, 280px) width cap. Combine with variant="ghost" to let custom content (an artifact card, attachments) span the full message column. |

### Chat Message Bubble

### Chat Message Bubble

### Chat Message List

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | Message elements: typically ChatMessage or ChatSystemMessage. |
| `emptyState` | `ReactNode` |  | Content shown when the list has no messages. |
| `scrollToTopAction` | `() => Promise<void>` |  | Async action fired when user scrolls to top. Use for loading older messages. Wrapped in useTransition: shows a spinner at the top while pending. |
| `density` | `'compact' \| 'balanced' \| 'spacious'` | `'balanced'` | Visual density: flows to child messages via context. |
| `gap` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Gap between top-level message rows. Defaults to the selected density; override for LLM event streams or independent rows that need different spacing from density. |
| `align` | `'top' \| 'bottom'` | `'bottom'` | Vertical alignment when the list is shorter than its container. 'bottom' fills free space with a spacer so short conversations sit above the composer; 'top' omits the spacer so messages start at the top. Only affects a non-full list; overflowing lists scroll identically, preserving auto-scroll-to-bottom. |
| `isStreaming` | `boolean` | `false` | Whether an assistant message is actively streaming. Marks the log aria-busy so screen readers wait and announce the completed message once instead of re-announcing partial text on every token. |

### Chat Message List

### Chat Message List

### Chat Message Metadata

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `timestamp` | `ReactNode` |  | Timestamp content: a string or Timestamp component. |
| `footer` | `ReactNode` |  | Footer content: model info, reaction buttons, copy button. |
| `status` | `'sending' \| 'sent' \| 'delivered' \| 'read' \| 'error'` |  | Message delivery status. Shows icon + label. |

### Chat Message Metadata

### Chat Message Metadata

### Chat Send Button

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `isStopShown` | `boolean` |  | Whether the stop button is shown. Defaults to context value. |
| `isDisabled` | `boolean` |  | Whether the send button is disabled. Defaults to !canSend from context. |
| `onSend` | `() => void` |  | Called when the user clicks send. Defaults to context onSubmit. |
| `onStop` | `() => void` |  | Called when the user clicks stop during streaming. Defaults to context onStop. |
| `sendIcon` | `ReactNode` |  | Custom icon for the send state. Defaults to arrowUp from icon registry. |
| `stopIcon` | `ReactNode` |  | Custom icon for the stop state. Defaults to stop from icon registry. |
| `size` | `'sm' \| 'md'` | `'md'` | Button size. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value: not an inline style object like style={{}}. |

### Chat Send Button

### Chat Send Button

### Chat System Message

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | System message content: a short, factual string like a date, a join/leave notice, or a status change. |
| `variant` | `'default' \| 'divider'` | `'default'` | Visual variant. 'default' renders centered text. 'divider' adds horizontal lines on each side via Divider: use for date separators and section breaks. |
| `icon` | `ReactNode` |  | Leading icon that reinforces the message type. Wrap in Icon for consistent sizing. Use for membership changes, encryption notices, or AI activity. |

### Chat System Message

### Chat System Message

## Files

- `src/Chat.doc.mjs`
- `src/ChatComposer.doc.mjs`
- `src/ChatComposer.spec.md`
- `src/ChatComposer.tsx`
- `src/ChatComposerDrawer.doc.mjs`
- `src/ChatComposerDrawer.spec.md`
- `src/ChatComposerDrawer.tsx`
- `src/ChatComposerInput.doc.mjs`
- `src/ChatComposerInput.spec.md`
- `src/ChatComposerInput.tsx`
- `src/ChatComposerTokenElement.doc.mjs`
- `src/ChatComposerTokenElement.spec.md`
- `src/ChatContext.tsx`
- `src/ChatLayout.doc.mjs`
- `src/ChatLayout.spec.md`
- `src/ChatLayout.tsx`
- `src/ChatLayoutScrollButton.doc.mjs`
- `src/ChatLayoutScrollButton.spec.md`
- `src/ChatLayoutScrollButton.tsx`
- `src/ChatMessage.doc.mjs`
- `src/ChatMessage.tsx`
- `src/ChatMessageBubble.doc.mjs`
- `src/ChatMessageBubble.tsx`
- `src/ChatMessageList.doc.mjs`
- `src/ChatMessageList.tsx`
- `src/ChatMessageMetadata.doc.mjs`
- `src/ChatMessageMetadata.tsx`
- `src/ChatPastedTextToken.tsx`
- `src/ChatSendButton.doc.mjs`
- `src/ChatSendButton.tsx`
- `src/ChatSystemMessage.doc.mjs`
- `src/ChatSystemMessage.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Chat
