import { generateId, simulateApiDelay } from "./mock-services-utils"
import type {
  DemandItem,
  DepartmentGoal,
  MarketingAction,
  ClientMarketingAction,
  Role,
  EmployeePerformance,
  CultureAction,
} from "./types"

// Mock data for Demand Table
export const mockDemands: DemandItem[] = [
  {
    id: "1",
    title: "Implementar nova landing page",
    priority: "Alta",
    status: "Em andamento",
    assignedTo: "João Silva",
    dueDate: "2023-06-15",
  },
  {
    id: "2",
    title: "Corrigir bug no formulário de contato",
    priority: "Alta",
    status: "Pendente",
    assignedTo: "Maria Oliveira",
    dueDate: "2023-06-10",
  },
  {
    id: "3",
    title: "Atualizar conteúdo da página Sobre",
    priority: "Média",
    status: "Concluído",
    assignedTo: "Pedro Santos",
    dueDate: "2023-06-05",
  },
  {
    id: "4",
    title: "Otimizar SEO do site principal",
    priority: "Alta",
    status: "Em andamento",
    assignedTo: "Ana Costa",
    dueDate: "2023-06-20",
  },
  {
    id: "5",
    title: "Criar campanha de email marketing",
    priority: "Média",
    status: "Pendente",
    assignedTo: "Carlos Ferreira",
    dueDate: "2023-06-25",
  },
]

// Mock data for Department Goals
export const mockDepartmentGoals: DepartmentGoal[] = [
  { id: "1", department: "Marketing", goal: "Aumentar tráfego orgânico em 20%", progress: 65, dueDate: "2023-06-30" },
  { id: "2", department: "Vendas", goal: "Fechar 15 novos contratos", progress: 40, dueDate: "2023-06-30" },
  { id: "3", department: "Desenvolvimento", goal: "Lançar 2 novos recursos", progress: 80, dueDate: "2023-06-15" },
  { id: "4", department: "Suporte", goal: "Reduzir tempo de resposta para 2h", progress: 90, dueDate: "2023-06-10" },
  { id: "5", department: "RH", goal: "Contratar 3 novos desenvolvedores", progress: 33, dueDate: "2023-07-15" },
]

// Mock data for Internal Marketing
export const mockInternalMarketing: MarketingAction[] = [
  {
    id: "1",
    title: "Campanha de Email Interna",
    status: "Em andamento",
    responsible: "Maria Oliveira",
    dueDate: "2023-06-20",
    progress: 75,
  },
  {
    id: "2",
    title: "Newsletter Semanal",
    status: "Recorrente",
    responsible: "João Silva",
    dueDate: "Toda sexta",
    progress: 100,
  },
  {
    id: "3",
    title: "Treinamento de Produto",
    status: "Pendente",
    responsible: "Carlos Ferreira",
    dueDate: "2023-06-25",
    progress: 0,
  },
  {
    id: "4",
    title: "Documentação de Processos",
    status: "Em andamento",
    responsible: "Ana Costa",
    dueDate: "2023-07-05",
    progress: 50,
  },
]

// Mock data for Client Marketing
export const mockClientMarketing: ClientMarketingAction[] = [
  { id: "1", title: "Campanha Google Ads", client: "Tech Solutions", status: "Ativo", budget: 5000, roi: 2.5 },
  { id: "2", title: "Redesign de Site", client: "Eco Friendly", status: "Em andamento", budget: 8000, roi: 0 },
  { id: "3", title: "SEO Mensal", client: "Global Services", status: "Ativo", budget: 2000, roi: 3.2 },
  { id: "4", title: "Campanha de Mídia Social", client: "Local Store", status: "Planejamento", budget: 1500, roi: 0 },
  { id: "5", title: "Email Marketing", client: "Health Care", status: "Ativo", budget: 1000, roi: 4.0 },
]

// Mock data for Roles Table
export const mockRoles: Role[] = [
  {
    id: "1",
    title: "Desenvolvedor Frontend",
    department: "Desenvolvimento",
    responsibilities: "Implementação de interfaces, manutenção de código",
    requiredSkills: "React, TypeScript, HTML, CSS",
  },
  {
    id: "2",
    title: "Desenvolvedor Backend",
    department: "Desenvolvimento",
    responsibilities: "Desenvolvimento de APIs, banco de dados",
    requiredSkills: "Node.js, Python, SQL, MongoDB",
  },
  {
    id: "3",
    title: "Designer UX/UI",
    department: "Design",
    responsibilities: "Criação de wireframes, protótipos e design visual",
    requiredSkills: "Figma, Adobe XD, Princípios de UX",
  },
  {
    id: "4",
    title: "Gerente de Projetos",
    department: "Gestão",
    responsibilities: "Coordenação de equipes, planejamento, relatórios",
    requiredSkills: "Metodologias ágeis, MS Project, liderança",
  },
  {
    id: "5",
    title: "Especialista em Marketing",
    department: "Marketing",
    responsibilities: "Campanhas, análise de métricas, estratégias",
    requiredSkills: "Google Analytics, SEO, Copywriting",
  },
]

