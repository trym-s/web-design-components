import { useState } from "react";
import { BlockChannelStripFaderGainDb } from "./block-channel-strip-fader-gain-db";

export default function Demo() {
  const [value, setValue] = useState(0);
  return <BlockChannelStripFaderGainDb label="Gain" onValueChange={setValue} value={value} />;
}
