import E0 from "./examples/carousel-demo";
import E1 from "./examples/carousel-size";
import E2 from "./examples/carousel-spacing";
import E3 from "./examples/carousel-orientation";
import E4 from "./examples/carousel-api";
import E5 from "./examples/carousel-plugin";
import { CarouselMultiple as E6 } from "./examples/carousel-multiple";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "carousel-demo", title: "Carousel Demo", component: E0 },
  { name: "carousel-size", title: "Carousel Size", component: E1 },
  { name: "carousel-spacing", title: "Carousel Spacing", component: E2 },
  { name: "carousel-orientation", title: "Carousel Orientation", component: E3 },
  { name: "carousel-api", title: "Carousel Api", component: E4 },
  { name: "carousel-plugin", title: "Carousel Plugin", component: E5 },
  { name: "carousel-multiple", title: "Carousel Multiple · not on docs page", component: E6 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
