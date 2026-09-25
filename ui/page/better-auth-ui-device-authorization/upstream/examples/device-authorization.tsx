import { AuthProvider } from "../../../../_sources/better-auth-ui/app/components/auth/auth-provider"
import { DeviceAuthorization } from "../../../../_sources/better-auth-ui/app/components/auth/device-authorization/device-authorization"
import { deviceAuthorizationPlugin } from "../../../../_sources/better-auth-ui/app/lib/auth/device-authorization-plugin"
import { authClient } from "../../../../_sources/better-auth-ui/app/lib/auth-client"

export function DeviceAuthorizationDemo() {
  return (
    <AuthProvider
      authClient={authClient}
      navigate={() => {}}
      plugins={[deviceAuthorizationPlugin()]}
    >
      <DeviceAuthorization />
    </AuthProvider>
  )
}
