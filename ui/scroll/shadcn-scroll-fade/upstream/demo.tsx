import { ScrollFadeDemo as E0 } from "./examples/scroll-fade-demo";
import { ScrollFadeEdge as E1 } from "./examples/scroll-fade-edge";
import { ScrollFadeHorizontal as E2 } from "./examples/scroll-fade-horizontal";
import { ScrollFadeNone as E3 } from "./examples/scroll-fade-none";
import { ScrollFadeOverflow as E4 } from "./examples/scroll-fade-overflow";
import { ScrollFadeSize as E5 } from "./examples/scroll-fade-size";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "scroll-fade-demo", title: "Scroll Fade Demo · not on docs page", component: E0 },
  { name: "scroll-fade-edge", title: "Scroll Fade Edge · not on docs page", component: E1 },
  { name: "scroll-fade-horizontal", title: "Scroll Fade Horizontal · not on docs page", component: E2 },
  { name: "scroll-fade-none", title: "Scroll Fade None · not on docs page", component: E3 },
  { name: "scroll-fade-overflow", title: "Scroll Fade Overflow · not on docs page", component: E4 },
  { name: "scroll-fade-size", title: "Scroll Fade Size · not on docs page", component: E5 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
