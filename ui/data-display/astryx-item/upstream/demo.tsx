import E0 from "./examples/ItemShowcase.tsx";
import E1 from "./examples/ItemBasicItem.tsx";
import E2 from "./examples/ItemWithMedia.tsx";
import E3 from "./examples/ItemWithMetadata.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "ItemShowcase", title: "Item", component: E0 },
  { name: "ItemBasicItem", title: "Item — Basic", component: E1 },
  { name: "ItemWithMedia", title: "Item — Start Content", component: E2 },
  { name: "ItemWithMetadata", title: "Item — Metadata", component: E3 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
