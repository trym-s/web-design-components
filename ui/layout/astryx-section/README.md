# Section

Section is the correct way to create page regions and group related content on a page. Use it for settings groups, form sections, sidebar areas, or any time you need visual separation between parts of a page. If you are tempted to use a Card for a page section, use Section instead.

## Classification

- Category: `layout` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Section.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Section is the correct way to create page regions and group related content on a page.
- Avoid when: Use Card when you mean Section. Cards are for discrete items (one notification, one profile). Sections are for page regions.
- Provides: Section container, Consumer content
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: SectionVariants, SectionWashHighlight, SectionWithDividers
- Upstream: Astryx core · Layout
- Keywords: section, panel, container, group, fieldset, region, block

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

- `src/examples/SectionVariants.tsx` — Section — Variants: All three background variants stacked: section (default surface), muted, and transparent. A quick visual reference for choosing the right variant. · static: `static/SectionVariants.html`
- `src/examples/SectionWashHighlight.tsx` — Section — Default with Wash: A default section stacked with a full-width muted section. Shows how muted draws attention to a specific region like an upgrade prompt or banner. · static: `static/SectionWashHighlight.html`
- `src/examples/SectionWithDividers.tsx` — Section — With Dividers: Adjacent sections separated by bottom dividers, like a settings page. Use dividers when stacking same-variant sections that need visual separation without a background change. · static: `static/SectionWithDividers.html`

## Documentation

### Section

Section is the correct way to create page regions and group related content on a page. Use it for settings groups, form sections, sidebar areas, or any time you need visual separation between parts of a page. If you are tempted to use a Card for a page section, use Section instead.

**Do**

- Use Section for page-level grouping: settings panels, form groups, sidebar regions. These are sections of a page, not discrete items.
- Start with the default variant. Use muted only to call attention to a specific region.
- Add dividers between same-background sections that need separation.
- Combine with a heading + Stack for a typical page section pattern.

**Don't**

- Use Card when you mean Section. Cards are for discrete items (one notification, one profile). Sections are for page regions.

**Anatomy**

- Section container (required) — Painted container that groups a page region.
- Consumer content — Caller-provided content rendered inside the section container.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'section' \| 'transparent' \| 'muted'` | `'section'` | Background variant applied to the section container. |
| `width` | `SizeValue` |  | Width of the section; a number is interpreted as pixels, a string is used as-is. |
| `height` | `SizeValue` |  | Height of the section; a number is interpreted as pixels, a string is used as-is. |
| `maxWidth` | `SizeValue` |  | Maximum width of the section. |
| `minHeight` | `SizeValue` |  | Minimum height of the section. |
| `children` | `ReactNode` |  | Content rendered inside the section. |
| `dividers` | `Array<'top' \| 'bottom' \| 'start' \| 'end'>` |  | Which sides of the section have divider borders. |
| `padding` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` | `4` | Internal padding using the spacing scale (0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10). Use padding={0} for edge-to-edge content. |
| `paddingInline` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Inline (horizontal) padding override. Overrides only the inline-axis padding while preserving block padding from `padding` or the container theme default. Accepts the spacing scale (0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10). |
| `paddingInlineStart` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Inline-start padding override (left in LTR, right in RTL). Overrides paddingInline and padding on that edge only. |
| `paddingInlineEnd` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Inline-end padding override (right in LTR, left in RTL). Overrides paddingInline and padding on that edge only. |
| `paddingBlock` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Block (vertical) padding override. Overrides only the block-axis padding while preserving inline padding from `padding` or the container theme default. Accepts the spacing scale (0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10). |
| `paddingBlockStart` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Block-start (top) padding, using the spacing scale. Overrides paddingBlock and padding on that edge only. |
| `paddingBlockEnd` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Block-end (bottom) padding, using the spacing scale. Overrides paddingBlock and padding on that edge only. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object. |

Styling hook class: `.astryx-section`

### Section

Section is the correct way to create page regions and group related content on a page. Use it for settings groups, form sections, sidebar areas, or any time you need visual separation between parts of a page. If you are tempted to use a Card for a page section, use Section instead.

**Do**

- Use Section for page-level grouping: settings panels, form groups, sidebar regions. These are sections of a page, not discrete items.
- Start with the default variant. Use muted only to call attention to a specific region.
- Add dividers between same-background sections that need separation.
- Combine with a heading + Stack for a typical page section pattern.

**Don't**

- Use Card when you mean Section. Cards are for discrete items (one notification, one profile). Sections are for page regions.

**Anatomy**

- Section container (required) — Painted container that groups a page region.
- Consumer content — Caller-provided content rendered inside the section container.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'section' \| 'transparent' \| 'muted'` | `'section'` | 应用于区域容器的背景变体。 |
| `width` | `SizeValue` |  | 区域的宽度；数字类型会被解释为像素值，字符串类型按原样使用。 |
| `height` | `SizeValue` |  | 区域的高度；数字类型会被解释为像素值，字符串类型按原样使用。 |
| `maxWidth` | `SizeValue` |  | 区域的最大宽度。 |
| `minHeight` | `SizeValue` |  | 区域的最小高度。 |
| `children` | `ReactNode` |  | 在区域内部渲染的内容。 |
| `dividers` | `Array<'top' \| 'bottom' \| 'start' \| 'end'>` |  | 区域的哪些边具有分隔线边框。 |
| `padding` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` | `4` | 使用间距比例的内部内边距（0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10）。使用 padding={0} 实现全宽内容。 |
| `paddingInline` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | 行内（水平）方向内边距覆盖。仅覆盖行内轴内边距，同时保留来自 padding 或容器主题默认值的块内边距。使用间距比例（0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10）。 |
| `paddingInlineStart` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | 行内起始内边距覆盖（LTR 中为左侧，RTL 中为右侧）。仅在该边上覆盖 paddingInline 和 padding。 |
| `paddingInlineEnd` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | 行内结束内边距覆盖（LTR 中为右侧，RTL 中为左侧）。仅在该边上覆盖 paddingInline 和 padding。 |
| `paddingBlock` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | 块（垂直）方向内边距覆盖。仅覆盖块轴内边距，同时保留来自 padding 或容器主题默认值的行内内边距。使用间距比例（0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10）。 |
| `paddingBlockStart` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | 块起始（顶部）内边距，使用间距刻度。仅在该边上覆盖 paddingBlock 和 padding。 |
| `paddingBlockEnd` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | 块结束（底部）内边距，使用间距刻度。仅在该边上覆盖 paddingBlock 和 padding。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式（外边距、定位、尺寸）。必须是 stylex.create() 的值，不能是内联样式对象。 |

Styling hook class: `.astryx-section`

## Files

- `src/Section.doc.mjs`
- `src/Section.spec.md`
- `src/Section.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Section
