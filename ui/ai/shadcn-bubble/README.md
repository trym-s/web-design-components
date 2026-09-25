# Bubble

Displays conversational content in a message bubble. Supports variants, alignment, grouping, reactions, and collapsible content.

## Classification

- Category: `ai` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/bubble.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Displays conversational content in a message bubble.
- Provides: bubble with 10 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: bubble-demo, bubble-variants, bubble-alignment, bubble-group-demo, bubble-link-button, bubble-reactions, bubble-collapsible, bubble-tooltip, bubble-popover, bubble-markdown
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add bubble`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/bubble.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `bubble-demo` (radix-rhea) — `src/examples/bubble-demo.tsx`, `static/bubble-demo.html`

The `Bubble` component displays framed conversational content. Use it for chat text, short structured output, quoted replies, suggestions, and reactions.

For full-featured chat interfaces, use the [`Message`](/docs/components/message) component. `Bubble` is intentionally scoped to the bubble surface. Place avatars, names, timestamps, metadata, and message-level actions in [`Message`](/docs/components/message).

## Installation

```bash
npx shadcn@latest add bubble
```

- Copy and paste the following code into your project.

Source: `components/ui/bubble.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import { Bubble, BubbleContent, BubbleReactions } from "@/components/ui/bubble"
```

```tsx showLineNumbers
<Bubble>
  <BubbleContent>
    I checked the registry output and removed the stale route.
  </BubbleContent>
  <BubbleReactions>
    <span>👍</span>
  </BubbleReactions>
</Bubble>
```

## Composition

Use the following composition to build a bubble:

```text
Bubble
├── BubbleContent
└── BubbleReactions
```

Use `BubbleGroup` to group consecutive bubbles from the same sender:

```text
BubbleGroup
├── Bubble
│   └── BubbleContent
└── Bubble
    └── BubbleContent
```

## Features

- Seven visual variants, from a strong primary bubble to unframed ghost content
- Start and end alignment for sender and receiver bubbles
- Reactions that anchor to the bubble edge with configurable side and alignment
- Bubbles size to their content, up to 80% of the container width
- Polymorphic content via `asChild` for link and button bubbles
- Customizable styling through the `className` prop on every part

## Variants

Use `variant` to change the visual treatment of the bubble.

> Example `bubble-variants` (radix-rhea) — `src/examples/bubble-variants.tsx`, `static/bubble-variants.html`

| Variant       | Description                                            |
| ------------- | ------------------------------------------------------ |
| `default`     | A strong primary bubble, usually for the current user. |
| `secondary`   | The standard neutral bubble for conversation content.  |
| `muted`       | A lower-emphasis bubble for quiet supporting content.  |
| `tinted`      | A subtle primary-tinted bubble.                        |
| `outline`     | A bordered bubble for secondary or rich content.       |
| `ghost`       | Unframed content for assistant text or rich content.   |
| `destructive` | A destructive bubble for error or failed actions.      |

A bubble sizes to its content, up to 80% of the container width. The `ghost` variant removes the max-width so assistant text and rich content can span the full row.

## Alignment

Use `align` on `Bubble` to align the bubble to the start or end of the conversation.

> Example `bubble-alignment` (radix-rhea) — `src/examples/bubble-alignment.tsx`, `static/bubble-alignment.html`

| align   | Description                                        |
| ------- | -------------------------------------------------- |
| `start` | Align the bubble to the start of the conversation. |
| `end`   | Align the bubble to the end of the conversation.   |

**Note:** When building chat interfaces, you probably want to use alignment on the `Message` component itself, not the `Bubble` component. You can use the `role` prop on the `Message` component to automatically align the bubble to the start or end of the conversation.

## Bubble Group

Use `BubbleGroup` to group consecutive bubbles from the same sender. Note the `align` prop should be set on the `Bubble` component itself, not the `BubbleGroup` component.

```text
BubbleGroup
├── Bubble
│   └── BubbleContent
└── Bubble
    └── BubbleContent
```

> Example `bubble-group-demo` (radix-rhea) — `src/examples/bubble-group-demo.tsx`, `static/bubble-group-demo.html`

## Links and Buttons

You can turn a bubble into a link or button by using the `asChild` prop on `BubbleContent`.

> Example `bubble-link-button` (radix-rhea) — `src/examples/bubble-link-button.tsx`, `static/bubble-link-button.html`

```tsx showLineNumbers
import { Bubble, BubbleContent } from "@/components/ui/bubble"

