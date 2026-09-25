import E0 from "./examples/block-channel-strip-fader";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-channel-strip-fader", title: "Block Channel Strip Fader", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
