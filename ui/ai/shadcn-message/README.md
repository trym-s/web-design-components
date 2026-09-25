# Message

Displays a message in a conversation, with optional avatar, header, footer, and alignment.

## Classification

- Category: `ai` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/message.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Displays a message in a conversation, with optional avatar, header, footer, and alignment.
- Provides: message with 7 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: message-demo, message-avatar, message-group, message-header-footer, message-actions, message-attachment, message-markdown
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add message`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/message.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `message-demo` (radix-rhea) — `src/examples/message-demo.tsx`, `static/message-demo.html`

The `Message` component lays out a single message in a conversation. It handles the avatar, alignment, header, and footer around the message surface.

For AI apps, you can render reasoning steps, tool calls and assistant messages using the `Message` component.

## Installation

```bash
npx shadcn@latest add message
```

- Copy and paste the following code into your project.

Source: `components/ui/message.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
```

```tsx showLineNumbers
<Message>
  <MessageAvatar>
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble>
      <BubbleContent>How can I help you today?</BubbleContent>
    </Bubble>
  </MessageContent>
</Message>
```

**Note:** `Message` owns the row layout—avatar, alignment, header, and footer.
Render the visible message surface inside it with
[`Bubble`](/docs/components/bubble). For the scroll container around a
conversation, use [`MessageScroller`](/docs/components/message-scroller).

## Composition

Use the following composition to build a message:

```text
Message
├── MessageAvatar
└── MessageContent
    ├── MessageHeader
    ├── Bubble
    └── MessageFooter
```

Use `MessageGroup` to stack consecutive messages from the same sender:

```text
MessageGroup
├── Message
└── Message
```

## Features

- Start and end alignment for sender and receiver rows via the `align` prop
- Avatar slot that anchors to the bottom of the message and stays clear of the footer
- Header and footer slots for sender names, status, and message actions
- Footer follows the message side; actions stay aligned on `align="end"` rows
- Group wrapper for stacking consecutive messages from the same sender
- Customizable styling through the `className` prop on every part

## Avatar

Use `MessageAvatar` to render an avatar next to the message. Set `align="end"` on the message to align the avatar to the end of the message.

> Example `message-avatar` (radix-rhea) — `src/examples/message-avatar.tsx`, `static/message-avatar.html`

| align   | Description                                         |
| ------- | --------------------------------------------------- |
| `start` | Align the message to the start of the conversation. |
| `end`   | Align the message to the end of the conversation.   |

## Group

Use `MessageGroup` to stack consecutive messages from the same sender. Render an empty `MessageAvatar` on the earlier messages to keep them aligned with the avatar on the last one.

> Example `message-group` (radix-rhea) — `src/examples/message-group.tsx`, `static/message-group.html`

## Header and Footer

Use `MessageHeader` for a sender name and `MessageFooter` for metadata such as a delivery or read status.

> Example `message-header-footer` (radix-rhea) — `src/examples/message-header-footer.tsx`, `static/message-header-footer.html`

## Actions

Place message-level actions in `MessageFooter`, such as copy, retry, or feedback buttons.

> Example `message-actions` (radix-rhea) — `src/examples/message-actions.tsx`, `static/message-actions.html`

## Attachment

> Example `message-attachment` (radix-rhea) — `src/examples/message-attachment.tsx`, `static/message-attachment.html`

## Accessibility

`Message` is a presentational layout wrapper. Accessibility comes from the content you place inside it.

### Label icon-only actions

Action buttons in `MessageFooter` are usually icon-only, so give each one an `aria-label`.

```tsx showLineNumbers
<MessageFooter>
  <Button variant="ghost" size="icon" aria-label="Copy">
    <CopyIcon />
  </Button>
</MessageFooter>
```

### Status updates

For in-progress messages, use a [`Marker`](/docs/components/marker) with `role="status"` so assistive tech announces the update as it appears.

```tsx showLineNumbers
<Message>
  <Marker role="status">
    <MarkerIcon>
      <Spinner />
    </MarkerIcon>
    <MarkerContent>Checking the logs...</MarkerContent>
  </Marker>
</Message>
```

## API Reference

### Message

The message row wrapper.

| Prop        | Type               | Default   | Description                                       |
| ----------- | ------------------ | --------- | ------------------------------------------------- |
| `align`     | `"start" \| "end"` | `"start"` | The alignment of the message in the conversation. |
| `className` | `string`           | -         | Additional classes to apply to the row.           |

### MessageGroup

Groups consecutive messages from the same sender.

| Prop        | Type     | Default | Description                                    |
| ----------- | -------- | ------- | ---------------------------------------------- |
| `className` | `string` | -       | Additional classes to apply to the group root. |

### MessageAvatar

The avatar slot, aligned to the bottom of the message. When the message has a `MessageFooter`, the avatar shifts up to stay aligned with the message surface instead of the footer.

| Prop        | Type     | Default | Description                                     |
| ----------- | -------- | ------- | ----------------------------------------------- |
| `className` | `string` | -       | Additional classes to apply to the avatar slot. |

### MessageContent

Wraps the header, message surface, and footer.

| Prop        | Type     | Default | Description                                      |
| ----------- | -------- | ------- | ------------------------------------------------ |
| `className` | `string` | -       | Additional classes to apply to the content slot. |

### MessageHeader

Displays content above the message, such as a sender name. Stays aligned to the start regardless of `align`.

| Prop        | Type     | Default | Description                                |
| ----------- | -------- | ------- | ------------------------------------------ |
| `className` | `string` | -       | Additional classes to apply to the header. |

### MessageFooter

Displays content below the message, such as status or actions. Aligns to the message side.

| Prop        | Type     | Default | Description                                |
| ----------- | -------- | ------- | ------------------------------------------ |
| `className` | `string` | -       | Additional classes to apply to the footer. |

## Files

- `src/ui/message.tsx` — the ui file as the registry installs it
- `src/examples/message-demo.tsx`
- `src/examples/message-avatar.tsx`
- `src/examples/message-group.tsx`
- `src/examples/message-header-footer.tsx`
- `src/examples/message-actions.tsx`
- `src/examples/message-attachment.tsx`
- `src/examples/message-markdown.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/message
