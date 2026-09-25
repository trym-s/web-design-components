# Stat

A KPI/metric display for dashboards and summary rows: metric name, large tabular-nums value, an optional sentiment-aware delta, a supporting description, and a media slot for a sparkline or mini chart. Compose several in a Grid for a KPI row.

## Classification

- Category: `content` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/Stat.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A KPI/metric display for dashboards and summary rows: metric name, large tabular-nums value, an optional sentiment-aware delta, a supporting description, and a media slot for a sparkline or mini chart.
- Avoid when: Put a full-size chart in the media slot; it is meant for compact sparklines or trend glyphs. Rely on delta color alone to convey meaning; the direction glyph and screen-reader text carry it too.
- Provides: Stat, Stat
- Requires: React 19 with `@astryxdesign/lab` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: Stat
- Upstream: Astryx lab (experimental, canary-only upstream) · Content
- Keywords: stat, kpi, metric, number, value, delta, trend, dashboard, statistic, measure

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

- `upstream/stories/Stat.stories.tsx` — Storybook — Stat

## Documentation

### Stat

A KPI/metric display for dashboards and summary rows: metric name, large tabular-nums value, an optional sentiment-aware delta, a supporting description, and a media slot for a sparkline or mini chart. Compose several in a Grid for a KPI row.

**Do**

- Pass pre-formatted strings for value and delta ("1.2M", "+12.4%"); Stat does not format numbers.
- Set `sentiment` explicitly for inverted metrics where down is good, like error rate or latency.
- Wrap Stat in a Card and lay out KPI rows with Grid columns={{minWidth: 240, max: 4}}.

**Don't**

- Put a full-size chart in the media slot; it is meant for compact sparklines or trend glyphs.
- Rely on delta color alone to convey meaning; the direction glyph and screen-reader text carry it too.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Metric name shown above the value, e.g. "Total requests". |
| `value` * | `ReactNode` |  | Headline metric rendered large with tabular numerals. Pass a pre-formatted string like "1.2M". |
| `delta` | `{value: string, direction: 'up' \| 'down' \| 'flat', sentiment?: 'positive' \| 'negative' \| 'neutral'}` |  | Change indicator next to the value: an up/down/flat glyph plus colored text. sentiment overrides the direction color mapping (up=positive, down=negative, flat=neutral) for inverted metrics like error rate. |
| `description` | `string` |  | Muted supporting line under the value, e.g. "vs. previous 30 days". |
| `media` | `ReactNode` |  | Trend slot rendered below the text content, e.g. a sparkline or mini chart. Stat does not render a chart itself. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant controlling the value's font size. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-stat`

### Stat

A KPI/metric display for dashboards and summary rows: metric name, large tabular-nums value, an optional sentiment-aware delta, a supporting description, and a media slot for a sparkline or mini chart. Compose several in a Grid for a KPI row.

**Do**

- Pass pre-formatted strings for value and delta ("1.2M", "+12.4%"); Stat does not format numbers.
- Set `sentiment` explicitly for inverted metrics where down is good, like error rate or latency.
- Wrap Stat in a Card and lay out KPI rows with Grid columns={{minWidth: 240, max: 4}}.

**Don't**

- Put a full-size chart in the media slot; it is meant for compact sparklines or trend glyphs.
- Rely on delta color alone to convey meaning; the direction glyph and screen-reader text carry it too.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | 显示在数值上方的指标名称，例如 "Total requests"。 |
| `value` * | `ReactNode` |  | 大号显示的核心指标，使用等宽数字。请传入预先格式化的字符串，如 "1.2M"。 |
| `delta` | `{value: string, direction: 'up' \| 'down' \| 'flat', sentiment?: 'positive' \| 'negative' \| 'neutral'}` |  | 数值旁的变化指示：上升/下降/持平图标加彩色文本。sentiment 可覆盖默认的方向颜色映射（up=positive、down=negative、flat=neutral），用于错误率等反向指标。 |
| `description` | `string` |  | 数值下方的弱化辅助说明，例如 "vs. previous 30 days"。 |
| `media` | `ReactNode` |  | 渲染在文本内容下方的趋势插槽，例如迷你折线图。Stat 本身不渲染图表。 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 控制数值字号的尺寸变体。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式（外边距、定位、尺寸）。必须是 stylex.create() 的值，而非内联样式对象如 style={{}}。 |

Styling hook class: `.astryx-stat`

## Files

- `upstream/Stat.doc.mjs`
- `upstream/Stat.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
