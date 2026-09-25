import E0 from "./examples/ToastShowcase.tsx";
import E1 from "./examples/ToastAction.tsx";
import E2 from "./examples/ToastDeduplication.tsx";
import E3 from "./examples/ToastDismiss.tsx";
import E4 from "./examples/ToastStacking.tsx";
import E5 from "./examples/ToastTypes.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "ToastShowcase", title: "Toast", component: E0 },
  { name: "ToastAction", title: "Toast — Action", component: E1 },
  { name: "ToastDeduplication", title: "Toast — Deduplication", component: E2 },
  { name: "ToastDismiss", title: "Toast — Dismiss", component: E3 },
  { name: "ToastStacking", title: "Toast — Stacking", component: E4 },
  { name: "ToastTypes", title: "Toast — Types", component: E5 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
