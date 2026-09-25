import E0 from "./examples/card-demo";
import { CardSmall as E1 } from "./examples/card-small";
import { CardSpacing as E2 } from "./examples/card-spacing";
import { CardEdgeToEdge as E3 } from "./examples/card-edge-to-edge";
import { CardImage as E4 } from "./examples/card-image";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "card-demo", title: "Card Demo", component: E0 },
  { name: "card-small", title: "Card Small", component: E1 },
  { name: "card-spacing", title: "Card Spacing", component: E2 },
  { name: "card-edge-to-edge", title: "Card Edge To Edge", component: E3 },
  { name: "card-image", title: "Card Image", component: E4 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
