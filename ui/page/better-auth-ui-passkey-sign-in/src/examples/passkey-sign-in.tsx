import { AuthProvider } from "../../../../_sources/better-auth-ui/app/components/auth/auth-provider"
import { SignIn } from "../../../../_sources/better-auth-ui/app/components/auth/sign-in"
import { passkeyPlugin } from "../../../../_sources/better-auth-ui/app/lib/auth/passkey-plugin"
import { authClient } from "../../../../_sources/better-auth-ui/app/lib/auth-client"

export function PasskeySignInDemo() {
  return (
    <AuthProvider
      authClient={authClient}
      navigate={() => {}}
      plugins={[passkeyPlugin()]}
      socialProviders={["github", "google"]}
      Link={(props) => <a {...props} href={undefined} />}
    >
      <SignIn />
    </AuthProvider>
  )
}
