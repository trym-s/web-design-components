# Icon

Icons are small visual symbols that represent actions, objects, or concepts. They improve scannability and reinforce meaning alongside text. Supports both direct SVG components and semantic icon names that adapt to the active theme.

## Classification

- Category: `content` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Icon.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Icons are small visual symbols that represent actions, objects, or concepts.
- Avoid when: Use icons as the sole means of conveying meaning; always provide a text alternative. Resize icons with arbitrary pixel values; use the provided size props. Mix icon styles (e.g. outline and filled) within the same context. Render raw SVG elements; always wrap in Icon for consistent sizing and color. Pass a `name` prop; Icon uses `icon` (not `name`) to specify which icon to render.
- Provides: Glyph
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: IconShowcase, IconNonSemanticColors, IconSemanticColors, IconSizes, IconStatusIcons
- Upstream: Astryx core · Content
- Keywords: icon, svg, glyph, symbol, pictogram, graphic, vector

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

- `src/examples/IconShowcase.tsx` — Icon · static: `static/IconShowcase.html`
- `src/examples/IconNonSemanticColors.tsx` — Icon — Non-Semantic Colors: Non-semantic color palette for icons. · static: `static/IconNonSemanticColors.html`
- `src/examples/IconSemanticColors.tsx` — Icon — Semantic Colors: All semantic icon color variants with labels. · static: `static/IconSemanticColors.html`
- `src/examples/IconSizes.tsx` — Icon — Size Variants: All icon sizes from extra-small to large. · static: `static/IconSizes.html`
- `src/examples/IconStatusIcons.tsx` — Icon — Status Indicators: Status list using semantic icons for success, warning, error, and info. · static: `static/IconStatusIcons.html`

## Documentation

### Icon

Icons are small visual symbols that represent actions, objects, or concepts. They improve scannability and reinforce meaning alongside text. Supports both direct SVG components and semantic icon names that adapt to the active theme.

**Do**

- Use semantic icon names when available; they adapt to theme changes automatically.
- Override icons through the theme, not globally: defineTheme({icons: {close: <XMarkIcon />}}) scopes the swap to the active <Theme>, and extends shallow-merges it into derived themes. registerIcons() mutates a process-wide registry and warns in dev, so keep it for app bootstrap rather than making it a library's theming seam.
- Pair icons with text labels for accessibility; icon-only elements need an accessible label.
- For a meaningful standalone icon (no adjacent text), give it an accessible name via the `label` prop: it sets role="img" + aria-label and unhides the icon.
- Use color tokens for icon colors, not hardcoded hex values.
- Be mindful of context; decorative icons in compact components can distract rather than help.

**Don't**

- Use icons as the sole means of conveying meaning; always provide a text alternative.
- Resize icons with arbitrary pixel values; use the provided size props.
- Mix icon styles (e.g. outline and filled) within the same context.
- Render raw SVG elements; always wrap in Icon for consistent sizing and color.
- Pass a `name` prop; Icon uses `icon` (not `name`) to specify which icon to render.

**Anatomy**

