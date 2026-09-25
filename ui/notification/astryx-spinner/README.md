# Spinner

An animated loading indicator for processes with unknown duration, such as data fetching or form submission. Supports visible labels, multiple sizes, and a dark background variant. For content with known dimensions, use Skeleton instead.

## Classification

- Category: `notification` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/Spinner.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: An animated loading indicator for processes with unknown duration, such as data fetching or form submission.
- Avoid when: Use for content areas with known dimensions; use Skeleton to preserve layout instead. Stack multiple spinners in the same view; use one to represent the overall loading state.
- Provides: Spinner, Spinner
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: SpinnerShowcase, SpinnerOnMedia, SpinnerSizes, SpinnerWithLabel
- Upstream: Astryx core · Feedback & Status
- Keywords: spinner, loader, loading, circular, progress, spin, activity, busy, indeterminate

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

- `upstream/examples/SpinnerShowcase.tsx` — Spinner: A large spinner indicator. · static: `static/SpinnerShowcase.html`
- `upstream/examples/SpinnerOnMedia.tsx` — Spinner — On Media Shade: Default and onMedia shade spinners for light and dark backgrounds. · static: `static/SpinnerOnMedia.html`
- `upstream/examples/SpinnerSizes.tsx` — Spinner — Sizes: All spinner sizes displayed side by side. · static: `static/SpinnerSizes.html`
- `upstream/examples/SpinnerWithLabel.tsx` — Spinner — With Label: Spinners with text and rich multi-line labels. · static: `static/SpinnerWithLabel.html`

## Documentation

### Spinner

An animated loading indicator for processes with unknown duration, such as data fetching or form submission. Supports visible labels, multiple sizes, and a dark background variant. For content with known dimensions, use Skeleton instead.

**Do**

- Provide a meaningful label to describe what is loading for screen reader users.
- Use the "onMedia" shade when placed on dark or accent-colored backgrounds.

**Don't**

- Use for content areas with known dimensions; use Skeleton to preserve layout instead.
- Stack multiple spinners in the same view; use one to represent the overall loading state.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Spinner size: ring diameter (10px, 14px, 18px, 28px). |
| `shade` | `'default' \| 'onMedia' \| 'subtle' \| 'inherit'` | `'default'` | Color shade for light or dark backgrounds. |
| `label` | `ReactNode` |  | Visible content below the spinner. String labels auto-set aria-label. |
| `aria-label` | `string` | `'Loading'` | Accessible name for screen readers. Defaults to label (if string) or a translated "Loading" from the i18n catalog. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

**Theming variables**

- `--spinner-diameter` — Diameter of the drawn ring. Set it on a size-variant target to retheme what each named size resolves to, e.g. spinner: { 'size:xl': { '--spinner-diameter': '2.5rem' } }. The rendered box is this plus the stroke width on each side, and follows automatically. Any length works: rem, em and calc() are resolved before the ring is drawn. (default `10px (sm), 14px (md), 18px (lg), 28px (xl)`)
- `--spinner-stroke-width` — Stroke width of both circles the ring is drawn from: the moving arc and the track behind it. Set it per size alongside the diameter. One stroke width drives both, so 0 is honoured as a zero-width stroke and paints nothing at all rather than falling back to the default; for an arc with no track behind it, set --spinner-track-color to transparent instead. (default `2px (sm), 3px (md), 3px (lg), 4px (xl)`)
- `--spinner-color` — Color of the moving arc. Defaults to the shade's token, so set it on a shade-variant target to retheme one shade (spinner: { 'shade:subtle': { '--spinner-color': 'var(--color-text-tertiary)' } }), or on the base target to retheme all four. Accepts any color notation, including var(), color-mix() and currentColor. (default `var(--color-accent) (default), var(--color-text-secondary) (subtle), var(--color-on-dark) (onMedia), currentColor (inherit)`)
- `--spinner-track-color` — Color of the track the arc travels on. Set it to `transparent` for an arc with no track. The onMedia and inherit shades draw the track at reduced alpha (30%) so it reads against an arbitrary backdrop; that fade applies to a themed color too. (default `var(--color-track) (default, subtle), var(--color-on-dark) (onMedia), currentColor (inherit)`)
- `--spinner-arc-fraction` — Fraction of the ring the moving arc covers, as a plain number (not a percentage or angle). Set it on a size-variant target the same way as --spinner-diameter, e.g. spinner: { 'size:xl': { '--spinner-arc-fraction': '0.75' } } for a 270deg sweep. Only takes effect once the stylesheet loads; a render with no CSS (SSR, no-JS) always draws the default 135deg arc. (default `0.375 (135deg), same for every size`)

