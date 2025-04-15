import { SidebarWrapper } from "@/components/sidebar"
import CultureActions from "@/components/culture-actions"

export default function CulturaPage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Ações de Cultura</h2>
        <CultureActions />
      </div>
    </SidebarWrapper>
  )
}
