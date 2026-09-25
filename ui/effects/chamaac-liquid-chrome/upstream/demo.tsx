import Example from "./examples/liquid-chrome-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "liquid-chrome", title: "Liquid Chrome", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
