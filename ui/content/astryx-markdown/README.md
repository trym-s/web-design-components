# Markdown

Renders a markdown string as Astryx-styled components. Use Markdown for user-generated content, AI responses, and documentation; it handles headings, lists, tables, code blocks, and citations with consistent styling.

## Classification

- Category: `content` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Markdown.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Renders a markdown string as Astryx-styled components.
- Avoid when: Use Markdown for hand-authored layouts; use Text and Heading directly when you control the content.
- Provides: Document, Heading, Paragraph, List, Code block, Blockquote, Table, Divider, Image
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: MarkdownShowcase, MarkdownCitedContent, MarkdownCompactAIResponse, MarkdownDataTable, MarkdownRichContent
- Upstream: Astryx core · Content
- Keywords: markdown, rich text, prose, renderer, streaming, markup, formatted text, md, markdown renderer

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

- `src/examples/MarkdownShowcase.tsx` — Markdown: Rich markdown content with headings, lists, and formatting. · static: `static/MarkdownShowcase.html`
- `src/examples/MarkdownCitedContent.tsx` — Markdown — Cited Content: Markdown with citation chips linked to external sources · static: `static/MarkdownCitedContent.html`
- `src/examples/MarkdownCompactAIResponse.tsx` — Markdown — Compact AI Response: Compact markdown styled for AI responses with shifted heading levels · static: `static/MarkdownCompactAIResponse.html`
- `src/examples/MarkdownDataTable.tsx` — Markdown — Data Table: Comparison table rendered from a markdown string · static: `static/MarkdownDataTable.html`
- `src/examples/MarkdownRichContent.tsx` — Markdown — Rich Content: Markdown with headings, lists, code blocks, tables, blockquotes, and task lists · static: `static/MarkdownRichContent.html`

## Documentation

### Markdown

Renders a markdown string as Astryx-styled components. Use Markdown for user-generated content, AI responses, and documentation; it handles headings, lists, tables, code blocks, and citations with consistent styling.

**Do**

- Set headingLevelStart to match the page hierarchy, e.g. start at 3 if the markdown sits inside an h2 section.
- Use contentWidth to keep prose at a readable line length in wide layouts.
- Use plugins created by createMarkdownPlugin for reusable syntax, immutable AST transforms, and typed extension rendering. Keep the ordered list stable while its syntax configuration is unchanged.
- Use createMarkdownTextTransform for prose matching; it preserves code, links, images, citations, math, and accepted extension syntax as protected contexts. Provide requiredSubstrings only when they conservatively cover every possible match.
- Use createMarkdownFenceTransform for declared code-fence languages with semantic data. createNode returns an owned block extension node; its standard plugin renderer and toText own presentation. components.code still wins, and a declined or failed proposal keeps the accessible, copyable CodeBlock fallback.
- Use createMarkdownSourceDecoration to attach non-visual metadata — search hits, review annotations — to the blocks a source range touches, and getMarkdownSourceDecorations to read it back in a later plugin. Decorations appear on the settled document rather than on partial streaming chunks, and never change rendering, copyable text, accessible names, ids, focus order, or navigation.
- Import parseMarkdownAst or parseInlineAst from @astryxdesign/core/Markdown/parser when server or React Server Component code needs to run plugins against the canonical readonly tree. The parser and plugin subpaths have no use-client boundary. The Markdown component remains client-owned, so function-bearing plugin entries must not be passed across an RSC serialization boundary.
- Use createMarkdownFrontmatter for typed document metadata. Its parse() method gives the host metadata directly; its plugin removes a complete leading block before rendering and withholds an unfinished block during streaming.
- Import createMarkdownRemarkTransform from '@astryxdesign/core/Markdown/remark' only to reuse an existing synchronous transform-only Remark plugin; it stays out of every other bundle. Prove each plugin with fixtures: anything outside the supported MDAST subset — async work, parser or compiler plugins, processor state, raw HTML, unsupported nodes, forged positions, or metadata Astryx cannot represent — keeps the last valid document and reports one diagnostic.
- Use inlinePlugins for prefixed identifiers, mentions, and other prose-only shorthand instead of preprocessing the markdown string.
- Provide components.math only for documents that use dollar-delimited math. The renderer owns typesetting and accessible output; Astryx passes the expression as text and never executes raw HTML.
- For direct parsing, use MathParseOptions and handle InlineNodeWithMath or BlockNodeWithMath. Incremental math parsing also uses createIncrementalState<true>() and IncrementalParseState<true>; default calls and ParseOptions annotations keep the legacy unions.
- Pair with Outline and useOutlineFromMarkdown for section navigation: headings render generated id attributes that match the outline item ids, so hash links scroll to their target.

