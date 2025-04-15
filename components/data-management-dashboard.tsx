"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FunnelManager from "@/components/data-management/funnel-manager"
import ProductsServicesManager from "@/components/data-management/products-services-manager"
import DemandManager from "@/components/data-management/demand-manager"

export default function DataManagementDashboard() {
  const [activeTab, setActiveTab] = useState("funnel")

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Gerenciamento de Dados</h1>
      </div>

      <Tabs defaultValue="funnel" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-[#0f2744] border-[#1e3a5f]">
          <TabsTrigger value="funnel" className="data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-cyan-400">
            Funil de Vendas
          </TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-cyan-400">
            Produtos e Serviços
          </TabsTrigger>
          <TabsTrigger value="demands" className="data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-cyan-400">
            Demandas da Semana
          </TabsTrigger>
        </TabsList>

        <TabsContent value="funnel" className="space-y-4">
          <FunnelManager />
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <ProductsServicesManager />
        </TabsContent>

        <TabsContent value="demands" className="space-y-4">
          <DemandManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}
