import E0 from "./examples/SkeletonShowcase.tsx";
import E1 from "./examples/SkeletonCardSkeleton.tsx";
import E2 from "./examples/SkeletonStaggeredList.tsx";
import E3 from "./examples/SkeletonTableRowSkeleton.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "SkeletonShowcase", title: "Skeleton", component: E0 },
  { name: "SkeletonCardSkeleton", title: "Skeleton — Card Loading", component: E1 },
  { name: "SkeletonStaggeredList", title: "Skeleton — Staggered List", component: E2 },
  { name: "SkeletonTableRowSkeleton", title: "Skeleton — Table Rows", component: E3 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
