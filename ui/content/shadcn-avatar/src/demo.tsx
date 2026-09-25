import E0 from "./examples/avatar-demo";
import E1 from "./examples/avatar-basic";
import { AvatarWithBadge as E2 } from "./examples/avatar-badge";
import { AvatarBadgeIconExample as E3 } from "./examples/avatar-badge-icon";
import { AvatarGroupExample as E4 } from "./examples/avatar-group";
import { AvatarGroupCountExample as E5 } from "./examples/avatar-group-count";
import { AvatarGroupCountIconExample as E6 } from "./examples/avatar-group-count-icon";
import { AvatarSizeExample as E7 } from "./examples/avatar-size";
import { AvatarDropdown as E8 } from "./examples/avatar-dropdown";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "avatar-demo", title: "Avatar Demo", component: E0 },
  { name: "avatar-basic", title: "Avatar Basic", component: E1 },
  { name: "avatar-badge", title: "Avatar Badge", component: E2 },
  { name: "avatar-badge-icon", title: "Avatar Badge Icon", component: E3 },
  { name: "avatar-group", title: "Avatar Group", component: E4 },
  { name: "avatar-group-count", title: "Avatar Group Count", component: E5 },
  { name: "avatar-group-count-icon", title: "Avatar Group Count Icon", component: E6 },
  { name: "avatar-size", title: "Avatar Size", component: E7 },
  { name: "avatar-dropdown", title: "Avatar Dropdown", component: E8 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
