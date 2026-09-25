import E0 from "./examples/block-channel-strip";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-channel-strip", title: "Block Channel Strip", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
