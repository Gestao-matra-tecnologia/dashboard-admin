"use client"

import { useState } from "react"
import { CheckCircle2, Clock, Filter, Plus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const demandas = [
  {
    id: 1,
    projeto: "Spotform V2",
    responsavel: "Luiz",
    status: "Em andamento",
    prioridade: "Alta",
    prazo: "20/04/2025",
    tipo: "Interno",
    comentarios: "Ajustes finais na interface",
    progresso: 60,
  },
  {
    id: 2,
    projeto: "Webhook NotifyX",
    responsavel: "Bruno",
    status: "Em andamento",
    prioridade: "Média",
    prazo: "25/04/2025",
    tipo: "Interno",
    comentarios: "Integração com API externa",
    progresso: 40,
  },
  {
    id: 3,
    projeto: "Template V7 Imóveis",
    responsavel: "Ryan",
    status: "A fazer",
    prioridade: "Baixa",
    prazo: "30/04/2025",
    tipo: "Cliente",
    comentarios: "Aguardando aprovação do cliente",
    progresso: 0,
  },
  {
    id: 4,
    projeto: "Alpha Móveis",
    responsavel: "Jeremias",
    status: "Finalizado",
    prioridade: "Alta",
    prazo: "15/04/2025",
    tipo: "Cliente",
    comentarios: "Contrato assinado",
    progresso: 100,
  },
  {
    id: 5,
    projeto: "Campanha Spotform",
    responsavel: "Luiz",
    status: "Em andamento",
    prioridade: "Alta",
    prazo: "22/04/2025",
    tipo: "Interno",
    comentarios: "Ajustes nos anúncios",
    progresso: 75,
  },
]

export default function DemandTable() {
  const [filter, setFilter] = useState("todos")
  const [search, setSearch] = useState("")

  const filteredDemands = demandas.filter((demanda) => {
    if (filter !== "todos" && demanda.status !== filter) return false
    if (search && !demanda.projeto.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Finalizado":
        return "bg-green-900 text-green-300 border-green-700"
      case "Em andamento":
        return "bg-blue-900 text-blue-300 border-blue-700"
      case "A fazer":
        return "bg-slate-800 text-slate-300 border-slate-700"
      default:
        return ""
    }
  }

  const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
      case "Alta":
        return "bg-red-900 text-red-300 border-red-700"
      case "Média":
        return "bg-yellow-900 text-yellow-300 border-yellow-700"
      case "Baixa":
        return "bg-green-900 text-green-300 border-green-700"
      default:
        return ""
    }
  }

  return (
    <Card className="bg-[#0f2744] border-[#1e3a5f] text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-white">Demandas da Semana</CardTitle>
        <Button size="sm" className="bg-cyan-600 text-white hover:bg-cyan-700">
          <Plus className="mr-2 h-4 w-4" />
          Nova Demanda
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar por projeto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0a1929] border-[#1e3a5f] text-white placeholder:text-slate-400"
            />
          </div>
          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px] bg-[#0a1929] border-[#1e3a5f] text-white">
                <Filter className="mr-2 h-4 w-4 text-cyan-400" />
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="A fazer">A fazer</SelectItem>
                <SelectItem value="Em andamento">Em andamento</SelectItem>
                <SelectItem value="Finalizado">Finalizado</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="border-[#1e3a5f] bg-[#0a1929] text-cyan-400 hover:bg-[#163456]"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e3a5f]">
                <th className="text-left font-medium p-2 text-slate-300">Projeto</th>
                <th className="text-left font-medium p-2 text-slate-300">Responsável</th>
                <th className="text-left font-medium p-2 text-slate-300">Status</th>
                <th className="text-left font-medium p-2 text-slate-300">Prioridade</th>
                <th className="text-left font-medium p-2 text-slate-300">Prazo</th>
                <th className="text-left font-medium p-2 text-slate-300">Tipo</th>
                <th className="text-left font-medium p-2 text-slate-300">Progresso</th>
              </tr>
            </thead>
            <tbody>
              {filteredDemands.map((demanda) => (
                <tr key={demanda.id} className="border-b border-[#1e3a5f]">
                  <td className="p-2 font-medium text-white">{demanda.projeto}</td>
                  <td className="p-2 text-slate-300">{demanda.responsavel}</td>
                  <td className="p-2">
                    <Badge variant="outline" className={getStatusColor(demanda.status)}>
                      {demanda.status === "Finalizado" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                      {demanda.status === "Em andamento" && <RefreshCw className="mr-1 h-3 w-3" />}
                      {demanda.status === "A fazer" && <Clock className="mr-1 h-3 w-3" />}
                      {demanda.status}
                    </Badge>
                  </td>
                  <td className="p-2">
                    <Badge variant="outline" className={getPriorityColor(demanda.prioridade)}>
                      {demanda.prioridade}
                    </Badge>
                  </td>
                  <td className="p-2 text-slate-300">{demanda.prazo}</td>
                  <td className="p-2 text-slate-300">{demanda.tipo}</td>
                  <td className="p-2 w-[150px]">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full rounded-full bg-[#1e3a5f]">
                        <div
                          className={`h-2 rounded-full ${
                            demanda.progresso === 100
                              ? "bg-gradient-to-r from-green-400 to-green-600"
                              : demanda.progresso > 60
                                ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                                : "bg-gradient-to-r from-yellow-400 to-yellow-600"
                          }`}
                          style={{ width: `${demanda.progresso}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-300">{demanda.progresso}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
