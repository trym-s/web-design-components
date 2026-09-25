import E0 from "./examples/block-pocket-synth";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-pocket-synth", title: "Block Pocket Synth", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
