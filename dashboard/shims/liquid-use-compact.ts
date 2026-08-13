/* Shim — upstream's breakpoint hook picking the compact vs desktop scene set.
   Reimplemented against the captured scene definitions. */
import { useEffect, useState } from "react";
import { COMPACT_SET, DESKTOP_SET } from "/ui/effects/liquid-ui/src/liquid/scenes";

export function useSceneSet() {
  const [compact, setCompact] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 720,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 719px)");
    const on = () => setCompact(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return compact ? COMPACT_SET : DESKTOP_SET;
}
