import E0 from "./examples/player-track-demo";
import E1 from "./examples/player-track-list-demo";
import E2 from "./examples/player-track-list-grid-demo";
import E3 from "./examples/player-track-sortable-list-demo";
import E4 from "./examples/player-track-sortable-list-grid-demo";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "player-track-demo", title: "Track", component: E0 },
  { name: "player-track-list-demo", title: "Track List", component: E1 },
  { name: "player-track-list-grid-demo", title: "Track List Grid", component: E2 },
  { name: "player-track-sortable-list-demo", title: "Track Sortable List", component: E3 },
  { name: "player-track-sortable-list-grid-demo", title: "Track Sortable List Grid", component: E4 },
];

export default function Demo() {
  return <AudioFrame examples={examples} tracks />;
}
