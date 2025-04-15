import { v4 as uuidv4 } from "uuid"
import type {
  DemandTask,
  DepartmentGoal,
  EmployeePerformance,
  ClientMarketingAction,
  InternalMarketingAction,
  Role,
  CultureAction,
  ProductService,
} from "./types"

// Mock data para demandas da semana
let mockDemands: DemandTask[] = [
  {
    id: "1",
    title: "Desenvolver landing page",
    priority: "Alta",
    status: "Em andamento",
    assignee: "Bruno",
    dueDate: "2025-04-20",
  },
  {
    id: "2",
    title: "Configurar Google Analytics",
    priority: "Média",
    status: "Pendente",
    assignee: "Luiz",
    dueDate: "2025-04-22",
  },
  {
    id: "3",
    title: "Revisar conteúdo do blog",
    priority: "Baixa",
    status: "Concluída",
    assignee: "Ana",
    dueDate: "2025-04-18",
  },
]

// Mock data para metas por área
let mockDepartmentGoals: DepartmentGoal[] = [
  {
    id: "1",
    department: "Marketing",
    goal: "Aumentar tráfego orgânico em 30%",
    progress: 65,
    dueDate: "2025-06-30",
  },
  {
    id: "2",
    department: "Vendas",
    goal: "Fechar 10 novos contratos",
    progress: 40,
    dueDate: "2025-05-31",
  },
  {
    id: "3",
    department: "Desenvolvimento",
    goal: "Lançar nova versão do app",
    progress: 80,
    dueDate: "2025-04-25",
  },
]

// Mock data para desempenho dos funcionários
let mockEmployeePerformance: EmployeePerformance[] = [
  {
    id: "1",
    name: "Bruno Silva",
    position: "Desenvolvedor Full Stack",
    department: "Tecnologia",
    achievements: "Implementou nova arquitetura de microserviços",
    rating: 92,
  },
  {
    id: "2",
    name: "Luiz Oliveira",
    position: "Especialista em Tráfego",
    department: "Marketing",
    achievements: "Reduziu CPA em 25%",
    rating: 88,
  },
  {
    id: "3",
    name: "Ana Costa",
    position: "Designer UX/UI",
    department: "Design",
    achievements: "Redesenhou interface principal",
    rating: 95,
  },
]

// Mock data para marketing de clientes
let mockClientMarketing: ClientMarketingAction[] = [
  {
    id: "1",
    title: "Campanha Facebook Ads",
    client: "Alpha Móveis",
    status: "Ativo",
    budget: 5000,
    roi: 2.5,
  },
  {
    id: "2",
    title: "Email Marketing",
    client: "Spotform",
    status: "Planejamento",
    budget: 1200,
    roi: 0,
  },
  {
    id: "3",
    title: "SEO Local",
    client: "Clínica Saúde Total",
    status: "Concluído",
    budget: 3500,
    roi: 3.2,
  },
]

// Mock data para marketing interno
let mockInternalMarketing: InternalMarketingAction[] = [
  {
    id: "1",
    title: "Newsletter semanal",
    description: "Comunicação interna sobre atualizações da empresa",
    status: "Recorrente",
    responsible: "Ana",
    nextDate: "2025-04-22",
  },
  {
    id: "2",
    title: "Treinamento de marca",
    description: "Workshop sobre valores e identidade da empresa",
    status: "Planejado",
    responsible: "Carlos",
    nextDate: "2025-05-10",
  },
  {
    id: "3",
    title: "Pesquisa de satisfação",
    description: "Avaliação do clima organizacional",
    status: "Em andamento",
    responsible: "Juliana",
    nextDate: "2025-04-25",
  },
]

// Mock data para cargos e funções
let mockRoles: Role[] = [
  {
    id: "1",
    title: "Desenvolvedor Full Stack",
    department: "Tecnologia",
    responsibilities: "Desenvolvimento de aplicações web e mobile, manutenção de sistemas existentes",
    requiredSkills: "React, Node.js, TypeScript, MongoDB",
  },
  {
    id: "2",
    title: "Especialista em Tráfego",
    department: "Marketing",
    responsibilities: "Gestão de campanhas pagas, otimização de conversão, análise de métricas",
    requiredSkills: "Google Ads, Facebook Ads, Analytics, Excel avançado",
  },
  {
    id: "3",
    title: "Designer UX/UI",
    department: "Design",
    responsibilities: "Criação de interfaces, prototipagem, testes de usabilidade",
    requiredSkills: "Figma, Adobe XD, Princípios de UX, Design Systems",
  },
]

