import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../_sources/shadcn/radix-nova/ui/avatar"

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage
        src={new URL("../../../../_sources/shadcn/remote/github.com/shadcn.jpg", import.meta.url).href}
        alt="@shadcn"
        className="grayscale"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
