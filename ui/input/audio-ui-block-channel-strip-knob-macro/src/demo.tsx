import E0 from "./examples/block-channel-strip-knob-macro";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-channel-strip-knob-macro", title: "Block Channel Strip Knob Macro", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