// Mock data para ações de cultura
let mockCultureActions: CultureAction[] = [
  {
    id: "1",
    title: "Happy Hour Virtual",
    description: "Momento de descontração e integração entre equipes",
    date: "Última sexta do mês",
    status: "Recorrente",
    responsible: "RH",
  },
  {
    id: "2",
    title: "Programa de Mentoria",
    description: "Desenvolvimento profissional através de mentoria interna",
    date: "2025-05-01",
    status: "Planejado",
    responsible: "Diretoria",
  },
  {
    id: "3",
    title: "Dia de Voluntariado",
    description: "Ação social em instituição local",
    date: "2025-06-15",
    status: "Planejado",
    responsible: "Comitê de Cultura",
  },
]

// Mock data para produtos e serviços
let mockProductsServices: ProductService[] = [
  {
    id: "1",
    name: "Website Institucional",
    type: "service",
    price: 5000,
    status: "active",
  },
  {
    id: "2",
    name: "E-commerce Completo",
    type: "service",
    price: 12000,
    status: "active",
  },
  {
    id: "3",
    name: "Gestão de Redes Sociais",
    type: "service",
    price: 1800,
    status: "active",
  },
  {
    id: "4",
    name: "Tema WordPress Premium",
    type: "product",
    price: 997,
    status: "active",
  },
  {
    id: "5",
    name: "Plugin SEO Avançado",
    type: "product",
    price: 497,
    status: "inactive",
  },
]

// Serviços para Demandas da Semana
export const demandServices = {
  async getAll() {
    return [...mockDemands]
  },

  async getById(id: string) {
    return mockDemands.find((demand) => demand.id === id) || null
  },

  async create(demand: Omit<DemandTask, "id">) {
    const newDemand = {
      id: uuidv4(),
      ...demand,
    }
    mockDemands.push(newDemand)
    return newDemand
  },

  async update(id: string, demand: Partial<DemandTask>) {
    const index = mockDemands.findIndex((item) => item.id === id)
    if (index !== -1) {
      mockDemands[index] = { ...mockDemands[index], ...demand }
      return mockDemands[index]
    }
    throw new Error("Demanda não encontrada")
  },

  async delete(id: string) {
    mockDemands = mockDemands.filter((demand) => demand.id !== id)
    return true
  },
}

// Serviços para Metas por Área
export const departmentGoalServices = {
  async getAll() {
    return [...mockDepartmentGoals]
  },

  async getById(id: string) {
    return mockDepartmentGoals.find((goal) => goal.id === id) || null
  },

  async create(goal: Omit<DepartmentGoal, "id">) {
    const newGoal = {
      id: uuidv4(),
      ...goal,
    }
    mockDepartmentGoals.push(newGoal)
    return newGoal
  },

  async update(id: string, goal: Partial<DepartmentGoal>) {
    const index = mockDepartmentGoals.findIndex((item) => item.id === id)
    if (index !== -1) {
      mockDepartmentGoals[index] = { ...mockDepartmentGoals[index], ...goal }
      return mockDepartmentGoals[index]
    }
    throw new Error("Meta não encontrada")
  },

  async delete(id: string) {
    mockDepartmentGoals = mockDepartmentGoals.filter((goal) => goal.id !== id)
    return true
  },
}

