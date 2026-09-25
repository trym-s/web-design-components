import E0 from "./examples/progress-demo";
import { ProgressWithLabel as E1 } from "./examples/progress-label";
import { ProgressControlled as E2 } from "./examples/progress-controlled";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "progress-demo", title: "Progress Demo", component: E0 },
  { name: "progress-label", title: "Progress Label", component: E1 },
  { name: "progress-controlled", title: "Progress Controlled", component: E2 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
