import { AuthProvider, SignUp } from "@better-auth-ui/heroui"
import { usernamePlugin } from "@better-auth-ui/heroui/plugins/username"

import { authClient } from "../../../../_sources/better-auth-ui/app/lib/auth-client"

export function SignUpUsernameDemo() {
  return (
    <AuthProvider
      authClient={authClient}
      navigate={() => {}}
      plugins={[usernamePlugin({ isUsernameAvailable: true })]}
    >
      <SignUp />
    </AuthProvider>
  )
}
