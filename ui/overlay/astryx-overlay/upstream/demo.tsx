import E0 from "./examples/OverlayShowcase.tsx";
import E1 from "./examples/OverlayBottomStrip.tsx";
import E2 from "./examples/OverlayHoverReveal.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "OverlayShowcase", title: "Overlay", component: E0 },
  { name: "OverlayBottomStrip", title: "Overlay — Bottom Strip", component: E1 },
  { name: "OverlayHoverReveal", title: "Overlay — Hover Reveal", component: E2 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
