# Progress Bar

A horizontal bar showing the completion progress of a task. Use it for operations where the duration is known, or as an animated indicator when progress can't be calculated. Supports semantic color variants, value labels, and custom formatting.

## Classification

- Category: `notification` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/ProgressBar.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A horizontal bar showing the completion progress of a task.
- Avoid when: Place icons or labels inside the bar; compose them alongside it using layout components. Use a progress bar for instant actions; it's meant for operations that take noticeable time. Use multiple progress bars stacked together for the same operation; use one bar with a value label instead.
- Provides: Progress bar, Label, Value text, Track, Fill, Mark
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ProgressBarShowcase, ProgressBarCustomFormat, ProgressBarIndeterminate, ProgressBarSemanticVariants, ProgressBarWithValueLabel
- Upstream: Astryx core · Feedback & Status
- Keywords: progressbar, progress, loader, loading, linear, determinate, indeterminate, meter

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

- `src/examples/ProgressBarShowcase.tsx` — Progress Bar: A progress bar filled to 60%. · static: `static/ProgressBarShowcase.html`
- `src/examples/ProgressBarCustomFormat.tsx` — ProgressBar — Custom Format: Progress bar with a custom value label showing disk usage in GB. · static: `static/ProgressBarCustomFormat.html`
- `src/examples/ProgressBarIndeterminate.tsx` — ProgressBar — Indeterminate: Indeterminate progress bar for operations with unknown duration. · static: `static/ProgressBarIndeterminate.html`
- `src/examples/ProgressBarSemanticVariants.tsx` — ProgressBar — Semantic Variants: All semantic color variants stacked vertically. · static: `static/ProgressBarSemanticVariants.html`
- `src/examples/ProgressBarWithValueLabel.tsx` — ProgressBar — With Value Label: Progress bar with its current percentage displayed. · static: `static/ProgressBarWithValueLabel.html`

## Documentation

### Progress Bar

A horizontal bar showing the completion progress of a task. Use it for operations where the duration is known, or as an animated indicator when progress can't be calculated. Supports semantic color variants, value labels, and custom formatting.

**Do**

- Use a determinate bar when the total amount of work is known, and indeterminate when it's not.
- Choose a color variant that matches the context: accent for general progress, success for completion, warning or error for alerts.
- Always provide a label, even if hidden; screen readers need it to announce what's loading.

**Don't**

- Place icons or labels inside the bar; compose them alongside it using layout components.
- Use a progress bar for instant actions; it's meant for operations that take noticeable time.
- Use multiple progress bars stacked together for the same operation; use one bar with a value label instead.

**Anatomy**

