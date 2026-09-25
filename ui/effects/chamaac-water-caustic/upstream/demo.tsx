import Example from "./examples/water-caustic-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "water-caustic", title: "Water Caustic", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
