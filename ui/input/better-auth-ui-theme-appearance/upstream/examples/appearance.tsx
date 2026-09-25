import { useTheme } from "../../../../_sources/better-auth-ui/app/shims/fumadocs-theme"

import { AuthProvider } from "../../../../_sources/better-auth-ui/app/components/auth/auth-provider"
import { Appearance } from "../../../../_sources/better-auth-ui/app/components/auth/theme/appearance"
import { themePlugin } from "../../../../_sources/better-auth-ui/app/lib/auth/theme-plugin"
import { authClient } from "../../../../_sources/better-auth-ui/app/lib/auth-client"

export function AppearanceDemo() {
  return (
    <AuthProvider
      authClient={authClient}
      navigate={() => {}}
      plugins={[themePlugin({ useTheme })]}
      Link={(props) => <a {...props} href={undefined} />}
    >
      <div className="w-full">
        <Appearance />
      </div>
    </AuthProvider>
  )
}
