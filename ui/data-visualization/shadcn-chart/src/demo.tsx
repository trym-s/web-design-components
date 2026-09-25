import { ChartDemo as E0 } from "./examples/chart-demo";
import { ChartExample as E1 } from "./examples/chart-example";
import { ChartBarDemoGrid as E2 } from "./examples/chart-example-grid";
import { ChartBarDemoAxis as E3 } from "./examples/chart-example-axis";
import { ChartBarDemoTooltip as E4 } from "./examples/chart-example-tooltip";
import { ChartBarDemoLegend as E5 } from "./examples/chart-example-legend";
import { ChartTooltipDemo as E6 } from "./examples/chart-tooltip";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "chart-demo", title: "Chart Demo", component: E0 },
  { name: "chart-example", title: "Chart Example", component: E1 },
  { name: "chart-example-grid", title: "Chart Example Grid", component: E2 },
  { name: "chart-example-axis", title: "Chart Example Axis", component: E3 },
  { name: "chart-example-tooltip", title: "Chart Example Tooltip", component: E4 },
  { name: "chart-example-legend", title: "Chart Example Legend", component: E5 },
  { name: "chart-tooltip", title: "Chart Tooltip", component: E6 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
