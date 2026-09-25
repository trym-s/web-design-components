import E0 from "./examples/ChatDictationButtonShowcase.tsx";
import E1 from "./examples/ChatDictationButtonBasic.tsx";
import E2 from "./examples/ChatDictationDictationInComposer.tsx";
import E3 from "./examples/ChatDictationDictationStates.tsx";
import E4 from "./examples/ChatDictationSizes.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "ChatDictationButtonShowcase", title: "Chat Dictation Button", component: E0 },
  { name: "ChatDictationButtonBasic", title: "ChatDictationButton — Basic", component: E1 },
  { name: "ChatDictationDictationInComposer", title: "ChatDictationButton — In Composer", component: E2 },
  { name: "ChatDictationDictationStates", title: "ChatDictationButton — States", component: E3 },
  { name: "ChatDictationSizes", title: "ChatDictationButton — Sizes", component: E4 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
