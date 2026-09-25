import { OrganizationSettings } from "@better-auth-ui/heroui/plugins/organization"

import { OrganizationDemoWrapper } from "../../../../_sources/better-auth-ui/app/demos/heroui/organization/organization-demo-wrapper"

export function OrganizationSettingsDemo() {
  return (
    <OrganizationDemoWrapper>
      <OrganizationSettings organizationId="org_acme" organizationSlug="acme" />
    </OrganizationDemoWrapper>
  )
}
