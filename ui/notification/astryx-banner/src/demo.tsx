import E0 from "./examples/BannerShowcase.tsx";
import E1 from "./examples/BannerCollapsibleContent.tsx";
import E2 from "./examples/BannerDismissable.tsx";
import E3 from "./examples/BannerFloating.tsx";
import E4 from "./examples/BannerSectionVariant.tsx";
import E5 from "./examples/BannerStatuses.tsx";
import E6 from "./examples/BannerWithActionButton.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "BannerShowcase", title: "Banner — Statuses", component: E0 },
  { name: "BannerCollapsibleContent", title: "Banner — Collapsible", component: E1 },
  { name: "BannerDismissable", title: "Banner — Dismiss", component: E2 },
  { name: "BannerFloating", title: "Banner — Floating", component: E3 },
  { name: "BannerSectionVariant", title: "Banner — Full Width", component: E4 },
  { name: "BannerStatuses", title: "Banner — Statuses", component: E5 },
  { name: "BannerWithActionButton", title: "Banner — Action", component: E6 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
