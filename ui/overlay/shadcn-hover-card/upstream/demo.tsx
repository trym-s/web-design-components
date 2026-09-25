import E0 from "./examples/hover-card-demo";
import { HoverCardSides as E1 } from "./examples/hover-card-sides";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "hover-card-demo", title: "Hover Card Demo", component: E0 },
  { name: "hover-card-sides", title: "Hover Card Sides", component: E1 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
