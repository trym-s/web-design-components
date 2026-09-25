import Component from "../../../_sources/chamaac/registry/chamaac/modern-smoke/page";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

// No demo upstream: the component with its default props, filling the preview box.
const examples = [{ name: "modern-smoke", title: "Modern Smoke", component: () => <div className="absolute inset-0"><Component /></div> }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
