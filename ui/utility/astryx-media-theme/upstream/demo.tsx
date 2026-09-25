import E0 from "./examples/MediaThemeShowcase.tsx";
import E1 from "./examples/MediaThemeImageOverlay.tsx";
import E2 from "./examples/MediaThemeLightScrim.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "MediaThemeShowcase", title: "MediaTheme — Media Overlay", component: E0 },
  { name: "MediaThemeImageOverlay", title: "MediaTheme — Image Overlay", component: E1 },
  { name: "MediaThemeLightScrim", title: "MediaTheme — Light Scrim", component: E2 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
