import { SidebarWrapper } from "@/components/sidebar"
import { ReportsDashboard } from "@/components/reports/reports-dashboard"

export default function RelatoriosPage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <ReportsDashboard />
      </div>
    </SidebarWrapper>
  )
}
