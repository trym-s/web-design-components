# Chart Axis

ChartAxis renders tick labels and optional edge and tick lines from the scales owned by a parent Chart. Use it in the Chart axes slot for physical top, right, bottom, or left plot edges.

## Classification

- Category: `data-visualization` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/ChartAxis.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: ChartAxis renders tick labels and optional edge and tick lines from the scales owned by a parent Chart.
- Avoid when: Use axis labels or a pointer tooltip as the only way to obtain important values. Give Chart an accessible name and preserve an equivalent data view or summary. Hide the edge line while showing tick marks. showTicks intentionally keeps the line visible so each mark has a grounded edge.
- Provides: Axis edge line, Tick marks, Tick labels
- Requires: React 19 with `@astryxdesign/charts` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (data-visualization/astryx-charts-chart)
- Upstream: Astryx charts (experimental, canary-only upstream) · Data Visualization
- Keywords: chart, axis, ticks, labels, scale, data visualization

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

- None of its own upstream; the demo is its family's: `ui/data-visualization/astryx-charts-chart`.

## Documentation

### Chart Axis

ChartAxis renders tick labels and optional edge and tick lines from the scales owned by a parent Chart. Use it in the Chart axes slot for physical top, right, bottom, or left plot edges.

**Do**

- Use ChartAxis inside Chart so its labels, ticks, and edge line share the same scales and plot dimensions as the marks.
- Use tickFormat for product-specific units or locale formatting, and maxTicks or truncate when dense category labels need a bounded presentation.

**Don't**

- Use axis labels or a pointer tooltip as the only way to obtain important values. Give Chart an accessible name and preserve an equivalent data view or summary.
- Hide the edge line while showing tick marks. showTicks intentionally keeps the line visible so each mark has a grounded edge.

**Anatomy**

- Axis edge line — Line along the selected plot edge. It is shown by default only on the bottom edge and whenever tick marks are shown.
- Tick marks — Short lines extending outward from each retained tick position.
- Tick labels (required) — Formatted scale values or categories positioned outside the selected plot edge.

**Accessibility**

- Chart alternative — WCAG 1.1.1 Non-text Content (Required on the parent Chart): Chart owns the accessible image name and supported small-data table. Tick labels supplement that chart-level alternative rather than replacing it.
- Label text integrity — WCAG Unicode grapheme clusters (Required when truncate is set): Truncation keeps emoji, joined emoji sequences, flags, and combining marks intact before appending the ellipsis.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` * | `'top' \| 'right' \| 'bottom' \| 'left'` |  | Physical plot edge on which to render the axis. |
| `tickCount` | `number` | `5` | Approximate continuous-scale tick count. d3 chooses the final values. |
| `maxTicks` | `number` |  | Maximum displayed label count. Labels are evenly skipped when the generated set is larger. |
| `tickFormat` | `(value: unknown) => string` |  | Formats each retained tick. When omitted, continuous scales use d3 formatting and band scales use their category strings. |
| `truncate` | `number` |  | Maximum content characters retained before an ellipsis is appended. User-perceived characters remain intact. |
| `animated` | `boolean` | `true` | Whether tick position and visibility changes use the built-in transition. |
| `showAxisLine` | `boolean` | `true for bottom; false for top, right, and left` | Whether to draw the edge line. Tick marks force the line on so they remain grounded. |
| `showTicks` | `boolean` | `false` | Whether to draw an outward mark at each retained tick. |

**Example — Bottom and left axes**

```tsx
import {Chart, ChartAxis, ChartGrid, bar} from '@astryxdesign/charts';

<Chart
  data={monthlyRevenue}
  xKey="month"
  series={[bar('revenue')]}
  grid={<ChartGrid horizontal />}
  axes={
    <>
      <ChartAxis position="bottom" />
      <ChartAxis position="left" tickFormat={value => String(value)} />
    </>
  }
/>;
```

**Example — Dense category labels**

```tsx
<ChartAxis
  position="bottom"
  maxTicks={8}
  truncate={12}
  showTicks
/>;
```

## Files

- `upstream/ChartAxis.doc.mjs`
- `upstream/ChartAxis.spec.md`
- `upstream/ChartAxis.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
