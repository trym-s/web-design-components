import { Organization } from "@better-auth-ui/heroui/plugins/organization"

import { OrganizationDemoWrapper } from "../../../../_sources/better-auth-ui/app/demos/heroui/organization/organization-demo-wrapper"

export function OrganizationDemo() {
  return (
    <OrganizationDemoWrapper>
      <Organization view="settings" />
    </OrganizationDemoWrapper>
  )
}
