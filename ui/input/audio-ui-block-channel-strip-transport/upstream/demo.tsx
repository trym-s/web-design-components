import E0 from "./examples/block-channel-strip-transport";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-channel-strip-transport", title: "Block Channel Strip Transport", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
