import Example from "./examples/tilt-card-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "tilt-card", title: "Tilt Card", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
