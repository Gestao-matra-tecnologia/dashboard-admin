"use client"

import { useState, useEffect, useRef } from "react"
import { Calendar, Download, FileText, BarChart3, LineChart, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Chart from "chart.js/auto"
import type { Income, Expense } from "@/lib/supabase/types"

interface FinanceChartsProps {
  filters: {
    month: number
    year: number
  }
  updateFilters: (filters: Partial<{ month: number; year: number }>) => void
  incomes?: Income[]
  expenses?: Expense[]
}

export default function FinanceCharts({ filters, updateFilters, incomes = [], expenses = [] }: FinanceChartsProps) {
  const [activeTab, setActiveTab] = useState("mensal")
  const [chartPeriod, setChartPeriod] = useState("6")

  const barChartRef = useRef<HTMLCanvasElement>(null)
  const lineChartRef = useRef<HTMLCanvasElement>(null)
  const pieChartRef = useRef<HTMLCanvasElement>(null)
  const pieChartExpensesRef = useRef<HTMLCanvasElement>(null)

  const barChartInstance = useRef<Chart | null>(null)
  const lineChartInstance = useRef<Chart | null>(null)
  const pieChartInstance = useRef<Chart | null>(null)
  const pieChartExpensesInstance = useRef<Chart | null>(null)

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

  // Dados de exemplo para os gráficos
  const generateMonthlyData = (period: number) => {
    const currentMonth = filters.month
    const currentYear = filters.year

    const labels = []
    const incomeData = []
    const expenseData = []

    for (let i = period - 1; i >= 0; i--) {
      const month = (currentMonth - i + 12) % 12
      const year = currentYear - Math.floor((currentMonth - i + 12) / 12) + 1

      labels.push(`${months[month].substring(0, 3)}/${year}`)

      // Usar dados reais se disponíveis, caso contrário gerar dados aleatórios
      const monthIncomes = incomes.filter((income) => {
        try {
          const date = new Date(income.data)
          return date.getMonth() === month && date.getFullYear() === year
        } catch (e) {
          return false
        }
      })

      const monthExpenses = expenses.filter((expense) => {
        try {
          const date = new Date(expense.data)
          return date.getMonth() === month && date.getFullYear() === year
        } catch (e) {
          return false
        }
      })

      const totalIncome =
        monthIncomes.length > 0
          ? monthIncomes.reduce((sum, income) => sum + Number(income.valor), 0)
          : 50000 + Math.random() * 30000

      const totalExpense =
        monthExpenses.length > 0
          ? monthExpenses.reduce((sum, expense) => sum + Number(expense.valor), 0)
          : 40000 + Math.random() * 20000

      incomeData.push(Math.round(totalIncome))
      expenseData.push(Math.round(totalExpense))
    }

    return { labels, incomeData, expenseData }
  }

  // Dados para o gráfico de pizza de receitas
  const getIncomeCategories = () => {
    // Agrupar entradas por categoria
    const categories: Record<string, number> = {}

    if (incomes && incomes.length > 0) {
      incomes.forEach((income) => {
        if (!categories[income.categoria]) {
          categories[income.categoria] = 0
        }
        categories[income.categoria] += Number(income.valor)
      })

      return [
        { category: "Agência", value: categories["Agência"] || 0, color: "#22d3ee" },
        { category: "Tecnologia", value: categories["Tecnologia"] || 0, color: "#c084fc" },
        { category: "Infoproduto", value: categories["Infoproduto"] || 0, color: "#4ade80" },
        { category: "Outro", value: categories["Outro"] || 0, color: "#fb923c" },
      ]
    }

    // Dados de exemplo se não houver dados reais
    return [
      { category: "Agência", value: 32000, color: "#22d3ee" },
      { category: "Tecnologia", value: 45000, color: "#c084fc" },
      { category: "Infoproduto", value: 18000, color: "#4ade80" },
      { category: "Outro", value: 5000, color: "#fb923c" },
    ]
  }

  // Dados para o gráfico de pizza de despesas
  const getExpenseCategories = () => {
    // Agrupar despesas por tipo
    const categories: Record<string, number> = {}

    if (expenses && expenses.length > 0) {
      expenses.forEach((expense) => {
        if (!categories[expense.tipo]) {
          categories[expense.tipo] = 0
        }
        categories[expense.tipo] += Number(expense.valor)
      })

      return [
        { category: "Fixa", value: categories["Fixa"] || 0, color: "#3b82f6" },
        { category: "Variável", value: categories["Variável"] || 0, color: "#c084fc" },
        { category: "Pessoal", value: categories["Pessoal"] || 0, color: "#4ade80" },
        { category: "Empresa", value: categories["Empresa"] || 0, color: "#facc15" },
        { category: "Parcelamento", value: categories["Parcelamento"] || 0, color: "#fb923c" },
      ]
    }

    // Dados de exemplo se não houver dados reais
    return [
      { category: "Custos Fixos", value: 21000, color: "#3b82f6" },
      { category: "Salários", value: 25000, color: "#c084fc" },
      { category: "Marketing", value: 8000, color: "#4ade80" },
      { category: "Equipamentos", value: 12000, color: "#facc15" },
      { category: "Outros", value: 5000, color: "#fb923c" },
    ]
  }

  // Renderizar gráficos quando o componente montar ou quando os filtros mudarem
  useEffect(() => {
    try {
      renderBarChart()
      renderLineChart()
      renderPieCharts()
    } catch (error) {
      console.error("Erro ao renderizar gráficos:", error)
    }

    return () => {
      // Limpar gráficos ao desmontar
      if (barChartInstance.current) {
        barChartInstance.current.destroy()
      }
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy()
      }
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy()
      }
      if (pieChartExpensesInstance.current) {
        pieChartExpensesInstance.current.destroy()
      }
    }
  }, [filters, chartPeriod, activeTab, incomes, expenses])

  // Renderizar gráfico de barras
  const renderBarChart = () => {
    if (!barChartRef.current) return

    // Destruir gráfico existente
    if (barChartInstance.current) {
      barChartInstance.current.destroy()
    }

    const ctx = barChartRef.current.getContext("2d")
    if (!ctx) return

    try {
      const { labels, incomeData, expenseData } = generateMonthlyData(Number.parseInt(chartPeriod))

      // Criar novo gráfico
      barChartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Entradas",
              data: incomeData,
              backgroundColor: "rgba(34, 211, 238, 0.7)",
              borderColor: "rgba(34, 211, 238, 1)",
              borderWidth: 1,
              borderRadius: 4,
            },
            {
              label: "Saídas",
              data: expenseData,
              backgroundColor: "rgba(248, 113, 113, 0.7)",
              borderColor: "rgba(248, 113, 113, 1)",
              borderWidth: 1,
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                color: "rgba(30, 58, 95, 0.5)",
              },
              ticks: {
                color: "rgba(255, 255, 255, 0.7)",
              },
            },
            y: {
              grid: {
                color: "rgba(30, 58, 95, 0.5)",
              },
              ticks: {
                color: "rgba(255, 255, 255, 0.7)",
                callback: (value) => "R$ " + value.toLocaleString("pt-BR"),
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "rgba(255, 255, 255, 0.7)",
              },
            },
            tooltip: {
              backgroundColor: "rgba(10, 25, 41, 0.9)",
              titleColor: "#fff",
              bodyColor: "#fff",
              borderColor: "#1e3a5f",
              borderWidth: 1,
              padding: 10,
              displayColors: true,
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label || ""
                  if (label) {
                    label += ": "
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(context.parsed.y)
                  }
                  return label
                },
              },
            },
          },
        },
      })
    } catch (error) {
      console.error("Erro ao renderizar gráfico de barras:", error)
    }
  }

  // Renderizar gráfico de linha
  const renderLineChart = () => {
    if (!lineChartRef.current) return

    // Destruir gráfico existente
    if (lineChartInstance.current) {
      lineChartInstance.current.destroy()
    }

    const ctx = lineChartRef.current.getContext("2d")
    if (!ctx) return

    try {
      const { labels, incomeData, expenseData } = generateMonthlyData(Number.parseInt(chartPeriod))

      // Calcular lucro/prejuízo
      const profitData = incomeData.map((income, index) => income - expenseData[index])

      // Criar novo gráfico
      lineChartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Lucro/Prejuízo",
              data: profitData,
              backgroundColor: "rgba(74, 222, 128, 0.2)",
              borderColor: "rgba(74, 222, 128, 1)",
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "rgba(74, 222, 128, 1)",
              pointBorderColor: "#fff",
              pointBorderWidth: 1,
              pointRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                color: "rgba(30, 58, 95, 0.5)",
              },
              ticks: {
                color: "rgba(255, 255, 255, 0.7)",
              },
            },
            y: {
              grid: {
                color: "rgba(30, 58, 95, 0.5)",
              },
              ticks: {
                color: "rgba(255, 255, 255, 0.7)",
                callback: (value) => "R$ " + value.toLocaleString("pt-BR"),
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "rgba(255, 255, 255, 0.7)",
              },
            },
            tooltip: {
              backgroundColor: "rgba(10, 25, 41, 0.9)",
              titleColor: "#fff",
              bodyColor: "#fff",
              borderColor: "#1e3a5f",
              borderWidth: 1,
              padding: 10,
              displayColors: true,
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label || ""
                  if (label) {
                    label += ": "
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(context.parsed.y)
                  }
                  return label
                },
              },
            },
          },
        },
      })
    } catch (error) {
      console.error("Erro ao renderizar gráfico de linha:", error)
    }
  }

  // Renderizar gráficos de pizza
  const renderPieCharts = () => {
    try {
      // Gráfico de pizza de receitas
      if (pieChartRef.current) {
        // Destruir gráfico existente
        if (pieChartInstance.current) {
          pieChartInstance.current.destroy()
        }

        const ctx = pieChartRef.current.getContext("2d")
        if (ctx) {
          const incomeCategories = getIncomeCategories()

          pieChartInstance.current = new Chart(ctx, {
            type: "pie",
            data: {
              labels: incomeCategories.map((item) => item.category),
              datasets: [
                {
                  data: incomeCategories.map((item) => item.value),
                  backgroundColor: incomeCategories.map((item) => item.color),
                  borderColor: "#0f2744",
                  borderWidth: 2,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "right",
                  labels: {
                    color: "rgba(255, 255, 255, 0.7)",
                    padding: 20,
                    font: {
                      size: 12,
                    },
                  },
                },
                tooltip: {
                  backgroundColor: "rgba(10, 25, 41, 0.9)",
                  titleColor: "#fff",
                  bodyColor: "#fff",
                  borderColor: "#1e3a5f",
                  borderWidth: 1,
                  padding: 10,
                  callbacks: {
                    label: (context) => {
                      const value = context.raw as number
                      const total = context.chart.data.datasets[0].data.reduce(
                        (a, b) => (a as number) + (b as number),
                        0,
                      ) as number
                      const percentage = ((value / total) * 100).toFixed(1)
                      return `R$ ${value.toLocaleString("pt-BR")} (${percentage}%)`
                    },
                  },
                },
              },
            },
          })
        }
      }

      // Gráfico de pizza de despesas
      if (pieChartExpensesRef.current) {
        // Destruir gráfico existente
        if (pieChartExpensesInstance.current) {
          pieChartExpensesInstance.current.destroy()
        }

        const ctx = pieChartExpensesRef.current.getContext("2d")
        if (ctx) {
          const expenseCategories = getExpenseCategories()

          pieChartExpensesInstance.current = new Chart(ctx, {
            type: "pie",
            data: {
              labels: expenseCategories.map((item) => item.category),
              datasets: [
                {
                  data: expenseCategories.map((item) => item.value),
                  backgroundColor: expenseCategories.map((item) => item.color),
                  borderColor: "#0f2744",
                  borderWidth: 2,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "right",
                  labels: {
                    color: "rgba(255, 255, 255, 0.7)",
                    padding: 20,
                    font: {
                      size: 12,
                    },
                  },
                },
                tooltip: {
                  backgroundColor: "rgba(10, 25, 41, 0.9)",
                  titleColor: "#fff",
                  bodyColor: "#fff",
                  borderColor: "#1e3a5f",
                  borderWidth: 1,
                  padding: 10,
                  callbacks: {
                    label: (context) => {
                      const value = context.raw as number
                      const total = context.chart.data.datasets[0].data.reduce(
                        (a, b) => (a as number) + (b as number),
                        0,
                      ) as number
                      const percentage = ((value / total) * 100).toFixed(1)
                      return `R$ ${value.toLocaleString("pt-BR")} (${percentage}%)`
                    },
                  },
                },
              },
            },
          })
        }
      }
    } catch (error) {
      console.error("Erro ao renderizar gráficos de pizza:", error)
    }
  }

  // Exportar dados
  const handleExport = () => {
    const { labels, incomeData, expenseData } = generateMonthlyData(Number.parseInt(chartPeriod))
    const profitData = incomeData.map((income, index) => income - expenseData[index])

    const csvContent = [
      ["Período", "Entradas", "Saídas", "Lucro/Prejuízo"],
      ...labels.map((label, index) => [label, incomeData[index], expenseData[index], profitData[index]]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `dados_financeiros_${months[filters.month]}_${filters.year}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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

          <Select value={chartPeriod} onValueChange={setChartPeriod}>
            <SelectTrigger className="w-[180px] bg-[#0a1929] border-[#1e3a5f] text-white">
              <FileText className="mr-2 h-4 w-4 text-cyan-400" />
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
              <SelectItem value="3">Últimos 3 meses</SelectItem>
              <SelectItem value="6">Últimos 6 meses</SelectItem>
              <SelectItem value="12">Últimos 12 meses</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleExport}
            className="border-[#1e3a5f] bg-[#0a1929] text-cyan-400 hover:bg-[#163456]"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar Dados
          </Button>
        </div>
      </div>

      <Tabs defaultValue="mensal" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 bg-[#163456] mb-6">
          <TabsTrigger
            value="mensal"
            className={activeTab === "mensal" ? "bg-[#1e3a5f] text-cyan-400" : "text-slate-300"}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Entradas vs Saídas
          </TabsTrigger>
          <TabsTrigger
            value="lucro"
            className={activeTab === "lucro" ? "bg-[#1e3a5f] text-cyan-400" : "text-slate-300"}
          >
            <LineChart className="mr-2 h-4 w-4" />
            Lucro/Prejuízo
          </TabsTrigger>
          <TabsTrigger
            value="categorias"
            className={activeTab === "categorias" ? "bg-[#1e3a5f] text-cyan-400" : "text-slate-300"}
          >
            <PieChart className="mr-2 h-4 w-4" />
            Categorias
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mensal" className="mt-0">
          <Card className="bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">Entradas vs Saídas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <canvas ref={barChartRef} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lucro" className="mt-0">
          <Card className="bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">Evolução do Lucro/Prejuízo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <canvas ref={lineChartRef} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categorias" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">Distribuição de Receitas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <canvas ref={pieChartRef} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">Distribuição de Despesas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <canvas ref={pieChartExpensesRef} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
