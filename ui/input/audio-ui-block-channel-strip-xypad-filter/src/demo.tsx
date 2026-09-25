import { useState } from "react";
import { BlockChannelStripXypadFilter } from "./block-channel-strip-xypad-filter";

export default function Demo() {
  const [pad, setPad] = useState({ x: 30, y: 70 });
  return <BlockChannelStripXypadFilter onValueChange={setPad} value={pad} />;
}
