# Chart

Beautiful charts. Built using Recharts. Copy and paste into your apps.

## Classification

- Category: `data-visualization` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/chart.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Beautiful charts.
- Provides: chart with 7 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: chart-demo, chart-example, chart-example-grid, chart-example-axis, chart-example-tooltip, chart-example-legend, chart-tooltip
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add chart`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/chart.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Note:

**Updated:** The `chart` component now uses Recharts v3. If you're upgrading existing chart code, see [Updating to Recharts v3](#updating-to-recharts-v3).

> Example `chart-demo` — `src/examples/chart-demo.tsx`, `static/chart-demo.html`

Introducing **Charts**. A collection of chart components that you can copy and paste into your apps.

Charts are designed to look great out of the box. They work well with the other components and are fully customizable to fit your project.

[Browse the Charts Library](/charts).

## Component

We use [Recharts](https://recharts.org/) under the hood.

We designed the `chart` component with composition in mind. **You build your charts using Recharts components and only bring in custom components, such as `ChartTooltip`, when and where you need it**.

```tsx showLineNumbers /ChartContainer/ /ChartTooltipContent/
import { Bar, BarChart } from "recharts"

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

export function MyChart() {
  return (
    <ChartContainer>
      <BarChart data={data}>
        <Bar dataKey="value" />
        <ChartTooltip content={<ChartTooltipContent />} />
      </BarChart>
    </ChartContainer>
  )
}
```

We do not wrap Recharts. This means you're not locked into an abstraction. When a new Recharts version is released, you can follow the official upgrade path to upgrade your charts.

**The components are yours**.

## Updating to Recharts v3

If you're updating older chart code to Recharts v3:

- Use `var(--chart-1)` instead of `hsl(var(--chart-1))` when you reference chart tokens from your CSS variables.
- Use `ChartTooltip.defaultIndex` for initial tooltip state only. Keep persistent active shapes in your own chart state.
- Remove `layout` from `<Bar>` when the parent `<BarChart>` already defines it.
- Keep a height, `min-h-*`, or `aspect-*` on `ChartContainer` so `ResponsiveContainer` can measure on first render.

## Installation

```bash
npx shadcn@latest add chart
```

- Install the following dependencies:

```bash
npm install recharts
```

- Copy and paste the following code into `components/ui/chart.tsx`.

Source: `components/ui/chart.tsx`

- Add the following colors to your CSS file

```css title="app/globals.css" showLineNumbers
@layer base {
  :root {
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);
  }

  .dark {
    --chart-1: oklch(0.488 0.243 264.376);
    --chart-2: oklch(0.696 0.17 162.48);
    --chart-3: oklch(0.769 0.188 70.08);
    --chart-4: oklch(0.627 0.265 303.9);
    --chart-5: oklch(0.645 0.246 16.439);
  }
}
```

## Your First Chart

Let's build your first chart. We'll build a bar chart, add a grid, axis, tooltip and legend.

- Start by defining your data

The following data represents the number of desktop and mobile users for each month.

> Note:

**Note:** Your data can be in any shape. You are not limited to the shape of the data below. Use the `dataKey` prop to map your data to the chart.

```tsx title="components/example-chart.tsx" showLineNumbers
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]
```

- Define your chart config

The chart config holds configuration for the chart. This is where you place human-readable strings, such as labels, icons and color tokens for theming.

```tsx title="components/example-chart.tsx" showLineNumbers
import { type ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig
```

- Build your chart

You can now build your chart using Recharts components.

> Note:

**Important:** Remember to set a `min-h-[VALUE]` on the `ChartContainer` component. This is required for the chart to be responsive.

> Example `chart-example` — `src/examples/chart-example.tsx`, `static/chart-example.html`

### Add a Grid

Let's add a grid to the chart.

- Import the `CartesianGrid` component.

```tsx /CartesianGrid/
import { Bar, BarChart, CartesianGrid } from "recharts"
```

- Add the `CartesianGrid` component to your chart.

```tsx showLineNumbers {3}
<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <BarChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer>
```

> Example `chart-example-grid` — `src/examples/chart-example-grid.tsx`, `static/chart-example-grid.html`

### Add an Axis

To add an x-axis to the chart, we'll use the `XAxis` component.

- Import the `XAxis` component.

```tsx /XAxis/
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
```

- Add the `XAxis` component to your chart.

```tsx showLineNumbers {4-10}
<ChartContainer config={chartConfig} className="h-[200px] w-full">
  <BarChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer>
```

> Example `chart-example-axis` — `src/examples/chart-example-axis.tsx`, `static/chart-example-axis.html`

### Add Tooltip

So far we've only used components from Recharts. They look great out of the box thanks to some customization in the `chart` component.

To add a tooltip, we'll use the custom `ChartTooltip` and `ChartTooltipContent` components from `chart`.

- Import the `ChartTooltip` and `ChartTooltipContent` components.

```tsx
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
```

- Add the components to your chart.

```tsx showLineNumbers {11}
<ChartContainer config={chartConfig} className="h-[200px] w-full">
  <BarChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer>
```

> Example `chart-example-tooltip` — `src/examples/chart-example-tooltip.tsx`, `static/chart-example-tooltip.html`

Hover to see the tooltips. Easy, right? Two components, and we've got a beautiful tooltip.

### Add Legend

We'll do the same for the legend. We'll use the `ChartLegend` and `ChartLegendContent` components from `chart`.

- Import the `ChartLegend` and `ChartLegendContent` components.

```tsx
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
```

- Add the components to your chart.

```tsx showLineNumbers {12}
<ChartContainer config={chartConfig} className="h-[200px] w-full">
  <BarChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer>
```

> Example `chart-example-legend` — `src/examples/chart-example-legend.tsx`, `static/chart-example-legend.html`

Done. You've built your first chart! What's next?

- [Themes and Colors](/docs/components/chart#theming)
- [Tooltip](/docs/components/chart#tooltip)
- [Legend](/docs/components/chart#legend)

## Chart Config

The chart config is where you define the labels, icons and colors for a chart.

It is intentionally decoupled from chart data.

This allows you to share config and color tokens between charts. It can also work independently for cases where your data or color tokens live remotely or in a different format.

```tsx showLineNumbers /ChartConfig/
import { Monitor } from "lucide-react"

import { type ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    icon: Monitor,
    // A color like 'hsl(220, 98%, 61%)' or 'var(--color-name)'
    color: "#2563eb",
    // OR a theme object with 'light' and 'dark' keys
    theme: {
      light: "#2563eb",
      dark: "#dc2626",
    },
  },
} satisfies ChartConfig
```

## Theming

Charts have built-in support for theming. You can use css variables (recommended) or color values in any color format, such as hex, hsl or oklch.

### CSS Variables

- Define your colors in your css file

```css title="app/globals.css" showLineNumbers
@layer base {
  :root {
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
  }

  .dark {
    --chart-1: oklch(0.488 0.243 264.376);
    --chart-2: oklch(0.696 0.17 162.48);
  }
}
```

- Add the color to your `chartConfig`

```tsx title="components/example-chart.tsx" showLineNumbers
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
```

### hex, hsl or oklch

You can also define your colors directly in the chart config. Use the color format you prefer.

```tsx title="components/example-chart.tsx" showLineNumbers
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(220, 98%, 61%)",
  },
  tablet: {
    label: "Tablet",
    color: "oklch(0.5 0.2 240)",
  },
  laptop: {
    label: "Laptop",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
```

### Using Colors

To use the theme colors in your chart, reference the colors using the format `var(--color-KEY)`.

#### Components

```tsx
<Bar dataKey="desktop" fill="var(--color-desktop)" />
```

#### Chart Data

```tsx title="components/example-chart.tsx" showLineNumbers
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]
```

#### Tailwind

```tsx title="components/example-chart.tsx"
<LabelList className="fill-(--color-desktop)" />
```

## Tooltip

A chart tooltip contains a label, name, indicator and value. You can use a combination of these to customize your tooltip.

> Example `chart-tooltip` — `src/examples/chart-tooltip.tsx`, `static/chart-tooltip.html`

You can turn on/off any of these using the `hideLabel`, `hideIndicator` props and customize the indicator style using the `indicator` prop.

Use `labelKey` and `nameKey` to use a custom key for the tooltip label and name.

Chart comes with the `<ChartTooltip>` and `<ChartTooltipContent>` components. You can use these two components to add custom tooltips to your chart.

```tsx title="components/example-chart.tsx"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
```

```tsx title="components/example-chart.tsx"
<ChartTooltip content={<ChartTooltipContent />} />
```

### Props

Use the following props to customize the tooltip.

| Prop            | Type                     | Description                                  |
| :-------------- | :----------------------- | :------------------------------------------- |
| `labelKey`      | string                   | The config or data key to use for the label. |
| `nameKey`       | string                   | The config or data key to use for the name.  |
| `indicator`     | `dot` `line` or `dashed` | The indicator style for the tooltip.         |
| `hideLabel`     | boolean                  | Whether to hide the label.                   |
| `hideIndicator` | boolean                  | Whether to hide the indicator.               |

### Colors

Colors are automatically referenced from the chart config.

### Custom

To use a custom key for tooltip label and names, use the `labelKey` and `nameKey` props.

```tsx showLineNumbers /browser/
const chartData = [
  { browser: "chrome", visitors: 187, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]

const chartConfig = {
  visitors: {
    label: "Total Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
```

```tsx title="components/example-chart.tsx"
<ChartTooltip
  content={<ChartTooltipContent labelKey="visitors" nameKey="browser" />}
/>
```

This will use `Total Visitors` for label and `Chrome` and `Safari` for the tooltip names.

## Legend

You can use the custom `<ChartLegend>` and `<ChartLegendContent>` components to add a legend to your chart.

```tsx title="components/example-chart.tsx"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
```

```tsx title="components/example-chart.tsx"
<ChartLegend content={<ChartLegendContent />} />
```

### Colors

Colors are automatically referenced from the chart config.

### Custom

To use a custom key for legend names, use the `nameKey` prop.

```tsx showLineNumbers /browser/
const chartData = [
  { browser: "chrome", visitors: 187, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]

const chartConfig = {
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
```

```tsx title="components/example-chart.tsx"
<ChartLegend content={<ChartLegendContent nameKey="browser" />} />
```

This will use `Chrome` and `Safari` for the legend names.

## Accessibility

You can turn on the `accessibilityLayer` prop to add an accessible layer to your chart.

This prop adds keyboard access and screen reader support to your charts.

```tsx title="components/example-chart.tsx"
<LineChart accessibilityLayer />
```

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `chart-rtl` (base-nova) — `src/examples/chart-rtl.tsx`, `static/chart-rtl.html`

## Files

- `src/ui/chart.tsx` — the ui file as the registry installs it
- `src/examples/chart-demo.tsx`
- `src/examples/chart-example.tsx`
- `src/examples/chart-example-grid.tsx`
- `src/examples/chart-example-axis.tsx`
- `src/examples/chart-example-tooltip.tsx`
- `src/examples/chart-example-legend.tsx`
- `src/examples/chart-tooltip.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/chart
