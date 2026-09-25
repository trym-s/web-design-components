import Example from "./examples/slide-up-button-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "slideup-button", title: "Slide Up Button", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
