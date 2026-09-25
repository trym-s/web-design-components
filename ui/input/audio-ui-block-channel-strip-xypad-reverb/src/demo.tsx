import { useState } from "react";
import { BlockChannelStripXypadReverb } from "./block-channel-strip-xypad-reverb";

export default function Demo() {
  const [morph, setMorph] = useState({ x: 60, y: 20 });
  const [wet, setWet] = useState(60);
  return <BlockChannelStripXypadReverb morph={morph} onMorphChange={setMorph} onWetChange={setWet} wet={wet} />;
}
