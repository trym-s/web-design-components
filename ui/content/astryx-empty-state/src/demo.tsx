import E0 from "./examples/EmptyStateShowcase.tsx";
import E1 from "./examples/EmptyStateActions.tsx";
import E2 from "./examples/EmptyStateCompact.tsx";
import E3 from "./examples/EmptyStateContainer.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "EmptyStateShowcase", title: "Empty State", component: E0 },
  { name: "EmptyStateActions", title: "EmptyState — Actions", component: E1 },
  { name: "EmptyStateCompact", title: "EmptyState — Compact", component: E2 },
  { name: "EmptyStateContainer", title: "EmptyState — Container", component: E3 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
