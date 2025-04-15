"use client"

import { useState } from "react"
import { Calendar, Download, FileText, ArrowUpCircle, ArrowDownCircle, Target, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Dados de exemplo para resumo mensal
const initialMonthlySummaries = [
  {
    id: 1,
    mes: 3, // Abril (0-indexed)
    ano: 2025,
    totalEntradas: 27500,
    totalSaidas: 53500,
    lucroPrejuizo: -26000,
    metaFaturamento: 100000,
    metaCaixaDisponivel: 20000,
    observacoes: "Mês com investimentos em equipamentos e marketing",
  },
  {
    id: 2,
    mes: 2, // Março (0-indexed)
    ano: 2025,
    totalEntradas: 65000,
    totalSaidas: 45000,
    lucroPrejuizo: 20000,
    metaFaturamento: 100000,
    metaCaixaDisponivel: 20000,
    observacoes: "Mês com bom desempenho de vendas",
  },
]

interface FinanceSummaryProps {
  filters: {
    month: number
    year: number
  }
  updateFilters: (filters: Partial<{ month: number; year: number }>) => void
}

export default function FinanceSummary({ filters, updateFilters }: FinanceSummaryProps) {
  const [monthlySummaries, setMonthlySummaries] = useState(initialMonthlySummaries)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentSummaryState, setCurrentSummaryState] = useState<(typeof initialMonthlySummaries)[0] | null>(null)

  // Meses para seleção
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  // Encontrar o resumo do mês atual
  const currentSummary = monthlySummaries.find(
    (summary) => summary.mes === filters.month && summary.ano === filters.year,
  )

  // Se não existir um resumo para o mês atual, criar um novo
  const createNewSummary = () => {
    const newId = Math.max(0, ...monthlySummaries.map((s) => s.id)) + 1
    const newSummary = {
      id: newId,
      mes: filters.month,
      ano: filters.year,
      totalEntradas: 0,
      totalSaidas: 0,
      lucroPrejuizo: 0,
      metaFaturamento: 100000,
      metaCaixaDisponivel: 20000,
      observacoes: "",
    }
    setMonthlySummaries([...monthlySummaries, newSummary])
    return newSummary
  }

  // Atualizar resumo mensal
  const handleUpdateSummary = () => {
    if (!currentSummaryState) return
    setMonthlySummaries(
      monthlySummaries.map((summary) => (summary.id === currentSummaryState.id ? { ...currentSummaryState } : summary)),
    )
    setIsEditDialogOpen(false)
    setCurrentSummaryState(null)
  }

  // Exportar dados
  const handleExport = () => {
    if (!currentSummary) return

    const csvContent = [
      [
        "Mês",
        "Ano",
        "Total Entradas",
        "Total Saídas",
        "Lucro/Prejuízo",
        "Meta Faturamento",
        "Meta Caixa",
        "Observações",
      ],
      [
        months[currentSummary.mes],
        currentSummary.ano,
        currentSummary.totalEntradas,
        currentSummary.totalSaidas,
        currentSummary.lucroPrejuizo,
        currentSummary.metaFaturamento,
        currentSummary.metaCaixaDisponivel,
        currentSummary.observacoes,
      ],
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `resumo_${months[currentSummary.mes]}_${currentSummary.ano}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Calcular porcentagem da meta atingida
  const calculatePercentage = (value: number, target: number) => {
    return Math.min(100, Math.round((value / target) * 100))
  }

  // Obter o resumo atual ou criar um novo
  const summary = currentSummary || createNewSummary()

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <Select
            value={filters.month.toString()}
            onValueChange={(value) => updateFilters({ month: Number.parseInt(value) })}
          >
            <SelectTrigger className="w-[180px] bg-[#0a1929] border-[#1e3a5f] text-white">
              <Calendar className="mr-2 h-4 w-4 text-cyan-400" />
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
              {months.map((month, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.year.toString()}
            onValueChange={(value) => updateFilters({ year: Number.parseInt(value) })}
          >
            <SelectTrigger className="w-[120px] bg-[#0a1929] border-[#1e3a5f] text-white">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
              {[2024, 2025, 2026].map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-[#1e3a5f] bg-[#0a1929] text-cyan-400 hover:bg-[#163456]"
                onClick={() => setCurrentSummaryState(summary)}
              >
                <Target className="mr-2 h-4 w-4" />
                Definir Metas
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0f2744] border-[#1e3a5f] text-white">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Definir Metas - {months[filters.month]} {filters.year}
                </DialogTitle>
                <DialogDescription className="text-slate-300">
                  Atualize as metas financeiras para o mês
                </DialogDescription>
              </DialogHeader>
              {currentSummaryState && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="metaFaturamento" className="text-right text-slate-300">
                      Meta de Faturamento (R$)
                    </Label>
                    <Input
                      id="metaFaturamento"
                      type="number"
                      value={currentSummaryState.metaFaturamento}
                      onChange={(e) =>
                        setCurrentSummaryState({
                          ...currentSummaryState,
                          metaFaturamento: Number.parseFloat(e.target.value),
                        })
                      }
                      className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="metaCaixaDisponivel" className="text-right text-slate-300">
                      Meta de Caixa Disponível (R$)
                    </Label>
                    <Input
                      id="metaCaixaDisponivel"
                      type="number"
                      value={currentSummaryState.metaCaixaDisponivel}
                      onChange={(e) =>
                        setCurrentSummaryState({
                          ...currentSummaryState,
                          metaCaixaDisponivel: Number.parseFloat(e.target.value),
                        })
                      }
                      className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="observacoes" className="text-right text-slate-300">
                      Observações
                    </Label>
                    <Input
                      id="observacoes"
                      value={currentSummaryState.observacoes}
                      onChange={(e) => setCurrentSummaryState({ ...currentSummaryState, observacoes: e.target.value })}
                      className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                    />
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={handleUpdateSummary}
                  className="bg-cyan-600 text-white hover:bg-cyan-700"
                >
                  Salvar Alterações
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            onClick={handleExport}
            className="border-[#1e3a5f] bg-[#0a1929] text-cyan-400 hover:bg-[#163456]"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">
              Resumo Financeiro - {months[filters.month]} {filters.year}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-slate-300">Total de Entradas</span>
                <div className="flex items-center">
                  <ArrowUpCircle className="h-5 w-5 mr-2 text-green-400" />
                  <span className="text-xl font-bold text-green-400">
                    R$ {summary.totalEntradas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-slate-300">Total de Saídas</span>
                <div className="flex items-center">
                  <ArrowDownCircle className="h-5 w-5 mr-2 text-red-400" />
                  <span className="text-xl font-bold text-red-400">
                    R$ {summary.totalSaidas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1e3a5f]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-300">Lucro / Prejuízo</span>
                <span className={`text-xl font-bold ${summary.lucroPrejuizo >= 0 ? "text-green-400" : "text-red-400"}`}>
                  R$ {summary.lucroPrejuizo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
              {summary.lucroPrejuizo < 0 && (
                <div className="flex items-center mt-2 p-2 bg-[#2d1e1e] rounded-md">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                  <span className="text-sm text-red-300">
                    Atenção: Prejuízo de R$ {Math.abs(summary.lucroPrejuizo).toLocaleString("pt-BR")} neste mês
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-[#1e3a5f]">
              <div className="flex flex-col space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-300">Meta de Faturamento</span>
                    <span className="text-sm font-medium text-cyan-400">
                      {calculatePercentage(summary.totalEntradas, summary.metaFaturamento)}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#1e3a5f]">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                      style={{
                        width: `${calculatePercentage(summary.totalEntradas, summary.metaFaturamento)}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-slate-400">R$ {summary.totalEntradas.toLocaleString("pt-BR")}</span>
                    <span className="text-xs text-slate-400">
                      Meta: R$ {summary.metaFaturamento.toLocaleString("pt-BR")}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-300">Caixa Disponível</span>
                    <span className="text-sm font-medium text-cyan-400">
                      {calculatePercentage(
                        Math.max(0, summary.totalEntradas - summary.totalSaidas),
                        summary.metaCaixaDisponivel,
                      )}
                      %
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#1e3a5f]">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"
                      style={{
                        width: `${calculatePercentage(
                          Math.max(0, summary.totalEntradas - summary.totalSaidas),
                          summary.metaCaixaDisponivel,
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-slate-400">
                      R$ {Math.max(0, summary.totalEntradas - summary.totalSaidas).toLocaleString("pt-BR")}
                    </span>
                    <span className="text-xs text-slate-400">
                      Meta: R$ {summary.metaCaixaDisponivel.toLocaleString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {summary.observacoes && (
              <div className="pt-2 border-t border-[#1e3a5f]">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 mr-2 text-slate-300 mt-0.5" />
                  <div>
                    <span className="text-sm text-slate-300">Observações</span>
                    <p className="text-sm text-white mt-1">{summary.observacoes}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">Análise de Fluxo de Caixa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#163456] rounded-lg">
                <div className="flex flex-col items-center">
                  <span className="text-sm text-slate-300 mb-2">Entradas vs Saídas</span>
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Círculo de fundo */}
                      <circle cx="50" cy="50" r="45" fill="transparent" stroke="#1e3a5f" strokeWidth="10" />

                      {/* Arco de progresso */}
                      {summary.totalSaidas > 0 && (
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke={summary.totalEntradas >= summary.totalSaidas ? "#22d3ee" : "#f87171"}
                          strokeWidth="10"
                          strokeDasharray={`${(summary.totalEntradas / summary.totalSaidas) * 283} 283`}
                          strokeDashoffset="0"
                          transform="rotate(-90 50 50)"
                        />
                      )}

                      {/* Texto central */}
                      <text
                        x="50"
                        y="50"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="16"
                        fontWeight="bold"
                        fill={summary.totalEntradas >= summary.totalSaidas ? "#22d3ee" : "#f87171"}
                      >
                        {summary.totalSaidas > 0
                          ? `${Math.round((summary.totalEntradas / summary.totalSaidas) * 100)}%`
                          : "0%"}
                      </text>
                      <text x="50" y="65" dominantBaseline="middle" textAnchor="middle" fontSize="8" fill="#94a3b8">
                        Cobertura
                      </text>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#163456] rounded-lg">
                <div className="flex flex-col h-full justify-between">
                  <span className="text-sm text-slate-300 mb-2">Status do Mês</span>
                  <div className="flex flex-col items-center justify-center flex-1">
                    {summary.lucroPrejuizo >= 0 ? (
                      <Badge className="px-3 py-1 text-base bg-green-900 text-green-300 border-green-700">Lucro</Badge>
                    ) : (
                      <Badge className="px-3 py-1 text-base bg-red-900 text-red-300 border-red-700">Prejuízo</Badge>
                    )}
                    <span className="mt-2 text-sm text-slate-300">
                      {summary.lucroPrejuizo >= 0
                        ? `${Math.round((summary.lucroPrejuizo / summary.totalEntradas) * 100)}% de margem`
                        : `${Math.round((Math.abs(summary.lucroPrejuizo) / summary.totalSaidas) * 100)}% negativo`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1e3a5f]">
              <h3 className="text-sm font-medium text-slate-300 mb-3">Distribuição de Saídas</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-slate-400">Custos Fixos</span>
                    <span className="text-xs text-slate-400">40%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#1e3a5f]">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: "40%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-slate-400">Salários</span>
                    <span className="text-xs text-slate-400">35%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#1e3a5f]">
                    <div className="h-2 rounded-full bg-purple-500" style={{ width: "35%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-slate-400">Marketing</span>
                    <span className="text-xs text-slate-400">15%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#1e3a5f]">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: "15%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-slate-400">Outros</span>
                    <span className="text-xs text-slate-400">10%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#1e3a5f]">
                    <div className="h-2 rounded-full bg-yellow-500" style={{ width: "10%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1e3a5f]">
              <h3 className="text-sm font-medium text-slate-300 mb-3">Próximos Vencimentos</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-[#0a1929] rounded-md">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-xs text-slate-300">Aluguel Escritório</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-white mr-2">R$ 4.500,00</span>
                    <Badge variant="outline" className="text-xs bg-red-900 text-red-300 border-red-700">
                      5 dias
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#0a1929] rounded-md">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-xs text-slate-300">Infraestrutura Cloud</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-white mr-2">R$ 3.500,00</span>
                    <Badge variant="outline" className="text-xs bg-yellow-900 text-yellow-300 border-yellow-700">
                      10 dias
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#0a1929] rounded-md">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-xs text-slate-300">Salários</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-white mr-2">R$ 25.000,00</span>
                    <Badge variant="outline" className="text-xs bg-green-900 text-green-300 border-green-700">
                      15 dias
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
