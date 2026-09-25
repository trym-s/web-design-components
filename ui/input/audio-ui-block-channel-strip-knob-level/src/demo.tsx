import { useState } from "react";
import { BlockChannelStripKnobLevel } from "./block-channel-strip-knob-level";

export default function Demo() {
  const [value, setValue] = useState(50);
  return <BlockChannelStripKnobLevel footer="Output" label="Level" onValueChange={setValue} title="Channel 1" value={value} />;
}
