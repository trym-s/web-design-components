import Example from "./examples/focus-button-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "focus-button", title: "Focus Button", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
