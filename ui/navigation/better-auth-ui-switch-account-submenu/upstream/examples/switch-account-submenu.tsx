import { AuthProvider } from "../../../../_sources/better-auth-ui/app/components/auth/auth-provider"
import { UserButton } from "../../../../_sources/better-auth-ui/app/components/auth/user/user-button"
import { multiSessionPlugin } from "../../../../_sources/better-auth-ui/app/lib/auth/multi-session-plugin"
import { authClient } from "../../../../_sources/better-auth-ui/app/lib/auth-client"

export function SwitchAccountSubmenuDemo() {
  return (
    <AuthProvider
      authClient={authClient}
      navigate={() => {}}
      plugins={[multiSessionPlugin()]}
      socialProviders={["github", "google"]}
      Link={(props) => <a {...props} href={undefined} />}
    >
      <UserButton />
    </AuthProvider>
  )
}
