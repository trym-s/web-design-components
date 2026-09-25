# Text

Text renders styled body text and headings from the theme. Use Text with a semantic type for body copy, labels, and captions, and Heading for section titles that output the correct h1–h6 element.

## Classification

- Category: `content` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/Text.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Text renders styled body text and headings from the theme.
- Avoid when: Override size and weight when a semantic type already matches; extra overrides fight the theme and break when themes change. Skip heading levels in the document outline; go h1 then h2 then h3, never h1 then h3. Use raw HTML tags like <p>, <h1>–<h6>, or <span> for text; Text and Heading apply the correct theme tokens automatically. Pass a `variant` prop; Text does not have a `variant` prop. Use `type` for semantic styling (body, label, large, supporting, code) or use Heading for headings. Use Text for headings; use Heading with a `level` prop (1–6) for section titles and headings.
- Provides: Text, Heading, Truncation tooltip
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: HeadingShowcase, TextShowcase, HeadingCardGrid, HeadingPageLayout, HeadingTruncation, TextColors, TextHeadingLevels, TextInline, TextTruncation, TextTypes, TextWeight, TextWordBreak, TextWrap
- Upstream: Astryx core · Content
- Keywords: text, typography, label, paragraph, heading, caption, font, body, subtitle

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

- `upstream/examples/HeadingShowcase.tsx` — Heading · static: `static/HeadingShowcase.html`
- `upstream/examples/TextShowcase.tsx` — Text · static: `static/TextShowcase.html`
- `upstream/examples/HeadingCardGrid.tsx` — Heading — Card Grid: Responsive card grid with truncated headings and descriptions for uniform layout · static: `static/HeadingCardGrid.html`
- `upstream/examples/HeadingPageLayout.tsx` — Heading — Page Hierarchy: Real-world page layout demonstrating heading levels h1 through h3 with supporting text · static: `static/HeadingPageLayout.html`
- `upstream/examples/HeadingTruncation.tsx` — Heading — Truncation: Single-line and multi-line heading truncation with ellipsis for constrained layouts · static: `static/HeadingTruncation.html`
- `upstream/examples/TextColors.tsx` — Text — Colors: All text color options (primary, secondary, disabled, placeholder, active) applied to body text to show their intended use. · static: `static/TextColors.html`
- `upstream/examples/TextHeadingLevels.tsx` — Text — Heading Levels: All 6 heading levels (h1 through h6) rendered with Heading to show the full type scale. · static: `static/TextHeadingLevels.html`
- `upstream/examples/TextInline.tsx` — Text — Inline: Mixing body and code text inline within a single line using the default inline display mode. · static: `static/TextInline.html`
- `upstream/examples/TextTruncation.tsx` — Text — Truncation: Single-line and multi-line text truncation with ellipsis using maxLines in a width-constrained container. · static: `static/TextTruncation.html`
- `upstream/examples/TextTypes.tsx` — Text — Types: All 5 semantic text types (body, large, label, supporting, code) with their default styling from the theme. · static: `static/TextTypes.html`
- `upstream/examples/TextWeight.tsx` — Text — Weight: The 4 font weight variants (normal, medium, semibold, bold) applied to body text. · static: `static/TextWeight.html`
- `upstream/examples/TextWordBreak.tsx` — Text — Word Break: Compares break-word and break-all word break modes on a long unbreakable string. · static: `static/TextWordBreak.html`
- `upstream/examples/TextWrap.tsx` — Text — Wrap: The 4 text-wrap modes (wrap, nowrap, balance, pretty) shown in width-constrained containers. · static: `static/TextWrap.html`

## Documentation

### Text

Text renders styled body text and headings from the theme. Use Text with a semantic type for body copy, labels, and captions, and Heading for section titles that output the correct h1–h6 element.

**Do**

- Pick a semantic type (body, label, supporting, large, code) instead of manually setting size and weight; the theme handles the details.
- Set accessibilityLevel on Heading when the visual level differs from the document outline so screen readers announce the correct hierarchy.
- Use maxLines with a number to truncate long content; a tooltip appears automatically on hover so no text is lost.
- Enable hasTabularNumbers for columns of numeric data so digits align vertically across rows.

**Don't**

