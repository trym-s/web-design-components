import E0 from "./examples/transport-demo";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "transport-demo", title: "Transport", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
