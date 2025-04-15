import { SidebarWrapper } from "@/components/sidebar"
import DepartmentGoals from "@/components/department-goals"

export default function MetasPage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Metas por Área</h2>
        <DepartmentGoals />
      </div>
    </SidebarWrapper>
  )
}
