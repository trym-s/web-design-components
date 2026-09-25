import { OrganizationSwitcher } from "../../../../_sources/better-auth-ui/app/components/auth/organization/organization-switcher"

import { OrganizationDemoWrapper } from "../../../../_sources/better-auth-ui/app/demos/shadcn/organization/organization-demo-wrapper"

export function OrganizationSwitcherDemo() {
  return (
    <OrganizationDemoWrapper>
      <OrganizationSwitcher align="start" />
    </OrganizationDemoWrapper>
  )
}
