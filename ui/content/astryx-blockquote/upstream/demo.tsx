import E0 from "./examples/BlockquoteShowcase.tsx";
import E1 from "./examples/BlockquoteTestimonials.tsx";
import E2 from "./examples/BlockquoteWithCite.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "BlockquoteShowcase", title: "Blockquote — Showcase", component: E0 },
  { name: "BlockquoteTestimonials", title: "Blockquote — Testimonials", component: E1 },
  { name: "BlockquoteWithCite", title: "Blockquote — With Attribution", component: E2 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
