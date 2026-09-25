import { useState } from "react";
import { BlockChannelStripFaderMulti } from "./block-channel-strip-fader-multi";

const labels = ["CH1", "CH2", "CH3", "CH4"];

export default function Demo() {
  const [values, setValues] = useState(() => labels.map((label) => ({ id: label, label, value: 50 })));
  return (
    <BlockChannelStripFaderMulti
      channels={values}
      footer="Output"
      onValueChange={(id, value) => setValues((current) => current.map((item) => (item.id === id ? { ...item, value } : item)))}
    />
  );
}
