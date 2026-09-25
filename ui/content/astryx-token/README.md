# Token

Token is a small, inline element for representing discrete pieces of associated data, like tags, categories, or selections. Use it to label content, show active filters, or represent removable items like selected recipients in a compose field.

## Classification

- Category: `content` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Token.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Token is a small, inline element for representing discrete pieces of associated data, like tags, categories, or selections.
- Avoid when: Don't use tokens for primary actions or navigation; use Button or Link instead. Tokens are for displaying metadata, not triggering workflows. Don't hide the label unless the icon alone is universally understood. A color dot without text is ambiguous. Don't mix too many colors in one token group. Stick to two or three meaningful colors so the palette stays scannable.
- Provides: Icon, Label, End content, Remove button
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: TokenShowcase, TokenClickable, TokenColors, TokenEndContent, TokenIcon, TokenRemovable
- Upstream: Astryx core · Content
- Keywords: token, chip, tag, pill, label, removable, dismissible, filter chip, closable

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

- `src/examples/TokenShowcase.tsx` — Token · static: `static/TokenShowcase.html`
- `src/examples/TokenClickable.tsx` — Token — Clickable: Interactive tokens that respond to clicks. Use for toggleable filters or tokens that open a detail view when selected. · static: `static/TokenClickable.html`
- `src/examples/TokenColors.tsx` — Token — Colors: All 11 color variants in default and disabled states. Use color to categorize entities or convey status at a glance. · static: `static/TokenColors.html`
- `src/examples/TokenEndContent.tsx` — Token — End Content: Tokens with trailing content like a count badge or status indicator after the label. Use for notification counts, item quantities, or compact status info. · static: `static/TokenEndContent.html`
- `src/examples/TokenIcon.tsx` — Token — Icon: Tokens with a leading icon that identifies the entity type. Use when the icon helps users recognize the token category faster, like a user icon for people or a tag icon for labels. · static: `static/TokenIcon.html`
- `src/examples/TokenRemovable.tsx` — Token — Removable: Tokens with a dismiss button for selections the user can undo. Use in multi-select fields, active filters, or any list of user-chosen items. · static: `static/TokenRemovable.html`

## Documentation

### Token

Token is a small, inline element for representing discrete pieces of associated data, like tags, categories, or selections. Use it to label content, show active filters, or represent removable items like selected recipients in a compose field.

**Do**

- Use color to distinguish categories (for example, green for "Active", red for "Blocked", blue for "In Review") so users can scan status at a glance.
- Provide an onRemove callback when tokens represent user selections that can be undone, like filters or multi-select values.
- Add a leading icon when it helps identify the token type faster, like a person icon for user tokens or a tag icon for labels.
- Keep labels short: one to three words. Tokens truncate with ellipsis when the text overflows.

**Don't**

- Don't use tokens for primary actions or navigation; use Button or Link instead. Tokens are for displaying metadata, not triggering workflows.
- Don't hide the label unless the icon alone is universally understood. A color dot without text is ambiguous.
- Don't mix too many colors in one token group. Stick to two or three meaningful colors so the palette stays scannable.

**Anatomy**

- Icon — A leading icon that identifies the token type, like a user avatar or category symbol.
- Label (required) — The visible text. Also used as the accessible name when isLabelHidden is true.
- End content — Trailing content after the label, like a count badge or status dot.
- Remove button — An X button that appears when onRemove is provided, letting users dismiss the token.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Text label displayed inside the token. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | The size of the token. |
| `color` | `'default' \| 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'cyan' \| 'blue' \| 'purple' \| 'pink' \| 'gray'` | `'default'` | Color variant of the token. |
| `icon` | `ReactNode` |  | Optional icon rendered before the label. |
| `isDisabled` | `boolean` | `false` | Whether the token is disabled; reduces opacity and blocks interactions. |
| `onRemove` | `(e: React.MouseEvent) => void` |  | Callback fired when the remove button is clicked. When provided, an X button is rendered inside the token. |
| `onClick` | `(e: React.MouseEvent) => void` |  | Click handler. When provided, the token renders as a <span> container with an invisible <button> inside for accessibility. |
| `href` | `string` |  | Link URL. When provided, the token renders as an <a> element. The destination follows the shared navigation rule described on the Link `href` prop. |
| `description` | `string` |  | Accessible description applied via aria-description on the root element. |
| `endContent` | `ReactNode` |  | Content rendered after the label and before the remove button. |
| `isLabelHidden` | `boolean` | `false` | Visually hides the label using a screen-reader-only clip technique; the label remains accessible. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-token`

### Token

Token is a small, inline element for representing discrete pieces of associated data, like tags, categories, or selections. Use it to label content, show active filters, or represent removable items like selected recipients in a compose field.

**Do**

- Use color to distinguish categories (for example, green for "Active", red for "Blocked", blue for "In Review") so users can scan status at a glance.
- Provide an onRemove callback when tokens represent user selections that can be undone, like filters or multi-select values.
- Add a leading icon when it helps identify the token type faster, like a person icon for user tokens or a tag icon for labels.
- Keep labels short: one to three words. Tokens truncate with ellipsis when the text overflows.

**Don't**

- Don't use tokens for primary actions or navigation; use Button or Link instead. Tokens are for displaying metadata, not triggering workflows.
- Don't hide the label unless the icon alone is universally understood. A color dot without text is ambiguous.
- Don't mix too many colors in one token group. Stick to two or three meaningful colors so the palette stays scannable.

**Anatomy**

- Icon — A leading icon that identifies the token type, like a user avatar or category symbol.
- Label (required) — The visible text. Also used as the accessible name when isLabelHidden is true.
- End content — Trailing content after the label, like a count badge or status dot.
- Remove button — An X button that appears when onRemove is provided, letting users dismiss the token.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | 显示在标记内部的文本标签。 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 标记的大小。 |
| `color` | `'default' \| 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'cyan' \| 'blue' \| 'purple' \| 'pink' \| 'gray'` | `'default'` | 标记的颜色变体。 |
| `icon` | `ReactNode` |  | 在标签前渲染的可选图标。 |
| `isDisabled` | `boolean` | `false` | 标记是否被禁用；降低透明度并阻止交互。 |
| `onRemove` | `(e: React.MouseEvent) => void` |  | 点击移除按钮时触发的回调。提供时，标记内会渲染一个 X 按钮。 |
| `onClick` | `(e: React.MouseEvent) => void` |  | 点击处理函数。提供时，标记渲染为 <span> 容器，内部包含不可见的 <button> 以确保可访问性。 |
| `href` | `string` |  | 链接 URL。提供时，标记渲染为 <a> 元素。 |
| `description` | `string` |  | 通过 aria-description 应用于根元素的无障碍描述。 |
| `endContent` | `ReactNode` |  | 在标签之后、移除按钮之前渲染的内容。 |
| `isLabelHidden` | `boolean` | `false` | 使用仅屏幕阅读器可见的裁剪技术视觉隐藏标签；标签仍然保持可访问性。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式（外边距、定位、尺寸）。必须是 stylex.create() 的值，不能是内联样式对象如 style={{}}。 |

Styling hook class: `.astryx-token`

## Files

- `src/Token.doc.mjs`
- `src/Token.tsx`
- `src/TokenLink.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Token