Styling hook class: `.astryx-spinner`

### Spinner

An animated loading indicator for processes with unknown duration, such as data fetching or form submission. Supports visible labels, multiple sizes, and a dark background variant. For content with known dimensions, use Skeleton instead.

**Do**

- Provide a meaningful label to describe what is loading for screen reader users.
- Use the "onMedia" shade when placed on dark or accent-colored backgrounds.

**Don't**

- Use for content areas with known dimensions; use Skeleton to preserve layout instead.
- Stack multiple spinners in the same view; use one to represent the overall loading state.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 旋转器尺寸——环直径（10px、14px、18px、28px）。 |
| `shade` | `'default' \| 'onMedia' \| 'subtle' \| 'inherit'` | `'default'` | 浅色或深色背景的颜色色调。 |
| `label` | `ReactNode` |  | 旋转器下方的可见内容。字符串标签自动设置 aria-label。 |
| `aria-label` | `string` | `'Loading'` | 屏幕阅读器的无障碍名称。默认为 label（如果是字符串）或来自 i18n 词条的已翻译 "Loading"。 |
| `xstyle` | `StyleXStyles` |  | StyleX 样式，用于布局自定义（边距、定位、尺寸）。必须是 stylex.create() 的值，而非内联样式对象如 style={{}}。 |

**Theming variables**

- `--spinner-diameter` — 绘制环的直径。在尺寸变体目标上设置，以重新定义每个命名尺寸的解析值，例如 spinner: { 'size:xl': { '--spinner-diameter': '2.5rem' } }。渲染盒子的尺寸为该值加上两侧的描边宽度，并自动跟随。支持任意长度单位——rem、em 与 calc() 会在绘制前解析。 (default `10px (sm), 14px (md), 18px (lg), 28px (xl)`)
- `--spinner-stroke-width` — 绘制环的两个圆——移动圆弧与其后的轨道——的描边宽度。与直径一起按尺寸设置。同一个描边宽度同时驱动两者，因此 0 会被采纳为零宽描边——什么都不绘制，而不会回退到默认值；若想要没有轨道的圆弧，请改将 --spinner-track-color 设为 transparent。 (default `2px (sm), 3px (md), 3px (lg), 4px (xl)`)
- `--spinner-color` — 运动圆弧的颜色。默认取所在 shade 的令牌，因此可在 shade 变体目标上设置以重新定义单个 shade——spinner: { 'shade:subtle': { '--spinner-color': 'var(--color-text-tertiary)' } }——或在 base 目标上设置以覆盖全部四种。接受任意颜色写法，包括 var()、color-mix() 与 currentColor。 (default `var(--color-accent)（default）、var(--color-text-secondary)（subtle）、var(--color-on-dark)（onMedia）、currentColor（inherit）`)
- `--spinner-track-color` — 圆弧所在轨道的颜色。设为 `transparent` 可得到无轨道的圆弧。onMedia 与 inherit 两种 shade 会以降低的透明度（30%）绘制轨道，以便在任意背景上可辨；该淡化同样作用于主题化的颜色。 (default `var(--color-track)（default、subtle）、var(--color-on-dark)（onMedia）、currentColor（inherit）`)
- `--spinner-arc-fraction` — 运动圆弧覆盖圆环的比例，为纯数字（非百分比或角度）。在尺寸变体目标上设置，方式与 --spinner-diameter 相同，例如 spinner: { 'size:xl': { '--spinner-arc-fraction': '0.75' } } 可得到 270 度的圆弧。仅在样式表加载后生效；无 CSS 的渲染（SSR、无 JS）始终绘制默认的 135 度圆弧。 (default `0.375（135 度），各尺寸相同`)

Styling hook class: `.astryx-spinner`

## Files

- `upstream/Spinner.doc.mjs`
- `upstream/Spinner.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Spinner
