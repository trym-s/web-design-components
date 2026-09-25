import * as React from "react"
import { PlusIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../_sources/shadcn/radix-nova/ui/avatar"
import { Button } from "../../../../_sources/shadcn/radix-nova/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "../../../../_sources/shadcn/radix-nova/ui/item"

const people = [
  {
    username: "shadcn",
    avatar: new URL("../../../../_sources/shadcn/remote/github.com/shadcn.jpg", import.meta.url).href,
    email: "shadcn@vercel.com",
  },
  {
    username: "maxleiter",
    avatar: new URL("../../../../_sources/shadcn/remote/github.com/maxleiter.png", import.meta.url).href,
    email: "maxleiter@vercel.com",
  },
  {
    username: "evilrabbit",
    avatar: new URL("../../../../_sources/shadcn/remote/github.com/evilrabbit.png", import.meta.url).href,
    email: "evilrabbit@vercel.com",
  },
]

export function ItemGroupExample() {
  return (
    <ItemGroup className="max-w-sm">
      {people.map((person, index) => (
        <Item key={person.username} variant="outline">
          <ItemMedia>
            <Avatar>
              <AvatarImage src={person.avatar} className="grayscale" />
              <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent className="gap-1">
            <ItemTitle>{person.username}</ItemTitle>
            <ItemDescription>{person.email}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="ghost" size="icon" className="rounded-full">
              <PlusIcon />
            </Button>
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  )
}
