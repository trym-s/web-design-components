/* Use when: a React interface needs the upstream gooey avatar group interaction and its Morph + dissolve liquid behavior. */

import "../../_sources/liquid-gooey/styles.css";
import "../../_sources/liquid-gooey/demo.css";
import { Chips } from "./src/demo";

const shadow = "0 0 0 1px rgba(255,255,255,.04) inset, 0 2px 6px rgba(0,0,0,.24)";

export default function LiquidGooeyReference() {
  return (
    <div className="page">
      <Chips blur={6} contrast={18} shadow={shadow} dark pro={false} />
    </div>
  );
}
