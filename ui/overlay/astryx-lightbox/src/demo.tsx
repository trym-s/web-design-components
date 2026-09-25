import E0 from "./examples/LightboxShowcase.tsx";
import E1 from "./examples/LightboxGallery.tsx";
import E2 from "./examples/LightboxVideo.tsx";
import E3 from "./examples/LightboxZoom.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "LightboxShowcase", title: "Lightbox", component: E0 },
  { name: "LightboxGallery", title: "Lightbox — Gallery", component: E1 },
  { name: "LightboxVideo", title: "Lightbox — Video", component: E2 },
  { name: "LightboxZoom", title: "Lightbox — Zoom", component: E3 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
