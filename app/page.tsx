import { SidebarWrapper } from "@/components/sidebar"
import OverviewDashboard from "@/components/overview-dashboard"

export default function Home() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <OverviewDashboard />
      </div>
    </SidebarWrapper>
  )
}
