import E0 from "./examples/IconShowcase.tsx";
import E1 from "./examples/IconNonSemanticColors.tsx";
import E2 from "./examples/IconSemanticColors.tsx";
import E3 from "./examples/IconSizes.tsx";
import E4 from "./examples/IconStatusIcons.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "IconShowcase", title: "Icon", component: E0 },
  { name: "IconNonSemanticColors", title: "Icon — Non-Semantic Colors", component: E1 },
  { name: "IconSemanticColors", title: "Icon — Semantic Colors", component: E2 },
  { name: "IconSizes", title: "Icon — Size Variants", component: E3 },
  { name: "IconStatusIcons", title: "Icon — Status Indicators", component: E4 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
