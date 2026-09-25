import { useState } from "react";
import { BlockChannelStripFaderHorizontal } from "./block-channel-strip-fader-horizontal";

export default function Demo() {
  const [value, setValue] = useState(64);
  return <BlockChannelStripFaderHorizontal label="Fader" onValueChange={setValue} value={value} />;
}
