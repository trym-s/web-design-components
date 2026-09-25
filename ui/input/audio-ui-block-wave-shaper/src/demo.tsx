import E0 from "./examples/block-wave-shaper";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-wave-shaper", title: "Block Wave Shaper", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
