# Aspect Ratio

Maintains a fixed width-to-height ratio for its children as its container resizes. Use it for media containers like videos, images, thumbnails, or any content that needs consistent proportions. It takes its width from the container and derives its height from the ratio, so it needs an ancestor with a definite width.

## Classification

- Category: `layout` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/AspectRatio.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Maintains a fixed width-to-height ratio for its children as its container resizes.
- Avoid when: Use for general layout containers; use standard layout components instead. Nest AspectRatio containers; one level is sufficient. Constrain the height on its own. The width comes from the container, so a `height` or `maxHeight` by itself clamps the box off ratio; pair it with `width: "auto"` to size from the height instead. Place it in a shrink-to-fit parent such as `inline-flex`, `width: fit-content` or a floated box. It contributes no intrinsic width there and collapses to zero.
- Provides: Ratio box, Content slot
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: AspectRatioShowcase, AspectRatioCircleImage, AspectRatioImageGallery, AspectRatioSquareImage, AspectRatioWidescreen, AspectRatioWithSkeleton
- Upstream: Astryx core · Layout
- Keywords: aspect-ratio, ratio, proportion, responsive, embed, container, widescreen, thumbnail, letterbox, crop

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

- `src/examples/AspectRatioShowcase.tsx` — Aspect Ratio: Three aspect ratio containers at equal height (1:1, 4:3, and 16:9), each showing an image with its ratio labeled below. · static: `static/AspectRatioShowcase.html`
- `src/examples/AspectRatioCircleImage.tsx` — AspectRatio — Circle Image: Circular container via shape="ellipse" with ratio={1}, ideal for avatars and profile images. · static: `static/AspectRatioCircleImage.html`
- `src/examples/AspectRatioImageGallery.tsx` — AspectRatio — Image Gallery: Grid of images with consistent 4:3 aspect ratios. · static: `static/AspectRatioImageGallery.html`
- `src/examples/AspectRatioSquareImage.tsx` — AspectRatio — Square Image: 1:1 square aspect ratio, ideal for avatars and Instagram-style images. · static: `static/AspectRatioSquareImage.html`
- `src/examples/AspectRatioWidescreen.tsx` — AspectRatio — 16:9 Widescreen Image: 16:9 widescreen aspect ratio wrapping an image. · static: `static/AspectRatioWidescreen.html`
- `src/examples/AspectRatioWithSkeleton.tsx` — AspectRatio — Loading Skeleton: Aspect ratio container with a skeleton loading placeholder. · static: `static/AspectRatioWithSkeleton.html`

## Documentation

### Aspect Ratio

Maintains a fixed width-to-height ratio for its children as its container resizes. Use it for media containers like videos, images, thumbnails, or any content that needs consistent proportions. It takes its width from the container and derives its height from the ratio, so it needs an ancestor with a definite width.

**Do**

- Express the ratio as a fraction for readability — `ratio={16 / 9}` rather than `ratio={1.78}`. It is a number, so the string form `ratio="16/9"` is a type error.
- Use for media that needs consistent proportions across screen sizes.
- Use `fit="cover"` for images and video so the component sizes the child; the child should not repeat `width`/`height`/`objectFit` styles.
- Pass one child. With `fit` set, every direct child is stretched to fill the box, so put an overlay or caption inside a single wrapper child rather than passing it as a second child.
- Describe media children with `alt`, or `alt=""` when the image is decorative. AspectRatio adds no role and no accessible name of its own, so the child carries the whole accessible description.
- For a breakpoint-dependent ratio, override the ratio responsively: pass an `aspectRatio` rule via `xstyle` (StyleX), or override `aspect-ratio` from your own unlayered CSS under a `@media`/`@container` rule; component styles live in the `astryx-base` cascade layer, so unlayered consumer CSS wins. Give an `xstyle` rule a `default` branch alongside the conditional one (`{default: 3, '@container ...': '3 / 2'}`); with only the conditional branch the ratio is unset outside the query and the box collapses.

**Don't**

- Use for general layout containers; use standard layout components instead.
- Nest AspectRatio containers; one level is sufficient.
- Constrain the height on its own. The width comes from the container, so a `height` or `maxHeight` by itself clamps the box off ratio; pair it with `width: "auto"` to size from the height instead.
- Place it in a shrink-to-fit parent such as `inline-flex`, `width: fit-content` or a floated box. It contributes no intrinsic width there and collapses to zero.

