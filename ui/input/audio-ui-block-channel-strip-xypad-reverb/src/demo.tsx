import E0 from "./examples/block-channel-strip-xypad-reverb";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-channel-strip-xypad-reverb", title: "Block Channel Strip Xypad Reverb", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