// Mock data for Employee Performance
export const mockEmployeePerformance: EmployeePerformance[] = [
  {
    id: "1",
    name: "Ana Costa",
    position: "Desenvolvedora Frontend",
    department: "Desenvolvimento",
    achievements: "Implementou novo sistema de design, reduziu bugs em 30%",
    rating: 95,
  },
  {
    id: "2",
    name: "Carlos Ferreira",
    position: "Gerente de Projetos",
    department: "Gestão",
    achievements: "Entregou 5 projetos no prazo, melhorou processos internos",
    rating: 90,
  },
  {
    id: "3",
    name: "Maria Oliveira",
    position: "Designer UX/UI",
    department: "Design",
    achievements: "Redesign completo da interface, aumentou conversões em 25%",
    rating: 88,
  },
  {
    id: "4",
    name: "João Silva",
    position: "Desenvolvedor Backend",
    department: "Desenvolvimento",
    achievements: "Otimizou APIs, implementou novo sistema de cache",
    rating: 85,
  },
  {
    id: "5",
    name: "Pedro Santos",
    position: "Especialista em Marketing",
    department: "Marketing",
    achievements: "Aumentou tráfego orgânico em 40%, melhorou CTR em 15%",
    rating: 82,
  },
]

// Mock data for Culture Actions
export const mockCultureActions: CultureAction[] = [
  {
    id: "1",
    title: "Happy Hour Mensal",
    description: "Encontro informal para integração da equipe",
    date: "Última sexta do mês",
    status: "Recorrente",
    responsible: "RH",
  },
  {
    id: "2",
    title: "Workshop de Inovação",
    description: "Sessão para discutir novas ideias e tendências",
    date: "2023-06-20",
    status: "Planejado",
    responsible: "Diretoria",
  },
  {
    id: "3",
    title: "Programa de Reconhecimento",
    description: "Premiação mensal para destaques da equipe",
    date: "Mensal",
    status: "Ativo",
    responsible: "Gestores",
  },
  {
    id: "4",
    title: "Pesquisa de Clima",
    description: "Avaliação do ambiente de trabalho e satisfação",
    date: "2023-07-10",
    status: "Planejado",
    responsible: "RH",
  },
  {
    id: "5",
    title: "Dia de Trabalho Remoto",
    description: "Um dia por semana para trabalho em casa",
    date: "Semanal",
    status: "Ativo",
    responsible: "Todos",
  },
]

// Mock service functions
export const fetchDemands = async (): Promise<DemandItem[]> => {
  // Simulate API delay
  await simulateApiDelay()
  return [...mockDemands]
}

export const addDemand = async (demand: Omit<DemandItem, "id">): Promise<DemandItem> => {
  // Simulate API delay
  await simulateApiDelay()
  const newDemand = {
    ...demand,
    id: generateId(),
  }
  mockDemands.push(newDemand)
  return newDemand
}

export const updateDemand = async (id: string, demand: Partial<DemandItem>): Promise<DemandItem> => {
  // Simulate API delay
  await simulateApiDelay()
  const index = mockDemands.findIndex((d) => d.id === id)
  if (index === -1) throw new Error("Demand not found")

  mockDemands[index] = { ...mockDemands[index], ...demand }
  return mockDemands[index]
}

export const deleteDemand = async (id: string): Promise<void> => {
  // Simulate API delay
  await simulateApiDelay()
  const index = mockDemands.findIndex((d) => d.id === id)
  if (index === -1) throw new Error("Demand not found")

  mockDemands.splice(index, 1)
}

// Department Goals services
export const fetchDepartmentGoals = async (): Promise<DepartmentGoal[]> => {
  await simulateApiDelay()
  return [...mockDepartmentGoals]
}

export const addDepartmentGoal = async (goal: Omit<DepartmentGoal, "id">): Promise<DepartmentGoal> => {
  await simulateApiDelay()
  const newGoal = {
    ...goal,
    id: generateId(),
  }
  mockDepartmentGoals.push(newGoal)
  return newGoal
}

