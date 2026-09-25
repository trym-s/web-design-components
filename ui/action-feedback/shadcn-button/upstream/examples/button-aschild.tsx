import Link from "next/link"

import { Button } from "../../../../_sources/shadcn/radix-nova/ui/button"

export default function ButtonAsChild() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  )
}
