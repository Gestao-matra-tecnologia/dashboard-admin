"use client"

import { Edit, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const campanhas = [
  {
    id: 1,
    campanha: "Lançamento Spotform V2",
    objetivo: "Alcançar 300 usuários ativos",
    responsavel: "Luiz",
    status: "Em andamento",
    dataDisparo: "25/04/2025",
    tipoConteudo: "Post, Vídeo, Email",
  },
  {
    id: 2,
    campanha: "Webinar NotifyX",
    objetivo: "100 inscritos para demonstração",
    responsavel: "Bruno",
    status: "Planejado",
    dataDisparo: "10/05/2025",
    tipoConteudo: "Email, Grupo, Anúncio",
  },
  {
    id: 3,
    campanha: "Conteúdo Firebank",
    objetivo: "Gerar 500 leads qualificados",
    responsavel: "Mariana",
    status: "Finalizado",
    dataDisparo: "05/04/2025",
    tipoConteudo: "Post, Vídeo",
  },
  {
    id: 4,
    campanha: "Promoção SharkPage",
    objetivo: "50 vendas no lançamento beta",
    responsavel: "Ryan",
    status: "Em andamento",
    dataDisparo: "20/04/2025",
    tipoConteudo: "Email, Anúncio",
  },
  {
    id: 5,
    campanha: "Conteúdo Educativo",
    objetivo: "Aumentar engajamento em 30%",
    responsavel: "Pedro",
    status: "Planejado",
    dataDisparo: "01/05/2025",
    tipoConteudo: "Vídeo, Post",
  },
]

export default function InternalMarketing() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Marketing Interno</CardTitle>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nova Campanha
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
              <SelectItem value="em-andamento">Em andamento</SelectItem>
              <SelectItem value="finalizado">Finalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium p-2">Campanha / Ação</th>
                <th className="text-left font-medium p-2">Objetivo</th>
                <th className="text-left font-medium p-2">Responsável</th>
                <th className="text-left font-medium p-2">Status</th>
                <th className="text-left font-medium p-2">Data de disparo</th>
                <th className="text-left font-medium p-2">Tipo de conteúdo</th>
                <th className="text-left font-medium p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {campanhas.map((campanha) => (
                <tr key={campanha.id} className="border-b">
                  <td className="p-2 font-medium">{campanha.campanha}</td>
                  <td className="p-2">{campanha.objetivo}</td>
                  <td className="p-2">{campanha.responsavel}</td>
                  <td className="p-2">
                    <Badge
                      variant="outline"
                      className={
                        campanha.status === "Finalizado"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : campanha.status === "Em andamento"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {campanha.status}
                    </Badge>
                  </td>
                  <td className="p-2">{campanha.dataDisparo}</td>
                  <td className="p-2">{campanha.tipoConteudo}</td>
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
