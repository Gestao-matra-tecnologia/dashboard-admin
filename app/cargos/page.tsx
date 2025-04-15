import { SidebarWrapper } from "@/components/sidebar"
import RolesTable from "@/components/roles-table"

export default function CargosPage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Cargos e Funções</h2>
        <RolesTable />
      </div>
    </SidebarWrapper>
  )
}
