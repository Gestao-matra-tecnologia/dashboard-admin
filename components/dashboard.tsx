"use client"

import { useState } from "react"
import {
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Home,
  LineChart,
  MessageSquare,
  Settings,
  Star,
  Target,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DemandTable from "./demand-table"
import DepartmentGoals from "./department-goals"
import InternalMarketing from "./internal-marketing"
import ClientMarketing from "./client-marketing"
import FinanceTable from "./finance-table"
import RolesTable from "./roles-table"
import EmployeePerformance from "./employee-performance"
import CultureActions from "./culture-actions"
import { useMediaQuery } from "@/hooks/use-mobile"
import OverviewDashboard from "./overview-dashboard"
import FinanceDashboard from "./finance/finance-dashboard"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("visao-geral")
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#0a1929]">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-[#1e3a5f] bg-[#0a1929] px-4 md:px-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-cyan-400" />
          <h1 className="text-lg font-semibold text-white">Matra Tecnologia</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="border-[#1e3a5f] bg-[#0f2744] text-cyan-400 hover:bg-[#163456]"
          >
            <Clock className="mr-2 h-4 w-4" />
            Abril 2025
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
            <AvatarFallback className="bg-[#1e3a5f] text-cyan-400">MT</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[240px_1fr]">
        {/* Ajustar a barra lateral para corresponder ao design mostrado na imagem
        Melhorar a responsividade e o espaçamento dos itens */}
        <div className="hidden border-r border-[#1e3a5f] bg-[#0c1f35] md:block">
          <div className="flex h-full max-h-screen flex-col">
            <div className="flex-1 overflow-auto py-4">
              <nav className="grid items-start px-2 text-sm font-medium overflow-visible">
                <Button
                  variant={activeTab === "visao-geral" ? "secondary" : "ghost"}
                  className={`justify-start h-12 whitespace-nowrap ${
                    activeTab === "visao-geral"
                      ? "bg-[#1e3a5f] text-cyan-400 hover:bg-[#1e3a5f]"
                      : "text-cyan-400 hover:bg-[#1e3a5f] hover:text-cyan-400"
                  }`}
                  onClick={() => setActiveTab("visao-geral")}
                >
                  <Home className="mr-3 h-5 w-5" />
                  Visão Geral
                </Button>
                <Button
                  variant={activeTab === "demandas" ? "secondary" : "ghost"}
                  className={`justify-start h-12 whitespace-nowrap ${
                    activeTab === "demandas"
                      ? "bg-[#1e3a5f] text-cyan-400 hover:bg-[#1e3a5f]"
                      : "text-cyan-400 hover:bg-[#1e3a5f] hover:text-cyan-400"
                  }`}
                  onClick={() => setActiveTab("demandas")}
                >
                  <CheckCircle className="mr-3 h-5 w-5" />
                  Demandas da Semana
                </Button>
                <Button
                  variant={activeTab === "metas" ? "secondary" : "ghost"}
                  className={`justify-start h-12 whitespace-nowrap ${
                    activeTab === "metas"
                      ? "bg-[#1e3a5f] text-cyan-400 hover:bg-[#1e3a5f]"
                      : "text-cyan-400 hover:bg-[#1e3a5f] hover:text-cyan-400"
                  }`}
                  onClick={() => setActiveTab("metas")}
                >
                  <Target className="mr-3 h-5 w-5" />
                  Metas por Área
                </Button>
                <Button
                  variant={activeTab === "marketing-interno" ? "secondary" : "ghost"}
                  className={`justify-start h-12 whitespace-nowrap ${
                    activeTab === "marketing-interno"
                      ? "bg-[#1e3a5f] text-cyan-400 hover:bg-[#1e3a5f]"
                      : "text-cyan-400 hover:bg-[#1e3a5f] hover:text-cyan-400"
                  }`}
                  onClick={() => setActiveTab("marketing-interno")}
                >
                  <LineChart className="mr-3 h-5 w-5" />
                  Marketing Interno
                </Button>
                <Button
                  variant={activeTab === "marketing-clientes" ? "secondary" : "ghost"}
                  className={`justify-start h-12 whitespace-nowrap ${
                    activeTab === "marketing-clientes"
                      ? "bg-[#1e3a5f] text-cyan-400 hover:bg-[#1e3a5f]"
                      : "text-cyan-400 hover:bg-[#1e3a5f] hover:text-cyan-400"
                  }`}
                  onClick={() => setActiveTab("marketing-clientes")}
                >
                  <MessageSquare className="mr-3 h-5 w-5" />
                  Marketing dos Clientes
                </Button>
                <Button
                  variant={activeTab === "financas" ? "secondary" : "ghost"}
                  className={`justify-start h-12 whitespace-nowrap ${
                    activeTab === "financas"
                      ? "bg-[#1e3a5f] text-cyan-400 hover:bg-[#1e3a5f]"
                      : "text-cyan-400 hover:bg-[#1e3a5f] hover:text-cyan-400"
                  }`}
                  onClick={() => setActiveTab("financas")}
                >
                  <DollarSign className="mr-3 h-5 w-5" />
                  Valores e Finanças
                </Button>
                <Button
                  variant={activeTab === "sistema-financeiro" ? "secondary" : "ghost"}
                  className={`justify-start h-12 whitespace-nowrap ${
                    activeTab === "sistema-financeiro"
                      ? "bg-[#1e3a5f] text-cyan-400 hover:bg-[#1e3a5f]"
                      : "text-cyan-400 hover:bg-[#1e3a5f] hover:text-cyan-400"
                  }`}
                  onClick={() => setActiveTab("sistema-financeiro")}
                >
                  <DollarSign className="mr-3 h-5 w-5" />
                  Sistema Financeiro
                </Button>
                <Button
                  variant={activeTab === "cargos" ? "secondary" : "ghost"}
                  className={`justify-start h-12 whitespace-nowrap ${
                    activeTab === "cargos"
                      ? "bg-[#1e3a5f] text-cyan-400 hover:bg-[#1e3a5f]"
                      : "text-cyan-400 hover:bg-[#1e3a5f] hover:text-cyan-400"
                  }`}
                  onClick={() => setActiveTab("cargos")}
                >
                  <Users className="mr-3 h-5 w-5" />
                  Cargos e Funções
                </Button>
                <Button
                  variant={activeTab === "desempenho" ? "secondary" : "ghost"}
                  className={`justify-start h-12 whitespace-nowrap ${
                    activeTab === "desempenho"
                      ? "bg-[#1e3a5f] text-cyan-400 hover:bg-[#1e3a5f]"
                      : "text-cyan-400 hover:bg-[#1e3a5f] hover:text-cyan-400"
                  }`}
                  onClick={() => setActiveTab("desempenho")}
                >
                  <Star className="mr-3 h-5 w-5" />
                  Colaborador do Mês
                </Button>
                <Button
                  variant={activeTab === "cultura" ? "secondary" : "ghost"}
                  className={`justify-start h-12 whitespace-nowrap ${
                    activeTab === "cultura"
                      ? "bg-[#1e3a5f] text-cyan-400 hover:bg-[#1e3a5f]"
                      : "text-cyan-400 hover:bg-[#1e3a5f] hover:text-cyan-400"
                  }`}
                  onClick={() => setActiveTab("cultura")}
                >
                  <Calendar className="mr-3 h-5 w-5" />
                  Ações de Cultura
                </Button>
              </nav>
            </div>
            <div className="mt-auto p-4">
              <Card className="bg-[#0f2744] border-[#1e3a5f] text-white">
                <CardHeader className="py-2 px-3">
                  <CardTitle className="text-sm text-cyan-400">Matra Tecnologia</CardTitle>
                  <CardDescription className="text-xs text-slate-300">Dashboard v2.0</CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-[#1e3a5f] bg-[#0f2744] text-cyan-400 hover:bg-[#163456] h-8 text-xs"
                  >
                    <Settings className="mr-2 h-3 w-3" />
                    Configurações
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-[#0a1929]">
          {isMobile && (
            <div className="border-b border-[#1e3a5f] p-4 bg-[#0c1f35]">
              <Tabs defaultValue="visao-geral" onValueChange={setActiveTab} value={activeTab}>
                <TabsList className="grid grid-cols-3 md:grid-cols-5 bg-[#0f2744]">
                  <TabsTrigger
                    value="visao-geral"
                    className={activeTab === "visao-geral" ? "bg-[#1e3a5f] text-cyan-400" : "text-slate-300"}
                  >
                    Visão Geral
                  </TabsTrigger>
                  <TabsTrigger
                    value="demandas"
                    className={activeTab === "demandas" ? "bg-[#1e3a5f] text-cyan-400" : "text-slate-300"}
                  >
                    Demandas
                  </TabsTrigger>
                  <TabsTrigger
                    value="metas"
                    className={activeTab === "metas" ? "bg-[#1e3a5f] text-cyan-400" : "text-slate-300"}
                  >
                    Metas
                  </TabsTrigger>
                  <TabsTrigger
                    value="marketing-interno"
                    className={activeTab === "marketing-interno" ? "bg-[#1e3a5f] text-cyan-400" : "text-slate-300"}
                  >
                    Marketing
                  </TabsTrigger>
                  <TabsTrigger
                    value="financas"
                    className={activeTab === "financas" ? "bg-[#1e3a5f] text-cyan-400" : "text-slate-300"}
                  >
                    Finanças
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          )}
          <main className="flex flex-1 flex-col bg-[#0a1929]">
            {activeTab === "visao-geral" && <OverviewDashboard />}
            {activeTab === "demandas" && <DemandTable />}
            {activeTab === "metas" && <DepartmentGoals />}
            {activeTab === "marketing-interno" && <InternalMarketing />}
            {activeTab === "marketing-clientes" && <ClientMarketing />}
            {activeTab === "financas" && <FinanceTable />}
            {activeTab === "sistema-financeiro" && <FinanceDashboard />}
            {activeTab === "cargos" && <RolesTable />}
            {activeTab === "desempenho" && <EmployeePerformance />}
            {activeTab === "cultura" && <CultureActions />}
          </main>
        </div>
      </div>
    </div>
  )
}
