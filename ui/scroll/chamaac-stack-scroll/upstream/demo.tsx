import Example from "./examples/stack-scroll-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "stack-scroll", title: "Stack Scroll", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