- Override size and weight when a semantic type already matches; extra overrides fight the theme and break when themes change.
- Skip heading levels in the document outline; go h1 then h2 then h3, never h1 then h3.
- Use raw HTML tags like <p>, <h1>–<h6>, or <span> for text; Text and Heading apply the correct theme tokens automatically.
- Pass a `variant` prop; Text does not have a `variant` prop. Use `type` for semantic styling (body, label, large, supporting, code) or use Heading for headings.
- Use Text for headings; use Heading with a `level` prop (1–6) for section titles and headings.

**Anatomy**

- Text (required) — Polymorphic text element that renders the supplied content with themed typography.
- Heading — Referenced Heading member that renders the supplied content as a semantic h1–h6 element.
- Truncation tooltip — Tooltip-owned surface available only when Text or Heading is measured as truncated and truncation tooltips are enabled.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `'body' \| 'large' \| 'label' \| 'supporting' \| 'code' \| 'display-1' \| 'display-2' \| 'display-3' \| 'inherit'` | `'body'` | Semantic text type. Determines size, weight, and line-height from the theme. 'inherit' takes all three from the surrounding text instead. Themes may add custom types. Note: this prop is called `type`, not `variant`. |
| `children` * | `ReactNode` |  | Text content. |
| `size` | `'4xs' \| '3xs' \| '2xs' \| 'xsm' \| 'sm' \| 'base' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'` |  | Explicit font size override. Overrides the size from `type` but preserves other type properties. Prefer using `type` alone. |
| `color` | `'primary' \| 'secondary' \| 'disabled' \| 'placeholder' \| 'accent' \| 'inherit'` |  | Text color. Defaults to 'secondary' for the 'supporting' type, 'primary' for all others. Themes may add custom colors. |
| `weight` | `'normal' \| 'medium' \| 'semibold' \| 'bold'` |  | Font weight override. |
| `display` | `'inline' \| 'block'` | `'inline'` | Display type. Silently overridden to 'block' when maxLines > 0 or hasCapsize is true. |
| `as` | `'span' \| 'p' \| 'div' \| 'label'` | `'span'` | HTML element to render. |
| `maxLines` | `number` | `0` | Maximum lines before truncation. 0 means no truncation. When set, shows a tooltip on hover if content is truncated. |
| `hasTruncateTooltip` | `boolean \| 'above' \| 'below' \| 'start' \| 'end'` | `true` | Controls tooltip behavior for truncated text. true shows the tooltip at the default position, false disables it, or a placement string ('above' \| 'below' \| 'start' \| 'end') sets a specific position. |
| `wordBreak` | `'break-word' \| 'break-all'` |  | Word break behavior when truncating. Defaults to 'break-all' for single-line truncation, 'break-word' otherwise. |
| `textWrap` | `'wrap' \| 'nowrap' \| 'balance' \| 'pretty'` |  | Text wrapping behavior. |
| `justify` | `'start' \| 'center' \| 'end'` | `'start'` | Text alignment (justification). Uses logical values (start/end) for i18n/RTL compatibility. |
| `hasCapsize` | `boolean` | `false` | Enable optical alignment using text-box-trim. Forces block display. |
| `hasStrikethrough` | `boolean` | `false` | Apply strikethrough text decoration. |
| `hasTabularNumbers` | `boolean` | `false` | Use tabular (monospace) numbers for aligned numeric data. |
| `id` | `string` |  | HTML id attribute. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value: not an inline style object like style={{}}. |

Styling hook class: `.astryx-heading`, `.astryx-text`

