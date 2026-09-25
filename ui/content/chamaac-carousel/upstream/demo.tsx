import Example from "./examples/coursel-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "carousel", title: "Carousel", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
