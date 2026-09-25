import { AuthProvider } from "../../../../_sources/better-auth-ui/app/components/auth/auth-provider"
import { ManageAccounts } from "../../../../_sources/better-auth-ui/app/components/auth/multi-session/manage-accounts"
import { multiSessionPlugin } from "../../../../_sources/better-auth-ui/app/lib/auth/multi-session-plugin"
import { authClient } from "../../../../_sources/better-auth-ui/app/lib/auth-client"

export function ManageAccountsDemo() {
  return (
    <AuthProvider
      authClient={authClient}
      navigate={() => {}}
      plugins={[multiSessionPlugin()]}
      Link={(props) => <a {...props} href={undefined} />}
    >
      <div className="w-full">
        <ManageAccounts />
      </div>
    </AuthProvider>
  )
}