// Serviços para Desempenho dos Funcionários
export const employeePerformanceServices = {
  async getAll() {
    return [...mockEmployeePerformance]
  },

  async getById(id: string) {
    return mockEmployeePerformance.find((employee) => employee.id === id) || null
  },

  async create(employee: Omit<EmployeePerformance, "id">) {
    const newEmployee = {
      id: uuidv4(),
      ...employee,
    }
    mockEmployeePerformance.push(newEmployee)
    return newEmployee
  },

  async update(id: string, employee: Partial<EmployeePerformance>) {
    const index = mockEmployeePerformance.findIndex((item) => item.id === id)
    if (index !== -1) {
      mockEmployeePerformance[index] = { ...mockEmployeePerformance[index], ...employee }
      return mockEmployeePerformance[index]
    }
    throw new Error("Funcionário não encontrado")
  },

  async delete(id: string) {
    mockEmployeePerformance = mockEmployeePerformance.filter((employee) => employee.id !== id)
    return true
  },
}

// Serviços para Marketing de Clientes
export const clientMarketingServices = {
  async getAll() {
    return [...mockClientMarketing]
  },

  async getById(id: string) {
    return mockClientMarketing.find((action) => action.id === id) || null
  },

  async create(action: Omit<ClientMarketingAction, "id">) {
    const newAction = {
      id: uuidv4(),
      ...action,
    }
    mockClientMarketing.push(newAction)
    return newAction
  },

  async update(id: string, action: Partial<ClientMarketingAction>) {
    const index = mockClientMarketing.findIndex((item) => item.id === id)
    if (index !== -1) {
      mockClientMarketing[index] = { ...mockClientMarketing[index], ...action }
      return mockClientMarketing[index]
    }
    throw new Error("Ação não encontrada")
  },

  async delete(id: string) {
    mockClientMarketing = mockClientMarketing.filter((action) => action.id !== id)
    return true
  },
}

// Serviços para Marketing Interno
export const internalMarketingServices = {
  async getAll() {
    return [...mockInternalMarketing]
  },

  async getById(id: string) {
    return mockInternalMarketing.find((action) => action.id === id) || null
  },

  async create(action: Omit<InternalMarketingAction, "id">) {
    const newAction = {
      id: uuidv4(),
      ...action,
    }
    mockInternalMarketing.push(newAction)
    return newAction
  },

  async update(id: string, action: Partial<InternalMarketingAction>) {
    const index = mockInternalMarketing.findIndex((item) => item.id === id)
    if (index !== -1) {
      mockInternalMarketing[index] = { ...mockInternalMarketing[index], ...action }
      return mockInternalMarketing[index]
    }
    throw new Error("Ação não encontrada")
  },

  async delete(id: string) {
    mockInternalMarketing = mockInternalMarketing.filter((action) => action.id !== id)
    return true
  },
}

// Serviços para Cargos e Funções
export const roleServices = {
  async getAll() {
    return [...mockRoles]
  },

  async getById(id: string) {
    return mockRoles.find((role) => role.id === id) || null
  },

  async create(role: Omit<Role, "id">) {
    const newRole = {
      id: uuidv4(),
      ...role,
    }
    mockRoles.push(newRole)
    return newRole
  },

  async update(id: string, role: Partial<Role>) {
    const index = mockRoles.findIndex((item) => item.id === id)
    if (index !== -1) {
      mockRoles[index] = { ...mockRoles[index], ...role }
      return mockRoles[index]
    }
    throw new Error("Cargo não encontrado")
  },

  async delete(id: string) {
    mockRoles = mockRoles.filter((role) => role.id !== id)
    return true
  },
}

// Serviços para Ações de Cultura
export const cultureActionServices = {
  async getAll() {
    return [...mockCultureActions]
  },

  async getById(id: string) {
    return mockCultureActions.find((action) => action.id === id) || null
  },

  async create(action: Omit<CultureAction, "id">) {
    const newAction = {
      id: uuidv4(),
      ...action,
    }
    mockCultureActions.push(newAction)
    return newAction
  },

  async update(id: string, action: Partial<CultureAction>) {
    const index = mockCultureActions.findIndex((item) => item.id === id)
    if (index !== -1) {
      mockCultureActions[index] = { ...mockCultureActions[index], ...action }
      return mockCultureActions[index]
    }
    throw new Error("Ação não encontrada")
  },

  async delete(id: string) {
    mockCultureActions = mockCultureActions.filter((action) => action.id !== id)
    return true
  },
}

