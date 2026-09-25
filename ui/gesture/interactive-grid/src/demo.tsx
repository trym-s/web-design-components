import { Aperture, Atom, Box, Command, Hexagon, Infinity as InfinityIcon, Orbit, Triangle, Zap } from "lucide-react";
import { InteractiveGrid } from "./interactive-grid";

/* Placeholder marks instead of the upstream's ten brand-logo PNGs. */
const ICONS = [Aperture, Atom, Box, Command, Hexagon, InfinityIcon, Orbit, Triangle, Zap];

export default function Demo() {
  return (
    <div className="h-[560px] w-full max-w-3xl">
      <InteractiveGrid items={ICONS.map((Icon, i) => <Icon key={i} strokeWidth={1.25} className="text-background dark:text-foreground" />)} />
    </div>
  );
}
