import E0 from "./examples/TextInputShowcase.tsx";
import E1 from "./examples/TextInputIcon.tsx";
import E2 from "./examples/TextInputSearch.tsx";
import E3 from "./examples/TextInputSizes.tsx";
import E4 from "./examples/TextInputStates.tsx";
import E5 from "./examples/TextInputStatusVariant.tsx";
import E6 from "./examples/TextInputTypes.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "TextInputShowcase", title: "Text Input", component: E0 },
  { name: "TextInputIcon", title: "TextInput — Icon", component: E1 },
  { name: "TextInputSearch", title: "TextInput — Search", component: E2 },
  { name: "TextInputSizes", title: "TextInput — Sizes", component: E3 },
  { name: "TextInputStates", title: "TextInput — States", component: E4 },
  { name: "TextInputStatusVariant", title: "TextInput — Status variant", component: E5 },
  { name: "TextInputTypes", title: "TextInput — Types", component: E6 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
