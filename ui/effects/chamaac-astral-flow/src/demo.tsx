import Example from "./examples/astral-flow-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "astral-flow", title: "Astral Flow", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
