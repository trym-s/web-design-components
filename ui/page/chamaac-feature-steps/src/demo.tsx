import Example from "./examples/feature-steps-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "feature-steps", title: "Feature Steps", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
