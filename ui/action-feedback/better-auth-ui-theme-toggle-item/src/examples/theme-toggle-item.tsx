import { useTheme } from "../../../../_sources/better-auth-ui/app/shims/fumadocs-theme"

import { AuthProvider } from "../../../../_sources/better-auth-ui/app/components/auth/auth-provider"
import { UserButton } from "../../../../_sources/better-auth-ui/app/components/auth/user/user-button"
import { themePlugin } from "../../../../_sources/better-auth-ui/app/lib/auth/theme-plugin"
import { authClient } from "../../../../_sources/better-auth-ui/app/lib/auth-client"

export function ThemeToggleItemDemo() {
  return (
    <AuthProvider
      authClient={authClient}
      navigate={() => {}}
      plugins={[themePlugin({ useTheme })]}
      Link={(props) => <a {...props} href={undefined} />}
    >
      <UserButton />
    </AuthProvider>
  )
}
