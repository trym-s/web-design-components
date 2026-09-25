import E0 from "./examples/block-channel-strip-fader-multi";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-channel-strip-fader-multi", title: "Block Channel Strip Fader Multi", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
