import { AuthProvider, UserButton } from "@better-auth-ui/heroui"
import { themePlugin } from "@better-auth-ui/heroui/plugins/theme"
import { useTheme } from "../../../../_sources/better-auth-ui/app/shims/fumadocs-theme"
import { authClient } from "../../../../_sources/better-auth-ui/app/lib/auth-client"

export function ThemeToggleItemDemo() {
  return (
    <AuthProvider
      authClient={authClient}
      navigate={() => {}}
      plugins={[themePlugin({ useTheme })]}
    >
      <UserButton />
    </AuthProvider>
  )
}
