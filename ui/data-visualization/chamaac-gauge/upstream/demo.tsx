import Example from "./examples/gauge-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "gauge", title: "Gauge", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
