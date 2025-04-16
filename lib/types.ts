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

export interface DemandTask {
  id: string
  title: string
  priority: "Alta" | "Média" | "Baixa"
  status: "Pendente" | "Em andamento" | "Concluída"
  assignee: string
  dueDate: string
}

export interface DepartmentGoal {
  id: string
  department: string
  goal: string
  progress: number
  dueDate: string
}

export interface EmployeePerformance {
  id: string
  name: string
  position: string
  department: string
  achievements: string
  rating: number
  score?: number
  previousRank?: number
  avatar?: string
  role?: string
  highlights?: string[]
}

export interface ClientMarketingAction {
  id: string
  title: string
  client: string
  status: string
  budget: number
  roi: number
  action?: string
  date?: string
  responsible?: string
}

export interface InternalMarketingAction {
  id: string
  title: string
  description: string
  status: string
  responsible: string
  nextDate: string
}

export interface Role {
  id: string
  title: string
  department: string
  responsibilities: string
  requiredSkills: string
}

export interface CultureAction {
  id: string
  title: string
  description: string
  date: string
  status: string
  responsible: string
}

export interface ProductService {
  id: string
  name: string
  type: "product" | "service"
  price: number
  status: "active" | "inactive"
}

export interface FunnelData {
  leads: number
  inProgress: number
  closed: number
  totalValue: number
}

export interface OverviewMetrics {
  totalRevenue: number
  totalExpenses: number
  profit: number
  clients: number
  projects: number
  tasks: number
}

export interface DemandItem {
  id: string
  title: string
  priority: "Alta" | "Média" | "Baixa"
  status: "Pendente" | "Em andamento" | "Concluído"
  assignedTo: string
  dueDate: string
}
