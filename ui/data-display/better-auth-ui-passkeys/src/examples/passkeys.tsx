import { AuthProvider } from "../../../../_sources/better-auth-ui/app/components/auth/auth-provider"
import { Passkeys } from "../../../../_sources/better-auth-ui/app/components/auth/passkey/passkeys"
import { passkeyPlugin } from "../../../../_sources/better-auth-ui/app/lib/auth/passkey-plugin"
import { authClient } from "../../../../_sources/better-auth-ui/app/lib/auth-client"

export function PasskeysDemo() {
  return (
    <AuthProvider
      authClient={authClient}
      navigate={() => {}}
      plugins={[passkeyPlugin()]}
      Link={(props) => <a {...props} href={undefined} />}
    >
      <div className="w-full">
        <Passkeys />
      </div>
    </AuthProvider>
  )
}
