import { SidebarWrapper } from "@/components/sidebar"
import InternalMarketing from "@/components/internal-marketing"

export default function MarketingInternoPage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Marketing Interno</h2>
        <InternalMarketing />
      </div>
    </SidebarWrapper>
  )
}
