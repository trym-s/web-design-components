import E0 from "./examples/block-player-widget";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "block-player-widget", title: "Block Player Widget", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} tracks />;
}
