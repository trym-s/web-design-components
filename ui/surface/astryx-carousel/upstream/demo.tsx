import E0 from "./examples/CarouselShowcase.tsx";
import E1 from "./examples/CarouselCards.tsx";
import E2 from "./examples/CarouselSnap.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "CarouselShowcase", title: "Carousel", component: E0 },
  { name: "CarouselCards", title: "Carousel — Cards", component: E1 },
  { name: "CarouselSnap", title: "Carousel — Snap", component: E2 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
