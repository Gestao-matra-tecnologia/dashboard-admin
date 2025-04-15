"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"
import FinanceSummary from "./finance-summary"
import FinanceIncomeTable from "./finance-income-table"
import FinanceExpenseTable from "./finance-expense-table"
import FinanceCharts from "./finance-charts"
import FinanceEmployeeTable from "./finance-employee-table"
import { getFinanceData } from "@/lib/supabase/services"

export default function FinanceDashboard() {
  // Estado para os filtros de mês e ano
  const [filters, setFilters] = useState({
    month: 3, // Abril (0-indexed)
    year: 2025,
  })

  // Estado para os dados financeiros
  const [financeData, setFinanceData] = useState({
    incomes: [],
    expenses: [],
    employees: [],
  })

  // Estado para indicar se está em modo de demonstração
  const [isDemoMode, setIsDemoMode] = useState(true)

  // Carregar dados financeiros
  useEffect(() => {
    const loadFinanceData = async () => {
      try {
        // Sempre usar dados de demonstração
        const data = await getFinanceData(true)

        // Verificar se os dados são válidos
        const validIncomes = Array.isArray(data.incomes) ? data.incomes : []
        const validExpenses = Array.isArray(data.expenses) ? data.expenses : []
        const validEmployees = Array.isArray(data.employees) ? data.employees : []

        setFinanceData({
          incomes: validIncomes,
          expenses: validExpenses,
          employees: validEmployees,
        })

        // Sempre definir como modo de demonstração
        setIsDemoMode(true)
      } catch (error) {
        console.error("Erro ao carregar dados financeiros:", error)
        // Em caso de erro, usar dados vazios e modo de demonstração
        setFinanceData({
          incomes: [],
          expenses: [],
          employees: [],
        })
        setIsDemoMode(true)
      }
    }

    loadFinanceData()
  }, [])

  // Atualizar filtros
  const updateFilters = (newFilters: Partial<{ month: number; year: number }>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  // Atualizar dados
  const updateIncomeData = (newData: any[]) => {
    setFinanceData((prev) => ({ ...prev, incomes: newData }))
  }

  const updateExpenseData = (newData: any[]) => {
    setFinanceData((prev) => ({ ...prev, expenses: newData }))
  }

  const updateEmployeeData = (newData: any[]) => {
    setFinanceData((prev) => ({ ...prev, employees: newData }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">Financeiro</h2>
        {isDemoMode && (
          <Badge
            variant="outline"
            className="bg-yellow-900/20 text-yellow-400 border-yellow-800 flex items-center gap-1"
          >
            <Info className="h-3.5 w-3.5" />
            <span>Modo Demonstração</span>
          </Badge>
        )}
      </div>

      <FinanceSummary
        incomes={Array.isArray(financeData.incomes) ? financeData.incomes : []}
        expenses={Array.isArray(financeData.expenses) ? financeData.expenses : []}
        filters={filters}
      />

      <FinanceCharts
        incomes={Array.isArray(financeData.incomes) ? financeData.incomes : []}
        expenses={Array.isArray(financeData.expenses) ? financeData.expenses : []}
        filters={filters}
      />

      <Tabs defaultValue="entradas" className="space-y-4">
        <TabsList className="bg-[#0a1929] border-[#1e3a5f]">
          <TabsTrigger value="entradas" className="data-[state=active]:bg-[#0f2744]">
            Entradas
          </TabsTrigger>
          <TabsTrigger value="saidas" className="data-[state=active]:bg-[#0f2744]">
            Saídas
          </TabsTrigger>
          <TabsTrigger value="equipe" className="data-[state=active]:bg-[#0f2744]">
            Equipe
          </TabsTrigger>
        </TabsList>

        <TabsContent value="entradas" className="space-y-4">
          <FinanceIncomeTable
            filters={filters}
            updateFilters={updateFilters}
            data={Array.isArray(financeData.incomes) ? financeData.incomes : []}
            updateData={updateIncomeData}
          />
        </TabsContent>

        <TabsContent value="saidas" className="space-y-4">
          <FinanceExpenseTable
            filters={filters}
            updateFilters={updateFilters}
            data={Array.isArray(financeData.expenses) ? financeData.expenses : []}
            updateData={updateExpenseData}
          />
        </TabsContent>

        <TabsContent value="equipe" className="space-y-4">
          <FinanceEmployeeTable
            filters={filters}
            updateFilters={updateFilters}
            data={Array.isArray(financeData.employees) ? financeData.employees : []}
            updateData={updateEmployeeData}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
