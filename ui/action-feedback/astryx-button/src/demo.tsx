import E0 from "./examples/ButtonShowcase.tsx";
import E1 from "./examples/ButtonFloating.tsx";
import E2 from "./examples/ButtonSizeVariants.tsx";
import E3 from "./examples/ButtonVariants.tsx";
import E4 from "./examples/ButtonWithEndSlot.tsx";
import E5 from "./examples/ButtonWithIcon.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "ButtonShowcase", title: "Button — Variants", component: E0 },
  { name: "ButtonFloating", title: "Button — Floating", component: E1 },
  { name: "ButtonSizeVariants", title: "Button — Sizes", component: E2 },
  { name: "ButtonVariants", title: "Button — Variants", component: E3 },
  { name: "ButtonWithEndSlot", title: "Button — End Slot", component: E4 },
  { name: "ButtonWithIcon", title: "Button — Icon", component: E5 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
