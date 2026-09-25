import E0 from "./examples/SyntaxThemeShowcase.tsx";
import E1 from "./examples/SyntaxThemeDarkPreset.tsx";
import E2 from "./examples/SyntaxThemeLightPreset.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "SyntaxThemeShowcase", title: "SyntaxTheme — Compact Preset", component: E0 },
  { name: "SyntaxThemeDarkPreset", title: "SyntaxTheme — Dark Preset", component: E1 },
  { name: "SyntaxThemeLightPreset", title: "SyntaxTheme — Light Preset", component: E2 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
