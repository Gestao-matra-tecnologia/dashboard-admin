import { SidebarWrapper } from "@/components/sidebar"
import { HelpCenter } from "@/components/help/help-center"

export default function AjudaPage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <HelpCenter />
      </div>
    </SidebarWrapper>
  )
}
