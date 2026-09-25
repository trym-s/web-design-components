import E0 from "./examples/block-channel-strip-transport-vertical";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-channel-strip-transport-vertical", title: "Block Channel Strip Transport Vertical", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
