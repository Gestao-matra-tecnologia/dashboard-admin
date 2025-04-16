"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProductsServicesManager from "./data-management/products-services-manager"
import DemandManager from "./data-management/demand-manager"
import FunnelManager from "./data-management/funnel-manager"

export default function DataManagementDashboard() {
  const [activeTab, setActiveTab] = useState("products")

  return (
    <div className="p-6 bg-[#0a1929] min-h-[calc(100vh-3.5rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Gerenciamento de Dados</h1>
        <p className="text-slate-300 mt-2">
          Gerencie os dados do dashboard, incluindo produtos, serviços, demandas e funil de vendas.
        </p>
      </div>

      <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="products">Produtos & Serviços</TabsTrigger>
          <TabsTrigger value="demands">Demandas</TabsTrigger>
          <TabsTrigger value="funnel">Funil de Vendas</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-0">
          <Card className="bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
            <CardHeader>
              <CardTitle>Gerenciamento de Produtos e Serviços</CardTitle>
              <CardDescription className="text-slate-300">
                Adicione, edite ou remova produtos e serviços oferecidos pela empresa.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductsServicesManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demands" className="mt-0">
          <Card className="bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
            <CardHeader>
              <CardTitle>Gerenciamento de Demandas</CardTitle>
              <CardDescription className="text-slate-300">
                Adicione, edite ou remova demandas e tarefas da semana.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemandManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnel" className="mt-0">
          <Card className="bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
            <CardHeader>
              <CardTitle>Gerenciamento do Funil de Vendas</CardTitle>
              <CardDescription className="text-slate-300">
                Gerencie o funil de vendas, adicionando leads e movendo-os entre os estágios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FunnelManager />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
