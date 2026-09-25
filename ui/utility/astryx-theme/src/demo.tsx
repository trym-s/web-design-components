import E0 from "./examples/ThemeShowcase.tsx";
import E1 from "./examples/ThemeApply.tsx";
import E2 from "./examples/ThemeNested.tsx";
import E3 from "./examples/ThemeSwitcher.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "ThemeShowcase", title: "Theme — Distinct Themes", component: E0 },
  { name: "ThemeApply", title: "Theme — Apply Theme", component: E1 },
  { name: "ThemeNested", title: "Theme — Nested Theme", component: E2 },
  { name: "ThemeSwitcher", title: "Theme — Switch Themes", component: E3 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
