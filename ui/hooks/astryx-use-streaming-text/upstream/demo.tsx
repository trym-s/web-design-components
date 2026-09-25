import E0 from "./examples/useStreamingTextHookUsage.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "useStreamingTextHookUsage", title: "useStreamingText — Streaming Response", component: E0 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
