import { AuthProvider } from "../../../../_sources/better-auth-ui/app/components/auth/auth-provider"
import { DangerZone } from "../../../../_sources/better-auth-ui/app/components/auth/delete-user/danger-zone"
import { deleteUserPlugin } from "../../../../_sources/better-auth-ui/app/lib/auth/delete-user-plugin"
import { authClient } from "../../../../_sources/better-auth-ui/app/lib/auth-client"

export function DangerZoneDemo() {
  return (
    <AuthProvider
      authClient={authClient}
      navigate={() => {}}
      plugins={[deleteUserPlugin()]}
      socialProviders={["github", "google"]}
      Link={(props) => <a {...props} href={undefined} />}
    >
      <div className="w-full">
        <DangerZone />
      </div>
    </AuthProvider>
  )
}
