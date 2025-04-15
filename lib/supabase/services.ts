import type { Income, Expense, Employee, MonthlySummary } from "./types"
import { v4 as uuidv4 } from "uuid"

// Dados mockados para quando o Supabase não estiver disponível
let mockIncomes: Income[] = [
  {
    id: "1",
    cliente: "Spotform",
    valor: 5000,
    data: "2025-04-05",
    categoria: "Tecnologia",
    observacoes: "Mensalidade SaaS",
    recorrente: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    cliente: "Alpha Móveis",
    valor: 12000,
    data: "2025-04-10",
    categoria: "Agência",
    observacoes: "Projeto de website",
    recorrente: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

let mockExpenses: Expense[] = [
  {
    id: "1",
    conta: "Aluguel Escritório",
    descricao: "Aluguel mensal",
    valor: 4500,
    data: "2025-04-05",
    tipo: "Fixa",
    observacoes: "Contrato anual",
    pago: true,
    recorrente: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    conta: "Salários",
    descricao: "Folha de pagamento",
    valor: 25000,
    data: "2025-04-01",
    tipo: "Fixa",
    observacoes: "Equipe completa",
    pago: true,
    recorrente: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

let mockEmployees: Employee[] = [
  {
    id: "1",
    nome: "Luiz",
    cargo: "Tráfego Pago",
    tipocontrato: "PJ",
    valormensal: 3500,
    datapagamento: "2025-04-10",
    status: "Pago",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    nome: "Bruno",
    cargo: "Desenvolvedor",
    tipocontrato: "CLT",
    valormensal: 5000,
    datapagamento: "2025-04-05",
    status: "Pago",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

const mockSummaries: MonthlySummary[] = [
  {
    id: "1",
    mes: 3, // Abril (0-indexed)
    ano: 2025,
    totalentradas: 27500,
    totalsaidas: 53500,
    lucroprejuizo: -26000,
    metafaturamento: 100000,
    metacaixadisponivel: 20000,
    observacoes: "Mês com investimentos em equipamentos e marketing",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// Serviços para Entradas Financeiras
export const incomeServices = {
  async getAll(isServer = false) {
    // Sempre usar dados mockados
    console.log("Usando dados mockados para incomes.getAll")
    return [...mockIncomes]
  },

  async getByMonthYear(month: number, year: number, isServer = false) {
    // Sempre usar dados mockados
    console.log("Usando dados mockados para incomes.getByMonthYear")
    // Filtrar dados mockados por mês e ano
    return mockIncomes.filter((income) => {
      const date = new Date(income.data)
      return date.getMonth() === month && date.getFullYear() === year
    })
  },

  async create(income: Omit<Income, "id" | "created_at" | "updated_at">, isServer = false) {
    // Sempre usar dados mockados
    console.log("Usando dados mockados para incomes.create")
    const newIncome = {
      id: uuidv4(),
      ...income,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Income
    mockIncomes.push(newIncome)
    return newIncome
  },

  async update(id: string, income: Partial<Income>, isServer = false) {
    // Sempre usar dados mockados
    console.log("Usando dados mockados para incomes.update")
    const index = mockIncomes.findIndex((item) => item.id === id)
    if (index !== -1) {
      mockIncomes[index] = {
        ...mockIncomes[index],
        ...income,
        updated_at: new Date().toISOString(),
      }
      return mockIncomes[index]
    }
    throw new Error("Entrada não encontrada")
  },

  async delete(id: string, isServer = false) {
    // Sempre usar dados mockados
    console.log("Usando dados mockados para incomes.delete")
    mockIncomes = mockIncomes.filter((item) => item.id !== id)
    return true
  },
}

// Serviços para Saídas Financeiras
export const expenseServices = {
  async getAll(isServer = false) {
    // Sempre usar dados mockados
    console.log("Usando dados mockados para expenses.getAll")
    return [...mockExpenses]
  },

  async getByMonthYear(month: number, year: number, isServer = false) {
    // Sempre usar dados mockados
    console.log("Usando dados mockados para expenses.getByMonthYear")
    return mockExpenses.filter((expense) => {
      const date = new Date(expense.data)
      return date.getMonth() === month && date.getFullYear() === year
    })
  },

  async create(expense: Omit<Expense, "id" | "created_at" | "updated_at">, isServer = false) {
    // Sempre usar dados mockados
    console.log("Usando dados mockados para expenses.create")
    const newExpense = {
      id: uuidv4(),
      ...expense,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Expense
    mockExpenses.push(newExpense)
    return newExpense
  },

  async update(id: string, expense: Partial<Expense>, isServer = false) {
    // Sempre usar dados mockados
    console.log("Usando dados mockados para expenses.update")
    const index = mockExpenses.findIndex((item) => item.id === id)
    if (index !== -1) {
      mockExpenses[index] = {
        ...mockExpenses[index],
        ...expense,
        updated_at: new Date().toISOString(),
      }
      return mockExpenses[index]
    }
    throw new Error("Saída não encontrada")
  },

  async delete(id: string, isServer = false) {
    // Sempre usar dados mockados
    console.log("Usando dados mockados para expenses.delete")
    mockExpenses = mockExpenses.filter((item) => item.id !== id)
    return true
  },
}

// Serviços para Colaboradores
export const employeeServices = {
  async getAll(isServer = false) {
    // Sempre usar dados mockados
    console.log("Usando dados mockados para employees.getAll")
    return [...mockEmployees]
  },

  async getByMonthYear(month: number, year: number, isServer = false) {
    // Sempre usar dados mockados
    console.log("Usando dados mockados para employees.getByMonthYear")
    return mockEmployees.filter((employee) => {
      const date = new Date(employee.datapagamento)
      return date.getMonth() === month && date.getFullYear() === year
    })
  },

  async create(employee: Omit<Employee, "id" | "created_at" | "updated_at">, isServer = false) {
    // Sempre usar dados mockados
    console.log("Usando dados mockados para employees.create")
    const newEmployee = {
      id: uuidv4(),
      ...employee,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Employee
    mockEmployees.push(newEmployee)
    return newEmployee
  },

  async update(id: string, employee: Partial<Employee>, isServer = false) {
    // Sempre usar dados mockados
    console.log("Usando dados mockados para employees.update")
    const index = mockEmployees.findIndex((item) => item.id === id)
    if (index !== -1) {
      mockEmployees[index] = {
        ...mockEmployees[index],
        ...employee,
        updated_at: new Date().toISOString(),
      }
      return mockEmployees[index]
    }
    throw new Error("Colaborador não encontrado")
  },

  async delete(id: string, isServer = false) {
    // Sempre usar dados mockados
    console.log("Usando dados mockados para employees.delete")
    mockEmployees = mockEmployees.filter((item) => item.id !== id)
    return true
  },
}

// Serviços para Resumos Mensais
export const monthlySummaryServices = {
  async getAll(isServer = false) {
    // Sempre usar dados mockados
    console.log("Usando dados mockados para monthlySummaries.getAll")
    return [...mockSummaries]
  },

  async getByMonthYear(month: number, year: number, isServer = false) {
    // Sempre usar dados mockados
    console.log("Usando dados mockados para monthlySummaries.getByMonthYear")
    const summary = mockSummaries.find((s) => s.mes === month && s.ano === year)
    return summary || null
  },

  async create(summary: Omit<MonthlySummary, "id" | "created_at" | "updated_at">, isServer = false) {
    // Sempre usar dados mockados
    console.log("Usando dados mockados para monthlySummaries.create")
    const newSummary = {
      id: uuidv4(),
      ...summary,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as MonthlySummary
    mockSummaries.push(newSummary)
    return newSummary
  },

  async update(id: string, summary: Partial<MonthlySummary>, isServer = false) {
    // Sempre usar dados mockados
    console.log("Usando dados mockados para monthlySummaries.update")
    const index = mockSummaries.findIndex((item) => item.id === id)
    if (index !== -1) {
      mockSummaries[index] = {
        ...mockSummaries[index],
        ...summary,
        updated_at: new Date().toISOString(),
      }
      return mockSummaries[index]
    }
    throw new Error("Resumo mensal não encontrado")
  },

  async upsert(summary: Omit<MonthlySummary, "id" | "created_at" | "updated_at">, isServer = false) {
    // Verificar se já existe um resumo para este mês/ano
    const existing = await this.getByMonthYear(summary.mes, summary.ano, isServer)

    if (existing) {
      return this.update(existing.id, summary, isServer)
    } else {
      return this.create(summary, isServer)
    }
  },
}

// Função para calcular o resumo mensal automaticamente
export async function calculateMonthlySummary(month: number, year: number, isServer = false) {
  try {
    // Buscar entradas e saídas do mês
    const incomes = await incomeServices.getByMonthYear(month, year, isServer)
    const expenses = await expenseServices.getByMonthYear(month, year, isServer)

    // Calcular totais
    const totalEntradas = incomes.reduce((sum, income) => sum + Number(income.valor || 0), 0)
    const totalSaidas = expenses.reduce((sum, expense) => sum + Number(expense.valor || 0), 0)
    const lucroPrejuizo = totalEntradas - totalSaidas

    // Buscar resumo existente ou criar um novo
    const existingSummary = await monthlySummaryServices.getByMonthYear(month, year, isServer)

    const summaryData = {
      mes: month,
      ano: year,
      totalentradas: totalEntradas,
      totalsaidas: totalSaidas,
      lucroprejuizo: lucroPrejuizo,
      metafaturamento: existingSummary?.metafaturamento || 100000,
      metacaixadisponivel: existingSummary?.metacaixadisponivel || 20000,
      observacoes: existingSummary?.observacoes || "",
    }

    // Atualizar ou criar o resumo
    return monthlySummaryServices.upsert(summaryData, isServer)
  } catch (error) {
    console.error("Erro ao calcular resumo mensal:", error)

    // Criar um resumo mockado em caso de erro
    const mockSummary = {
      id: uuidv4(),
      mes: month,
      ano: year,
      totalentradas: 0,
      totalsaidas: 0,
      lucroprejuizo: 0,
      metafaturamento: 100000,
      metacaixadisponivel: 20000,
      observacoes: "Resumo gerado em modo offline",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as MonthlySummary

    // Adicionar aos dados mockados
    const existingIndex = mockSummaries.findIndex((s) => s.mes === month && s.ano === year)
    if (existingIndex >= 0) {
      mockSummaries[existingIndex] = mockSummary
    } else {
      mockSummaries.push(mockSummary)
    }

    return mockSummary
  }
}

export async function getFinanceData(isServer = false) {
  try {
    const incomes = await incomeServices.getAll(isServer)
    const expenses = await expenseServices.getAll(isServer)
    const employees = await employeeServices.getAll(isServer)

    return {
      incomes,
      expenses,
      employees,
    }
  } catch (error) {
    console.error("Erro ao obter dados financeiros:", error)
    return {
      incomes: [],
      expenses: [],
      employees: [],
    }
  }
}
