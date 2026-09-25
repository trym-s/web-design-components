# Circular Progress

A circular progress indicator that shows completion as a ring or arc. Use it for upload progress, score displays, dashboard gauges, or compact progress where horizontal space is limited. Complements ProgressBar for radial layouts.

## Classification

- Category: `notification` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/CircularProgress.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A circular progress indicator that shows completion as a ring or arc.
- Avoid when: Use circular progress for long text labels; use ProgressBar instead, which has more room for label and value display. Use an indeterminate CircularProgress for small inline loading states; Spinner is the inline indicator.
- Provides: CircularProgress, CircularProgress
- Requires: React 19 with `@astryxdesign/lab` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: CircularProgress
- Upstream: Astryx lab (experimental, canary-only upstream) · Feedback & Status
- Keywords: circular, progress, radial, ring, arc, determinate, indeterminate, gauge, meter, donut

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

- `src/stories/CircularProgress.stories.tsx` — Storybook — CircularProgress

## Documentation

### Circular Progress

A circular progress indicator that shows completion as a ring or arc. Use it for upload progress, score displays, dashboard gauges, or compact progress where horizontal space is limited. Complements ProgressBar for radial layouts.

**Do**

- Pass a value for determinate progress; set isIndeterminate when the duration is unknown.
- Show the value with hasValueLabel, or pass children for custom center content: an icon or short label.
- Always provide a label, even though it is visually hidden by default; screen readers need it.

**Don't**

- Use circular progress for long text labels; use ProgressBar instead, which has more room for label and value display.
- Use an indeterminate CircularProgress for small inline loading states; Spinner is the inline indicator.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | `0` | Current value. Ignored when isIndeterminate is true. |
| `max` | `number` | `100` | Maximum value. |
| `label` * | `string` |  | Accessible label for screen readers. |
| `isLabelHidden` | `boolean` | `true` | Visually hide the label (remains accessible). Defaults to true since circular progress typically shows center content instead. |
| `hasValueLabel` | `boolean` | `false` | Show the formatted value (e.g. "75%") in the center of the ring. Ignored when isIndeterminate is true or when children provide custom center content. |
| `formatValueLabel` | `(value: number, max: number) => string` |  | Custom value label formatter; defaults to a percentage string. |
| `children` | `ReactNode` |  | Content displayed in the center of the ring: percentage, icon, or custom content. Takes precedence over hasValueLabel. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Diameter of the progress ring (32px, 48px, 64px). |
| `variant` | `'accent' \| 'success' \| 'warning' \| 'error' \| 'neutral'` | `'accent'` | Semantic color variant for the progress fill. |
| `isIndeterminate` | `boolean` | `false` | Animated spinning indicator for unknown progress. Respects prefers-reduced-motion by slowing the animation. |
| `isDisabled` | `boolean` | `false` | Visually disabled: grays out the ring and text. Use for canceled or inactive operations. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning). Must be a stylex.create() value. |

Styling hook class: `.astryx-circular-progress`, `.astryx-circular-progress-track`, `.astryx-circular-progress-fill`

**Example — Determinate with value label**

```tsx
<CircularProgress value={75} label="Upload progress" hasValueLabel />
```

**Example — Indeterminate**

```tsx
<CircularProgress isIndeterminate label="Loading..." />
```

**Example — Custom value format**

```tsx
<CircularProgress value={3.2} max={5} label="Disk usage" hasValueLabel formatValueLabel={(v, m) => `${v} GB / ${m} GB`} />
```

**Example — Disabled**

```tsx
<CircularProgress value={30} label="Canceled" isDisabled hasValueLabel />
```

### Circular Progress

A circular progress indicator that shows completion as a ring or arc. Use it for upload progress, score displays, dashboard gauges, or compact progress where horizontal space is limited. Complements ProgressBar for radial layouts.

**Do**

- Pass a value for determinate progress; set isIndeterminate when the duration is unknown.
- Show the value with hasValueLabel, or pass children for custom center content: an icon or short label.
- Always provide a label, even though it is visually hidden by default; screen readers need it.

**Don't**

- Use circular progress for long text labels; use ProgressBar instead, which has more room for label and value display.
- Use an indeterminate CircularProgress for small inline loading states; Spinner is the inline indicator.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | `0` | 当前值。当 isIndeterminate 为 true 时忽略。 |
| `max` | `number` | `100` | 最大值。 |
| `label` * | `string` |  | 屏幕阅读器的无障碍标签（必填）。 |
| `isLabelHidden` | `boolean` | `true` | 视觉上隐藏标签（仍保持无障碍可访问性）。默认为 true，因为圆形进度条通常显示中心内容。 |
| `hasValueLabel` | `boolean` | `false` | 在环形中心显示格式化的值（如 "75%"）。当 isIndeterminate 为 true 或提供了 children 自定义中心内容时忽略。 |
| `formatValueLabel` | `(value: number, max: number) => string` |  | 自定义值标签格式化函数；默认为百分比字符串。 |
| `children` | `ReactNode` |  | 在环形中心显示的内容：百分比、图标或自定义内容。优先于 hasValueLabel。 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 进度环的直径（32px、48px、64px）。 |
| `variant` | `'accent' \| 'success' \| 'warning' \| 'error' \| 'neutral'` | `'accent'` | 进度填充的语义颜色变体。 |
| `isIndeterminate` | `boolean` | `false` | 用于未知进度的旋转动画指示器。遵循 prefers-reduced-motion，减速播放动画。 |
| `isDisabled` | `boolean` | `false` | 视觉禁用：环形和文本变灰。用于已取消或非活动的操作。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式。必须是 stylex.create() 的值。 |

Styling hook class: `.astryx-circular-progress`, `.astryx-circular-progress-track`, `.astryx-circular-progress-fill`

## Files

- `src/CircularProgress.doc.mjs`
- `src/CircularProgress.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
