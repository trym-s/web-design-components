import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "../../../../_sources/shadcn/radix-nova/ui/avatar"

export function AvatarGroupExample() {
  return (
    <AvatarGroup className="grayscale">
      <Avatar>
        <AvatarImage src={new URL("../../../../_sources/shadcn/remote/github.com/shadcn.jpg", import.meta.url).href} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src={new URL("../../../../_sources/shadcn/remote/github.com/maxleiter.png", import.meta.url).href} alt="@maxleiter" />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src={new URL("../../../../_sources/shadcn/remote/github.com/evilrabbit.png", import.meta.url).href}
          alt="@evilrabbit"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  )
}
