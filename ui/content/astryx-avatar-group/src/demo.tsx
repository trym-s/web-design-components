import E0 from "./examples/AvatarGroupOverflowShowcase.tsx";
import E1 from "./examples/AvatarGroupShowcase.tsx";
import E2 from "./examples/AvatarGroup.tsx";
import E3 from "./examples/AvatarGroupInteractive.tsx";
import E4 from "./examples/AvatarGroupOverflowCustomText.tsx";
import E5 from "./examples/AvatarGroupOverflowDefault.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "AvatarGroupOverflowShowcase", title: "Avatar Group Overflow", component: E0 },
  { name: "AvatarGroupShowcase", title: "Avatar Group", component: E1 },
  { name: "AvatarGroup", title: "Avatar — Group", component: E2 },
  { name: "AvatarGroupInteractive", title: "Avatar Group — Interactive", component: E3 },
  { name: "AvatarGroupOverflowCustomText", title: "Avatar Group Overflow — Custom Text", component: E4 },
  { name: "AvatarGroupOverflowDefault", title: "Avatar Group Overflow — Default Count", component: E5 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
