import { useState } from "react";
import { BlockChannelStrip } from "./block-channel-strip";

export default function Demo() {
  const [volume, setVolume] = useState(72);
  return <BlockChannelStrip footer="Output" label="Volume" onValueChange={setVolume} title="Channel 1" value={volume} />;
}
