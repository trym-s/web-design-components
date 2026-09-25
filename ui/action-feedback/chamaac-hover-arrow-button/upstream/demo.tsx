import Example from "./examples/hover-arrow-button-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "hover-arrow-button", title: "Hover Arrow Button", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
