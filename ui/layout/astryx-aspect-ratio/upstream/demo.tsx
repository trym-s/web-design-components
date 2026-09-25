import E0 from "./examples/AspectRatioShowcase.tsx";
import E1 from "./examples/AspectRatioCircleImage.tsx";
import E2 from "./examples/AspectRatioImageGallery.tsx";
import E3 from "./examples/AspectRatioSquareImage.tsx";
import E4 from "./examples/AspectRatioWidescreen.tsx";
import E5 from "./examples/AspectRatioWithSkeleton.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "AspectRatioShowcase", title: "Aspect Ratio", component: E0 },
  { name: "AspectRatioCircleImage", title: "AspectRatio — Circle Image", component: E1 },
  { name: "AspectRatioImageGallery", title: "AspectRatio — Image Gallery", component: E2 },
  { name: "AspectRatioSquareImage", title: "AspectRatio — Square Image", component: E3 },
  { name: "AspectRatioWidescreen", title: "AspectRatio — 16:9 Widescreen Image", component: E4 },
  { name: "AspectRatioWithSkeleton", title: "AspectRatio — Loading Skeleton", component: E5 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
