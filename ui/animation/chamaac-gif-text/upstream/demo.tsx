import Example from "./examples/gif-text-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "gif-text", title: "Gif Text", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
