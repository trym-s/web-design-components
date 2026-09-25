import E0 from "./examples/block-channel-strip-knob-level";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-channel-strip-knob-level", title: "Block Channel Strip Knob Level", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
