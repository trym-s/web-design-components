import E0 from "./examples/GridShowcase.tsx";
import E1 from "./examples/GridSpanShowcase.tsx";
import E2 from "./examples/GridDashboardLayout.tsx";
import E3 from "./examples/GridGalleryExample.tsx";
import E4 from "./examples/GridResponsiveAutoFit.tsx";
import E5 from "./examples/GridSpanColumns.tsx";
import E6 from "./examples/GridWithGridSpan.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "GridShowcase", title: "Grid", component: E0 },
  { name: "GridSpanShowcase", title: "Grid Span", component: E1 },
  { name: "GridDashboardLayout", title: "Grid — Dashboard Layout", component: E2 },
  { name: "GridGalleryExample", title: "Grid — Card Gallery", component: E3 },
  { name: "GridResponsiveAutoFit", title: "Grid — Responsive Auto-Fit", component: E4 },
  { name: "GridSpanColumns", title: "GridSpan — Columns", component: E5 },
  { name: "GridWithGridSpan", title: "Grid — Column Spanning", component: E6 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
