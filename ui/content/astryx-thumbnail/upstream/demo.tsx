import E0 from "./examples/ThumbnailShowcase.tsx";
import E1 from "./examples/ThumbnailDisabled.tsx";
import E2 from "./examples/ThumbnailGallery.tsx";
import E3 from "./examples/ThumbnailRemovable.tsx";
import E4 from "./examples/ThumbnailStates.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "ThumbnailShowcase", title: "Thumbnail", component: E0 },
  { name: "ThumbnailDisabled", title: "Thumbnail — Disabled", component: E1 },
  { name: "ThumbnailGallery", title: "Thumbnail — Gallery", component: E2 },
  { name: "ThumbnailRemovable", title: "Thumbnail — Removable", component: E3 },
  { name: "ThumbnailStates", title: "Thumbnail — States", component: E4 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
