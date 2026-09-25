import { OrganizationSettings } from "../../../../_sources/better-auth-ui/app/components/auth/organization/organization-settings"

import { OrganizationDemoWrapper } from "../../../../_sources/better-auth-ui/app/demos/shadcn/organization/organization-demo-wrapper"

export function OrganizationSettingsDemo() {
  return (
    <OrganizationDemoWrapper>
      <OrganizationSettings organizationId="org_acme" organizationSlug="acme" />
    </OrganizationDemoWrapper>
  )
}
