import E0 from "./examples/BadgeShowcase.tsx";
import E1 from "./examples/BadgeCategoryTags.tsx";
import E2 from "./examples/BadgeCountBadges.tsx";
import E3 from "./examples/BadgeStatusLabels.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "BadgeShowcase", title: "Badge — Variants", component: E0 },
  { name: "BadgeCategoryTags", title: "Badge — Colors", component: E1 },
  { name: "BadgeCountBadges", title: "Badge — Counts", component: E2 },
  { name: "BadgeStatusLabels", title: "Badge — Status", component: E3 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
