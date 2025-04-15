"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OverviewMetrics from "./overview-metrics"
import DemandTable from "./demand-table"
import ProductsServices from "./products-services"
import { ActivityTimeline } from "./timeline/activity-timeline"
import { mockTimelineItems } from "@/lib/mock-timeline"

export default function OverviewDashboard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Visão Geral</h2>
        <p className="text-muted-foreground">
          Bem-vindo ao dashboard da Matra Tecnologia. Aqui você encontra uma visão geral do seu negócio.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <OverviewMetrics />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Demandas da Semana</CardTitle>
                <CardDescription>Acompanhe as demandas em andamento e pendentes</CardDescription>
              </CardHeader>
              <CardContent>
                <DemandTable limit={5} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
                <CardDescription>Histórico de atividades do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityTimeline items={mockTimelineItems} />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Produtos e Serviços</CardTitle>
                <CardDescription>Visão geral dos produtos e serviços oferecidos</CardDescription>
              </CardHeader>
              <CardContent>
                <ProductsServices />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Próximos Eventos</CardTitle>
                <CardDescription>Calendário de eventos e prazos importantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                      <span className="text-sm font-medium">15</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Reunião de Equipe</h4>
                      <p className="text-sm text-muted-foreground">15/04 às 14:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                      <span className="text-sm font-medium">22</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Entrega do Projeto</h4>
                      <p className="text-sm text-muted-foreground">22/04 às 18:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
                      <span className="text-sm font-medium">30</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Fechamento Financeiro</h4>
                      <p className="text-sm text-muted-foreground">30/04 às 12:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análises</CardTitle>
              <CardDescription>Análises detalhadas do desempenho do negócio</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Conteúdo de análises será exibido aqui</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios</CardTitle>
              <CardDescription>Relatórios detalhados do desempenho do negócio</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Conteúdo de relatórios será exibido aqui</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>Notificações e alertas do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityTimeline items={mockTimelineItems} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
