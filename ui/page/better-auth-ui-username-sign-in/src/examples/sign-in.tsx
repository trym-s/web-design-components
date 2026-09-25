import { AuthProvider } from "../../../../_sources/better-auth-ui/app/components/auth/auth-provider"
import { SignInUsername } from "../../../../_sources/better-auth-ui/app/components/auth/username/sign-in-username"
import { usernamePlugin } from "../../../../_sources/better-auth-ui/app/lib/auth/username-plugin"
import { authClient } from "../../../../_sources/better-auth-ui/app/lib/auth-client"

export function SignInUsernameDemo() {
  return (
    <AuthProvider
      authClient={authClient}
      navigate={() => {}}
      plugins={[usernamePlugin({ isUsernameAvailable: true })]}
      Link={(props) => <a {...props} href={undefined} />}
    >
      <SignInUsername />
    </AuthProvider>
  )
}
