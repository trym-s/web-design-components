# Code Block

CodeBlock renders syntax-highlighted code with line numbers, a copy button, and optional collapsible sections. Use CodeBlock for multi-line snippets like source files, terminal commands, and configuration examples. Use Code for inline references to function names, variables, or CLI flags within body text.

## Classification

- Category: `content` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/CodeBlock.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: CodeBlock renders syntax-highlighted code with line numbers, a copy button, and optional collapsible sections.
- Avoid when: Enable line numbers on short snippets (under 5 lines) where they add clutter without helping navigation. Nest a code block inside a scrollable container. Use the maxHeight prop instead, which handles overflow natively.
- Provides: Header Bar, Line Numbers, Code Body, Highlighted Lines, Copy Button
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: CodeBlockShowcase, CodeShowcase, CodeAcrossTextSizes, CodeBlockBashCommand, CodeBlockHighlightedLines, CodeBlockJSONConfig, CodeBlockScrollableBlock, CodeBlockTerminal, CodeInlineInParagraph, CodeVariousContent
- Upstream: Astryx core · Content
- Keywords: code, syntax, highlight, snippet, prism, shiki, pre, monospace, codeblock, inline

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

- `upstream/examples/CodeBlockShowcase.tsx` — Code Block: A syntax-highlighted TypeScript code block with line numbers, a title bar, and a copy button. · static: `static/CodeBlockShowcase.html`
- `upstream/examples/CodeShowcase.tsx` — Code: Inline code snippets inside a sentence showing how Code renders alongside body text. · static: `static/CodeShowcase.html`
- `upstream/examples/CodeAcrossTextSizes.tsx` — Code — Text Sizes: Inline code rendered inside heading, body, supporting, and label text. Code automatically matches the font size of its parent text element. · static: `static/CodeAcrossTextSizes.html`
- `upstream/examples/CodeBlockBashCommand.tsx` — Code — Snippet: Short terminal commands with a copy button and no line numbers. Use for install instructions or one-liner commands that readers will paste directly. · static: `static/CodeBlockBashCommand.html`
- `upstream/examples/CodeBlockHighlightedLines.tsx` — Code — Highlighted: TypeScript code with specific lines highlighted to draw attention to a key section. Use highlightLines to call out new or important code in tutorials and changelogs. · static: `static/CodeBlockHighlightedLines.html`
- `upstream/examples/CodeBlockJSONConfig.tsx` — Code — Config: A JSON configuration file with a title bar and line numbers. The title prop adds a filename label in the header so readers know which file the code belongs to. · static: `static/CodeBlockJSONConfig.html`
- `upstream/examples/CodeBlockScrollableBlock.tsx` — Code — Scrollable: A long code block with a max height that enables vertical scrolling. Use maxHeight to keep the block from dominating the page when displaying large files. · static: `static/CodeBlockScrollableBlock.html`
- `upstream/examples/CodeBlockTerminal.tsx` — Code — Terminal: A dark terminal-style command block: a bash CodeBlock wrapped in SyntaxTheme with the GitHub Dark preset, copy button on, and no line numbers. Use for shell sessions or CLI output that should read as a terminal even on light pages. Reach for a dark syntax preset instead of hand-rolling a dark box with custom CSS. · static: `static/CodeBlockTerminal.html`
- `upstream/examples/CodeInlineInParagraph.tsx` — Code — Inline: Inline code references mixed within a paragraph of body text. Use Code to mark up function names, hooks, or API terms so they stand out from surrounding prose. · static: `static/CodeInlineInParagraph.html`
- `upstream/examples/CodeVariousContent.tsx` — Code — Content Types: Inline code used for variables, terminal commands, CSS properties, file paths, and keyboard shortcuts. Shows how Code adapts to different kinds of technical content. · static: `static/CodeVariousContent.html`

## Documentation

### Code Block

CodeBlock renders syntax-highlighted code with line numbers, a copy button, and optional collapsible sections. Use CodeBlock for multi-line snippets like source files, terminal commands, and configuration examples. Use Code for inline references to function names, variables, or CLI flags within body text.

**Do**

- Set the language prop to match the code content so syntax highlighting is accurate. Use "plaintext" when the language is unknown.
- Add a title when the code represents a file. It gives readers context and appears in the header bar alongside the copy button.
- Use Code for short inline references like function names or CLI flags, and CodeBlock for standalone multi-line snippets.

