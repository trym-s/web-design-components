# Chat Unread Divider

Error-colored rule with a trailing label marking where unread messages begin in a chat thread. Rendered as an aria separator with an accessible label. Distinct from ChatSystemMessage's divider variant, which is for neutral date breaks.

## Classification

- Category: `ai` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/ChatUnreadDivider.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Error-colored rule with a trailing label marking where unread messages begin in a chat thread.
- Provides: ChatUnreadDivider, ChatUnreadDivider, ChatUnreadDivider
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

### Chat Unread Divider

Error-colored rule with a trailing label marking where unread messages begin in a chat thread. Rendered as an aria separator with an accessible label. Distinct from ChatSystemMessage's divider variant, which is for neutral date breaks.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `'New'` | Divider label shown at the end of the rule and used in the accessible name ("New messages below"). |

### Chat Unread Divider

### Chat Unread Divider

## Files

- `src/ChatUnreadDivider.doc.mjs`
- `src/ChatUnreadDivider.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
