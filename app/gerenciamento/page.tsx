import { SidebarWrapper } from "@/components/sidebar"
import DataManagementDashboard from "@/components/data-management-dashboard"

export default function GerenciamentoPage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Gerenciamento de Dados</h2>
        <DataManagementDashboard />
      </div>
    </SidebarWrapper>
  )
}
