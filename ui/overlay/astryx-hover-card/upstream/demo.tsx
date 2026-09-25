import E0 from "./examples/HoverCardShowcase.tsx";
import E1 from "./examples/HoverCardInlineTextHoverCard.tsx";
import E2 from "./examples/HoverCardInteractiveContent.tsx";
import E3 from "./examples/HoverCardProfileHoverCard.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "HoverCardShowcase", title: "Hover Card", component: E0 },
  { name: "HoverCardInlineTextHoverCard", title: "HoverCard — Definition", component: E1 },
  { name: "HoverCardInteractiveContent", title: "HoverCard — Link Preview", component: E2 },
  { name: "HoverCardProfileHoverCard", title: "HoverCard — Profile Preview", component: E3 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
