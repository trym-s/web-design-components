import { useState } from "react";
import { BlockChannelStripFader } from "./block-channel-strip-fader";

export default function Demo() {
  const [value, setValue] = useState(64);
  return <BlockChannelStripFader label="Fader" onValueChange={setValue} value={value} />;
}
