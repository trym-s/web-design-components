# Chat Reasoning

Compact collapsible container for displaying model reasoning or chain-of-thought details. Shows a single-line summary when collapsed and expands to reveal full reasoning text.

## Classification

- Category: `ai` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/ChatReasoning.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Compact collapsible container for displaying model reasoning or chain-of-thought details.
- Provides: ChatReasoning
- Requires: React 19 with `@astryxdesign/lab` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ChatReasoning
- Upstream: Astryx lab (experimental, canary-only upstream) · Chat
- Keywords: reasoning, thinking, thought, chain-of-thought, chat, llm, ai

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

- `src/stories/ChatReasoning.stories.tsx` — Storybook — ChatReasoning

## Documentation

### Chat Reasoning

Compact collapsible container for displaying model reasoning or chain-of-thought details. Shows a single-line summary when collapsed and expands to reveal full reasoning text.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | Reasoning content string or custom ReactNode. |
| `label` | `string` | `'Thinking'` | Header label displayed in the trigger line. |
| `duration` | `string` |  | Duration string shown next to the label (e.g. "12s"). |
| `isStreaming` | `boolean` | `false` | Whether reasoning content is actively streaming. Displays animated shimmer effect. |
| `isExpanded` | `boolean` |  | Controlled expanded state. |
| `defaultIsExpanded` | `boolean` | `false` | Default expanded state for uncontrolled usage. |
| `onExpandedChange` | `(isExpanded: boolean) => void` |  | Callback fired when the expanded state changes. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. |

## Files

- `src/ChatReasoning.doc.mjs`
- `src/ChatReasoning.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
