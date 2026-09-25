import { Organization } from "../../../../_sources/better-auth-ui/app/components/auth/organization/organization"

import { OrganizationDemoWrapper } from "../../../../_sources/better-auth-ui/app/demos/shadcn/organization/organization-demo-wrapper"

export function OrganizationDemo() {
  return (
    <OrganizationDemoWrapper>
      <Organization view="settings" />
    </OrganizationDemoWrapper>
  )
}