// Serviços para Produtos e Serviços
export const productsServicesServices = {
  async getAll() {
    return [...mockProductsServices]
  },

  async getById(id: string) {
    return mockProductsServices.find((item) => item.id === id) || null
  },

  async create(item: Omit<ProductService, "id">) {
    const newItem = {
      id: uuidv4(),
      ...item,
    }
    mockProductsServices.push(newItem)
    return newItem
  },

  async update(id: string, item: Partial<ProductService>) {
    const index = mockProductsServices.findIndex((product) => product.id === id)
    if (index !== -1) {
      mockProductsServices[index] = { ...mockProductsServices[index], ...item }
      return mockProductsServices[index]
    }
    throw new Error("Produto/serviço não encontrado")
  },

  async delete(id: string) {
    mockProductsServices = mockProductsServices.filter((item) => item.id !== id)
    return true
  },
}

// Funções auxiliares para exportação
export async function fetchDemands() {
  return demandServices.getAll()
}

export async function addDemand(demand: Omit<DemandTask, "id">) {
  return demandServices.create(demand)
}

export async function updateDemand(id: string, demand: Partial<DemandTask>) {
  return demandServices.update(id, demand)
}

export async function deleteDemand(id: string) {
  return demandServices.delete(id)
}

export async function fetchDepartmentGoals() {
  return departmentGoalServices.getAll()
}

export async function addDepartmentGoal(goal: Omit<DepartmentGoal, "id">) {
  return departmentGoalServices.create(goal)
}

export async function updateDepartmentGoal(id: string, goal: Partial<DepartmentGoal>) {
  return departmentGoalServices.update(id, goal)
}

export async function deleteDepartmentGoal(id: string) {
  return departmentGoalServices.delete(id)
}

export async function fetchEmployeePerformance() {
  return employeePerformanceServices.getAll()
}

export async function addEmployeePerformance(employee: Omit<EmployeePerformance, "id">) {
  return employeePerformanceServices.create(employee)
}

export async function updateEmployeePerformance(id: string, employee: Partial<EmployeePerformance>) {
  return employeePerformanceServices.update(id, employee)
}

export async function deleteEmployeePerformance(id: string) {
  return employeePerformanceServices.delete(id)
}

export async function fetchClientMarketing() {
  return clientMarketingServices.getAll()
}

export async function addClientMarketing(action: Omit<ClientMarketingAction, "id">) {
  return clientMarketingServices.create(action)
}

export async function updateClientMarketing(id: string, action: Partial<ClientMarketingAction>) {
  return clientMarketingServices.update(id, action)
}

export async function deleteClientMarketing(id: string) {
  return clientMarketingServices.delete(id)
}

export async function fetchInternalMarketing() {
  return internalMarketingServices.getAll()
}

export async function addInternalMarketing(action: Omit<InternalMarketingAction, "id">) {
  return internalMarketingServices.create(action)
}

export async function updateInternalMarketing(id: string, action: Partial<InternalMarketingAction>) {
  return internalMarketingServices.update(id, action)
}

export async function deleteInternalMarketing(id: string) {
  return internalMarketingServices.delete(id)
}

export async function fetchRoles() {
  return roleServices.getAll()
}

export async function addRole(role: Omit<Role, "id">) {
  return roleServices.create(role)
}

export async function updateRole(id: string, role: Partial<Role>) {
  return roleServices.update(id, role)
}

export async function deleteRole(id: string) {
  return roleServices.delete(id)
}

export async function fetchCultureActions() {
  return cultureActionServices.getAll()
}

export async function addCultureAction(action: Omit<CultureAction, "id">) {
  return cultureActionServices.create(action)
}

export async function updateCultureAction(id: string, action: Partial<CultureAction>) {
  return cultureActionServices.update(id, action)
}

export async function deleteCultureAction(id: string) {
  return cultureActionServices.delete(id)
}

export async function fetchProductsServices() {
  return productsServicesServices.getAll()
}

export async function addProductService(item: Omit<ProductService, "id">) {
  return productsServicesServices.create(item)
}

export async function updateProductService(id: string, item: Partial<ProductService>) {
  return productsServicesServices.update(id, item)
}

export async function deleteProductService(id: string) {
  return productsServicesServices.delete(id)
}
