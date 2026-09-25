# Center

Center aligns content to the middle of its container. Use it for empty states, loading screens, login forms, or any content that should sit in the center of the available space.

## Classification

- Category: `layout` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Center.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Center aligns content to the middle of its container.
- Avoid when: Wrap large page sections in Center. Use Layout or AppShell for page-level structure. Use Center for horizontal lists of items. Use Stack with hAlign="center" instead.
- Provides: Container, Content
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: CenterShowcase, CenterHorizontal, CenterInsideACard
- Upstream: Astryx core · Layout
- Keywords: center, centered, centering, align, alignment, justify, flexbox, middle

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

- `src/examples/CenterShowcase.tsx` — Center: Content centered horizontally and vertically inside a fixed-height container. · static: `static/CenterShowcase.html`
- `src/examples/CenterHorizontal.tsx` — Center — Horizontal Center: A formatting control group centered with axis="horizontal" in the default horizontal writing mode. In other writing modes, Center currently follows the flex main axis rather than guaranteeing physical horizontal centering. · static: `static/CenterHorizontal.html`
- `src/examples/CenterInsideACard.tsx` — Center — Vertical & Horizontal Center: An empty state with an icon, heading, and description centered both vertically and horizontally inside a card. This is the most common use of Center: placing content in the middle of a fixed-height area like a panel, card, or content region. The height prop defines the centering space. · static: `static/CenterInsideACard.html`

## Documentation

### Center

Center aligns content to the middle of its container. Use it for empty states, loading screens, login forms, or any content that should sit in the center of the available space.

**Do**

- Use a single-axis value only in horizontal writing, or after verifying the active writing mode. In vertical writing, the current implementation follows flex main/cross axes rather than the physical prop names.
- In horizontal writing, give Center height when using axis="vertical"; centering needs available space on the selected flex axis.
- Use isInline to center small elements like icons or badges within a line of text without breaking the text flow.
- Keep semantic structure and accessible names on the content. Center is a layout-only container and does not add a role or label.

**Don't**

- Wrap large page sections in Center. Use Layout or AppShell for page-level structure.
- Use Center for horizontal lists of items. Use Stack with hAlign="center" instead.

**Anatomy**

- Container (required) — A flexbox wrapper that aligns its children to the center along the chosen axis.
- Content (required) — Any children passed to Center. Typically a card, form, spinner, or empty state message.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `axis` | `'both' \| 'horizontal' \| 'vertical'` | `'both'` | Which Center mode to use. In horizontal writing, "horizontal" centers the flex main/inline axis and "vertical" centers the cross/block axis. In vertical writing, current single-axis behavior follows those logical flex axes rather than the physical names; "both" still centers both axes. |
| `width` | `SizeValue` |  | Container width (px or CSS value). |
| `height` | `SizeValue` |  | Container height (px or CSS value). |
| `maxWidth` | `SizeValue` |  | Maximum container width (px or CSS value). |
| `minHeight` | `SizeValue` |  | Minimum container height (px or CSS value). |
| `padding` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Inner padding on all sides, using the spacing scale (0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10). Matches the padding prop on Stack, Card, LayoutContent, and LayoutPanel. Pass as a JSX number expression e.g. padding={3}. |
| `paddingInline` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Logical inline-axis padding, using the spacing scale. Overrides padding on the inline axis when both are set. |
| `paddingInlineStart` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Logical inline-start padding, using the spacing scale. Its resolved physical edge depends on writing mode and direction. Overrides paddingInline and padding on that edge only. |
| `paddingInlineEnd` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Logical inline-end padding, using the spacing scale. Its resolved physical edge depends on writing mode and direction. Overrides paddingInline and padding on that edge only. |
| `paddingBlock` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Logical block-axis padding, using the spacing scale. Overrides padding on the block axis when both are set. |
| `paddingBlockStart` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Logical block-start padding, using the spacing scale. Its resolved physical edge depends on writing mode. Overrides paddingBlock and padding on that edge only. |
| `paddingBlockEnd` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Logical block-end padding, using the spacing scale. Its resolved physical edge depends on writing mode. Overrides paddingBlock and padding on that edge only. |
| `isInline` | `boolean` | `false` | Use inline-flex (useful for text/icons). |
| `children` | `ReactNode` |  | Content to center. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-center`

### Center

Center aligns content to the middle of its container. Use it for empty states, loading screens, login forms, or any content that should sit in the center of the available space.

**Do**

- Use a single-axis value only in horizontal writing, or after verifying the active writing mode. In vertical writing, the current implementation follows flex main/cross axes rather than the physical prop names.
- In horizontal writing, give Center height when using axis="vertical"; centering needs available space on the selected flex axis.
- Use isInline to center small elements like icons or badges within a line of text without breaking the text flow.
- Keep semantic structure and accessible names on the content. Center is a layout-only container and does not add a role or label.

**Don't**

- Wrap large page sections in Center. Use Layout or AppShell for page-level structure.
- Use Center for horizontal lists of items. Use Stack with hAlign="center" instead.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `axis` | `'both' \| 'horizontal' \| 'vertical'` | `'both'` | 选择 Center 模式。横向书写时，horizontal 对应 flex 主轴/行内轴，vertical 对应交叉轴/块轴；纵向书写时，当前单轴行为仍跟随这些逻辑 flex 轴，而不是属性名暗示的物理轴。 |
| `width` | `number \| string` |  | 容器宽度（px 或 CSS 值）。 |
| `height` | `number \| string` |  | 容器高度（px 或 CSS 值）。 |
| `padding` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | 所有方向的内边距，使用间距刻度（0、0.5、1、1.5、2、3、4、5、6、8、10）。与 Stack、Card、LayoutContent 和 LayoutPanel 的 padding 属性一致。在 JSX 中使用数字表达式 e.g. padding={3}。 |
| `paddingInline` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | 逻辑行内轴内边距，使用间距刻度。两者同时设置时在行内轴上覆盖 padding。 |
| `paddingInlineStart` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | 逻辑行内起始内边距，使用间距刻度。解析后的物理边取决于书写模式和方向。仅在该边上覆盖 paddingInline 和 padding。 |
| `paddingInlineEnd` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | 逻辑行内结束内边距，使用间距刻度。解析后的物理边取决于书写模式和方向。仅在该边上覆盖 paddingInline 和 padding。 |
| `paddingBlock` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | 逻辑块轴内边距，使用间距刻度。两者同时设置时在块轴上覆盖 padding。 |
| `paddingBlockStart` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | 逻辑块起始内边距，使用间距刻度。解析后的物理边取决于书写模式。仅在该边上覆盖 paddingBlock 和 padding。 |
| `paddingBlockEnd` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | 逻辑块结束内边距，使用间距刻度。解析后的物理边取决于书写模式。仅在该边上覆盖 paddingBlock 和 padding。 |
| `isInline` | `boolean` | `false` | 使用 inline-flex（适用于文本/图标）。 |
| `children` | `ReactNode` |  | 要居中的内容。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式（外边距、定位、尺寸）。必须是 stylex.create() 的值，不能是 style={{}} 这样的内联样式对象。 |

Styling hook class: `.astryx-center`

## Files

- `src/Center.doc.mjs`
- `src/Center.spec.md`
- `src/Center.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Center
