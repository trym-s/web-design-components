import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../_sources/shadcn/radix-nova/ui/avatar"

export function AvatarSizeExample() {
  return (
    <div className="flex flex-wrap items-center gap-2 grayscale">
      <Avatar size="sm">
        <AvatarImage src={new URL("../../../../_sources/shadcn/remote/github.com/shadcn.jpg", import.meta.url).href} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src={new URL("../../../../_sources/shadcn/remote/github.com/shadcn.jpg", import.meta.url).href} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src={new URL("../../../../_sources/shadcn/remote/github.com/shadcn.jpg", import.meta.url).href} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}
