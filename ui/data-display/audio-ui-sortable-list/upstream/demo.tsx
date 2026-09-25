import E0 from "./examples/sortable-list-demo";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "sortable-list-demo", title: "Sortable List", component: E0 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
