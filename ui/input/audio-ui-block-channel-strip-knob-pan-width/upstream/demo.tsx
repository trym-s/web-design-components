import E0 from "./examples/block-channel-strip-knob-pan-width";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-channel-strip-knob-pan-width", title: "Block Channel Strip Knob Pan Width", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
