import E0 from "./examples/CitationShowcase.tsx";
import E1 from "./examples/CitationInlineText.tsx";
import E2 from "./examples/CitationSourceList.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "CitationShowcase", title: "Citation — Showcase", component: E0 },
  { name: "CitationInlineText", title: "Citation — Inline Text", component: E1 },
  { name: "CitationSourceList", title: "Citation — Source List", component: E2 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
