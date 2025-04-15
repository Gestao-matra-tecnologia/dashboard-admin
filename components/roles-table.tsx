"use client"

import { Edit, Filter, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const colaboradores = [
  {
    id: 1,
    nome: "Luiz",
    funcao: "Tráfego Pago",
    status: "PJ",
    nivel: "Júnior",
    planoCrescimento: "Gestor de Tráfego",
    observacoes: "Especialista em Meta Ads",
  },
  {
    id: 2,
    nome: "Bruno",
    funcao: "Desenvolvedor",
    status: "CLT",
    nivel: "Pleno",
    planoCrescimento: "Líder Técnico",
    observacoes: "Especialista em Node.js e React",
  },
  {
    id: 3,
    nome: "Ryan",
    funcao: "Desenvolvedor Front-end",
    status: "PJ",
    nivel: "Júnior",
    planoCrescimento: "Desenvolvedor Pleno",
    observacoes: "Foco em UI/UX",
  },
  {
    id: 4,
    nome: "Carol",
    funcao: "Administrativo",
    status: "CLT",
    nivel: "Júnior",
    planoCrescimento: "Gestão Financeira",
    observacoes: "Responsável por contas e pagamentos",
  },
  {
    id: 5,
    nome: "Mariana",
    funcao: "Marketing",
    status: "PJ",
    nivel: "Pleno",
    planoCrescimento: "Coordenadora de Marketing",
    observacoes: "Especialista em conteúdo",
  },
  {
    id: 6,
    nome: "Pedro",
    funcao: "Vídeo",
    status: "Freela",
    nivel: "Pleno",
    planoCrescimento: "Diretor de Vídeo",
    observacoes: "Edição e produção",
  },
  {
    id: 7,
    nome: "Jeremias",
    funcao: "CEO",
    status: "PJ",
    nivel: "Líder",
    planoCrescimento: "Expansão de negócios",
    observacoes: "Fundador",
  },
]

export default function RolesTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Cargos e Funções</CardTitle>
        <Button size="sm">
          <UserPlus className="mr-2 h-4 w-4" />
          Novo Colaborador
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Select defaultValue="todos">
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filtrar por nível" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="estagiario">Estagiário</SelectItem>
              <SelectItem value="junior">Júnior</SelectItem>
              <SelectItem value="pleno">Pleno</SelectItem>
              <SelectItem value="senior">Sênior</SelectItem>
              <SelectItem value="lider">Líder</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium p-2">Nome</th>
                <th className="text-left font-medium p-2">Função principal</th>
                <th className="text-left font-medium p-2">Status</th>
                <th className="text-left font-medium p-2">Nível</th>
                <th className="text-left font-medium p-2">Plano de crescimento</th>
                <th className="text-left font-medium p-2">Observações</th>
                <th className="text-left font-medium p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {colaboradores.map((colaborador) => (
                <tr key={colaborador.id} className="border-b">
                  <td className="p-2 font-medium">{colaborador.nome}</td>
                  <td className="p-2">{colaborador.funcao}</td>
                  <td className="p-2">
                    <Badge
                      variant="outline"
                      className={
                        colaborador.status === "CLT"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : colaborador.status === "PJ"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {colaborador.status}
                    </Badge>
                  </td>
                  <td className="p-2">
                    <Badge
                      variant="outline"
                      className={
                        colaborador.nivel === "Júnior"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          : colaborador.nivel === "Pleno"
                            ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                            : colaborador.nivel === "Sênior"
                              ? "bg-orange-100 text-orange-800 hover:bg-orange-100"
                              : "bg-green-100 text-green-800 hover:bg-green-100"
                      }
                    >
                      {colaborador.nivel}
                    </Badge>
                  </td>
                  <td className="p-2">{colaborador.planoCrescimento}</td>
                  <td className="p-2">{colaborador.observacoes}</td>
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