**Don't**

- Use Markdown for hand-authored layouts; use Text and Heading directly when you control the content.

**Anatomy**

- Document (required) — Root container for block or inline Markdown content.
- Heading — Rendered heading block; a custom heading renderer replaces the default part.
- Paragraph — Rendered paragraph block; a custom paragraph renderer replaces the default part.
- List — Ordered, unordered, or task-list block rendered from Markdown items.
- Code block — Fenced code block; a custom code renderer replaces the default part.
- Blockquote — Quoted block; a custom blockquote renderer replaces the default part.
- Table — Scrollable table block rendered from Markdown rows and columns.
- Divider — Horizontal rule block; a custom hr renderer replaces the default part.
- Image — Block image or unsafe-URL fallback; a custom image renderer replaces a safe default image.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `string` |  | The markdown string to render. |
| `display` | `'block' \| 'inline'` | `'block'` | Display type. Markdown defaults to block. Use 'inline' for markdown spans embedded inside text. |
| `density` | `'default' \| 'compact'` | `'default'` | Controls spacing between block-level elements. |
| `headingLevelStart` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1` | The HTML heading level that markdown # maps to. Shifts all heading levels down to fit the surrounding page hierarchy. Levels exceeding h6 are clamped to h6. |
| `isStreaming` | `boolean` | `false` | Enables streaming mode; it uses incremental parsing and a smooth fade-in animation for chunk-by-chunk text delivery. |
| `onLinkClick` | `(href: string, event: MouseEvent) => void \| false` |  | Handler for link clicks. Return false to prevent the default navigation behavior. Link destinations in the markdown follow the shared navigation rule described on the Link `href` prop: a blocked destination renders as plain text and never reaches this handler or a custom link renderer. Image URLs use a separate, stricter policy (every data: URL is rejected). |
| `sources` | `Record<string, MarkdownSource>` |  | Citation sources keyed by ID. When provided, [id] and 【id】 markers in the markdown that match a key are rendered as citation chips. |
| `citationStyle` | `'label' \| 'number'` | `'label'` | How citations are displayed inline. 'label' shows a chip with source title, icon, and border. 'number' shows a compact numbered badge. |
| `contentWidth` | `number \| string` | `680` | Max width for prose content (paragraphs, headings, lists, blockquotes). Tables and code blocks are unconstrained and can expand to the full container width. Use for readable line lengths in wide layouts. |
| `contentAlign` | `'start' \| 'center'` | `'start'` | Alignment of prose content within the container when contentWidth is narrower than the available space. |
| `plugins` | `readonly MarkdownPluginEntry[]` |  | Ordered extensions created by createMarkdownPlugin(). Plugins may add bounded syntax, immutable typed AST transforms, and typed extension renderers. Use isMarkdownExtensionNode() to narrow extension data observed from other plugins. Renderer callbacks are pure; return a child component when hooks are needed. Omitted and empty lists preserve the released Markdown behavior. |
| `inlinePlugins` | `MarkdownInlinePlugin[]` |  | Transforms regex matches in parsed text nodes into custom inline React elements. Use for prefixed identifiers, mentions, and other shorthand patterns. Inline code, fenced code blocks, and math are unaffected. |
| `autolink` | `'gfm'` |  | Opt-in autolinking of bare URLs and emails. 'gfm' applies GitHub-Flavored Markdown autolink-literal rules: bare https?://..., www...., <scheme:url>, <email>, and user@host all become links. Trailing sentence punctuation and unbalanced trailing close-parens are excluded; matches inside code spans, code blocks, existing links, and image alt text are skipped. Default behavior (option unset) is unchanged. |
| `components` | `MarkdownComponents` |  | Custom React component overrides for rendered Markdown elements (code, inlineCode, math, link, heading, paragraph, image, blockquote, hr, citation). Providing math enables `$…$` inline and `$$…$$` display parsing and receives `{value, display}`; omit it when dollar text should stay literal. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |
| `className` | `string` |  | CSS class name for the root element. Prefer xstyle for styling; className is provided for integration with non-StyleX systems. |
| `style` | `CSSProperties` |  | Inline styles for the root element. Prefer xstyle for styling; inline styles bypass StyleX optimization. |
| `data-testid` | `string` |  | Test selector for automated testing frameworks. |

Styling hook class: `.astryx-markdown`, `.astryx-markdown-heading`, `.astryx-markdown-paragraph`, `.astryx-markdown-list`, `.astryx-markdown-codeblock`, `.astryx-markdown-blockquote`, `.astryx-markdown-table`, `.astryx-markdown-hr`, `.astryx-markdown-image`

**Example — Inline display**

```tsx

