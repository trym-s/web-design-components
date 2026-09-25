import E0 from "./examples/block-channel-strip-knob-pan";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-channel-strip-knob-pan", title: "Block Channel Strip Knob Pan", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
