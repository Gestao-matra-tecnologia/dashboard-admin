"use client"

import { Award, Edit, MessageSquare, Plus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const colaboradores = [
  {
    id: 1,
    nome: "Luiz",
    avatar: "/placeholder.svg?height=40&width=40",
    indicadores: {
      pontualidade: 9,
      entrega: 10,
      comunicacao: 8,
      proatividade: 9,
      resultado: 10,
    },
    nota: 9.2,
    feedbacks: "Excelente trabalho nas campanhas de tráfego",
    acoes: "Aumentou ROI das campanhas em 40%",
    premio: "Vale-presente R$ 300",
  },
  {
    id: 2,
    nome: "Bruno",
    avatar: "/placeholder.svg?height=40&width=40",
    indicadores: {
      pontualidade: 10,
      entrega: 9,
      comunicacao: 8,
      proatividade: 8,
      resultado: 9,
    },
    nota: 8.8,
    feedbacks: "Entregou todas as features no prazo",
    acoes: "Implementou sistema de automação",
    premio: "Curso avançado de desenvolvimento",
  },
  {
    id: 3,
    nome: "Ryan",
    avatar: "/placeholder.svg?height=40&width=40",
    indicadores: {
      pontualidade: 8,
      entrega: 8,
      comunicacao: 9,
      proatividade: 7,
      resultado: 8,
    },
    nota: 8.0,
    feedbacks: "Melhorou muito a interface do usuário",
    acoes: "Redesenhou componentes principais",
    premio: "Livro de UI/UX",
  },
  {
    id: 4,
    nome: "Carol",
    avatar: "/placeholder.svg?height=40&width=40",
    indicadores: {
      pontualidade: 10,
      entrega: 10,
      comunicacao: 9,
      proatividade: 10,
      resultado: 9,
    },
    nota: 9.6,
    feedbacks: "Organização impecável das finanças",
    acoes: "Reduziu custos operacionais em 15%",
    premio: "Colaboradora do mês + R$ 500",
  },
]

// Ordenar por nota (maior para menor)
const colaboradoresOrdenados = [...colaboradores].sort((a, b) => b.nota - a.nota)
const colaboradorDoMes = colaboradoresOrdenados[0]

export default function EmployeePerformance() {
  return (
    <>
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Colaborador do Mês</CardTitle>
          <Award className="h-6 w-6 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-2">
                <AvatarImage src={colaboradorDoMes.avatar || "/placeholder.svg"} alt={colaboradorDoMes.nome} />
                <AvatarFallback>{colaboradorDoMes.nome.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-bold">{colaboradorDoMes.nome}</h3>
              <div className="text-3xl font-bold text-yellow-500 flex items-center">
                {colaboradorDoMes.nota}
                <Star className="h-5 w-5 ml-1 fill-yellow-500 text-yellow-500" />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h4 className="font-medium mb-2">Indicadores</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Pontualidade</span>
                      <span className="text-sm font-medium">{colaboradorDoMes.indicadores.pontualidade}/10</span>
                    </div>
                    <Progress value={colaboradorDoMes.indicadores.pontualidade * 10} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Entrega</span>
                      <span className="text-sm font-medium">{colaboradorDoMes.indicadores.entrega}/10</span>
                    </div>
                    <Progress value={colaboradorDoMes.indicadores.entrega * 10} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Comunicação</span>
                      <span className="text-sm font-medium">{colaboradorDoMes.indicadores.comunicacao}/10</span>
                    </div>
                    <Progress value={colaboradorDoMes.indicadores.comunicacao * 10} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Proatividade</span>
                      <span className="text-sm font-medium">{colaboradorDoMes.indicadores.proatividade}/10</span>
                    </div>
                    <Progress value={colaboradorDoMes.indicadores.proatividade * 10} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Resultado</span>
                      <span className="text-sm font-medium">{colaboradorDoMes.indicadores.resultado}/10</span>
                    </div>
                    <Progress value={colaboradorDoMes.indicadores.resultado * 10} />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Feedbacks</h4>
                <p className="text-sm text-muted-foreground">{colaboradorDoMes.feedbacks}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Ações que impactaram positivamente</h4>
                <p className="text-sm text-muted-foreground">{colaboradorDoMes.acoes}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Prêmio ou reconhecimento</h4>
                <p className="text-sm font-medium text-yellow-600">{colaboradorDoMes.premio}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">KPIs Individuais</CardTitle>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Novo Feedback
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium p-2">Colaborador</th>
                  <th className="text-left font-medium p-2">Nota</th>
                  <th className="text-left font-medium p-2">Pontualidade</th>
                  <th className="text-left font-medium p-2">Entrega</th>
                  <th className="text-left font-medium p-2">Comunicação</th>
                  <th className="text-left font-medium p-2">Proatividade</th>
                  <th className="text-left font-medium p-2">Resultado</th>
                  <th className="text-left font-medium p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {colaboradoresOrdenados.map((colaborador) => (
                  <tr key={colaborador.id} className="border-b">
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={colaborador.avatar || "/placeholder.svg"} alt={colaborador.nome} />
                          <AvatarFallback>{colaborador.nome.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{colaborador.nome}</span>
                        {colaborador.id === colaboradorDoMes.id && <Award className="h-4 w-4 text-yellow-500" />}
                      </div>
                    </td>
                    <td className="p-2 font-bold">{colaborador.nota}</td>
                    <td className="p-2">{colaborador.indicadores.pontualidade}</td>
                    <td className="p-2">{colaborador.indicadores.entrega}</td>
                    <td className="p-2">{colaborador.indicadores.comunicacao}</td>
                    <td className="p-2">{colaborador.indicadores.proatividade}</td>
                    <td className="p-2">{colaborador.indicadores.resultado}</td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
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
    </>
  )
}
