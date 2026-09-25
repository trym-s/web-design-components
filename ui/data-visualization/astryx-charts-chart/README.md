# Chart

Chart lays out one or more mark definitions against shared responsive x and y scales. Use it for data visualizations that combine Astryx chart marks, axes, grids, legends, tooltips, and custom interaction layers.

## Classification

- Category: `data-visualization` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/Chart.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Chart lays out one or more mark definitions against shared responsive x and y scales.
- Avoid when: Use color as the only way to distinguish series or communicate status. Pair color with labels, mark shapes, direct annotations, or another visible cue. Reuse one mark definition object across multiple Chart instances. Mark definitions currently carry per-chart layout metadata and are single-use.
- Provides: Header, Plot, Grid and axes, Legend, Tooltip and interactions, Data table
- Requires: React 19 with `@astryxdesign/charts` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: Chart, ChartAdvanced, ChartCoordinated, ChartDotGL, ChartDotGLInteractive, ChartHeatmapGL, ChartInteractions, ChartStreamGL, ChartStreamPerf, useChartRange
- Upstream: Astryx charts (experimental, canary-only upstream) · Data Visualization
- Keywords: chart, graph, plot, visualization, bar chart, line chart, data

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

- `upstream/stories/Chart.stories.tsx` — Storybook — Chart
- `upstream/stories/ChartAdvanced.stories.tsx` — Storybook — ChartAdvanced
- `upstream/stories/ChartCoordinated.stories.tsx` — Storybook — ChartCoordinated
- `upstream/stories/ChartDotGL.stories.tsx` — Storybook — ChartDotGL
- `upstream/stories/ChartDotGLInteractive.stories.tsx` — Storybook — ChartDotGLInteractive
- `upstream/stories/ChartHeatmapGL.stories.tsx` — Storybook — ChartHeatmapGL
- `upstream/stories/ChartInteractions.stories.tsx` — Storybook — ChartInteractions
- `upstream/stories/ChartStreamGL.stories.tsx` — Storybook — ChartStreamGL
- `upstream/stories/ChartStreamPerf.stories.tsx` — Storybook — ChartStreamPerf
- `upstream/stories/useChartRange.stories.tsx` — Storybook — useChartRange

## Documentation

### Chart

Chart lays out one or more mark definitions against shared responsive x and y scales. Use it for data visualizations that combine Astryx chart marks, axes, grids, legends, tooltips, and custom interaction layers.

**Do**

- Give the chart a concise title that states what is measured, and use subtitle for the comparison, time range, or other context needed to interpret it.
- Use the same series array for Chart and any directly composed ChartTooltip so labels, colors, and resolved points stay aligned.

**Don't**

- Use color as the only way to distinguish series or communicate status. Pair color with labels, mark shapes, direct annotations, or another visible cue.
- Reuse one mark definition object across multiple Chart instances. Mark definitions currently carry per-chart layout metadata and are single-use.

**Anatomy**

- Header — Optional visible title and supporting subtitle above the plot.
- Plot (required) — Responsive SVG coordinate space containing the clipped series marks.
- Grid and axes — Caller-supplied ChartGrid and ChartAxis elements that share the plot scales.
- Legend — Derived or caller-supplied series labels and swatches placed above, below, at the start, or at the end of the plot.
- Tooltip and interactions — Pointer-driven overlays that consume the chart interaction stream.
- Data table — Visually hidden tabular alternative rendered for small datasets.

**Accessibility**

- Accessible chart name — WCAG 1.1.1 Non-text Content (Required): Provide title when a product-specific name is available. Without it, Chart derives a localized name from the primary series labels and xKey.
- Small-data table — WCAG 1.1.1 Non-text Content (Required for supported small datasets): Chart mirrors small datasets into a visually hidden table. For larger datasets, provide an equivalent nearby summary or data view because the built-in table is intentionally omitted.
- Meaningful chart graphics — WCAG 1.4.11 Non-text Contrast (3:1 when the graphic carries information): Measure meaningful marks and state indicators against their rendered backdrop. Decorative grid lines are not required to meet the non-text threshold.
- Tooltip information — WCAG 2.1.1 Keyboard and 2.5.1 Pointer Gestures (Supplemental only): Do not make hover-only tooltip content the only way to obtain important values. Keep the hidden table or another equivalent data view available.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` * | `Record<string, unknown>[]` |  | Rows to visualize. Each row may contain the x field and one or more series fields. |
| `xKey` * | `string` |  | Field name read from each data row for the shared x scale. |
| `series` * | `SeriesDef[]` |  | Mark definitions created by helpers such as bar(), line(), area(), or dot(). Build a fresh array for each Chart. |
| `height` | `number` | `300` | Chart height in CSS pixels. |
| `margin` | `Partial<ChartMargin>` | `{top: 24, right: 24, bottom: 32, left: 48}` | Plot inset overrides in CSS pixels for top, right, bottom, and left. |
| `yBaseline` | `'auto' \| 'zero' \| 'data'` | `'auto'` | How Chart derives the y-domain when yDomain is omitted: mark-aware zero/headroom, symmetric around zero, or tight to the data extent. |
| `yDomain` | `[number, number]` |  | Explicit y-domain. When set, it takes precedence over yBaseline, automatic headroom, and scale nicening. |
| `xDomain` | `[number, number]` |  | Explicit x-domain for numeric scales, including an empty streaming window. Categorical scales ignore it. |
| `grid` | `ReactNode` |  | Grid content rendered behind the series, normally ChartGrid. |
| `axes` | `ReactNode` |  | Axis content rendered after the series, normally one or more ChartAxis elements. |
| `legend` | `boolean \| ChartLegendProps` | `false` | Set true for a derived bottom legend, or pass items, position, and alignment. |
| `tooltip` | `boolean \| Omit<ChartTooltipProps, 'series'>` | `false` | Set true for the grouped pointer tooltip, or pass render and presentation options. |
| `interactions` | `ReactNode` |  | Interaction overlays rendered above the pointer-capture layer. |
| `children` | `ReactNode` |  | Additional SVG content rendered after the built-in tooltip for advanced composition. |
| `title` | `string` |  | Visible heading and accessible name for the chart image. A localized fallback is derived when omitted. |
| `subtitle` | `string` |  | Visible supporting text that also describes the chart image. |
| `ref` | `Ref<HTMLDivElement>` |  | Ref forwarded to the root chart container. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |
| `className` | `string` |  | CSS class name appended to the root chart container. |
| `style` | `CSSProperties` |  | Inline styles merged onto the root chart container after the component styles. |

**Example — Bar and trend line**

```tsx
import {Chart, ChartAxis, ChartGrid, bar, line} from '@astryxdesign/charts';

const series = [
  bar('revenue', {label: 'Revenue'}),
  line('trend', {label: 'Trend'}),
];

<Chart
  data={monthlyRevenue}
  xKey="month"
  series={series}
  title="Monthly revenue"
  grid={<ChartGrid horizontal />}
  axes={
    <>
      <ChartAxis position="bottom" />
      <ChartAxis position="left" />
    </>
  }
  legend
  tooltip
/>;
```

**Example — Stable numeric window**

```tsx
<Chart
  data={streamedValues}
  xKey="timestamp"
  series={[line('value')]}
  xDomain={[windowStart, windowEnd]}
  yDomain={[0, 100]}
  title="Live utilization"
/>;
```

## Files

- `upstream/Chart.doc.mjs`
- `upstream/Chart.spec.md`
- `upstream/Chart.tsx`
- `upstream/ChartContext.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
