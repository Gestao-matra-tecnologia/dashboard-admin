import { SidebarWrapper } from "@/components/sidebar"
import ClientMarketing from "@/components/client-marketing"

export default function MarketingClientesPage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Marketing de Clientes</h2>
        <ClientMarketing />
      </div>
    </SidebarWrapper>
  )
}
