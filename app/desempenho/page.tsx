import { SidebarWrapper } from "@/components/sidebar"
import EmployeePerformance from "@/components/employee-performance"

export default function DesempenhoPage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Desempenho dos Funcionários</h2>
        <EmployeePerformance />
      </div>
    </SidebarWrapper>
  )
}
