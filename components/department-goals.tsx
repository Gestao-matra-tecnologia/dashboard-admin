"use client"

import { Calendar, Edit, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const metas = [
  {
    id: 1,
    area: "TI",
    meta: "Lançar Spotform V2 com 300 usuários",
    responsavel: "Jeremias",
    progresso: 55,
    prazoFinal: "30/05/2025",
    dataRevisao: "15/04/2025",
  },
  {
    id: 2,
    area: "Tráfego",
    meta: "3 lançamentos por mês com ROI > 2.0",
    responsavel: "Luiz",
    progresso: 65,
    prazoFinal: "30/04/2025",
    dataRevisao: "20/04/2025",
  },
  {
    id: 3,
    area: "Financeiro",
    meta: "Reduzir custos fixos em 15%",
    responsavel: "Carol",
    progresso: 30,
    prazoFinal: "15/05/2025",
    dataRevisao: "25/04/2025",
  },
  {
    id: 4,
    area: "Atendimento",
    meta: "NPS acima de 85",
    responsavel: "Mariana",
    progresso: 90,
    prazoFinal: "30/04/2025",
    dataRevisao: "18/04/2025",
  },
  {
    id: 5,
    area: "Vídeo",
    meta: "Produzir 10 vídeos para produtos",
    responsavel: "Pedro",
    progresso: 40,
    prazoFinal: "10/05/2025",
    dataRevisao: "22/04/2025",
  },
  {
    id: 6,
    area: "CEO",
    meta: "Fechar 2 parcerias estratégicas",
    responsavel: "Jeremias",
    progresso: 50,
    prazoFinal: "30/06/2025",
    dataRevisao: "30/04/2025",
  },
]

export default function DepartmentGoals() {
  return (
    <Card className="bg-[#0f2744] border-[#1e3a5f] text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-white">Metas por Área</CardTitle>
        <Button size="sm" className="bg-cyan-600 text-white hover:bg-cyan-700">
          <Plus className="mr-2 h-4 w-4" />
          Nova Meta
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e3a5f]">
                <th className="text-left font-medium p-2 text-slate-300">Área</th>
                <th className="text-left font-medium p-2 text-slate-300">Meta do Mês</th>
                <th className="text-left font-medium p-2 text-slate-300">Responsável</th>
                <th className="text-left font-medium p-2 text-slate-300">Progresso</th>
                <th className="text-left font-medium p-2 text-slate-300">Prazo Final</th>
                <th className="text-left font-medium p-2 text-slate-300">Data de Revisão</th>
                <th className="text-left font-medium p-2 text-slate-300">Ações</th>
              </tr>
            </thead>
            <tbody>
              {metas.map((meta) => (
                <tr key={meta.id} className="border-b border-[#1e3a5f]">
                  <td className="p-2 font-medium text-white">{meta.area}</td>
                  <td className="p-2 text-slate-300">{meta.meta}</td>
                  <td className="p-2 text-slate-300">{meta.responsavel}</td>
                  <td className="p-2 w-[200px]">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full rounded-full bg-[#1e3a5f]">
                        <div
                          className={`h-2 rounded-full ${
                            meta.progresso > 80
                              ? "bg-gradient-to-r from-green-400 to-green-600"
                              : meta.progresso > 50
                                ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                                : meta.progresso > 30
                                  ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                                  : "bg-gradient-to-r from-red-400 to-red-600"
                          }`}
                          style={{ width: `${meta.progresso}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-300">{meta.progresso}%</span>
                    </div>
                  </td>
                  <td className="p-2 text-slate-300">{meta.prazoFinal}</td>
                  <td className="p-2 text-slate-300">{meta.dataRevisao}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-[#1e3a5f] bg-[#0a1929] text-cyan-400 hover:bg-[#163456]"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-[#1e3a5f] bg-[#0a1929] text-cyan-400 hover:bg-[#163456]"
                      >
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
