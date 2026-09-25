# Chat Emoji Picker

Popover emoji grid wrapping a trigger button: a shortname filter input over an 8-column grid with arrow-key roving focus. Picking an emoji calls onSelect and closes the popover, restoring focus to the trigger. Ships with a small default emoji set; override via emojis.

## Classification

- Category: `ai` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/ChatEmojiPicker.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Popover emoji grid wrapping a trigger button: a shortname filter input over an 8-column grid with arrow-key roving focus.
- Provides: ChatEmojiPicker, ChatEmojiPicker, ChatEmojiPicker
- Requires: React 19 with `@astryxdesign/lab` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ChatAdditions
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

- `src/stories/ChatAdditions.stories.tsx` — Storybook — ChatAdditions

## Documentation

### Chat Emoji Picker

Popover emoji grid wrapping a trigger button: a shortname filter input over an 8-column grid with arrow-key roving focus. Picking an emoji calls onSelect and closes the popover, restoring focus to the trigger. Ships with a small default emoji set; override via emojis.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onSelect` * | `(emoji: string) => void` |  | Called with the picked emoji character. The popover closes itself after selection. |
| `emojis` | `readonly {emoji: string; name: string}[]` | `DEFAULT_CHAT_EMOJIS` | Emoji options rendered in the grid, 8 per row. name drives filtering and accessible labels. |
| `label` | `string` | `'Pick an emoji'` | Accessible label for the popover dialog. |
| `searchLabel` | `string` | `'Search emoji'` | Placeholder and hidden label for the filter input. |
| `children` * | `ReactNode` |  | Trigger element. Must contain a button; the popover wires up click handlers and ARIA automatically. |

### Chat Emoji Picker

### Chat Emoji Picker

## Files

- `src/ChatEmojiPicker.doc.mjs`
- `src/ChatEmojiPicker.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
