import Example from "./examples/synthesis-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "synthesis", title: "Synthesis", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
