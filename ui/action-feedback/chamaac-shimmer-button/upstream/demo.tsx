import Example from "./examples/shimmer-button-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "shimmer-button", title: "Shimmer Button", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