**Anatomy**

- Ratio box (required) — The outer element that holds the aspect ratio and clips overflow. Carries the `astryx-aspect-ratio` theme target, and the elliptical clip when `shape` is `ellipse`.
- Content slot (required) — A wrapper that fills the ratio box and positions the child. With `fit` set it also sizes the child; without it the child styles itself.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ratio` * | `number` |  | Aspect ratio as width/height (e.g. 16/9, 1). Emitted as a class-level declaration (never inline), so `xstyle` rules or unlayered consumer CSS can override it responsively. |
| `shape` | `'rectangle' \| 'ellipse'` | `'rectangle'` | Container shape. Both respect the `ratio`. `ellipse` clips to an oval (a circle when `ratio={1}`). |
| `fit` | `'cover' \| 'contain' \| 'center'` |  | How the child is sized inside the ratio box. `cover` fills and crops media, `contain` fills and letterboxes, `center` keeps the natural size centered. When omitted, the child styles itself. |
| `children` * | `ReactNode` |  | Content positioned absolutely to fill the container. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-aspect-ratio`

### Aspect Ratio

Maintains a fixed width-to-height ratio for its children as its container resizes. Use it for media containers like videos, images, thumbnails, or any content that needs consistent proportions. It takes its width from the container and derives its height from the ratio, so it needs an ancestor with a definite width.

**Do**

- Express the ratio as a fraction for readability — `ratio={16 / 9}` rather than `ratio={1.78}`. It is a number, so the string form `ratio="16/9"` is a type error.
- Use for media that needs consistent proportions across screen sizes.
- Use `fit="cover"` for images and video so the component sizes the child; the child should not repeat `width`/`height`/`objectFit` styles.
- Pass one child. With `fit` set, every direct child is stretched to fill the box, so put an overlay or caption inside a single wrapper child rather than passing it as a second child.
- Describe media children with `alt`, or `alt=""` when the image is decorative. AspectRatio adds no role and no accessible name of its own, so the child carries the whole accessible description.
- For a breakpoint-dependent ratio, override the ratio responsively: pass an `aspectRatio` rule via `xstyle` (StyleX), or override `aspect-ratio` from your own unlayered CSS under a `@media`/`@container` rule; component styles live in the `astryx-base` cascade layer, so unlayered consumer CSS wins. Give an `xstyle` rule a `default` branch alongside the conditional one (`{default: 3, '@container ...': '3 / 2'}`); with only the conditional branch the ratio is unset outside the query and the box collapses.

**Don't**

- Use for general layout containers; use standard layout components instead.
- Nest AspectRatio containers; one level is sufficient.
- Constrain the height on its own. The width comes from the container, so a `height` or `maxHeight` by itself clamps the box off ratio; pair it with `width: "auto"` to size from the height instead.
- Place it in a shrink-to-fit parent such as `inline-flex`, `width: fit-content` or a floated box. It contributes no intrinsic width there and collapses to zero.

**Anatomy**

- Ratio box (required) — The outer element that holds the aspect ratio and clips overflow. Carries the `astryx-aspect-ratio` theme target, and the elliptical clip when `shape` is `ellipse`.
- Content slot (required) — A wrapper that fills the ratio box and positions the child. With `fit` set it also sizes the child; without it the child styles itself.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ratio` * | `number` |  | 宽高比，以宽/高表示（例如 16/9、1）。以类级声明输出（非内联样式），可通过 `xstyle` 规则或未分层的（unlayered）消费者 CSS 做响应式覆盖。 |
| `shape` | `'rectangle' \| 'ellipse'` | `'rectangle'` | 容器形状。两种形状都遵循 `ratio`。`ellipse` 裁剪为椭圆（`ratio={1}` 时为正圆）。 |
| `fit` | `'cover' \| 'contain' \| 'center'` |  | 子元素在比例框内的布局方式。`cover` 填满并裁剪媒体，`contain` 填满并留边，`center` 保持原始尺寸居中。省略时子元素自行设置样式。 |
| `children` * | `ReactNode` |  | 通过绝对定位填充容器的内容。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式（外边距、定位、尺寸）。必须是 stylex.create() 的值，而不是像 style={{}} 这样的内联样式对象。 |

Styling hook class: `.astryx-aspect-ratio`

## Files

- `src/AspectRatio.doc.mjs`
- `src/AspectRatio.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/AspectRatio
