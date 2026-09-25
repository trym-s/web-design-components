import E0 from "./examples/MarkdownShowcase.tsx";
import E1 from "./examples/MarkdownCitedContent.tsx";
import E2 from "./examples/MarkdownCompactAIResponse.tsx";
import E3 from "./examples/MarkdownDataTable.tsx";
import E4 from "./examples/MarkdownRichContent.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "MarkdownShowcase", title: "Markdown", component: E0 },
  { name: "MarkdownCitedContent", title: "Markdown — Cited Content", component: E1 },
  { name: "MarkdownCompactAIResponse", title: "Markdown — Compact AI Response", component: E2 },
  { name: "MarkdownDataTable", title: "Markdown — Data Table", component: E3 },
  { name: "MarkdownRichContent", title: "Markdown — Rich Content", component: E4 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
