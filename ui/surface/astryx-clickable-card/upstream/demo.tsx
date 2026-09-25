import E0 from "./examples/ClickableCardShowcase.tsx";
import E1 from "./examples/ClickableCardElevated.tsx";
import E2 from "./examples/ClickableCardWithNestedButton.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "ClickableCardShowcase", title: "Clickable Card", component: E0 },
  { name: "ClickableCardElevated", title: "Clickable Card — Elevated", component: E1 },
  { name: "ClickableCardWithNestedButton", title: "Clickable Card — Nested Button", component: E2 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
