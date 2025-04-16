// Tipos para o dashboard

// Tipo para demandas da semana
export interface DemandTask {
  id: string
  title: string
  priority: "Alta" | "Média" | "Baixa"
  status: "Pendente" | "Em andamento" | "Concluída"
  assignee: string
  dueDate: string
}

// Tipo para metas por área
export interface DepartmentGoal {
  id: string
  department: string
  goal: string
  progress: number
  dueDate: string
}

// Tipo para desempenho dos funcionários
export interface EmployeePerformance {
  id: string
  name: string
  position: string
  department: string
  achievements: string
  rating: number
}

// Tipo para marketing de clientes
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

// Tipo para marketing interno
export interface InternalMarketingAction {
  id: string
  title: string
  description: string
  status: string
  responsible: string
  nextDate: string
}

// Tipo para cargos e funções
export interface Role {
  id: string
  title: string
  department: string
  responsibilities: string
  requiredSkills: string
}

// Tipo para ações de cultura
export interface CultureAction {
  id: string
  title: string
  description: string
  date: string
  status: string
  responsible: string
}

// Tipo para produtos e serviços
export interface ProductService {
  id: string
  name: string
  type: "product" | "service"
  price: number
  status: "active" | "inactive"
}

// Tipo para dados do funil de vendas
export interface FunnelData {
  leads: number
  inProgress: number
  closed: number
  totalValue: number
}

// Tipo para métricas de visão geral
export interface OverviewMetrics {
  totalRevenue: number
  totalExpenses: number
  profit: number
  clients: number
  projects: number
  tasks: number
}
