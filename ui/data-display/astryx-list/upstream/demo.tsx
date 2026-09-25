import E0 from "./examples/ListItemShowcase.tsx";
import E1 from "./examples/ListShowcase.tsx";
import E2 from "./examples/ListBasicList.tsx";
import E3 from "./examples/ListBulletedFeatures.tsx";
import E4 from "./examples/ListItemBasicItem.tsx";
import E5 from "./examples/ListItemWithMedia.tsx";
import E6 from "./examples/ListItemWithMetadata.tsx";
import E7 from "./examples/ListMessageList.tsx";
import E8 from "./examples/ListOrderedSteps.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "ListItemShowcase", title: "List Item", component: E0 },
  { name: "ListShowcase", title: "List", component: E1 },
  { name: "ListBasicList", title: "List — Basic", component: E2 },
  { name: "ListBulletedFeatures", title: "List — Bulleted Features", component: E3 },
  { name: "ListItemBasicItem", title: "List Item — Basic", component: E4 },
  { name: "ListItemWithMedia", title: "List Item — Media", component: E5 },
  { name: "ListItemWithMetadata", title: "List Item — Metadata", component: E6 },
  { name: "ListMessageList", title: "List — Message List", component: E7 },
  { name: "ListOrderedSteps", title: "List — Ordered Steps", component: E8 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
