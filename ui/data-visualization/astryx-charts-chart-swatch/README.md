# Chart Swatch

ChartSwatch renders the small decorative mark that pairs a chart series color with its visible label. Use a square for bar series and a short line for other series, including line, dot, and area marks.

## Classification

- Category: `data-visualization` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/ChartSwatch.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: ChartSwatch renders the small decorative mark that pairs a chart series color with its visible label.
- Avoid when: Use ChartSwatch as the accessible name or data alternative for a series. Its surrounding legend, tooltip, or chart must provide that information. Rely on arbitrary colors alone when multiple same-shaped series must be matched across a chart. Verify the complete chart and its labels together.
- Provides: Series swatch
- Requires: React 19 with `@astryxdesign/charts` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (data-visualization/astryx-charts-chart)
- Upstream: Astryx charts (experimental, canary-only upstream) · Data Visualization
- Keywords: chart, swatch, series, legend, tooltip, data visualization

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

### Chart Swatch

ChartSwatch renders the small decorative mark that pairs a chart series color with its visible label. Use a square for bar series and a short line for other series, including line, dot, and area marks.

**Do**

- Place every swatch next to visible text that names the corresponding series. ChartSwatch is decorative and stays hidden from assistive technology.
- Use the square variant for bar series and the line variant for other mark types so legends and tooltips echo the plotted marks consistently.

**Don't**

- Use ChartSwatch as the accessible name or data alternative for a series. Its surrounding legend, tooltip, or chart must provide that information.
- Rely on arbitrary colors alone when multiple same-shaped series must be matched across a chart. Verify the complete chart and its labels together.

**Anatomy**

- Series swatch (required) — Decorative square or short line painted with a caller-owned series color.

**Accessibility**

- Decorative mark — WCAG 1.1.1 Non-text Content (Built in): The swatch is hidden from assistive technology. Pair it with visible series text that supplies the accessible meaning.
- Series distinction — WCAG 1.4.1 Use of Color; 1.4.11 Non-text Contrast (Consumer verification required): Choose colors and, when necessary, additional labels or mark distinctions that remain understandable on the rendered chart surface.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `color` * | `string` |  | CSS color used to paint the swatch. The caller owns palette selection and contrast on the rendered surface. |
| `variant` | `'square' \| 'line'` | `'square'` | Mark shape: use square for bar series and line for other series types. |

**Example — Bar series swatch**

```tsx
import {ChartSwatch} from '@astryxdesign/charts';

<ChartSwatch color="#3b82f6" variant="square" />;
```

**Example — Series-driven swatch**

```tsx
import {
  ChartSwatch,
  swatchVariantForType,
} from '@astryxdesign/charts';

<ChartSwatch
  color={series.color}
  variant={swatchVariantForType(series.type)}
/>;
```

## Files

- `src/ChartSwatch.doc.mjs`
- `src/ChartSwatch.spec.md`
- `src/ChartSwatch.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