- Progress bar (required) — Container arranging the label row and progress track.
- Label (required) — Text naming the operation, optionally hidden visually while remaining accessible.
- Value text — Formatted determinate value shown beside the label when requested.
- Track (required) — Remaining-progress rail that carries the progressbar semantics.
- Fill (required) — Painted segment showing completed progress or indeterminate movement.
- Mark — Labeled target tick positioned on a determinate track.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | accessible label |
| `value` | `number` | `0` | Current value (ignored when indeterminate). |
| `max` | `number` | `100` | Maximum value. |
| `isLabelHidden` | `boolean` | `false` | Visually hide the label (remains accessible). |
| `hasValueLabel` | `boolean` | `false` | Show formatted value text (ignored when indeterminate). |
| `formatValueLabel` | `(value: number, max: number) => string` |  | Custom value label formatter; defaults to a percentage string. |
| `variant` | `'accent' \| 'success' \| 'warning' \| 'error' \| 'neutral'` | `'accent'` | Semantic color variant. |
| `isIndeterminate` | `boolean` | `false` | Animated loading indicator for unknown progress. |
| `marks` | `ReadonlyArray<{value: number; label: string}>` |  | Fixed target marks drawn on the track at values in the same 0..max scale as value (e.g. a goal line). They stay visible whether progress is below or past them, and take their color from what they sit on: a mark inside the filled area uses the fill variant's on-color (on-accent, on-warning, on-error, and so on), a mark still out on the bare track uses the primary text color (the secondary one on a disabled bar, which dims everything it draws). Each mark requires a label: it is the mark's accessible name and the text revealed via a tooltip on hover/focus. Ignored when indeterminate. |
| `isDisabled` | `boolean` | `false` | Visually disabled state: grays out the fill and text. Use for canceled or inactive operations. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-progress-bar`, `.astryx-progress-bar-fill`, `.astryx-progress-bar-track`, `.astryx-progress-bar-mark`, `.astryx-progressbar`, `.astryx-progressbar-fill`, `.astryx-progressbar-track`, `.astryx-progressbar-mark`

### Progress Bar

A horizontal bar showing the completion progress of a task. Use it for operations where the duration is known, or as an animated indicator when progress can't be calculated. Supports semantic color variants, value labels, and custom formatting.

**Do**

- Use a determinate bar when the total amount of work is known, and indeterminate when it's not.
- Choose a color variant that matches the context: accent for general progress, success for completion, warning or error for alerts.
- Always provide a label, even if hidden; screen readers need it to announce what's loading.

**Don't**

- Place icons or labels inside the bar; compose them alongside it using layout components.
- Use a progress bar for instant actions; it's meant for operations that take noticeable time.
- Use multiple progress bars stacked together for the same operation; use one bar with a value label instead.

**Anatomy**

- Progress bar (required) — Container arranging the label row and progress track.
- Label (required) — Text naming the operation, optionally hidden visually while remaining accessible.
- Value text — Formatted determinate value shown beside the label when requested.
- Track (required) — Remaining-progress rail that carries the progressbar semantics.
- Fill (required) — Painted segment showing completed progress or indeterminate movement.
- Mark — Labeled target tick positioned on a determinate track.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | 无障碍标签（必填）。 |
| `value` | `number` | `0` | 当前值（不确定模式下忽略）。 |
| `max` | `number` | `100` | 最大值。 |
| `isLabelHidden` | `boolean` | `false` | 视觉上隐藏标签（仍保持无障碍可访问性）。 |
| `hasValueLabel` | `boolean` | `false` | 显示格式化的值文本（不确定模式下忽略）。 |
| `formatValueLabel` | `(value: number, max: number) => string` |  | 自定义值标签格式化器；默认为百分比字符串。 |
| `variant` | `'accent' \| 'success' \| 'warning' \| 'error' \| 'neutral'` | `'accent'` | 语义颜色变体。 |
| `isIndeterminate` | `boolean` | `false` | 用于未知进度的动画加载指示器。 |
| `marks` | `ReadonlyArray<{value: number; label: string}>` |  | 在轨道上按与 value 相同的 0..max 刻度绘制的固定目标标记（例如目标线）。无论进度低于还是超过它们都保持可见，并根据所处位置取色：位于已填充区域内的标记使用与填充变体配对的前景色（on-accent、on-warning、on-error 等），仍位于空轨道上的标记使用主文本颜色（禁用状态下会降为次要文本颜色，与其整体弱化的呈现保持一致）。每个标记都必须提供 label——它既是标记的无障碍名称，也是悬停/聚焦时通过工具提示显示的文本。不确定模式下忽略。 |
| `isDisabled` | `boolean` | `false` | 视觉禁用状态——使填充条和文本变灰。用于已取消或不活跃的操作。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式（边距、定位、尺寸）。必须是 stylex.create() 的值，而非内联样式对象如 style={{}}。 |

Styling hook class: `.astryx-progress-bar`, `.astryx-progress-bar-fill`, `.astryx-progress-bar-track`, `.astryx-progress-bar-mark`, `.astryx-progressbar`, `.astryx-progressbar-fill`, `.astryx-progressbar-track`, `.astryx-progressbar-mark`

## Files

- `src/ProgressBar.doc.mjs`
- `src/ProgressBar.spec.md`
- `src/ProgressBar.tsx`
- `src/ProgressBarMarkTooltip.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/ProgressBar
