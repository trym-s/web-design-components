import Example from "./examples/grid-bloom-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "grid-bloom", title: "Grid Bloom", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
