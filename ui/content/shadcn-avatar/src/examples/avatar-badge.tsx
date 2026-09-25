import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "../../../../_sources/shadcn/radix-nova/ui/avatar"

export function AvatarWithBadge() {
  return (
    <Avatar>
      <AvatarImage src={new URL("../../../../_sources/shadcn/remote/github.com/shadcn.jpg", import.meta.url).href} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
    </Avatar>
  )
}
