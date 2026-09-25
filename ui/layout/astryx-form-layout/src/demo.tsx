import E0 from "./examples/FormLayoutShowcase.tsx";
import E1 from "./examples/FormLayoutHorizontal.tsx";
import E2 from "./examples/FormLayoutHorizontalLabels.tsx";
import E3 from "./examples/FormLayoutMixedControls.tsx";
import E4 from "./examples/FormLayoutNested.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "FormLayoutShowcase", title: "Form Layout", component: E0 },
  { name: "FormLayoutHorizontal", title: "FormLayout — Horizontal", component: E1 },
  { name: "FormLayoutHorizontalLabels", title: "FormLayout — Settings Form", component: E2 },
  { name: "FormLayoutMixedControls", title: "FormLayout — Mixed Controls", component: E3 },
  { name: "FormLayoutNested", title: "FormLayout — Nested Address Form", component: E4 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
