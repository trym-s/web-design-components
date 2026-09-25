# Chat Tool Calls

ChatToolCalls displays tool or function call invocations from an LLM response. Pass an array of calls and the component handles the rest: a single call renders inline, while multiple calls collapse into a summary with the latest call visible at the surface. Use it anywhere an AI agent shows what actions it took.

## Classification

- Category: `ai` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/ChatToolCalls.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: ChatToolCalls displays tool or function call invocations from an LLM response.
- Avoid when: Don't omit the status field. Without it the call defaults to complete, which is misleading for calls that are still running or have failed. Don't display tool calls outside a chat message context; they are designed to sit inside an assistant message, not as standalone UI. Don't use custom wrappers around individual calls; the component handles single vs. grouped layout automatically based on the array length.
- Provides: Status icon, Tool name, Node badge, Target label, Diff stats, Duration, Group header
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ChatTokenizedTextShowcase, ChatToolCallsShowcase, ChatTokenizedTextBasic, ChatTokenizedTextColors, ChatToolCallsInteractiveToolCalls, ChatToolCallsStatuses, ChatToolCallsToolCallsWithNodes
- Upstream: Astryx core · Chat
- Keywords: tool, function, call, invocation, llm, agent, bash, edit, read, search, status, running, error, complete, diff, stats

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

- `src/examples/ChatTokenizedTextShowcase.tsx` — Chat Tokenized Text · static: `static/ChatTokenizedTextShowcase.html`
- `src/examples/ChatToolCallsShowcase.tsx` — Chat Tool Calls · static: `static/ChatToolCallsShowcase.html`
- `src/examples/ChatTokenizedTextBasic.tsx` — ChatTokenizedText — Basic: A message with @mention tokens. Each matching pattern is replaced with its display name badge. · static: `static/ChatTokenizedTextBasic.html`
- `src/examples/ChatTokenizedTextColors.tsx` — ChatTokenizedText — Colors: Tokens with different color variants to distinguish mentions, bugs, and features. Use variant colors to create a visual taxonomy: blue for people, red for bugs, green for features. · static: `static/ChatTokenizedTextColors.html`
- `src/examples/ChatToolCallsInteractiveToolCalls.tsx` — ChatToolCalls — Expandable: Tool calls with expandable result details showing diffs and command output in code blocks. Click a row to reveal its result. · static: `static/ChatToolCallsInteractiveToolCalls.html`
- `src/examples/ChatToolCallsStatuses.tsx` — ChatToolCalls — Statuses: All four status states (pending, running, complete, and error) shown together in a single group. · static: `static/ChatToolCallsStatuses.html`
- `src/examples/ChatToolCallsToolCallsWithNodes.tsx` — ChatToolCalls — Simple: A single inline tool call above a collapsible multi-call group with diff stats. Shows both layouts side by side. · static: `static/ChatToolCallsToolCallsWithNodes.html`

## Documentation

### Chat Tool Calls

ChatToolCalls displays tool or function call invocations from an LLM response. Pass an array of calls and the component handles the rest: a single call renders inline, while multiple calls collapse into a summary with the latest call visible at the surface. Use it anywhere an AI agent shows what actions it took.

**Do**

- Include a target string on every call so the user can see what the tool acted on: a file path, a shell command, or a search query.
- Show a duration on completed calls so users can judge which tools are slow and understand why a response took time.
- Provide resultDetail with a code block for calls that produce output (diffs for edits, terminal output for shell commands) so users can inspect results inline.
- Set a unique key on each call item when streaming so React can animate additions without re-mounting completed rows.

**Don't**

- Don't omit the status field. Without it the call defaults to complete, which is misleading for calls that are still running or have failed.
- Don't display tool calls outside a chat message context; they are designed to sit inside an assistant message, not as standalone UI.
- Don't use custom wrappers around individual calls; the component handles single vs. grouped layout automatically based on the array length.

**Anatomy**

- Status icon (required) — A themed semantic success/error icon, or a spinner while the call is pending or running.
- Tool name (required) — The function or tool name displayed in monospace: bash, edit, read, web_search, etc.
- Node badge — A neutral pill badge showing which sandbox or environment ran the tool, like cli:remote-server or workspace.
- Target label — The target of the action (a file path, command, or search query) shown after the tool name.
- Diff stats — Green additions and red deletions counts for edit operations, displayed inline after the target.
- Duration — Execution time shown on the trailing edge for completed calls.
- Group header — A wrench icon with a call count, shown when multiple calls are present. Clicking toggles between the summary and the full list.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `calls` * | `ChatToolCallItem[]` |  | Array of tool call data. Each item has name, status, target, duration, node, additions, deletions, stats, errorMessage, resultDetail, key, and data. status is one of 'pending', 'running', 'complete', or 'error' (defaults to 'complete'). |
| `label` | `string` |  | Custom summary label for groups. Auto-generated from count if omitted. |
| `isExpanded` | `boolean` |  | Controlled expanded state for the group. |
| `defaultIsExpanded` | `boolean` | `false` | Default expanded state when uncontrolled. |
| `onExpandedChange` | `(isExpanded: boolean) => void` |  | Callback fired when the expanded state changes. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

### Chat Tokenized Text

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `string` |  | The plain text message containing serialized token values. Patterns matching a token's value are replaced with badge components inline. |
| `tokens` | `ChatComposerToken[]` |  | Token definitions: same type returned by trigger onSelect. Each token has a value (the string to match), label (display text), and optional variant and icon. Uses the same type as the composer input, so token definitions work for both input and display. |

### Chat Tokenized Text

### Chat Tokenized Text

## Files

- `src/ChatTokenizedText.doc.mjs`
- `src/ChatTokenizedText.tsx`
- `src/ChatToolCalls.doc.mjs`
- `src/ChatToolCalls.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/ChatToolCalls
