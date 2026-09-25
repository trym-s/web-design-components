import { MarkerDemo as E0 } from "./examples/marker-demo";
import { MarkerVariantsDemo as E1 } from "./examples/marker-variants";
import { MarkerStatusDemo as E2 } from "./examples/marker-status";
import { MarkerShimmerDemo as E3 } from "./examples/marker-shimmer";
import { MarkerSeparatorDemo as E4 } from "./examples/marker-separator";
import { MarkerBorderDemo as E5 } from "./examples/marker-border";
import { MarkerIconDemo as E6 } from "./examples/marker-icon";
import { MarkerLinkButtonDemo as E7 } from "./examples/marker-link-button";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "marker-demo", title: "Marker Demo (radix-rhea)", component: E0 },
  { name: "marker-variants", title: "Marker Variants (radix-rhea)", component: E1 },
  { name: "marker-status", title: "Marker Status (radix-rhea)", component: E2 },
  { name: "marker-shimmer", title: "Marker Shimmer (radix-rhea)", component: E3 },
  { name: "marker-separator", title: "Marker Separator (radix-rhea)", component: E4 },
  { name: "marker-border", title: "Marker Border (radix-rhea)", component: E5 },
  { name: "marker-icon", title: "Marker Icon (radix-rhea)", component: E6 },
  { name: "marker-link-button", title: "Marker Link Button (radix-rhea)", component: E7 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
