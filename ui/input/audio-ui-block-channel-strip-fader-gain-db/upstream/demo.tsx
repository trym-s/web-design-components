import E0 from "./examples/block-channel-strip-fader-gain-db";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-channel-strip-fader-gain-db", title: "Block Channel Strip Fader Gain Db", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
