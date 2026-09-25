import E0 from "./examples/player-demo";
import E1 from "./examples/player-queue-demo";
import E2 from "./examples/player-variant-demo";
import E3 from "./examples/player-size-demo";
import E4 from "./examples/player-stacked-demo";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "player-demo", title: "Demo", component: E0 },
  { name: "player-queue-demo", title: "Queue", component: E1 },
  { name: "player-variant-demo", title: "Variant", component: E2 },
  { name: "player-size-demo", title: "Size", component: E3 },
  { name: "player-stacked-demo", title: "Stacked", component: E4 },
];

export default function Demo() {
  return <AudioFrame examples={examples} tracks />;
}
