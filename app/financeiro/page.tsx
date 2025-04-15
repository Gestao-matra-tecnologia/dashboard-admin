import { SidebarWrapper } from "@/components/sidebar"
import FinanceDashboard from "@/components/finance/finance-dashboard"

export default function FinancePage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <FinanceDashboard />
      </div>
    </SidebarWrapper>
  )
}
