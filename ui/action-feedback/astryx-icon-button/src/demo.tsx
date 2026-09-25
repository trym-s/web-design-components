import E0 from "./examples/IconButtonShowcase.tsx";
import E1 from "./examples/IconButtonActionBar.tsx";
import E2 from "./examples/IconButtonFloating.tsx";
import E3 from "./examples/IconButtonLoadingToggle.tsx";
import E4 from "./examples/IconButtonTooltipIconButton.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "IconButtonShowcase", title: "Icon Button", component: E0 },
  { name: "IconButtonActionBar", title: "IconButton — Action Bar", component: E1 },
  { name: "IconButtonFloating", title: "IconButton — Floating", component: E2 },
  { name: "IconButtonLoadingToggle", title: "IconButton — Loading State", component: E3 },
  { name: "IconButtonTooltipIconButton", title: "IconButton — With Tooltips", component: E4 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
