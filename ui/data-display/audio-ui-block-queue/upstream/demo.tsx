import E0 from "./examples/block-queue";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-queue", title: "Block Queue", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} tracks />;
}
