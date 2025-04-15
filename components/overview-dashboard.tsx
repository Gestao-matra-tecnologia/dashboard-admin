"use client"

import { DollarSign, FileText, LineChart, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircularProgressIndicator } from "./ui/circular-progress"
import { SalesFunnel } from "./ui/sales-funnel"
import { MiniBarChart } from "./ui/mini-bar-chart"

// Dados do funil de vendas
const funnelData = {
  leads: {
    label: "Leads Novos",
    value: 1800,
    percentage: 100,
    color: "#22d3ee",
  },
  inProgress: {
    label: "Em Atendimento",
    value: 720,
    percentage: 40,
    color: "#c084fc",
  },
  closed: {
    label: "Fechados",
    value: 360,
    percentage: 20,
    color: "#4ade80",
  },
}

// Dados para o gráfico de barras de metas
const goalData = [
  { name: "Faturamento", value: 65, color: "#22d3ee" },
  { name: "MRR", value: 40, color: "#c084fc" },
  { name: "Leads", value: 90, color: "#4ade80" },
]

export default function OverviewDashboard() {
  // Calcular o faturamento total com base nos leads fechados
  const avgTicket = 180 // Ticket médio por cliente
  const totalRevenue = funnelData.closed.value * avgTicket
  const targetRevenue = 100000 // Meta de faturamento
  const revenuePercentage = Math.round((totalRevenue / targetRevenue) * 100)

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
                style={{ width: `${revenuePercentage}%` }}
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
            <div className="text-2xl font-bold text-white">R$ 20.000</div>
            <p className="text-xs text-slate-300 mt-1">Meta: R$ 50.000</p>
            <div className="mt-4 h-2 w-full rounded-full bg-[#1e3a5f]">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"
                style={{ width: "40%" }}
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
            <div className="text-2xl font-bold text-white">R$ 32.000</div>
            <p className="text-xs text-slate-300 mt-1">Meta: R$ 40.000</p>
            <div className="mt-4 h-2 w-full rounded-full bg-[#1e3a5f]">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
                style={{ width: "80%" }}
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
            <div className="text-2xl font-bold text-white">
              {Math.round((funnelData.closed.value / funnelData.leads.value) * 100)}%
            </div>
            <p className="text-xs text-slate-300 mt-1">Meta: 25%</p>
            <div className="mt-4 h-2 w-full rounded-full bg-[#1e3a5f]">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                style={{ width: `${(funnelData.closed.value / funnelData.leads.value) * 100 * 4}%` }}
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
            <SalesFunnel data={funnelData} height={280} />
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
                  label={`${revenuePercentage}%`}
                />
                <span className="mt-3 text-sm font-medium text-slate-300">Faturamento</span>
              </div>
              <div className="flex flex-col items-center">
                <CircularProgressIndicator value={40} color="#c084fc" size={110} strokeWidth={12} label="40%" />
                <span className="mt-3 text-sm font-medium text-slate-300">MRR</span>
              </div>
              <div className="flex flex-col items-center">
                <CircularProgressIndicator value={90} color="#4ade80" size={110} strokeWidth={12} label="90%" />
                <span className="mt-3 text-sm font-medium text-slate-300">Leads</span>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-6 bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
            <CardHeader className="pb-2 pt-4 border-b border-[#1e3a5f]">
              <CardTitle className="text-base text-white">Metas Trimestrais</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <MiniBarChart data={goalData} height={130} />
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
                <tr className="border-b border-[#1e3a5f]">
                  <td className="py-4 px-6 font-medium text-white text-sm">Spotform</td>
                  <td className="py-4 px-6 text-slate-300 text-sm">SaaS</td>
                  <td className="py-4 px-6 text-cyan-400 text-sm">R$ 5.000</td>
                  <td className="py-4 px-6 text-slate-300 text-sm">R$ 50.000</td>
                  <td className="py-4 px-6 text-sm">
                    <span className="px-3 py-1 rounded-full bg-blue-900 text-blue-300 text-xs">Em atualização</span>
                  </td>
                </tr>
                <tr className="border-b border-[#1e3a5f]">
                  <td className="py-4 px-6 font-medium text-white text-sm">NotifyX</td>
                  <td className="py-4 px-6 text-slate-300 text-sm">SaaS</td>
                  <td className="py-4 px-6 text-cyan-400 text-sm">R$ 2.000</td>
                  <td className="py-4 px-6 text-slate-300 text-sm">R$ 20.000</td>
                  <td className="py-4 px-6 text-sm">
                    <span className="px-3 py-1 rounded-full bg-green-900 text-green-300 text-xs">Pronto</span>
                  </td>
                </tr>
                <tr className="border-b border-[#1e3a5f]">
                  <td className="py-4 px-6 font-medium text-white text-sm">Firebank</td>
                  <td className="py-4 px-6 text-slate-300 text-sm">SaaS</td>
                  <td className="py-4 px-6 text-cyan-400 text-sm">R$ 0</td>
                  <td className="py-4 px-6 text-slate-300 text-sm">R$ 10.000</td>
                  <td className="py-4 px-6 text-sm">
                    <span className="px-3 py-1 rounded-full bg-yellow-900 text-yellow-300 text-xs">MVP</span>
                  </td>
                </tr>
                <tr className="border-b border-[#1e3a5f]">
                  <td className="py-4 px-6 font-medium text-white text-sm">SharkPage</td>
                  <td className="py-4 px-6 text-slate-300 text-sm">Builder</td>
                  <td className="py-4 px-6 text-cyan-400 text-sm">R$ 0</td>
                  <td className="py-4 px-6 text-slate-300 text-sm">R$ 5.000</td>
                  <td className="py-4 px-6 text-sm">
                    <span className="px-3 py-1 rounded-full bg-blue-900 text-blue-300 text-xs">Em beta</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-white text-sm">Serviços TI</td>
                  <td className="py-4 px-6 text-slate-300 text-sm">Consultas</td>
                  <td className="py-4 px-6 text-cyan-400 text-sm">R$ 30.000</td>
                  <td className="py-4 px-6 text-slate-300 text-sm">R$ 35.000</td>
                  <td className="py-4 px-6 text-sm">
                    <span className="px-3 py-1 rounded-full bg-green-900 text-green-300 text-xs">Ativo</span>
                  </td>
                </tr>
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
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
