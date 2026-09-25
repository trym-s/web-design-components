# Code Editor

Editable code component with real-time syntax highlighting using the CSS Custom Highlight API. Supports line numbers, read-only state, placeholder text, and custom tokenizers.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/CodeEditor.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Editable code component with real-time syntax highlighting using the CSS Custom Highlight API.
- Provides: CodeEditor
- Requires: React 19 with `@astryxdesign/lab` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: CodeEditor, CodeEditorPerf, CodeEditorTheme
- Upstream: Astryx lab (experimental, canary-only upstream) · Form Controls
- Keywords: code, editor, syntax, highlight, input, textarea

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

- `src/stories/CodeEditor.stories.tsx` — Storybook — CodeEditor
- `src/stories/CodeEditorPerf.stories.tsx` — Storybook — CodeEditorPerf
- `src/stories/CodeEditorTheme.stories.tsx` — Storybook — CodeEditorTheme

## Documentation

### Code Editor

Editable code component with real-time syntax highlighting using the CSS Custom Highlight API. Supports line numbers, read-only state, placeholder text, and custom tokenizers.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` * | `string` |  | Controlled string value for the editor. |
| `onChange` * | `(value: string) => void` |  | Callback fired when the code content changes. |
| `label` * | `string` |  | Accessible label for the editable region (aria-label). |
| `language` | `string` | `'plaintext'` | Programming language for syntax highlighting. |
| `hasLineNumbers` | `boolean` | `false` | Display line number gutter on the left. |
| `isReadOnly` | `boolean` | `false` | Renders the editor in a read-only state. |
| `placeholder` | `string` |  | Placeholder text displayed when value is empty. |
| `maxHeight` | `number \| string` |  | Maximum container height before internal scrolling. |
| `size` | `'sm' \| 'md'` | `'md'` | Font size variant for the code text. |
| `tokenizer` | `(code: string, language: string) => TokenLine[]` |  | Custom tokenizer function override for language parsing. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. |

## Files

- `src/CodeEditor.doc.mjs`
- `src/CodeEditor.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