**Don't**

- Enable line numbers on short snippets (under 5 lines) where they add clutter without helping navigation.
- Nest a code block inside a scrollable container. Use the maxHeight prop instead, which handles overflow natively.

**Anatomy**

- Header Bar — Shows the title, language label, and copy button. Appears when any of these props are set.
- Line Numbers — Numbered gutter along the left edge. Enable with hasLineNumbers.
- Code Body (required) — The syntax-highlighted code content.
- Highlighted Lines — Background accent on specific lines to draw attention.
- Copy Button — Copies the code string to the clipboard. Shown by default.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `code` * | `string` |  | The code string to display. |
| `language` | `string` | `'plaintext'` | Language for syntax highlighting. Use "plaintext" to disable. |
| `title` | `string` |  | Filename or label shown in the header bar. |
| `hasLanguageLabel` | `boolean` | `true` | Show the language name in the header bar. Hidden when language is "plaintext". |
| `hasLineNumbers` | `boolean` | `false` | Show a line number gutter. |
| `highlightLines` | `number[]` |  | 1-indexed line numbers to highlight. |
| `hasCopyButton` | `boolean` | `true` | Show a copy-to-clipboard button. |
| `onCopy` | `() => void` |  | Callback after the code is copied. |
| `isWrapped` | `boolean` | `false` | Wrap long lines instead of enabling horizontal scroll. |
| `maxHeight` | `number \| string` |  | Max height before the block scrolls vertically. |
| `size` | `'sm' \| 'md'` | `'md'` | Text size variant. |
| `width` | `string` | `'fit-content'` | Width of the code block. Any CSS width value. 'fit-content' (default) shrinks to longest line. '100%' fills parent width. |
| `container` | `'card' \| 'section'` | `'card'` | Container presentation style. 'card' (default): border and radius with the muted syntax background for a standalone card look. 'section': no border or radius and a transparent background so the block blends into the card or panel it's embedded in. |
| `tokenizer` | `(code: string, language: string) => Array<{type: string; start: number; end: number}>` |  | Custom tokenizer override for unsupported languages. |
| `syntaxTheme` | `SyntaxThemeDefinition` |  | Per-instance syntax theme override. Shorthand for wrapping the block in <SyntaxTheme theme={...}>. Accepts a preset from @astryxdesign/core/theme/syntax or a theme created with defineSyntaxTheme(). Defaults to the nearest SyntaxTheme ancestor or the theme-level syntax colors. |
| `highlightMode` | `'auto' \| 'ranges' \| 'spans'` | `'auto'` | Syntax highlighting rendering mode. |
| `isCollapsible` | `boolean` | `false` | Allow collapsing the code body into just the header bar. Starts expanded; the header becomes clickable to toggle. Only shows the toggle when the code exceeds collapsibleThreshold lines. |
| `collapsibleThreshold` | `number` | `10` | Minimum number of lines before the collapse toggle appears. Below this threshold the code block renders normally even when isCollapsible is true. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. Must be a stylex.create() value. |
| `className` | `string` |  | CSS class name for the root element. Prefer xstyle for styling. |
| `style` | `CSSProperties` |  | Inline styles. Prefer xstyle for StyleX-optimized styling. |
| `data-testid` | `string` |  | Test selector for automated testing frameworks. |

Styling hook class: `.astryx-code`, `.astryx-code-block`, `.astryx-code-block-header`, `.astryx-code-block-title`, `.astryx-code-block-copy-button`, `.astryx-codeblock`, `.astryx-codeblock-header`, `.astryx-codeblock-title`, `.astryx-codeblock-copy-button`

### Code

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | Code content. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. Must be a stylex.create() value. |
| `className` | `string` |  | CSS class name for the root element. Prefer xstyle for styling. |
| `style` | `CSSProperties` |  | Inline styles. Prefer xstyle for StyleX-optimized styling. |
| `data-testid` | `string` |  | Test selector for automated testing frameworks. |

### Code

### Code

## Files

- `upstream/Code.doc.mjs`
- `upstream/CodeBlock.doc.mjs`
- `upstream/CodeBlock.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/CodeBlock
