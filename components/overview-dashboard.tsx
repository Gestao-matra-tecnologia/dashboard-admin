"use client"

import { useState, useEffect } from "react"
import { DollarSign, FileText, LineChart, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircularProgressIndicator } from "./ui/circular-progress"
import { SalesFunnel } from "./ui/sales-funnel"
import { MiniBarChart } from "./ui/mini-bar-chart"
import { getFinanceData } from "@/lib/supabase/services"
import type { ClientMarketingAction } from "@/lib/types"
import { clientMarketingServices } from "@/lib/mock-services"
import { getFunnelData } from "@/lib/services/funnel-services"

// Dados para o gráfico de barras de metas
const goalData = [
  { name: "Faturamento", value: 65, color: "#22d3ee" },
  { name: "MRR", value: 40, color: "#c084fc" },
  { name: "Leads", value: 90, color: "#4ade80" },
]

export default function OverviewDashboard() {
  const [loading, setLoading] = useState(true)
  const [financeData, setFinanceData] = useState({
    incomes: [],
    expenses: [],
    employees: [],
  })
  const [marketingData, setMarketingData] = useState<ClientMarketingAction[]>([])
  const [funnelData, setFunnelData] = useState({
    leads: {
      label: "Leads Novos",
      value: 0,
      percentage: 100,
      color: "#22d3ee",
      revenue: 0,
    },
    inProgress: {
      label: "Em Atendimento",
      value: 0,
      percentage: 0,
      color: "#c084fc",
      revenue: 0,
    },
    closed: {
      label: "Fechados",
      value: 0,
      percentage: 0,
      color: "#4ade80",
      revenue: 0,
    },
  })

  // Carregar dados financeiros e de marketing
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // Carregar dados financeiros
        const finance = await getFinanceData()
        setFinanceData(finance)

        // Carregar dados de marketing
        const marketing = await clientMarketingServices.getAll()
        setMarketingData(marketing)

        // Carregar dados do funil
        const funnelDataResult = await getFunnelData()

        if (funnelDataResult) {
          // Atualizar dados do funil com dados dinâmicos
          setFunnelData({
            leads: {
              label: "Leads Novos",
              value: funnelDataResult.leads,
              percentage: 100,
              color: "#22d3ee",
              revenue: funnelDataResult.leadsRevenue,
            },
            inProgress: {
              label: "Em Atendimento",
              value: funnelDataResult.inProgress,
              percentage:
                funnelDataResult.leads > 0
                  ? Math.round((funnelDataResult.inProgress / funnelDataResult.leads) * 100)
                  : 0,
              color: "#c084fc",
              revenue: funnelDataResult.inProgressRevenue,
            },
            closed: {
              label: "Fechados",
              value: funnelDataResult.closed,
              percentage:
                funnelDataResult.leads > 0 ? Math.round((funnelDataResult.closed / funnelDataResult.leads) * 100) : 0,
              color: "#4ade80",
              revenue: funnelDataResult.closedRevenue,
            },
          })
        } else {
          // Se não houver dados do funil, usar dados do marketing
          const leads = marketing.filter((item) => item.status === "Lead").length
          const inProgress = marketing.filter((item) => item.status === "Em atendimento").length
          const closed = marketing.filter((item) => item.status === "Fechado").length

          // Calcular valores de receita
          const avgTicket =
            marketing.length > 0
              ? marketing.filter((item) => item.status === "Fechado").reduce((sum, item) => sum + item.budget, 0) /
                Math.max(1, marketing.filter((item) => item.status === "Fechado").length)
              : 2000

          // Atualizar dados do funil
          if (leads > 0) {
            setFunnelData({
              leads: {
                label: "Leads Novos",
                value: leads,
                percentage: 100,
                color: "#22d3ee",
                revenue: leads * avgTicket,
              },
              inProgress: {
                label: "Em Atendimento",
                value: inProgress,
                percentage: Math.round((inProgress / leads) * 100),
                color: "#c084fc",
                revenue: inProgress * avgTicket,
              },
              closed: {
                label: "Fechados",
                value: closed,
                percentage: Math.round((closed / leads) * 100),
                color: "#4ade80",
                revenue: closed * avgTicket,
              },
            })
          }
        }

        setLoading(false)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Calcular o faturamento total com base nos leads fechados e dados financeiros
  const avgTicket =
    marketingData.length > 0
      ? marketingData.filter((item) => item.status === "Fechado").reduce((sum, item) => sum + item.budget, 0) /
        Math.max(1, marketingData.filter((item) => item.status === "Fechado").length)
      : 180 // Valor padrão caso não haja dados

  const totalRevenue = financeData.incomes.reduce((sum, income) => sum + Number(income.valor || 0), 0)
  const targetRevenue = 100000 // Meta de faturamento
  const revenuePercentage = Math.round((totalRevenue / targetRevenue) * 100)

  // Calcular MRR (receita mensal recorrente)
  const mrrTotal = financeData.incomes
    .filter((income) => income.recorrente)
    .reduce((sum, income) => sum + Number(income.valor || 0), 0)
  const mrrTarget = 50000
  const mrrPercentage = Math.round((mrrTotal / mrrTarget) * 100)

  // Calcular projetos de clientes (não recorrentes)
  const projectsTotal = financeData.incomes
    .filter((income) => !income.recorrente)
    .reduce((sum, income) => sum + Number(income.valor || 0), 0)
  const projectsTarget = 40000
  const projectsPercentage = Math.round((projectsTotal / projectsTarget) * 100)

  // Calcular taxa de conversão
  const conversionRate =
    funnelData.leads.value > 0 ? Math.round((funnelData.closed.value / funnelData.leads.value) * 100) : 0
  const conversionTarget = 25
  const conversionPercentage = Math.round((conversionRate / conversionTarget) * 100)

  // Atualizar dados para o gráfico de barras de metas
  const updatedGoalData = [
    { name: "Faturamento", value: revenuePercentage, color: "#22d3ee" },
    { name: "MRR", value: mrrPercentage, color: "#c084fc" },
    { name: "Leads", value: conversionPercentage, color: "#4ade80" },
  ]

  // Ajustar o layout para corresponder ao design mostrado na imagem
  // Corrigir a parte inferior do layout para que os componentes ocupem toda a largura
  return (
    <div className="flex flex-col gap-6 p-6 h-[calc(100vh-3.5rem)] bg-[#0a1929] overflow-auto">
      {/* Primeira linha - KPIs */}
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-3 bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
            <CardTitle className="text-sm font-medium text-slate-300">Faturamento Total</CardTitle>
            <div className="h-8 w-8 rounded-full bg-[#163456] flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-2xl font-bold text-white">R$ {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-slate-300 mt-1">Meta: R$ {targetRevenue.toLocaleString()}</p>
            <div className="mt-4 h-2 w-full rounded-full bg-[#1e3a5f]">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                style={{ width: `${Math.min(revenuePercentage, 100)}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
            <CardTitle className="text-sm font-medium text-slate-300">MRR Produtos</CardTitle>
            <div className="h-8 w-8 rounded-full bg-[#163456] flex items-center justify-center">
              <LineChart className="h-4 w-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-2xl font-bold text-white">R$ {mrrTotal.toLocaleString()}</div>
            <p className="text-xs text-slate-300 mt-1">Meta: R$ {mrrTarget.toLocaleString()}</p>
            <div className="mt-4 h-2 w-full rounded-full bg-[#1e3a5f]">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"
                style={{ width: `${Math.min(mrrPercentage, 100)}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
            <CardTitle className="text-sm font-medium text-slate-300">Projetos Clientes</CardTitle>
            <div className="h-8 w-8 rounded-full bg-[#163456] flex items-center justify-center">
              <FileText className="h-4 w-4 text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-2xl font-bold text-white">R$ {projectsTotal.toLocaleString()}</div>
            <p className="text-xs text-slate-300 mt-1">Meta: R$ {projectsTarget.toLocaleString()}</p>
            <div className="mt-4 h-2 w-full rounded-full bg-[#1e3a5f]">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
                style={{ width: `${Math.min(projectsPercentage, 100)}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
            <CardTitle className="text-sm font-medium text-slate-300">Taxa de Conversão</CardTitle>
            <div className="h-8 w-8 rounded-full bg-[#163456] flex items-center justify-center">
              <Users className="h-4 w-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-2xl font-bold text-white">{conversionRate}%</div>
            <p className="text-xs text-slate-300 mt-1">Meta: {conversionTarget}%</p>
            <div className="mt-4 h-2 w-full rounded-full bg-[#1e3a5f]">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                style={{ width: `${Math.min(conversionPercentage, 100)}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Segunda linha - Funil e Métricas */}
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-6 bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
          <CardHeader className="pb-2 pt-4 border-b border-[#1e3a5f]">
            <CardTitle className="text-base text-white">Funil de Vendas</CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex items-center justify-center">
            {loading ? (
              <div className="flex items-center justify-center h-[280px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
              </div>
            ) : (
              <SalesFunnel data={funnelData} height={280} showRevenue={true} />
            )}
          </CardContent>
        </Card>

        <div className="col-span-6 grid grid-cols-6 gap-6">
          <Card className="col-span-6 bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
            <CardHeader className="pb-2 pt-4 border-b border-[#1e3a5f]">
              <CardTitle className="text-base text-white">Métricas Principais</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-8 p-6">
              <div className="flex flex-col items-center">
                <CircularProgressIndicator
                  value={revenuePercentage}
                  color="#22d3ee"
                  size={110}
                  strokeWidth={12}
                  label={`${Math.min(revenuePercentage, 100)}%`}
                />
                <span className="mt-3 text-sm font-medium text-slate-300">Faturamento</span>
              </div>
              <div className="flex flex-col items-center">
                <CircularProgressIndicator
                  value={mrrPercentage}
                  color="#c084fc"
                  size={110}
                  strokeWidth={12}
                  label={`${Math.min(mrrPercentage, 100)}%`}
                />
                <span className="mt-3 text-sm font-medium text-slate-300">MRR</span>
              </div>
              <div className="flex flex-col items-center">
                <CircularProgressIndicator
                  value={conversionPercentage}
                  color="#4ade80"
                  size={110}
                  strokeWidth={12}
                  label={`${Math.min(conversionPercentage, 100)}%`}
                />
                <span className="mt-3 text-sm font-medium text-slate-300">Conversão</span>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-6 bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
            <CardHeader className="pb-2 pt-4 border-b border-[#1e3a5f]">
              <CardTitle className="text-base text-white">Metas Trimestrais</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <MiniBarChart data={updatedGoalData} height={130} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Terceira linha - Produtos e Serviços */}
      <Card className="bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
        <CardHeader className="pb-2 pt-4 border-b border-[#1e3a5f]">
          <CardTitle className="text-lg text-white">Produtos & Serviços</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e3a5f]">
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Produto</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Tipo</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">MRR Atual</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Meta</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-300">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-cyan-400 mr-3"></div>
                        Carregando dados...
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    <tr className="border-b border-[#1e3a5f]">
                      <td className="py-4 px-6 font-medium text-white text-sm">Spotform</td>
                      <td className="py-4 px-6 text-slate-300 text-sm">SaaS</td>
                      <td className="py-4 px-6 text-cyan-400 text-sm">
                        R${" "}
                        {financeData.incomes
                          .filter((income) => income.cliente === "Spotform" && income.recorrente)
                          .reduce((sum, income) => sum + Number(income.valor || 0), 0)
                          .toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-slate-300 text-sm">R$ 50.000</td>
                      <td className="py-4 px-6 text-sm">
                        <span className="px-3 py-1 rounded-full bg-blue-900 text-blue-300 text-xs">Em atualização</span>
                      </td>
                    </tr>
                    <tr className="border-b border-[#1e3a5f]">
                      <td className="py-4 px-6 font-medium text-white text-sm">NotifyX</td>
                      <td className="py-4 px-6 text-slate-300 text-sm">SaaS</td>
                      <td className="py-4 px-6 text-cyan-400 text-sm">
                        R${" "}
                        {financeData.incomes
                          .filter((income) => income.cliente === "NotifyX" && income.recorrente)
                          .reduce((sum, income) => sum + Number(income.valor || 0), 0)
                          .toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-slate-300 text-sm">R$ 20.000</td>
                      <td className="py-4 px-6 text-sm">
                        <span className="px-3 py-1 rounded-full bg-green-900 text-green-300 text-xs">Pronto</span>
                      </td>
                    </tr>
                    <tr className="border-b border-[#1e3a5f]">
                      <td className="py-4 px-6 font-medium text-white text-sm">Firebank</td>
                      <td className="py-4 px-6 text-slate-300 text-sm">SaaS</td>
                      <td className="py-4 px-6 text-cyan-400 text-sm">
                        R${" "}
                        {financeData.incomes
                          .filter((income) => income.cliente === "Firebank" && income.recorrente)
                          .reduce((sum, income) => sum + Number(income.valor || 0), 0)
                          .toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-slate-300 text-sm">R$ 10.000</td>
                      <td className="py-4 px-6 text-sm">
                        <span className="px-3 py-1 rounded-full bg-yellow-900 text-yellow-300 text-xs">MVP</span>
                      </td>
                    </tr>
                    <tr className="border-b border-[#1e3a5f]">
                      <td className="py-4 px-6 font-medium text-white text-sm">SharkPage</td>
                      <td className="py-4 px-6 text-slate-300 text-sm">Builder</td>
                      <td className="py-4 px-6 text-cyan-400 text-sm">
                        R${" "}
                        {financeData.incomes
                          .filter((income) => income.cliente === "SharkPage" && income.recorrente)
                          .reduce((sum, income) => sum + Number(income.valor || 0), 0)
                          .toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-slate-300 text-sm">R$ 5.000</td>
                      <td className="py-4 px-6 text-sm">
                        <span className="px-3 py-1 rounded-full bg-blue-900 text-blue-300 text-xs">Em beta</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium text-white text-sm">Serviços TI</td>
                      <td className="py-4 px-6 text-slate-300 text-sm">Consultas</td>
                      <td className="py-4 px-6 text-cyan-400 text-sm">
                        R${" "}
                        {financeData.incomes
                          .filter((income) => income.categoria === "Serviços" && income.recorrente)
                          .reduce((sum, income) => sum + Number(income.valor || 0), 0)
                          .toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-slate-300 text-sm">R$ 35.000</td>
                      <td className="py-4 px-6 text-sm">
                        <span className="px-3 py-1 rounded-full bg-green-900 text-green-300 text-xs">Ativo</span>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quarta linha - Demandas da Semana */}
      <Card className="bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
        <CardHeader className="pb-2 pt-4 border-b border-[#1e3a5f]">
          <CardTitle className="text-lg text-white">Demandas da Semana</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e3a5f]">
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Projeto</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Responsável</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Status</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Progresso</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-300">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-cyan-400 mr-3"></div>
                        Carregando dados...
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    <tr className="border-b border-[#1e3a5f]">
                      <td className="py-4 px-6 font-medium text-white text-sm">Spotform V2</td>
                      <td className="py-4 px-6 text-slate-300 text-sm">Luiz</td>
                      <td className="py-4 px-6 text-sm">
                        <span className="px-3 py-1 rounded-full bg-blue-900 text-blue-300 text-xs">Em andamento</span>
                      </td>
                      <td className="py-4 px-6 w-[180px]">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-full rounded-full bg-[#1e3a5f]">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                              style={{ width: "60%" }}
                            ></div>
                          </div>
                          <span className="text-sm text-slate-300">60%</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#1e3a5f]">
                      <td className="py-4 px-6 font-medium text-white text-sm">Webhook NotifyX</td>
                      <td className="py-4 px-6 text-slate-300 text-sm">Bruno</td>
                      <td className="py-4 px-6 text-sm">
                        <span className="px-3 py-1 rounded-full bg-blue-900 text-blue-300 text-xs">Em andamento</span>
                      </td>
                      <td className="py-4 px-6 w-[180px]">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-full rounded-full bg-[#1e3a5f]">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
                              style={{ width: "40%" }}
                            ></div>
                          </div>
                          <span className="text-sm text-slate-300">40%</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium text-white text-sm">Alpha Móveis</td>
                      <td className="py-4 px-6 text-slate-300 text-sm">Jeremias</td>
                      <td className="py-4 px-6 text-sm">
                        <span className="px-3 py-1 rounded-full bg-green-900 text-green-300 text-xs">Finalizado</span>
                      </td>
                      <td className="py-4 px-6 w-[180px]">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-full rounded-full bg-[#1e3a5f]">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                              style={{ width: "100%" }}
                            ></div>
                          </div>
                          <span className="text-sm text-slate-300">100%</span>
                        </div>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
