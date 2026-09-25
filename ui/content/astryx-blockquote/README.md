# Blockquote

A quotation block with a rule on its inline-start edge and secondary text color. Use to highlight quoted content, testimonials, or excerpts. The rule and padding are logical, so they move to the right edge in right-to-left locales.

## Classification

- Category: `content` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/Blockquote.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A quotation block with a rule on its inline-start edge and secondary text color.
- Avoid when: Use for callout boxes or informational notes; use Banner for those. Wrap the attribution in your own <footer>. A <footer> inside a <blockquote> becomes a contentinfo document landmark, and a page with several quotes then reports several page footers.
- Provides: Rule, Quotation, Attribution
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: BlockquoteShowcase, BlockquoteTestimonials, BlockquoteWithCite
- Upstream: Astryx core · Content
- Keywords: blockquote, quote, citation, pullquote, quotation, cite, excerpt

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

- `upstream/examples/BlockquoteShowcase.tsx` — Blockquote — Showcase: Blockquote with and without citation. A quick visual reference for the blockquote component. · static: `static/BlockquoteShowcase.html`
- `upstream/examples/BlockquoteTestimonials.tsx` — Blockquote — Testimonials: Multiple quotes arranged in a card grid for a testimonials section. Combine with Card and Grid to create social-proof layouts. · static: `static/BlockquoteTestimonials.html`
- `upstream/examples/BlockquoteWithCite.tsx` — Blockquote — With Attribution: A plain quote and a quote with a cite attribution. Use cite to credit the original author or source. · static: `static/BlockquoteWithCite.html`

## Documentation

### Blockquote

A quotation block with a rule on its inline-start edge and secondary text color. Use to highlight quoted content, testimonials, or excerpts. The rule and padding are logical, so they move to the right edge in right-to-left locales.

**Do**

- Use for quoted text, testimonials, or highlighted excerpts from external sources.
- Provide a cite prop when the source of the quote is known.
- Pass the source through cite rather than typing it into children, so it renders as a semantic <cite> element that assistive technology can distinguish from the quotation.

**Don't**

- Use for callout boxes or informational notes; use Banner for those.
- Wrap the attribution in your own <footer>. A <footer> inside a <blockquote> becomes a contentinfo document landmark, and a page with several quotes then reports several page footers.

**Anatomy**

- Rule (required) — The border on the inline-start edge, drawn with --color-border-emphasized.
- Quotation (required) — The quoted content, passed as children. Renders inside the <blockquote> element.
- Attribution — The source, passed as cite. Renders as a <cite> element below the quotation.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | Content of the blockquote. |
| `cite` | `ReactNode` |  | Optional attribution for the quote. Rendered in a <cite> element after the quoted content. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-blockquote`

### Blockquote

带有行首边框和次要文本颜色的引用块。用于突出显示引用内容、推荐语或摘录。边框和内边距使用逻辑属性，因此在从右到左的语言环境中会移到右侧。

**Do**

- 用于引用文本、推荐语或来自外部来源的高亮摘录。
- 当引用来源已知时，提供 cite 属性。
- 通过 cite 传入来源，而不是写在 children 里，这样它会渲染为语义化的 <cite> 元素，辅助技术可以将其与引用内容区分开。

**Don't**

- 用于提示框或信息说明，应使用 Banner。
- 自行用 <footer> 包裹出处。<blockquote> 内的 <footer> 会成为 contentinfo 文档地标，页面上有多个引用时就会报告多个页脚。

**Anatomy**

- 边框 (required) — 行首边缘的边框，使用 --color-border-emphasized 绘制。
- 引用内容 (required) — 通过 children 传入的引用内容，渲染在 <blockquote> 元素内。
- 出处 — 通过 cite 传入的来源，在引用内容下方以 <cite> 元素渲染。

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | 引用块的内容。 |
| `cite` | `ReactNode` |  | 引用的可选出处。在引用内容之后以 <cite> 元素渲染。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式（边距、定位、尺寸）。必须是 stylex.create() 的值，不能是 style={{}} 这样的内联样式对象。 |

Styling hook class: `.astryx-blockquote`

## Files

- `upstream/Blockquote.doc.mjs`
- `upstream/Blockquote.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Blockquote
