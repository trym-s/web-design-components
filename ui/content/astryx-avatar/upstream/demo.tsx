import E0 from "./examples/AvatarShowcase.tsx";
import E1 from "./examples/AvatarStatusDotShowcase.tsx";
import E2 from "./examples/AvatarFallbackChain.tsx";
import E3 from "./examples/AvatarInitialsFallback.tsx";
import E4 from "./examples/AvatarInteractive.tsx";
import E5 from "./examples/AvatarStatusDotVariants.tsx";
import E6 from "./examples/AvatarTooltip.tsx";
import E7 from "./examples/AvatarUserCard.tsx";
import E8 from "./examples/AvatarWithImage.tsx";
import E9 from "./examples/AvatarWithStatus.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "AvatarShowcase", title: "Avatar", component: E0 },
  { name: "AvatarStatusDotShowcase", title: "Avatar Status Dot", component: E1 },
  { name: "AvatarFallbackChain", title: "Avatar — Fallback Chain", component: E2 },
  { name: "AvatarInitialsFallback", title: "Avatar — Initials", component: E3 },
  { name: "AvatarInteractive", title: "Avatar — Interactive", component: E4 },
  { name: "AvatarStatusDotVariants", title: "AvatarStatusDot — Variants", component: E5 },
  { name: "AvatarTooltip", title: "Avatar — Tooltip", component: E6 },
  { name: "AvatarUserCard", title: "Avatar — User Card", component: E7 },
  { name: "AvatarWithImage", title: "Avatar — Photo", component: E8 },
  { name: "AvatarWithStatus", title: "Avatar — Status Dot", component: E9 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
