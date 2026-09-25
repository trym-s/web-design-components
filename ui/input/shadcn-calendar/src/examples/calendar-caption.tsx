"use client"

import { Calendar } from "../../../../_sources/shadcn/radix-nova/ui/calendar"

export function CalendarCaption() {
  return (
    <Calendar
      mode="single"
      captionLayout="dropdown"
      className="rounded-lg border"
    />
  )
}
