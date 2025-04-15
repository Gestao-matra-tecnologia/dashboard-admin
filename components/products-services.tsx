"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart } from "./ui/bar-chart"

const produtos = [
  {
    produto: "Spotform",
    tipo: "SaaS",
    mrrAtual: 5000,
    meta: 50000,
    status: "Em atualização",
    progresso: 10,
  },
  {
    produto: "NotifyX",
    tipo: "SaaS",
    mrrAtual: 2000,
    meta: 20000,
    status: "Pronto",
    progresso: 10,
  },
  {
    produto: "Firebank",
    tipo: "SaaS",
    mrrAtual: 0,
    meta: 10000,
    status: "MVP",
    progresso: 0,
  },
  {
    produto: "SharkPage",
    tipo: "Builder",
    mrrAtual: 0,
    meta: 5000,
    status: "Em beta",
    progresso: 0,
  },
  {
    produto: "Serviços TI",
    tipo: "Consultas",
    mrrAtual: 30000,
    meta: 35000,
    status: "Ativo",
    progresso: 85,
  },
]

export default function ProductsServices() {
  const chartData = {
    labels: produtos.map((p) => p.produto),
    datasets: [
      {
        label: "MRR Atual",
        data: produtos.map((p) => p.mrrAtual),
        backgroundColor: ["#22d3ee", "#c084fc", "#facc15", "#4ade80", "#fb923c"],
      },
      {
        label: "Meta",
        data: produtos.map((p) => p.meta),
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pronto":
      case "Ativo":
        return "bg-green-900 text-green-300 border-green-700"
      case "Em atualização":
      case "Em beta":
        return "bg-blue-900 text-blue-300 border-blue-700"
      case "MVP":
        return "bg-yellow-900 text-yellow-300 border-yellow-700"
      default:
        return "bg-slate-800 text-slate-300 border-slate-700"
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-1 md:col-span-2 bg-[#0f2744] border-[#1e3a5f] text-white">
        <CardHeader>
          <CardTitle className="text-lg text-white">Produtos & Serviços</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e3a5f]">
                  <th className="text-left font-medium p-2 text-slate-300">Produto</th>
                  <th className="text-left font-medium p-2 text-slate-300">Tipo</th>
                  <th className="text-left font-medium p-2 text-slate-300">MRR Atual</th>
                  <th className="text-left font-medium p-2 text-slate-300">Meta</th>
                  <th className="text-left font-medium p-2 text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto, index) => (
                  <tr key={index} className="border-b border-[#1e3a5f]">
                    <td className="p-2 font-medium text-white">{produto.produto}</td>
                    <td className="p-2 text-slate-300">{produto.tipo}</td>
                    <td className="p-2 text-cyan-400">R$ {produto.mrrAtual.toLocaleString()}</td>
                    <td className="p-2 text-slate-300">R$ {produto.meta.toLocaleString()}</td>
                    <td className="p-2">
                      <Badge variant="outline" className={getStatusColor(produto.status)}>
                        {produto.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-1 lg:col-span-3 bg-[#0f2744] border-[#1e3a5f] text-white">
        <CardHeader>
          <CardTitle className="text-lg text-white">Desempenho dos Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <BarChart data={chartData} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
