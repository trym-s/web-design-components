import { ShimmerAngle as E0 } from "./examples/shimmer-angle";
import { ShimmerColor as E1 } from "./examples/shimmer-color";
import { ShimmerDemo as E2 } from "./examples/shimmer-demo";
import { ShimmerDuration as E3 } from "./examples/shimmer-duration";
import { ShimmerMarker as E4 } from "./examples/shimmer-marker";
import { ShimmerNone as E5 } from "./examples/shimmer-none";
import { ShimmerOnce as E6 } from "./examples/shimmer-once";
import { ShimmerSpread as E7 } from "./examples/shimmer-spread";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "shimmer-angle", title: "Shimmer Angle · not on docs page", component: E0 },
  { name: "shimmer-color", title: "Shimmer Color · not on docs page", component: E1 },
  { name: "shimmer-demo", title: "Shimmer Demo · not on docs page", component: E2 },
  { name: "shimmer-duration", title: "Shimmer Duration · not on docs page", component: E3 },
  { name: "shimmer-marker", title: "Shimmer Marker · not on docs page", component: E4 },
  { name: "shimmer-none", title: "Shimmer None · not on docs page", component: E5 },
  { name: "shimmer-once", title: "Shimmer Once · not on docs page", component: E6 },
  { name: "shimmer-spread", title: "Shimmer Spread · not on docs page", component: E7 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
