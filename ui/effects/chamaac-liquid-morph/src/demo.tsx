import Component from "../../../_sources/chamaac/registry/chamaac/liquid-morph/liquid-morph";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

// No demo upstream: the component with its default props, filling the preview box.
const examples = [{ name: "liquid-morph", title: "Liquid Morph", component: () => <div className="absolute inset-0"><Component /></div> }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}
