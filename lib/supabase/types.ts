// Tipos para as tabelas do Supabase

export interface Income {
  id: string
  cliente: string
  valor: number
  data: string
  categoria: string
  observacoes: string | null
  recorrente: boolean
  created_at: string
  updated_at: string
}

export interface Expense {
  id: string
  conta: string
  descricao: string
  valor: number
  data: string
  tipo: string
  observacoes: string | null
  pago: boolean
  recorrente: boolean
  created_at: string
  updated_at: string
}

export interface Employee {
  id: string
  nome: string
  cargo: string
  tipocontrato: string // Alterado para minúsculas para corresponder ao banco de dados
  valormensal: number // Alterado para minúsculas para corresponder ao banco de dados
  datapagamento: string // Alterado para minúsculas para corresponder ao banco de dados
  status: string
  created_at: string
  updated_at: string
}

export interface MonthlySummary {
  id: string
  mes: number
  ano: number
  totalentradas: number // Alterado para minúsculas para corresponder ao banco de dados
  totalsaidas: number // Alterado para minúsculas para corresponder ao banco de dados
  lucroprejuizo: number // Alterado para minúsculas para corresponder ao banco de dados
  metafaturamento: number // Alterado para minúsculas para corresponder ao banco de dados
  metacaixadisponivel: number // Alterado para minúsculas para corresponder ao banco de dados
  observacoes: string | null
  created_at: string
  updated_at: string
}

export interface FinanceData {
  incomes: Income[]
  expenses: Expense[]
  employees: Employee[]
  monthlySummaries: MonthlySummary[]
}
