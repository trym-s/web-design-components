import Example from "./examples/invoice-card-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "invoice-card", title: "Invoice Card", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
