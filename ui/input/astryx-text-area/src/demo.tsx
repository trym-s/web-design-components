import E0 from "./examples/TextAreaShowcase.tsx";
import E1 from "./examples/TextAreaCharacterCount.tsx";
import E2 from "./examples/TextAreaStates.tsx";
import E3 from "./examples/TextAreaValidation.tsx";
import E4 from "./examples/TextAreaWithIcon.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "TextAreaShowcase", title: "Text Area", component: E0 },
  { name: "TextAreaCharacterCount", title: "TextArea — Character Count", component: E1 },
  { name: "TextAreaStates", title: "TextArea — States", component: E2 },
  { name: "TextAreaValidation", title: "TextArea — Validation", component: E3 },
  { name: "TextAreaWithIcon", title: "TextArea — Icon", component: E4 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
