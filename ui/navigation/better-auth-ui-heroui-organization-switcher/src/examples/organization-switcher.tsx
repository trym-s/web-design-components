import { AuthProvider } from "@better-auth-ui/heroui"
import {
  OrganizationSwitcher,
  organizationPlugin
} from "@better-auth-ui/heroui/plugins/organization"

import { authClient } from "../../../../_sources/better-auth-ui/app/lib/auth-client"

export function OrganizationSwitcherDemo() {
  return (
    <AuthProvider
      authClient={authClient}
      navigate={() => {}}
      plugins={[organizationPlugin()]}
    >
      <OrganizationSwitcher placement="bottom" />
    </AuthProvider>
  )
}
