import E0 from "./examples/LinkShowcase.tsx";
import E1 from "./examples/LinkExternalLinks.tsx";
import E2 from "./examples/LinkInlineLink.tsx";
import E3 from "./examples/LinksWithTooltips.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "LinkShowcase", title: "Link", component: E0 },
  { name: "LinkExternalLinks", title: "Link — External Links", component: E1 },
  { name: "LinkInlineLink", title: "Link — Inline Text", component: E2 },
  { name: "LinksWithTooltips", title: "Link — With Tooltips", component: E3 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
