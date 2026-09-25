import E0 from "./examples/block-channel-strip-xypad-filter";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-channel-strip-xypad-filter", title: "Block Channel Strip Xypad Filter", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
