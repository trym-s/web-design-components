# Chart Legend

ChartLegend pairs series labels with decorative mark-shaped color swatches. Use Chart legend options for the generated legend, or render ChartLegend directly when the caller already owns the legend items.

## Classification

- Category: `data-visualization` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/ChartLegend.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: ChartLegend pairs series labels with decorative mark-shaped color swatches.
- Avoid when: Use the legend as the chart’s only text alternative. Give the parent Chart an accessible name and preserve an equivalent data view or summary when the data requires one. Assume arbitrary series colors will remain distinguishable in every theme. Verify the complete chart and legend together against the surfaces where they render.
- Provides: Legend list, Legend entry, Series swatch, Series label
- Requires: React 19 with `@astryxdesign/charts` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (data-visualization/astryx-charts-chart)
- Upstream: Astryx charts (experimental, canary-only upstream) · Data Visualization
- Keywords: chart, legend, series, key, label, data visualization

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

### Chart Legend

ChartLegend pairs series labels with decorative mark-shaped color swatches. Use Chart legend options for the generated legend, or render ChartLegend directly when the caller already owns the legend items.

**Do**

- Give every item a concise label that identifies the corresponding series without relying on its color name.
- Use start or end for a vertical legend and top or bottom for a wrapping horizontal legend.

**Don't**

- Use the legend as the chart’s only text alternative. Give the parent Chart an accessible name and preserve an equivalent data view or summary when the data requires one.
- Assume arbitrary series colors will remain distinguishable in every theme. Verify the complete chart and legend together against the surfaces where they render.

**Anatomy**

- Legend list (required) — Wrapping horizontal or stacked vertical list that groups the legend entries.
- Legend entry (required) — One series label paired with its decorative swatch.
- Series swatch (required) — Decorative square for bar marks or short line for other mark types, painted with the item color.
- Series label (required) — Supporting text that names the series.

**Accessibility**

- Named list — WCAG 1.3.1 Info and Relationships (Built in): Entries render as items in a localized Chart legend list. Each visible label supplies the series name while its swatch stays hidden from assistive technology.
- Chart alternative — WCAG 1.1.1 Non-text Content (Required on the parent Chart): The legend supplements the parent Chart. It does not replace the Chart accessible name, data table, summary, or other equivalent alternative.
- Series distinction — WCAG 1.4.1 Use of Color; 1.4.11 Non-text Contrast (Consumer verification required): Caller-supplied series colors must remain distinguishable on the rendered surface. Do not depend on color alone when otherwise identical marks need to be matched across the chart and legend.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `LegendItem[]` | `[]` | Series entries to render. Each entry supplies a label, color, and optional mark type. An omitted or empty array renders nothing. |
| `position` | `'top' \| 'bottom' \| 'start' \| 'end'` | `'bottom'` | Logical placement used by Chart and the legend orientation: top and bottom are horizontal; start and end are vertical. |
| `alignment` | `'start' \| 'center' \| 'end'` | `'start'` | For top and bottom, distributes the row along its inline axis. For start and end, aligns each entry horizontally within the vertical list. |

**Example — Generated chart legend**

```tsx
import {Chart, bar, line} from '@astryxdesign/charts';

<Chart
  data={monthlyRevenue}
  xKey="month"
  series={[
    bar('revenue', {label: 'Revenue'}),
    line('forecast', {label: 'Forecast'}),
  ]}
  legend={{position: 'top', alignment: 'start'}}
/>;
```

**Example — Standalone legend**

```tsx
import {ChartLegend} from '@astryxdesign/charts';

<ChartLegend
  items={[
    {label: 'Revenue', color: '#3b82f6', type: 'bar'},
    {label: 'Forecast', color: '#f59e0b', type: 'line'},
  ]}
  position="start"
  alignment="center"
/>;
```

## Files

- `upstream/ChartLegend.doc.mjs`
- `upstream/ChartLegend.spec.md`
- `upstream/ChartLegend.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
