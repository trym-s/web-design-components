import E0 from "./examples/CodeBlockShowcase.tsx";
import E1 from "./examples/CodeShowcase.tsx";
import E2 from "./examples/CodeAcrossTextSizes.tsx";
import E3 from "./examples/CodeBlockBashCommand.tsx";
import E4 from "./examples/CodeBlockHighlightedLines.tsx";
import E5 from "./examples/CodeBlockJSONConfig.tsx";
import E6 from "./examples/CodeBlockScrollableBlock.tsx";
import E7 from "./examples/CodeBlockTerminal.tsx";
import E8 from "./examples/CodeInlineInParagraph.tsx";
import E9 from "./examples/CodeVariousContent.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "CodeBlockShowcase", title: "Code Block", component: E0 },
  { name: "CodeShowcase", title: "Code", component: E1 },
  { name: "CodeAcrossTextSizes", title: "Code — Text Sizes", component: E2 },
  { name: "CodeBlockBashCommand", title: "Code — Snippet", component: E3 },
  { name: "CodeBlockHighlightedLines", title: "Code — Highlighted", component: E4 },
  { name: "CodeBlockJSONConfig", title: "Code — Config", component: E5 },
  { name: "CodeBlockScrollableBlock", title: "Code — Scrollable", component: E6 },
  { name: "CodeBlockTerminal", title: "Code — Terminal", component: E7 },
  { name: "CodeInlineInParagraph", title: "Code — Inline", component: E8 },
  { name: "CodeVariousContent", title: "Code — Content Types", component: E9 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
