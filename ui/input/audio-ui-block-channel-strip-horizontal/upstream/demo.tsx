import E0 from "./examples/block-channel-strip-horizontal";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-channel-strip-horizontal", title: "Block Channel Strip Horizontal", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
