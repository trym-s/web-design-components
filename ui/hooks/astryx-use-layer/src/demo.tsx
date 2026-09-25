import E0 from "./examples/LayerHookUsage.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "LayerHookUsage", title: "useLayer — Anchored Layer", component: E0 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
