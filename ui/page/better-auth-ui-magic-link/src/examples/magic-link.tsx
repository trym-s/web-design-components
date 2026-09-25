import { AuthProvider } from "../../../../_sources/better-auth-ui/app/components/auth/auth-provider"
import { MagicLink } from "../../../../_sources/better-auth-ui/app/components/auth/magic-link"
import { magicLinkPlugin } from "../../../../_sources/better-auth-ui/app/lib/auth/magic-link-plugin"
import { authClient } from "../../../../_sources/better-auth-ui/app/lib/auth-client"

export function MagicLinkDemo() {
  return (
    <AuthProvider
      authClient={authClient}
      navigate={() => {}}
      plugins={[magicLinkPlugin()]}
      socialProviders={["github", "google"]}
      Link={(props) => <a {...props} href={undefined} />}
    >
      <MagicLink />
    </AuthProvider>
  )
}
