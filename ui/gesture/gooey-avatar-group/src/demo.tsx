import { GooeyAvatarGroup } from "./gooey-avatar-group";
import avatar1 from "./avatars/avatar-1.png";
import avatar2 from "./avatars/avatar-2.png";
import avatar3 from "./avatars/avatar-3.png";
import avatar4 from "./avatars/avatar-4.png";

export default function GooeyAvatarGroupDemo() {
  return (
    <div className="grid h-[280px] w-full max-w-md place-items-center overflow-hidden rounded-lg bg-muted/30">
      <GooeyAvatarGroup avatars={[avatar1, avatar2, avatar3]} chipSrc={avatar4} />
    </div>
  );
}
