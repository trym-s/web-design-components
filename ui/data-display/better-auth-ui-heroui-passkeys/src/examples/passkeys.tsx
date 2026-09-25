import { AuthProvider } from "@better-auth-ui/heroui"
import { Passkeys, passkeyPlugin } from "@better-auth-ui/heroui/plugins/passkey"

import { authClient } from "../../../../_sources/better-auth-ui/app/lib/auth-client"

export function PasskeysDemo() {
  return (
    <AuthProvider
      authClient={authClient}
      navigate={() => {}}
      plugins={[passkeyPlugin()]}
    >
      <div className="w-full">
        <Passkeys />
      </div>
    </AuthProvider>
  )
}
