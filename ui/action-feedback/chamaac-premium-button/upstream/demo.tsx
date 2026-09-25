import Example from "./examples/premium-button-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "premium-button", title: "Premium Button", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
