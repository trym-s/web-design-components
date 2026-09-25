import E0 from "./examples/player-playback-speed-demo";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "player-playback-speed-demo", title: "Playback Speed", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} tracks />;
}
