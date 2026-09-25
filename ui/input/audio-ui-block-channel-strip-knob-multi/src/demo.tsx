import E0 from "./examples/block-channel-strip-knob-multi";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-channel-strip-knob-multi", title: "Block Channel Strip Knob Multi", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