### Heading

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `level` * | `1 \| 2 \| 3 \| 4 \| 5 \| 6` |  | Heading level. Determines the semantic HTML element (h1-h6) and the visual styling from the theme (unless `type` is set). |
| `type` | `'display-1' \| 'display-2' \| 'display-3'` |  | Display type variant. Overrides the visual styling from `level` with display-scale sizing (larger, lighter weight, tighter line-height). Themes may add custom visual types. The `level` still determines the HTML element for accessibility. Use for hero banners, marketing headlines, and data callouts. |
| `weight` | `'normal' \| 'medium' \| 'semibold' \| 'bold'` |  | Explicit font-weight override. Wins over the selected visual type or heading-level default. |
| `children` * | `ReactNode` |  | Heading content. |
| `accessibilityLevel` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` |  | Accessibility level override. When set and different from `level`, applies `aria-level` so the document outline differs from the visual style. |
| `color` | `'primary' \| 'secondary' \| 'disabled' \| 'placeholder' \| 'accent' \| 'inherit'` | `'primary'` | Text color. Themes may add custom colors. |
| `display` | `'inline' \| 'block'` | `'block'` | Display type. Silently overridden to 'block' when maxLines > 0 or hasCapsize is true. |
| `maxLines` | `number` | `0` | Maximum lines before truncation. 0 means no truncation. When set, shows a tooltip on hover if content is truncated. |
| `hasTruncateTooltip` | `boolean \| 'above' \| 'below' \| 'start' \| 'end'` | `true` | Controls tooltip behavior for truncated text. true shows the tooltip at the default position, false disables it, or a placement string ('above' \| 'below' \| 'start' \| 'end') sets a specific position. |
| `wordBreak` | `'break-word' \| 'break-all'` |  | Word break behavior when truncating. Defaults to 'break-all' for single-line truncation, 'break-word' otherwise. |
| `textWrap` | `'wrap' \| 'nowrap' \| 'balance' \| 'pretty'` |  | Text wrapping behavior. |
| `justify` | `'start' \| 'center' \| 'end'` | `'start'` | Text alignment (justification). Uses logical values (start/end) for i18n/RTL compatibility. |
| `hasCapsize` | `boolean` | `false` | Enable optical alignment using text-box-trim. Forces block display. |
| `hasStrikethrough` | `boolean` | `false` | Apply strikethrough text decoration. |
| `id` | `string` |  | HTML id attribute. |

Styling hook class: `.astryx-heading`

### Heading

### Heading

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `level` * | `1 \| 2 \| 3 \| 4 \| 5 \| 6` |  | 标题级别。决定语义 HTML 元素（h1–h6）和来自主题的样式（除非设置了 `type`）。 |
| `type` | `'display-1' \| 'display-2' \| 'display-3'` |  | 展示类型变体。用展示级别的大小（更大、更轻的字重、更紧的行高）覆盖来自 `level` 的视觉样式。主题可以添加自定义视觉类型。`level` 仍然决定用于无障碍的 HTML 元素。用于英雄横幅、营销标题和数据提示。 |
| `weight` | `'normal' \| 'medium' \| 'semibold' \| 'bold'` |  | 显式字重覆盖。优先于所选视觉类型或标题级别的默认值。 |
| `children` * | `ReactNode` |  | 标题内容。 |
| `accessibilityLevel` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` |  | 无障碍级别覆盖。当设置且与 `level` 不同时，应用 `aria-level` 使文档大纲与视觉样式不同。 |
| `color` | `'primary' \| 'secondary' \| 'disabled' \| 'placeholder' \| 'accent' \| 'inherit'` | `'primary'` | 文本颜色。主题可添加自定义颜色。 |
| `display` | `'inline' \| 'block'` | `'block'` | 显示类型。当 maxLines > 0 或 hasCapsize 为 true 时，会静默覆盖为 'block'。 |
| `maxLines` | `number` | `0` | 截断前的最大行数。0 表示不截断。设置后，如果内容被截断，悬停时会显示工具提示。 |
| `hasTruncateTooltip` | `boolean \| 'above' \| 'below' \| 'start' \| 'end'` | `true` | 控制截断文本的工具提示行为。true 在默认位置显示工具提示，false 禁用它，或者放置字符串 ('above' \| 'below' \| 'start' \| 'end') 设置特定位置。 |
| `wordBreak` | `'break-word' \| 'break-all'` |  | 截断时的断词行为。单行截断默认为 'break-all'，其他情况默认为 'break-word'。 |
| `textWrap` | `'wrap' \| 'nowrap' \| 'balance' \| 'pretty'` |  | 文本换行行为。 |
| `justify` | `'start' \| 'center' \| 'end'` | `'start'` | 文本对齐（两端对齐）。使用逻辑值（start/end）以兼容 i18n/RTL。 |
| `hasCapsize` | `boolean` | `false` | 使用 text-box-trim 启用光学对齐。强制块级显示。 |
| `hasStrikethrough` | `boolean` | `false` | 应用删除线文本装饰。 |
| `id` | `string` |  | HTML id 属性。 |

## Files

- `upstream/Heading.doc.mjs`
- `upstream/Text.doc.mjs`
- `upstream/Text.spec.md`
- `upstream/Text.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Text