- Glyph (required) — Visual symbol rendered for the selected icon.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` * | `IconName \| ComponentType<SVGProps>` |  | Semantic icon name or SVG component. Valid semantic names: close, chevronDown, chevronLeft, chevronRight, chevronsLeft, chevronsRight, check, success, error, warning, info, calendar, clock, externalLink, menu, moreHorizontal, search, arrowUp, arrowDown, arrowsUpDown, funnel, eyeSlash, viewColumns, copy, checkDouble, wrench, stop, microphone. For any icon not in this list, pass an SVG component directly (e.g. import from lucide-react or @heroicons/react). Note: this prop is called `icon`, not `name`. |
| `color` | `'primary' \| 'secondary' \| 'tertiary' \| 'disabled' \| 'accent' \| 'success' \| 'error' \| 'warning' \| 'inherit'` | `'inherit'` | Color variant mapped to Astryx icon color tokens. |
| `size` | `'xsm' \| 'sm' \| 'md' \| 'lg'` | `Contextual; otherwise 'md'` | Icon size. An explicit value wins. When omitted, Icon uses the nearest default supplied by an owning Astryx component for its icon slot, then falls back to md when no contextual default exists. |
| `label` | `string` |  | Accessible name for a MEANINGFUL, standalone icon (a status glyph or icon-only indicator with no adjacent text). Setting it exposes the icon to screen readers as role="img" with this text as the accessible name (aria-label) and removes the default aria-hidden. Omit it (default) for decorative icons and the icon stays hidden from assistive tech (aria-hidden="true"). This is the accessible-name / alt-text prop for icons: one prop instead of manually setting aria-label + role + aria-hidden. An empty string is treated as decorative. Do not set it when an interactive parent (Button, IconButton, link) already names the control. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for customization (color, size, opacity). Folded into the icon's own stylex.props() call so it composes with the base color/size styles. Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-icon`

### Icon

Icons are small visual symbols that represent actions, objects, or concepts. They improve scannability and reinforce meaning alongside text. Supports both direct SVG components and semantic icon names that adapt to the active theme.

**Do**

- Use semantic icon names when available; they adapt to theme changes automatically.
- Pair icons with text labels for accessibility; icon-only elements need an accessible label.
- Use color tokens for icon colors, not hardcoded hex values.
- Be mindful of context; decorative icons in compact components can distract rather than help.

**Don't**

- Use icons as the sole means of conveying meaning; always provide a text alternative.
- Resize icons with arbitrary pixel values; use the provided size props.
- Mix icon styles (e.g. outline and filled) within the same context.
- Render raw SVG elements; always wrap in Icon for consistent sizing and color.
- Pass a `name` prop; Icon uses `icon` (not `name`) to specify which icon to render.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` * | `IconName \| ComponentType<SVGProps>` |  | 语义图标名称或 SVG 组件。有效语义名称：close, chevronDown, chevronLeft, chevronRight, chevronsLeft, chevronsRight, check, success, error, warning, info, calendar, clock, externalLink, menu, moreHorizontal, search, arrowUp, arrowDown, arrowsUpDown, funnel, eyeSlash, viewColumns, copy, checkDouble, wrench, stop, microphone。列表之外的图标请直接传入 SVG 组件。 |
| `color` | `'primary' \| 'secondary' \| 'tertiary' \| 'disabled' \| 'accent' \| 'success' \| 'error' \| 'warning' \| 'inherit'` | `'inherit'` | 映射到 Astryx 图标颜色令牌的颜色变体。 |
| `size` | `'xsm' \| 'sm' \| 'md' \| 'lg'` | `上下文默认值；否则为 'md'` | 图标尺寸。显式值优先。省略时，Icon 使用最近的 Astryx 所属组件为其图标槽提供的默认尺寸；如果没有上下文默认值，则回退为 md。 |
| `label` | `string` |  | 有含义的独立图标的可访问名称（无相邻文字的状态图标或纯图标指示器）。设置后会将图标以 role="img" 暴露给辅助技术，并以该文本作为可访问名称（aria-label），同时移除默认的 aria-hidden。省略（默认）用于装饰性图标，图标对辅助技术保持隐藏（aria-hidden="true"）。空字符串按装饰性处理。当交互式父元素（Button、IconButton、链接）已命名该控件时请勿设置。 |
| `xstyle` | `StyleXStyles` |  | 用于自定义的 StyleX 样式（颜色、尺寸、不透明度）。会并入图标自身的 stylex.props() 调用，从而与基础的颜色/尺寸样式组合。必须是 stylex.create() 的值，而不是像 style={{}} 这样的内联样式对象。 |

Styling hook class: `.astryx-icon`

## Files

- `src/Icon.doc.mjs`
- `src/Icon.spec.md`
- `src/Icon.tsx`
- `src/IconDefaultSizeContext.ts`
- `src/IconSize.stylex.ts`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Icon
