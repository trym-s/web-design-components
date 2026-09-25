import E0 from "./examples/aspect-ratio-demo";
import { AspectRatioSquare as E1 } from "./examples/aspect-ratio-square";
import { AspectRatioPortrait as E2 } from "./examples/aspect-ratio-portrait";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "aspect-ratio-demo", title: "Aspect Ratio Demo", component: E0 },
  { name: "aspect-ratio-square", title: "Aspect Ratio Square", component: E1 },
  { name: "aspect-ratio-portrait", title: "Aspect Ratio Portrait", component: E2 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
