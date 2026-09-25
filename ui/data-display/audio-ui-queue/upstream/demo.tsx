import E0 from "./examples/player-queue-shuffle-repeat-demo";
import E1 from "./examples/player-queue-preferences-demo";
import E2 from "./examples/player-queue-simple-demo";
import E3 from "./examples/player-queue-all-controls-demo";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "player-queue-shuffle-repeat-demo", title: "Queue Shuffle Repeat", component: E0 },
  { name: "player-queue-preferences-demo", title: "Queue Preferences", component: E1 },
  { name: "player-queue-simple-demo", title: "Queue Simple", component: E2 },
  { name: "player-queue-all-controls-demo", title: "Queue All Controls", component: E3 },
];

export default function Demo() {
  return <AudioFrame examples={examples} tracks />;
}
