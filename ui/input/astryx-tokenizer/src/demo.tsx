import E0 from "./examples/TokenizerShowcase.tsx";
import E1 from "./examples/TokenizerClear.tsx";
import E2 from "./examples/TokenizerCreatable.tsx";
import E3 from "./examples/TokenizerEndContent.tsx";
import E4 from "./examples/TokenizerIcon.tsx";
import E5 from "./examples/TokenizerMaxEntries.tsx";
import E6 from "./examples/TokenizerOverflow.tsx";
import E7 from "./examples/TokenizerStates.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "TokenizerShowcase", title: "Tokenizer", component: E0 },
  { name: "TokenizerClear", title: "Tokenizer — Clear", component: E1 },
  { name: "TokenizerCreatable", title: "Tokenizer — Creatable", component: E2 },
  { name: "TokenizerEndContent", title: "Tokenizer — End Content", component: E3 },
  { name: "TokenizerIcon", title: "Tokenizer — Icon", component: E4 },
  { name: "TokenizerMaxEntries", title: "Tokenizer — Max Entries", component: E5 },
  { name: "TokenizerOverflow", title: "Tokenizer — Overflow", component: E6 },
  { name: "TokenizerStates", title: "Tokenizer — States", component: E7 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
