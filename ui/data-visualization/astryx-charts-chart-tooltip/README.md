# Chart Tooltip

ChartTooltip shows grouped values for the chart position nearest the pointer. Use Chart’s tooltip prop or its configuration object for the standard integration; direct composition remains available when you need explicit child composition.

## Classification

- Category: `data-visualization` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/ChartTooltip.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: ChartTooltip shows grouped values for the chart position nearest the pointer.
- Avoid when: Put information required to understand the chart only in the tooltip. The current interaction is pointer-driven and does not establish a focus trigger or aria-describedby relationship. Render interactive controls inside the custom tooltip body. The surface is presentational and does not accept pointer input.
- Provides: Layer host, Tooltip card, Series row, Hover indicator, Hover dot
- Requires: React 19 with `@astryxdesign/charts` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (data-visualization/astryx-charts-chart)
- Upstream: Astryx charts (experimental, canary-only upstream) · Data Visualization
- Keywords: chart, tooltip, hover, series, crosshair, data visualization

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

### Chart Tooltip

ChartTooltip shows grouped values for the chart position nearest the pointer. Use Chart’s tooltip prop or its configuration object for the standard integration; direct composition remains available when you need explicit child composition.

**Do**

- Treat tooltip content as supplemental pointer detail. Give the parent Chart an accessible name and preserve its equivalent data table or another complete data view.
- When composing ChartTooltip directly, pass the same series definitions used by Chart so rows, swatches, and hover dots stay aligned with the plotted marks.

**Don't**

- Put information required to understand the chart only in the tooltip. The current interaction is pointer-driven and does not establish a focus trigger or aria-describedby relationship.
- Render interactive controls inside the custom tooltip body. The surface is presentational and does not accept pointer input.

**Anatomy**

- Layer host (required) — Layer host mounted under the chart’s nearest HTML container so nested Theme and MediaTheme scopes remain inherited. It uses the browser top layer when the Popover API is available and otherwise keeps the card visible through Layer’s reduced fallback.
- Tooltip card (required) — Non-interactive surface containing the current x value and series values.
- Series row — For multi-series charts, a decorative swatch, visible label, and value.
- Hover indicator — Band highlight for bar series on a band scale, or a vertical crosshair otherwise.
- Hover dot — Point marker for each eligible non-bar series at the hovered data index.

**Accessibility**

- Supplemental detail — WCAG 1.1.1 Non-text Content (Required on the parent Chart): The tooltip supplements the parent Chart. It does not replace the Chart accessible name, hidden data table, summary, or another equivalent data view.
- Tooltip semantics — WCAG 1.3.1 Info and Relationships (Built in with a documented limitation): The visible card uses role tooltip. Chart does not currently expose a focusable data-point trigger or an aria-describedby relationship, so required information must remain available outside this pointer-only surface.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `series` | `readonly SeriesDef[]` | `[]` | Series definitions used to derive tooltip rows and hover dots. Chart supplies this automatically through its tooltip prop; direct composition should pass the same array used by Chart. |
| `render` | `(xValue: unknown, seriesValues: TooltipSeriesValue[]) => ReactNode` | `Default grouped value content` | Replaces the default card body. Return null to hide the card while preserving enabled hover indicators and dots. |
| `hoverIndicator` | `boolean` | `true` | Shows a band highlight for bar series on a band scale, or a vertical crosshair for other series. |
| `showHoverDots` | `boolean` | `true` | Shows a point marker for each eligible non-bar series at the hovered index. |
| `placement` | `'auto' \| 'right' \| 'left' \| 'top'` | `'auto'` | Selects one of the shipped placement algorithms. The current implementation positions from the hovered x coordinate and the plot top; whether placement should instead be point-relative on both axes remains unresolved. Custom renderers own their content sizing. |

**Example — Generated chart tooltip**

```tsx
import {Chart, bar, line} from '@astryxdesign/charts';

<Chart
  data={monthlyRevenue}
  xKey="month"
  series={[
    bar('revenue', {label: 'Revenue'}),
    line('forecast', {label: 'Forecast'}),
  ]}
  tooltip
/>;
```

**Example — Direct composition**

```tsx
import {Chart, ChartTooltip, line} from '@astryxdesign/charts';

const series = [line('revenue', {label: 'Revenue'})];

<Chart data={monthlyRevenue} xKey="month" series={series}>
  <ChartTooltip
    series={series}
    placement="top"
    showHoverDots={false}
  />
</Chart>;
```

## Files

- `upstream/ChartTooltip.doc.mjs`
- `upstream/ChartTooltip.spec.md`
- `upstream/ChartTooltip.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