export function BubbleLinkDemo() {
  return (
    <Bubble variant="muted">
      <BubbleContent asChild>
        <button>Click here</button>
      </BubbleContent>
    </Bubble>
  )
}
```

## Reactions

Use `BubbleReactions` for bubble reactions. You can use it to display reactions or quick action buttons. Use `side` and `align` to position the row — `side="top"` anchors it to the upper edge. Reactions overlap the bubble edge, so leave vertical space between rows — the examples below use a larger `gap` for this reason.

> Example `bubble-reactions` (radix-rhea) — `src/examples/bubble-reactions.tsx`, `static/bubble-reactions.html`

## Show More / Collapsible

Long bubble content can be composed with [`Collapsible`](/docs/components/collapsible) to allow for a show more or show less interaction. Use the `CollapsibleTrigger` component to trigger the collapsible content.

> Example `bubble-collapsible` (radix-rhea) — `src/examples/bubble-collapsible.tsx`, `static/bubble-collapsible.html`

## Tooltip

Wrap a bubble in a [`Tooltip`](/docs/components/tooltip) to reveal metadata on hover, such as when a message was read.

> Example `bubble-tooltip` (radix-rhea) — `src/examples/bubble-tooltip.tsx`, `static/bubble-tooltip.html`

## Popover

Pair a bubble with a [`Popover`](/docs/components/popover) to surface more information on demand, such as the full error message for a failed action.

> Example `bubble-popover` (radix-rhea) — `src/examples/bubble-popover.tsx`, `static/bubble-popover.html`

## Accessibility

`Bubble` renders the presentational message surface. Keep conversation-level semantics on the surrounding container and follow the guidelines below.

### Labeling Reactions

Reactions render as a row of emoji. A screen reader reads each glyph with no context, and counters like `+8` are announced as "plus eight". Group the row as a single image with a descriptive `aria-label` so it announces once. `role="img"` also hides the individual emoji from assistive tech, so no `aria-hidden` is needed.

```tsx showLineNumbers
<BubbleReactions role="img" aria-label="Reactions: thumbs up, fire, and 8 more">
  <span>👍</span>
  <span>🔥</span>
  <span>+8</span>
</BubbleReactions>
```

When reactions are interactive, render buttons instead and give icon-only buttons an `aria-label`.

```tsx showLineNumbers
<BubbleReactions>
  <Button aria-label="Thumbs up" variant="secondary" size="icon-xs">
    <ThumbsUpIcon />
  </Button>
</BubbleReactions>
```

### Interactive Bubbles

When a bubble is clickable, render it as a real `<button>` or `<a>` with the `asChild` prop so it is focusable and exposes the correct role. `BubbleContent` ships a visible focus ring for interactive elements, and the accessible name comes from the bubble text. No extra label is needed.

```tsx showLineNumbers
<Bubble variant="muted" align="end">
  <BubbleContent asChild>
    <button type="button" onClick={onReply}>
      I forgot my password
    </button>
  </BubbleContent>
</Bubble>
```

### Meaning Beyond Color

Bubble variants signal role and tone with color. Pair them with text, alignment, or icons so meaning is not conveyed by color alone. For a `destructive` bubble, keep the error context in the message text rather than relying on the color treatment.

## API Reference

### Bubble

The root bubble wrapper.

| Prop        | Type                                                                                       | Default     | Description                                      |
| ----------- | ------------------------------------------------------------------------------------------ | ----------- | ------------------------------------------------ |
| `variant`   | `"default" \| "secondary" \| "muted" \| "tinted" \| "outline" \| "ghost" \| "destructive"` | `"default"` | The bubble visual treatment.                     |
| `align`     | `"start" \| "end"`                                                                         | `"start"`   | The inline alignment of the bubble.              |
| `className` | `string`                                                                                   | -           | Additional classes to apply to the root element. |

### BubbleContent

The bubble content wrapper.

| Prop        | Type      | Default | Description                                         |
| ----------- | --------- | ------- | --------------------------------------------------- |
| `asChild`   | `boolean` | `false` | Render the content as the child element.            |
| `className` | `string`  | -       | Additional classes to apply to the content element. |

### BubbleReactions

Displays overlapped reactions for a bubble.

| Prop        | Type                | Default    | Description                                      |
| ----------- | ------------------- | ---------- | ------------------------------------------------ |
| `side`      | `"top" \| "bottom"` | `"bottom"` | The side of the bubble to anchor the reactions.  |
| `align`     | `"start" \| "end"`  | `"end"`    | The inline alignment of the reactions.           |
| `className` | `string`            | -          | Additional classes to apply to the reaction row. |

### BubbleGroup

Groups consecutive bubbles from the same sender.

| Prop        | Type     | Default | Description                                    |
| ----------- | -------- | ------- | ---------------------------------------------- |
| `className` | `string` | -       | Additional classes to apply to the group root. |

## Files

- `src/ui/bubble.tsx` — the ui file as the registry installs it
- `src/examples/bubble-demo.tsx`
- `src/examples/bubble-variants.tsx`
- `src/examples/bubble-alignment.tsx`
- `src/examples/bubble-group-demo.tsx`
- `src/examples/bubble-link-button.tsx`
- `src/examples/bubble-reactions.tsx`
- `src/examples/bubble-collapsible.tsx`
- `src/examples/bubble-tooltip.tsx`
- `src/examples/bubble-popover.tsx`
- `src/examples/bubble-markdown.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/bubble
