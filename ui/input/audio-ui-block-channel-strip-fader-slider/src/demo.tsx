import E0 from "./examples/block-channel-strip-fader-slider";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-channel-strip-fader-slider", title: "Block Channel Strip Fader Slider", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
