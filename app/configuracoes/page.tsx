import { SidebarWrapper } from "@/components/sidebar"
import { UserSettings } from "@/components/settings/user-settings"

export default function ConfiguracoesPage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Configurações</h2>
        <UserSettings />
      </div>
    </SidebarWrapper>
  )
}
