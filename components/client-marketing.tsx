"use client"

import { Edit, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const clientes = [
  {
    id: 1,
    cliente: "Alpha Móveis",
    campanha: "Lançamento Coleção 2025",
    responsavel: "Luiz",
    status: "Ativo",
    roi: "2.5x",
    proximaAcao: "Otimização de anúncios",
    tipo: "Meta Ads",
  },
  {
    id: 2,
    cliente: "Construtora Visão",
    campanha: "Captação de Leads",
    responsavel: "Mariana",
    status: "Ativo",
    roi: "3.2x",
    proximaAcao: "Relatório mensal",
    tipo: "Google",
  },
  {
    id: 3,
    cliente: "Clínica Saúde Total",
    campanha: "Novos Pacientes",
    responsavel: "Pedro",
    status: "Em pausa",
    roi: "1.8x",
    proximaAcao: "Reunião de alinhamento",
    tipo: "Meta Ads",
  },
  {
    id: 4,
    cliente: "Restaurante Sabor",
    campanha: "Delivery Promocional",
    responsavel: "Luiz",
    status: "Ativo",
    roi: "4.0x",
    proximaAcao: "Expansão de campanha",
    tipo: "WhatsApp",
  },
  {
    id: 5,
    cliente: "Academia Fitness",
    campanha: "Plano Trimestral",
    responsavel: "Mariana",
    status: "Ativo",
    roi: "2.1x",
    proximaAcao: "Criação de conteúdo",
    tipo: "Orgânico",
  },
]

export default function ClientMarketing() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Marketing dos Clientes</CardTitle>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Select defaultValue="todos">
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="meta">Meta Ads</SelectItem>
              <SelectItem value="google">Google</SelectItem>
              <SelectItem value="organico">Orgânico</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium p-2">Cliente</th>
                <th className="text-left font-medium p-2">Campanha / Produto</th>
                <th className="text-left font-medium p-2">Responsável</th>
                <th className="text-left font-medium p-2">Status</th>
                <th className="text-left font-medium p-2">ROI Atual</th>
                <th className="text-left font-medium p-2">Próxima ação</th>
                <th className="text-left font-medium p-2">Tipo</th>
                <th className="text-left font-medium p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id} className="border-b">
                  <td className="p-2 font-medium">{cliente.cliente}</td>
                  <td className="p-2">{cliente.campanha}</td>
                  <td className="p-2">{cliente.responsavel}</td>
                  <td className="p-2">
                    <Badge
                      variant="outline"
                      className={
                        cliente.status === "Ativo"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {cliente.status}
                    </Badge>
                  </td>
                  <td className="p-2 font-medium">{cliente.roi}</td>
                  <td className="p-2">{cliente.proximaAcao}</td>
                  <td className="p-2">{cliente.tipo}</td>
                  <td className="p-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
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
