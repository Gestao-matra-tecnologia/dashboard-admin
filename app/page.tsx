import { SidebarWrapper } from "@/components/sidebar"
import { Header } from "@/components/header"
import OverviewDashboard from "@/components/overview-dashboard"

export default function Home() {
  return (
    <SidebarWrapper>
      <Header />
      <div className="container mx-auto py-6">
        <OverviewDashboard />
      </div>
    </SidebarWrapper>
  )
}