export const updateDepartmentGoal = async (id: string, goal: Partial<DepartmentGoal>): Promise<DepartmentGoal> => {
  await simulateApiDelay()
  const index = mockDepartmentGoals.findIndex((g) => g.id === id)
  if (index === -1) throw new Error("Goal not found")

  mockDepartmentGoals[index] = { ...mockDepartmentGoals[index], ...goal }
  return mockDepartmentGoals[index]
}

export const deleteDepartmentGoal = async (id: string): Promise<void> => {
  await simulateApiDelay()
  const index = mockDepartmentGoals.findIndex((g) => g.id === id)
  if (index === -1) throw new Error("Goal not found")

  mockDepartmentGoals.splice(index, 1)
}

// Internal Marketing services
export const fetchInternalMarketing = async (): Promise<MarketingAction[]> => {
  await simulateApiDelay()
  return [...mockInternalMarketing]
}

export const addInternalMarketing = async (action: Omit<MarketingAction, "id">): Promise<MarketingAction> => {
  await simulateApiDelay()
  const newAction = {
    ...action,
    id: generateId(),
  }
  mockInternalMarketing.push(newAction)
  return newAction
}

export const updateInternalMarketing = async (
  id: string,
  action: Partial<MarketingAction>,
): Promise<MarketingAction> => {
  await simulateApiDelay()
  const index = mockInternalMarketing.findIndex((a) => a.id === id)
  if (index === -1) throw new Error("Action not found")

  mockInternalMarketing[index] = { ...mockInternalMarketing[index], ...action }
  return mockInternalMarketing[index]
}

export const deleteInternalMarketing = async (id: string): Promise<void> => {
  await simulateApiDelay()
  const index = mockInternalMarketing.findIndex((a) => a.id === id)
  if (index === -1) throw new Error("Action not found")

  mockInternalMarketing.splice(index, 1)
}

// Client Marketing services
export const fetchClientMarketing = async (): Promise<ClientMarketingAction[]> => {
  await simulateApiDelay()
  return [...mockClientMarketing]
}

export const addClientMarketing = async (action: Omit<ClientMarketingAction, "id">): Promise<ClientMarketingAction> => {
  await simulateApiDelay()
  const newAction = {
    ...action,
    id: generateId(),
  }
  mockClientMarketing.push(newAction)
  return newAction
}

export const updateClientMarketing = async (
  id: string,
  action: Partial<ClientMarketingAction>,
): Promise<ClientMarketingAction> => {
  await simulateApiDelay()
  const index = mockClientMarketing.findIndex((a) => a.id === id)
  if (index === -1) throw new Error("Action not found")

  mockClientMarketing[index] = { ...mockClientMarketing[index], ...action }
  return mockClientMarketing[index]
}

export const deleteClientMarketing = async (id: string): Promise<void> => {
  await simulateApiDelay()
  const index = mockClientMarketing.findIndex((a) => a.id === id)
  if (index === -1) throw new Error("Action not found")

  mockClientMarketing.splice(index, 1)
}

// Roles services
export const fetchRoles = async (): Promise<Role[]> => {
  await simulateApiDelay()
  return [...mockRoles]
}

export const addRole = async (role: Omit<Role, "id">): Promise<Role> => {
  await simulateApiDelay()
  const newRole = {
    ...role,
    id: generateId(),
  }
  mockRoles.push(newRole)
  return newRole
}

export const updateRole = async (id: string, role: Partial<Role>): Promise<Role> => {
  await simulateApiDelay()
  const index = mockRoles.findIndex((r) => r.id === id)
  if (index === -1) throw new Error("Role not found")

  mockRoles[index] = { ...mockRoles[index], ...role }
  return mockRoles[index]
}

export const deleteRole = async (id: string): Promise<void> => {
  await simulateApiDelay()
  const index = mockRoles.findIndex((r) => r.id === id)
  if (index === -1) throw new Error("Role not found")

  mockRoles.splice(index, 1)
}

// Employee Performance services
export const fetchEmployeePerformance = async (): Promise<EmployeePerformance[]> => {
  await simulateApiDelay()
  return [...mockEmployeePerformance]
}

export const addEmployeePerformance = async (
  employee: Omit<EmployeePerformance, "id">,
): Promise<EmployeePerformance> => {
  await simulateApiDelay()
  const newEmployee = {
    ...employee,
    id: generateId(),
  }
  mockEmployeePerformance.push(newEmployee)
  return newEmployee
}

export const updateEmployeePerformance = async (
  id: string,
  employee: Partial<EmployeePerformance>,
): Promise<EmployeePerformance> => {
  await simulateApiDelay()
  const index = mockEmployeePerformance.findIndex((e) => e.id === id)
  if (index === -1) throw new Error("Employee not found")

  mockEmployeePerformance[index] = { ...mockEmployeePerformance[index], ...employee }
  return mockEmployeePerformance[index]
}