import {Text} from '@astryxdesign/core/Text';

<Text>
  This description includes{' '}
  <Markdown display="inline">{'`inline code` and **bold text**'}</Markdown>
  .
</Text>;

```

**Example — GFM autolinks**

```tsx

<Markdown autolink="gfm">
  {'Visit https://example.com or email contact@example.com. ' +
    'You can also bracket links: <https://docs.example.com>.'}
</Markdown>;

```

**Example — Text transform helper**

```tsx

import {Markdown} from '@astryxdesign/core/Markdown';
import {
  createMarkdownPlugin,
  createMarkdownTextTransform,
} from '@astryxdesign/core/Markdown/plugins';

const finalLabels = createMarkdownPlugin({
  name: 'final-labels',
  apiVersion: 1,
  transform: createMarkdownTextTransform({
    pattern: /\bDraft\b/g,
    requiredSubstrings: ['Draft'],
    replace: () => ({type: 'text', value: 'Final'}),
  }),
});

<Markdown plugins={[finalLabels]}># Draft</Markdown>;

```

**Example — Semantic fence helper**

```tsx

import {Markdown} from '@astryxdesign/core/Markdown';
import {
  createMarkdownFenceTransform,
  createMarkdownPlugin,
  type MarkdownExtensionNode,
} from '@astryxdesign/core/Markdown/plugins';

type DiagramNode = MarkdownExtensionNode<
  'diagrams',
  'diagram',
  {readonly code: string; readonly label?: string},
  'block'
>;

const diagrams = createMarkdownPlugin<'diagrams', DiagramNode>({
  name: 'diagrams',
  apiVersion: 1,
  transform: createMarkdownFenceTransform({
    languages: ['mermaid'],
    createNode: ({code, meta}) => ({
      type: 'extension',
      plugin: 'diagrams',
      name: 'diagram',
      display: 'block',
      data: {code, ...(meta == null ? {} : {label: meta})},
    }),
  }),
  renderers: {
    diagram: {
      render: ({node}) => (
        <Diagram source={node.data.code} label={node.data.label} />
      ),
      toText: node => node.data.code,
    },
  },
});

<Markdown plugins={[diagrams]}>
  {'```mermaid Checkout flow\ngraph LR; A-->B\n```'}
</Markdown>;

```

**Example — Source decoration helper**

```tsx

import {Markdown} from '@astryxdesign/core/Markdown';
import {
  createMarkdownPlugin,
  createMarkdownSourceDecoration,
  getMarkdownSourceDecorations,
} from '@astryxdesign/core/Markdown/plugins';

// Ranges are UTF-16 offsets into the same string Markdown renders. Every
// block a range touches is annotated; rendering, copyable text, and ids
// never change.
const searchHits = createMarkdownPlugin({
  name: 'search-hits',
  apiVersion: 1,
  transform: createMarkdownSourceDecoration({
    name: 'search-hit',
    ranges: [{start: 0, end: 15, data: {query: 'release'}}],
  }),
});

const readDecorations = createMarkdownPlugin({
  name: 'read-decorations',
  apiVersion: 1,
  transform: root => {
    report(root.children.map(getMarkdownSourceDecorations));
    return root;
  },
});

<Markdown plugins={[searchHits, readDecorations]}>{source}</Markdown>;

```

**Example — Native frontmatter**

```tsx

import {Markdown} from '@astryxdesign/core/Markdown';
import {createMarkdownFrontmatter} from '@astryxdesign/core/Markdown/plugins';

const frontmatter = createMarkdownFrontmatter({
  name: 'document-metadata',
  parse: fields => ({
    title: fields.title ?? 'Untitled',
    draft: fields.draft === 'true',
  }),
});

const source = '---\ntitle: Release notes\ndraft: true\n---\n# Shipped';
const result = frontmatter.parse(source);

<Markdown plugins={[frontmatter.plugin]}>{source}</Markdown>;

```

**Example — Compatible Remark plugin**

```tsx

import {Markdown} from '@astryxdesign/core/Markdown';
import {createMarkdownPlugin} from '@astryxdesign/core/Markdown/plugins';
import {createMarkdownRemarkTransform} from '@astryxdesign/core/Markdown/remark';

// A synchronous transform-only Remark plugin in the usual attacher shape.
const remarkRename =
  ({from, to}) =>
  tree => {
    const rename = node => {
      if (node.type === 'text') {
        node.value = node.value.split(from).join(to);
      }
      node.children?.forEach(rename);
    };
    rename(tree);
  };

