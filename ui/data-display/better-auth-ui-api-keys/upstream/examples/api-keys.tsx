import { ApiKeys } from "../../../../_sources/better-auth-ui/app/components/auth/api-key/api-keys"
import { AuthProvider } from "../../../../_sources/better-auth-ui/app/components/auth/auth-provider"
import { apiKeyPlugin } from "../../../../_sources/better-auth-ui/app/lib/auth/api-key-plugin"
import { authClient } from "../../../../_sources/better-auth-ui/app/lib/auth-client"

export function ApiKeysDemo() {
  return (
    <AuthProvider
      authClient={authClient}
      navigate={() => {}}
      plugins={[apiKeyPlugin()]}
      Link={(props) => <a {...props} href={undefined} />}
    >
      <div className="w-full">
        <ApiKeys />
      </div>
    </AuthProvider>
  )
}
