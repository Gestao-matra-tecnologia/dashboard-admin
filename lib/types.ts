// Demand Table Types
export interface DemandItem {
  id: string
  title: string
  priority: "Alta" | "Média" | "Baixa"
  status: "Pendente" | "Em andamento" | "Concluído"
  assignedTo: string
  dueDate: string
}

// Department Goals Types
export interface DepartmentGoal {
  id: string
  department: string
  goal: string
  progress: number
  dueDate: string
}

// Internal Marketing Types
export interface MarketingAction {
  id: string
  title: string
  status: string
  responsible: string
  dueDate: string
  progress: number
}

// Client Marketing Types
export interface ClientMarketingAction {
  id: string
  title: string
  client: string
  status: string
  budget: number
  roi: number
}

// Roles Table Types
export interface Role {
  id: string
  title: string
  department: string
  responsibilities: string
  requiredSkills: string
}

// Employee Performance Types
export interface EmployeePerformance {
  id: string
  name: string
  position: string
  department: string
  achievements: string
  rating: number
}

// Culture Actions Types
export interface CultureAction {
  id: string
  title: string
  description: string
  date: string
  status: string
  responsible: string
}