const productName = createMarkdownPlugin({
  name: 'product-name',
  apiVersion: 1,
  transform: createMarkdownRemarkTransform(remarkRename, {
    from: 'Astryx',
    to: 'Astryx Design',
  }),
});

<Markdown plugins={[productName]}># Astryx release notes</Markdown>;

```

**Example — Entity links**

```tsx

import {Link} from '@astryxdesign/core/Link';

const entityPlugins = [
  {
    pattern: /\b([A-Z][A-Z0-9]+-\d+)\b/g,
    render: (match, key) => (
      <Link key={key} href={`/entities/${match[1]}`}>
        {match[0]}
      </Link>
    ),
  },
];

<Markdown inlinePlugins={entityPlugins}>
  {'See DOC-2048. Inline code stays plain: `DOC-9999`.'}
</Markdown>;

```

**Example — Math renderer**

```tsx

import {BlockMath, InlineMath} from 'react-katex';

function MathExpression({value, display}) {
  const Component = display === 'block' ? BlockMath : InlineMath;
  return <Component math={value} />;
}

<Markdown components={{math: MathExpression}}>
  {'Inline $x_1 + y$ and display math:\n\n$$\n\\sum_i x_i\n$$'}
</Markdown>;

```

### Markdown

Renders a markdown string as Astryx-styled components. Use Markdown for user-generated content, AI responses, and documentation; it handles headings, lists, tables, code blocks, and citations with consistent styling.

**Do**

- Set headingLevelStart to match the page hierarchy, e.g. start at 3 if the markdown sits inside an h2 section.
- Use contentWidth to keep prose at a readable line length in wide layouts.
- Use plugins created by createMarkdownPlugin for reusable syntax, immutable AST transforms, and typed extension rendering. Keep the ordered list stable while its syntax configuration is unchanged.
- Use createMarkdownTextTransform for prose matching; it preserves code, links, images, citations, math, and accepted extension syntax as protected contexts. Provide requiredSubstrings only when they conservatively cover every possible match.
- Use createMarkdownFenceTransform for declared code-fence languages with semantic data. createNode returns an owned block extension node; its standard plugin renderer and toText own presentation. components.code still wins, and a declined or failed proposal keeps the accessible, copyable CodeBlock fallback.
- Use createMarkdownSourceDecoration to attach non-visual metadata — search hits, review annotations — to the blocks a source range touches, and getMarkdownSourceDecorations to read it back in a later plugin. Decorations appear on the settled document rather than on partial streaming chunks, and never change rendering, copyable text, accessible names, ids, focus order, or navigation.
- Import parseMarkdownAst or parseInlineAst from @astryxdesign/core/Markdown/parser when server or React Server Component code needs to run plugins against the canonical readonly tree. The parser and plugin subpaths have no use-client boundary. The Markdown component remains client-owned, so function-bearing plugin entries must not be passed across an RSC serialization boundary.
- Use createMarkdownFrontmatter for typed document metadata. Its parse() method gives the host metadata directly; its plugin removes a complete leading block before rendering and withholds an unfinished block during streaming.
- Import createMarkdownRemarkTransform from '@astryxdesign/core/Markdown/remark' only to reuse an existing synchronous transform-only Remark plugin; it stays out of every other bundle. Prove each plugin with fixtures: anything outside the supported MDAST subset — async work, parser or compiler plugins, processor state, raw HTML, unsupported nodes, forged positions, or metadata Astryx cannot represent — keeps the last valid document and reports one diagnostic.
- Use inlinePlugins for prefixed identifiers, mentions, and other prose-only shorthand instead of preprocessing the markdown string.
- Provide components.math only for documents that use dollar-delimited math. The renderer owns typesetting and accessible output; Astryx passes the expression as text and never executes raw HTML.
- For direct parsing, use MathParseOptions and handle InlineNodeWithMath or BlockNodeWithMath. Incremental math parsing also uses createIncrementalState<true>() and IncrementalParseState<true>; default calls and ParseOptions annotations keep the legacy unions.
- Pair with Outline and useOutlineFromMarkdown for section navigation: headings render generated id attributes that match the outline item ids, so hash links scroll to their target.

**Don't**

- Use Markdown for hand-authored layouts; use Text and Heading directly when you control the content.

**Anatomy**

- Document (required) — Root container for block or inline Markdown content.
- Heading — Rendered heading block; a custom heading renderer replaces the default part.
- Paragraph — Rendered paragraph block; a custom paragraph renderer replaces the default part.
- List — Ordered, unordered, or task-list block rendered from Markdown items.
- Code block — Fenced code block; a custom code renderer replaces the default part.
- Blockquote — Quoted block; a custom blockquote renderer replaces the default part.
- Table — Scrollable table block rendered from Markdown rows and columns.
- Divider — Horizontal rule block; a custom hr renderer replaces the default part.
- Image — Block image or unsafe-URL fallback; a custom image renderer replaces a safe default image.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `string` |  | 要渲染的 Markdown 字符串。 |
| `display` | `'block' \| 'inline'` | `'block'` | 显示类型。Markdown 默认为 block。使用 'inline' 可在文本内嵌入 Markdown 片段。 |
| `density` | `'default' \| 'compact'` | `'default'` | 控制块级元素之间的间距。 |
| `headingLevelStart` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1` | Markdown # 映射到的 HTML 标题级别。将所有标题级别向下偏移以适应页面层次结构。超过 h6 的级别将被限制为 h6。 |
| `isStreaming` | `boolean` | `false` | 启用流式模式，使用增量解析和淡入动画处理分块文本。 |
| `onLinkClick` | `(href: string, event: MouseEvent) => void \| false` |  | 链接点击处理器。返回 false 可阻止默认导航行为。 |
| `sources` | `Record<string, MarkdownSource>` |  | 按 ID 索引的引用来源。提供后，Markdown 中匹配的 [id] 和 【id】 标记将渲染为引用标签。 |
| `citationStyle` | `'label' \| 'number'` | `'label'` | 引用的内联显示方式。'label' 显示带标题、图标和边框的标签。'number' 显示紧凑编号徽章。 |
| `contentWidth` | `number \| string` | `680` | 正文内容的最大宽度（段落、标题、列表、引用块）。表格和代码块不受限制，可扩展到完整容器宽度。用于在宽布局中保持可读行长。 |
| `contentAlign` | `'start' \| 'center'` | `'start'` | 当 contentWidth 小于可用空间时，正文内容在容器内的对齐方式。 |
| `plugins` | `readonly MarkdownPluginEntry[]` |  | 由 createMarkdownPlugin() 创建的有序扩展。插件可添加有界语法、不可变的类型化 AST 转换和类型化扩展渲染器。使用 isMarkdownExtensionNode() 缩小从其他插件观察到的扩展数据类型。渲染回调必须是纯函数；需要 Hook 时请返回子组件。省略或传入空列表时保持已发布的 Markdown 行为。 |
| `inlinePlugins` | `MarkdownInlinePlugin[]` |  | 将已解析文本节点中的正则匹配转换为自定义内联 React 元素。适用于带前缀的标识符、用户提及等简写模式。内联代码、围栏代码块和数学表达式不受影响。 |
| `autolink` | `'gfm'` |  | 可选的裸 URL 和电子邮箱自动链接。设为 'gfm' 启用 GitHub Flavored Markdown 自动链接规则：裸 https?://、www.、<scheme:url>、<email> 以及 user@host 都会变成链接。末尾句末标点和不平衡的末尾右括号会被排除；代码块、现有链接和图片替代文本内部的匹配会被跳过。默认为关闭。 |
| `components` | `MarkdownComponents` |  | 用于覆盖 Markdown 渲染元素的自定义 React 组件（code、inlineCode、math、link、heading、paragraph、image、blockquote、hr、citation）。提供 math 会启用 `$…$` 行内数学和 `$$…$$` 块级数学解析，并接收 `{value, display}`；不提供时美元符号保持原样。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式。必须是 stylex.create() 的值，而非内联样式对象。 |
| `className` | `string` |  | 根元素的 CSS 类名。建议使用 xstyle，className 适用于非 StyleX 系统集成。 |
| `style` | `CSSProperties` |  | 根元素的内联样式。建议使用 xstyle，内联样式会绕过 StyleX 优化。 |
| `data-testid` | `string` |  | 用于自动化测试框架的测试选择器。 |

Styling hook class: `.astryx-markdown`, `.astryx-markdown-heading`, `.astryx-markdown-paragraph`, `.astryx-markdown-list`, `.astryx-markdown-codeblock`, `.astryx-markdown-blockquote`, `.astryx-markdown-table`, `.astryx-markdown-hr`, `.astryx-markdown-image`

## Files

- `src/Markdown.doc.mjs`
- `src/Markdown.fr23.bench.ts`
- `src/Markdown.fr23.sampling.ts`
- `src/Markdown.spec.md`
- `src/Markdown.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Markdown
