import E0 from "./examples/FileInputShowcase.tsx";
import E1 from "./examples/FileInputBasic.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "FileInputShowcase", title: "File Input", component: E0 },
  { name: "FileInputBasic", title: "FileInput — Basic", component: E1 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
