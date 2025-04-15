"use client"

import { useState } from "react"
import { Download, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart } from "@/components/ui/bar-chart"
import { DateRangePicker } from "@/components/ui/date-range-picker"

interface ReportData {
  month: string
  revenue: number
  expenses: number
  profit: number
}

const reportData: ReportData[] = [
  { month: "Jan", revenue: 12000, expenses: 8000, profit: 4000 },
  { month: "Fev", revenue: 15000, expenses: 9000, profit: 6000 },
  { month: "Mar", revenue: 18000, expenses: 10000, profit: 8000 },
  { month: "Abr", revenue: 20000, expenses: 11000, profit: 9000 },
  { month: "Mai", revenue: 22000, expenses: 12000, profit: 10000 },
  { month: "Jun", revenue: 25000, expenses: 13000, profit: 12000 },
]

export function ReportsDashboard() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>()
  const [reportType, setReportType] = useState("financial")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Relatórios</h2>
          <p className="text-muted-foreground">Visualize e exporte relatórios detalhados</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            placeholder="Selecione o período"
            className="w-full sm:w-auto"
          />
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="financial" onValueChange={setReportType}>
        <TabsList className="mb-4">
          <TabsTrigger value="financial">Financeiro</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="operations">Operações</TabsTrigger>
          <TabsTrigger value="hr">RH</TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 112.000,00</div>
                <p className="text-xs text-muted-foreground">+15% em relação ao período anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Despesas Totais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 63.000,00</div>
                <p className="text-xs text-muted-foreground">+8% em relação ao período anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 49.000,00</div>
                <p className="text-xs text-muted-foreground">+25% em relação ao período anterior</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Desempenho Financeiro</CardTitle>
              <CardDescription>Análise de receitas, despesas e lucro ao longo do tempo</CardDescription>
              <div className="flex items-center gap-2">
                <Select defaultValue="monthly">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                    <SelectItem value="quarterly">Trimestral</SelectItem>
                    <SelectItem value="yearly">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <BarChart
                data={reportData}
                categories={["revenue", "expenses", "profit"]}
                index="month"
                colors={["#3b82f6", "#ef4444", "#22c55e"]}
                valueFormatter={(value) => `R$ ${value.toLocaleString()}`}
                yAxisWidth={65}
                height={350}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho de Marketing</CardTitle>
              <CardDescription>Análise de campanhas e resultados</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Dados de marketing serão exibidos aqui</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Métricas Operacionais</CardTitle>
              <CardDescription>Análise de eficiência e produtividade</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Dados operacionais serão exibidos aqui</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hr" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Métricas de RH</CardTitle>
              <CardDescription>Análise de desempenho e satisfação da equipe</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Dados de RH serão exibidos aqui</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
