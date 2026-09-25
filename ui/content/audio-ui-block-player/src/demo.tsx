import E0 from "./examples/block-player";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-player", title: "Block Player", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} tracks />;
}
