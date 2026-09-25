import { useState } from "react";
import { Transport } from "./transport";


function TransportDemo() {
  const [value, setValue] = useState(42);

  return (
    <Transport
      aria-label="Playback position"
      bufferedValue={78}
      onSeek={setValue}
      value={value}
    />
  );
}

export default function Demo() {
  return <TransportDemo />;
}
