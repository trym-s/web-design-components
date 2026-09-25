"use client"

import { ChevronDownIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../_sources/shadcn/radix-nova/ui/avatar"
import { Button } from "../../../../_sources/shadcn/radix-nova/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../_sources/shadcn/radix-nova/ui/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
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

export function ItemDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Select <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuGroup>
          {people.map((person) => (
            <DropdownMenuItem key={person.username}>
              <Item size="xs" className="w-full p-2">
                <ItemMedia>
                  <Avatar className="size-[--spacing(6.5)]">
                    <AvatarImage src={person.avatar} className="grayscale" />
                    <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent className="gap-0">
                  <ItemTitle>{person.username}</ItemTitle>
                  <ItemDescription className="leading-none">
                    {person.email}
                  </ItemDescription>
                </ItemContent>
              </Item>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
