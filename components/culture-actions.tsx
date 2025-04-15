"use client"

import { Calendar, Edit, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const acoes = [
  {
    id: 1,
    acao: "Almoço em equipe",
    data: "20/04/2025",
    responsavel: "Jeremias",
    objetivo: "Integração do time",
    status: "Planejado",
  },
  {
    id: 2,
    acao: "Reunião 1:1",
    data: "Semanal",
    responsavel: "Líderes",
    objetivo: "Feedback e alinhamento",
    status: "Recorrente",
  },
  {
    id: 3,
    acao: "Treinamento React",
    data: "05/05/2025",
    responsavel: "Bruno",
    objetivo: "Capacitação técnica",
    status: "Planejado",
  },
  {
    id: 4,
    acao: "Happy Hour",
    data: "30/04/2025",
    responsavel: "Carol",
    objetivo: "Comemoração de resultados",
    status: "Planejado",
  },
  {
    id: 5,
    acao: "Workshop de Marketing",
    data: "10/05/2025",
    responsavel: "Luiz",
    objetivo: "Compartilhar conhecimento",
    status: "Planejado",
  },
  {
    id: 6,
    acao: "Jogo de integração",
    data: "15/04/2025",
    responsavel: "Mariana",
    objetivo: "Team building",
    status: "Finalizado",
  },
]

export default function CultureActions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Ações de Cultura</CardTitle>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nova Ação
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Select defaultValue="todos">
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="planejado">Planejado</SelectItem>
              <SelectItem value="recorrente">Recorrente</SelectItem>
              <SelectItem value="finalizado">Finalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium p-2">Ação</th>
                <th className="text-left font-medium p-2">Data</th>
                <th className="text-left font-medium p-2">Responsável</th>
                <th className="text-left font-medium p-2">Objetivo</th>
                <th className="text-left font-medium p-2">Status</th>
                <th className="text-left font-medium p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {acoes.map((acao) => (
                <tr key={acao.id} className="border-b">
                  <td className="p-2 font-medium">{acao.acao}</td>
                  <td className="p-2">{acao.data}</td>
                  <td className="p-2">{acao.responsavel}</td>
                  <td className="p-2">{acao.objetivo}</td>
                  <td className="p-2">
                    <Badge
                      variant="outline"
                      className={
                        acao.status === "Finalizado"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : acao.status === "Recorrente"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {acao.status}
                    </Badge>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Calendar className="h-4 w-4" />
                      </Button>
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
