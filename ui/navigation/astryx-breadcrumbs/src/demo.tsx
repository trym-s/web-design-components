import E0 from "./examples/BreadcrumbItemShowcase.tsx";
import E1 from "./examples/BreadcrumbsShowcase.tsx";
import E2 from "./examples/BreadcrumbItemBasic.tsx";
import E3 from "./examples/BreadcrumbsCustomSeparator.tsx";
import E4 from "./examples/BreadcrumbsDeepHierarchy.tsx";
import E5 from "./examples/BreadcrumbsMenuItem.tsx";
import E6 from "./examples/BreadcrumbsSupportingVariant.tsx";
import E7 from "./examples/BreadcrumbsWithIcons.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "BreadcrumbItemShowcase", title: "Breadcrumb Item", component: E0 },
  { name: "BreadcrumbsShowcase", title: "Breadcrumbs", component: E1 },
  { name: "BreadcrumbItemBasic", title: "BreadcrumbItem — Basic", component: E2 },
  { name: "BreadcrumbsCustomSeparator", title: "Breadcrumbs — Separators", component: E3 },
  { name: "BreadcrumbsDeepHierarchy", title: "Breadcrumbs — Deep Path", component: E4 },
  { name: "BreadcrumbsMenuItem", title: "Breadcrumbs — Menu item", component: E5 },
  { name: "BreadcrumbsSupportingVariant", title: "Breadcrumbs — Variants", component: E6 },
  { name: "BreadcrumbsWithIcons", title: "Breadcrumbs — Icons", component: E7 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
