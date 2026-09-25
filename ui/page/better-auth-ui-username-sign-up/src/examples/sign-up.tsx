import { AuthProvider } from "../../../../_sources/better-auth-ui/app/components/auth/auth-provider"
import { SignUp } from "../../../../_sources/better-auth-ui/app/components/auth/sign-up"
import { usernamePlugin } from "../../../../_sources/better-auth-ui/app/lib/auth/username-plugin"
import { authClient } from "../../../../_sources/better-auth-ui/app/lib/auth-client"

export function SignUpUsernameDemo() {
  return (
    <AuthProvider
      authClient={authClient}
      navigate={() => {}}
      plugins={[usernamePlugin({ isUsernameAvailable: true })]}
      Link={(props) => <a {...props} href={undefined} />}
    >
      <SignUp />
    </AuthProvider>
  )
}
