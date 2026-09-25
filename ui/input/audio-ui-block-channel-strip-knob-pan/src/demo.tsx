import { useState } from "react";
import { BlockChannelStripKnobPan } from "./block-channel-strip-knob-pan";

export default function Demo() {
  const [value, setValue] = useState(0);
  return <BlockChannelStripKnobPan footer="Output" label="Pan" onValueChange={setValue} title="Channel 1" value={value} />;
}
