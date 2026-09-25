# Chat Reaction Bar

Row of emoji reaction pills under a chat message. Each pill shows an emoji and count; the current user's own reactions get an accent tint and aria-pressed. Provide onAdd to render a trailing add-reaction button that opens a ChatEmojiPicker popover.

## Classification

- Category: `ai` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/ChatReactionBar.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Row of emoji reaction pills under a chat message.
- Provides: ChatReactionBar, ChatReactionBar, ChatReactionBar
- Requires: React 19 with `@astryxdesign/lab` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (ai/astryx-lab-chat-emoji-picker)
- Upstream: Astryx lab (experimental, canary-only upstream) · Chat

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

- None of its own upstream; the demo is its family's: `ui/ai/astryx-lab-chat-emoji-picker`.

## Documentation

### Chat Reaction Bar

Row of emoji reaction pills under a chat message. Each pill shows an emoji and count; the current user's own reactions get an accent tint and aria-pressed. Provide onAdd to render a trailing add-reaction button that opens a ChatEmojiPicker popover.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `reactions` * | `{emoji: string; count: number; isSelected?: boolean; label?: string}[]` |  | Reactions to render, in display order. isSelected marks the current user's own reactions (accent tint + aria-pressed). label is a human-readable description like "Ana and Dana reacted with 🎉", used as the pill tooltip and accessible label. |
| `onToggle` | `(emoji: string) => void` |  | Called with the pill's emoji when the user toggles a reaction on or off. |
| `onAdd` | `(emoji: string) => void` |  | Called with the picked emoji when the user adds a reaction from the emoji picker. The trailing add-reaction button renders only when provided. |
| `emojis` | `readonly ChatEmojiOption[]` |  | Emoji options for the add-reaction picker. Defaults to DEFAULT_CHAT_EMOJIS. |
| `addLabel` | `string` | `'Add reaction'` | Accessible label for the add-reaction button and picker dialog. |
| `label` | `string` | `'Reactions'` | Accessible label for the reaction group. |

### Chat Reaction Bar

### Chat Reaction Bar

## Files

- `src/ChatReactionBar.doc.mjs`
- `src/ChatReactionBar.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
