import E0 from "./examples/MetadataListItemShowcase.tsx";
import E1 from "./examples/MetadataListShowcase.tsx";
import E2 from "./examples/MetadataListBasicMetadata.tsx";
import E3 from "./examples/MetadataListCollapsibleMetadata.tsx";
import E4 from "./examples/MetadataListHorizontalMetadata.tsx";
import E5 from "./examples/MetadataListItemBasic.tsx";
import E6 from "./examples/MetadataListMultiColumnMetadata.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "MetadataListItemShowcase", title: "Metadata List Item", component: E0 },
  { name: "MetadataListShowcase", title: "Metadata List", component: E1 },
  { name: "MetadataListBasicMetadata", title: "MetadataList — Basic", component: E2 },
  { name: "MetadataListCollapsibleMetadata", title: "MetadataList — Collapsible", component: E3 },
  { name: "MetadataListHorizontalMetadata", title: "MetadataList — Horizontal", component: E4 },
  { name: "MetadataListItemBasic", title: "MetadataListItem — Basic", component: E5 },
  { name: "MetadataListMultiColumnMetadata", title: "MetadataList — Multi-Column", component: E6 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
