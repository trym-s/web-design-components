# Chat Typing Indicator

Animated three-dot typing hint with a localized, grammar-aware label: "Ana is typing...", "Ana and Ben are typing...", or "Ana and 2 others are typing...". Dots bounce with staggered stylex.keyframes delays, disabled under prefers-reduced-motion; the label is announced politely via role="status".

## Classification

- Category: `ai` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/ChatTypingIndicator.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Animated three-dot typing hint with a localized, grammar-aware label: "Ana is typing...", "Ana and Ben are typing...", or "Ana and 2 others are typing...".
- Provides: ChatTypingIndicator, ChatTypingIndicator, ChatTypingIndicator
- Requires: React 19 with `@astryxdesign/lab` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (ai/astryx-lab-chat-emoji-picker)
- Upstream: Astryx lab (experimental, canary-only upstream) · Chat

## How an agent uses this reference

- **React 19 target** — install `@astryxdesign/core` + a theme and copy the example from
  `upstream/examples/` as-is, or read `upstream/` to own the component (upstream calls this "swizzle").
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

### Chat Typing Indicator

Animated three-dot typing hint with a localized, grammar-aware label: "Ana is typing...", "Ana and Ben are typing...", or "Ana and 2 others are typing...". Dots bounce with staggered stylex.keyframes delays, disabled under prefers-reduced-motion; the label is announced politely via role="status".

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `names` | `string[]` |  | Names of people currently typing. One name renders "is typing", two render both names, more collapse to "and N others". The sentence comes from the i18n catalog and the names are joined with Intl.ListFormat, so the wording and conjunction follow the active locale. When omitted or empty, only the animated dots render. |

### Chat Typing Indicator

### Chat Typing Indicator

## Files

- `upstream/ChatTypingIndicator.doc.mjs`
- `upstream/ChatTypingIndicator.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
