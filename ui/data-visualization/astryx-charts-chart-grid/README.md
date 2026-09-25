# Chart Grid

ChartGrid draws horizontal and vertical guide lines from the scales owned by a parent Chart. Use it in the Chart grid slot so guides share the plot dimensions and tick values used by the chart.

## Classification

- Category: `data-visualization` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/ChartGrid.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: ChartGrid draws horizontal and vertical guide lines from the scales owned by a parent Chart.
- Avoid when: Use grid lines as the only way to communicate a value or distinction. Keep meaningful chart information in labels, marks, and the parent Chart alternative. Expect tickCount to thin categorical band centers. It requests density only for continuous scales; categorical vertical guides render once per band.
- Provides: Grid lines
- Requires: React 19 with `@astryxdesign/charts` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (data-visualization/astryx-charts-chart)
- Upstream: Astryx charts (experimental, canary-only upstream) · Data Visualization
- Keywords: chart, grid, guides, axis, ticks, data visualization

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

- None of its own upstream; the demo is its family's: `ui/data-visualization/astryx-charts-chart`.

## Documentation

### Chart Grid

ChartGrid draws horizontal and vertical guide lines from the scales owned by a parent Chart. Use it in the Chart grid slot so guides share the plot dimensions and tick values used by the chart.

**Do**

- Pair ChartGrid with ChartAxis when readers need labelled values beside the guide lines.
- Use horizontal guides for value comparison and add vertical guides only when they help readers align categories or continuous x values.

**Don't**

- Use grid lines as the only way to communicate a value or distinction. Keep meaningful chart information in labels, marks, and the parent Chart alternative.
- Expect tickCount to thin categorical band centers. It requests density only for continuous scales; categorical vertical guides render once per band.

**Anatomy**

- Grid lines — Horizontal lines at continuous y ticks and vertical lines at x ticks or categorical band centers.

**Accessibility**

- Chart alternative — WCAG 1.1.1 Non-text Content (Required on the parent Chart): Chart owns the accessible image name and supported small-data table. Grid lines supplement that chart-level alternative rather than replacing it.
- Visual-only guides — WCAG 1.4.11 Non-text Contrast (Do not carry information alone): Grid lines are supporting guides. Preserve visible labels, marks, or another qualifying cue so understanding does not depend on the grid alone.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `horizontal` | `boolean` | `true` | Whether to draw horizontal guides at continuous y ticks other than zero. |
| `vertical` | `boolean` | `false` | Whether to draw vertical guides at continuous x ticks or categorical band centers. |
| `tickCount` | `number` | `5` | Approximate guide count requested from continuous scales. It does not thin categorical band centers. |

**Example — Horizontal guides**

```tsx
import {Chart, ChartGrid, bar} from '@astryxdesign/charts';

<Chart
  data={monthlyRevenue}
  xKey="month"
  series={[bar('revenue')]}
  grid={<ChartGrid />}
/>;
```

**Example — Horizontal and vertical guides**

```tsx
<Chart
  data={monthlyRevenue}
  xKey="month"
  series={[bar('revenue')]}
  grid={<ChartGrid horizontal vertical tickCount={6} />}
/>;
```

## Files

- `src/ChartGrid.doc.mjs`
- `src/ChartGrid.spec.md`
- `src/ChartGrid.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
