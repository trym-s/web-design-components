import { MarkdownDemo as E0 } from "./examples/markdown-demo";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "markdown-demo", title: "Markdown Demo · not on docs page", component: E0 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