export const deleteEmployeePerformance = async (id: string): Promise<void> => {
  await simulateApiDelay()
  const index = mockEmployeePerformance.findIndex((e) => e.id === id)
  if (index === -1) throw new Error("Employee not found")

  mockEmployeePerformance.splice(index, 1)
}

// Culture Actions services
export const fetchCultureActions = async (): Promise<CultureAction[]> => {
  await simulateApiDelay()
  return [...mockCultureActions]
}

export const addCultureAction = async (action: Omit<CultureAction, "id">): Promise<CultureAction> => {
  await simulateApiDelay()
  const newAction = {
    ...action,
    id: generateId(),
  }
  mockCultureActions.push(newAction)
  return newAction
}

export const updateCultureAction = async (id: string, action: Partial<CultureAction>): Promise<CultureAction> => {
  await simulateApiDelay()
  const index = mockCultureActions.findIndex((a) => a.id === id)
  if (index === -1) throw new Error("Action not found")

  mockCultureActions[index] = { ...mockCultureActions[index], ...action }
  return mockCultureActions[index]
}

export const deleteCultureAction = async (id: string): Promise<void> => {
  await simulateApiDelay()
  const index = mockCultureActions.findIndex((a) => a.id === id)
  if (index === -1) throw new Error("Action not found")

  mockCultureActions.splice(index, 1)
}

// Internal Marketing Campaigns (new)
export interface InternalMarketingCampaign {
  id: string
  campanha: string
  objetivo: string
  responsavel: string
  status: "Planejado" | "Em andamento" | "Finalizado"
  dataDisparo: string
  tipoConteudo: string
}

// Mock data for Internal Marketing Campaigns
let mockInternalMarketingCampaigns: InternalMarketingCampaign[] = [
  {
    id: "1",
    campanha: "Engajamento Interno",
    objetivo: "Aumentar a participação em eventos",
    responsavel: "Maria Oliveira",
    status: "Em andamento",
    dataDisparo: "2025-04-15",
    tipoConteudo: "Email",
  },
  {
    id: "2",
    campanha: "Comunicação Transparente",
    objetivo: "Melhorar o fluxo de informações",
    responsavel: "João Silva",
    status: "Planejado",
    dataDisparo: "2025-04-22",
    tipoConteudo: "Newsletter",
  },
]

// Service functions for Internal Marketing Campaigns
export const internalMarketingServices = {
  getAll: (): InternalMarketingCampaign[] => {
    return [...mockInternalMarketingCampaigns]
  },

  create: (campaign: Omit<InternalMarketingCampaign, "id">): InternalMarketingCampaign => {
    const newCampaign: InternalMarketingCampaign = {
      id: generateId(),
      ...campaign,
    }
    mockInternalMarketingCampaigns.push(newCampaign)
    return newCampaign
  },

  update: (id: string, campaign: Partial<InternalMarketingCampaign>): InternalMarketingCampaign | undefined => {
    const index = mockInternalMarketingCampaigns.findIndex((c) => c.id === id)
    if (index !== -1) {
      mockInternalMarketingCampaigns[index] = {
        ...mockInternalMarketingCampaigns[index],
        ...campaign,
      }
      return mockInternalMarketingCampaigns[index]
    }
    return undefined
  },

  delete: (id: string): void => {
    mockInternalMarketingCampaigns = mockInternalMarketingCampaigns.filter((c) => c.id !== id)
  },
}

export const clientMarketingServices = {
  getAll: async (): Promise<ClientMarketingAction[]> => {
    await simulateApiDelay()
    return [...mockClientMarketing]
  },
  create: async (action: Omit<ClientMarketingAction, "id">): Promise<ClientMarketingAction> => {
    await simulateApiDelay()
    const newAction = {
      ...action,
      id: generateId(),
    }
    mockClientMarketing.push(newAction)
    return newAction
  },
  update: async (id: string, action: Partial<ClientMarketingAction>): Promise<ClientMarketingAction | undefined> => {
    await simulateApiDelay()
    const index = mockClientMarketing.findIndex((a) => a.id === id)
    if (index !== -1) {
      mockClientMarketing[index] = { ...mockClientMarketing[index], ...action }
      return mockClientMarketing[index]
    }
    return undefined
  },
  delete: async (id: string): Promise<void> => {
    await simulateApiDelay()
    mockClientMarketing.splice(
      mockClientMarketing.findIndex((a) => a.id === id),
      1,
    )
  },
}
