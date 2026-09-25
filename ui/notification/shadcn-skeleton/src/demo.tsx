import { SkeletonDemo as E0 } from "./examples/skeleton-demo";
import { SkeletonAvatar as E1 } from "./examples/skeleton-avatar";
import { SkeletonCard as E2 } from "./examples/skeleton-card";
import { SkeletonText as E3 } from "./examples/skeleton-text";
import { SkeletonForm as E4 } from "./examples/skeleton-form";
import { SkeletonTable as E5 } from "./examples/skeleton-table";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "skeleton-demo", title: "Skeleton Demo", component: E0 },
  { name: "skeleton-avatar", title: "Skeleton Avatar", component: E1 },
  { name: "skeleton-card", title: "Skeleton Card", component: E2 },
  { name: "skeleton-text", title: "Skeleton Text", component: E3 },
  { name: "skeleton-form", title: "Skeleton Form", component: E4 },
  { name: "skeleton-table", title: "Skeleton Table", component: E5 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
