import { SidebarWrapper } from "@/components/sidebar"
import DemandTable from "@/components/demand-table"

export default function DemandasPage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Demandas da Semana</h2>
        <DemandTable />
      </div>
    </SidebarWrapper>
  )
}
