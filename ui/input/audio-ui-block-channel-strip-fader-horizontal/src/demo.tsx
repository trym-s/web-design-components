import E0 from "./examples/block-channel-strip-fader-horizontal";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-channel-strip-fader-horizontal", title: "Block Channel Strip Fader Horizontal", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
