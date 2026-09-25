import Example from "./examples/svg-animation-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "svg-animation", title: "Svg Animation", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
