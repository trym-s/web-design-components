import { AuthProvider } from "../../../../_sources/better-auth-ui/app/components/auth/auth-provider"
import { UserProfile } from "../../../../_sources/better-auth-ui/app/components/auth/settings/account/user-profile"
import { usernamePlugin } from "../../../../_sources/better-auth-ui/app/lib/auth/username-plugin"
import { authClient } from "../../../../_sources/better-auth-ui/app/lib/auth-client"

export function UserProfileUsernameDemo() {
  return (
    <AuthProvider
      authClient={authClient}
      navigate={() => {}}
      plugins={[usernamePlugin({ isUsernameAvailable: true })]}
      Link={(props) => <a {...props} href={undefined} />}
    >
      <div className="w-full">
        <UserProfile />
      </div>
    </AuthProvider>
  )
}
