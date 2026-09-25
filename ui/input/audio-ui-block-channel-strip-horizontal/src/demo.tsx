import { useState } from "react";
import { BlockChannelStripHorizontal } from "./block-channel-strip-horizontal";

export default function Demo() {
  const [volume, setVolume] = useState(72);
  return <BlockChannelStripHorizontal footer="Output" label="Volume" onValueChange={setVolume} title="Channel 1" value={volume} />;
}
