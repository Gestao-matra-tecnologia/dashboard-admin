import { v4 as uuidv4 } from "uuid"

// Definindo a interface para os dados do funil
export interface FunnelData {
  id: string
  date: string
  leads: number
  inProgress: number
  closed: number
  leadsRevenue: number
  inProgressRevenue: number
  closedRevenue: number
  conversionRate: number
  avgTicket: number
}

// Dados mockados para o funil de vendas
let mockFunnelData: FunnelData[] = [
  {
    id: "1",
    date: "2025-04-01",
    leads: 120,
    inProgress: 45,
    closed: 18,
    leadsRevenue: 240000,
    inProgressRevenue: 90000,
    closedRevenue: 36000,
    conversionRate: 15,
    avgTicket: 2000,
  },
  {
    id: "2",
    date: "2025-03-01",
    leads: 105,
    inProgress: 38,
    closed: 15,
    leadsRevenue: 210000,
    inProgressRevenue: 76000,
    closedRevenue: 30000,
    conversionRate: 14.3,
    avgTicket: 2000,
  },
  {
    id: "3",
    date: "2025-02-01",
    leads: 95,
    inProgress: 32,
    closed: 12,
    leadsRevenue: 190000,
    inProgressRevenue: 64000,
    closedRevenue: 24000,
    conversionRate: 12.6,
    avgTicket: 2000,
  },
]

// Serviços para o funil de vendas
export const funnelServices = {
  async getAll() {
    return [...mockFunnelData]
  },

  async getLatest() {
    return mockFunnelData[0]
  },

  async getByDate(date: string) {
    return mockFunnelData.find((data) => data.date === date) || null
  },

  async getByMonthYear(month: number, year: number) {
    const dateString = `${year}-${month.toString().padStart(2, "0")}-01`
    return this.getByDate(dateString)
  },

  async create(data: Omit<FunnelData, "id">) {
    const newData = {
      id: uuidv4(),
      ...data,
    }
    mockFunnelData.unshift(newData) // Adiciona no início do array
    return newData
  },

  async update(id: string, data: Partial<FunnelData>) {
    const index = mockFunnelData.findIndex((item) => item.id === id)
    if (index !== -1) {
      mockFunnelData[index] = { ...mockFunnelData[index], ...data }
      return mockFunnelData[index]
    }
    throw new Error("Dados do funil não encontrados")
  },

  async delete(id: string) {
    mockFunnelData = mockFunnelData.filter((data) => data.id !== id)
    return true
  },

  // Método para adicionar novos leads
  async addLeads(count: number, avgValue: number) {
    const latest = await this.getLatest()
    if (!latest) {
      throw new Error("Não há dados do funil disponíveis")
    }

    const newLeads = latest.leads + count
    const newLeadsRevenue = latest.leadsRevenue + count * avgValue

    return this.update(latest.id, {
      leads: newLeads,
      leadsRevenue: newLeadsRevenue,
    })
  },

  // Método para mover leads para "Em Atendimento"
  async moveToInProgress(count: number) {
    const latest = await this.getLatest()
    if (!latest) {
      throw new Error("Não há dados do funil disponíveis")
    }

    if (count > latest.leads) {
      throw new Error("Não há leads suficientes para mover")
    }

    const avgLeadValue = latest.leadsRevenue / latest.leads
    const valueToMove = count * avgLeadValue

    return this.update(latest.id, {
      leads: latest.leads - count,
      leadsRevenue: latest.leadsRevenue - valueToMove,
      inProgress: latest.inProgress + count,
      inProgressRevenue: latest.inProgressRevenue + valueToMove,
    })
  },

  // Método para mover "Em Atendimento" para "Fechados"
  async moveToClose(count: number) {
    const latest = await this.getLatest()
    if (!latest) {
      throw new Error("Não há dados do funil disponíveis")
    }

    if (count > latest.inProgress) {
      throw new Error("Não há leads em atendimento suficientes para mover")
    }

    const avgInProgressValue = latest.inProgressRevenue / latest.inProgress
    const valueToMove = count * avgInProgressValue

    const newClosed = latest.closed + count
    const newClosedRevenue = latest.closedRevenue + valueToMove
    const newConversionRate = (newClosed / latest.leads) * 100

    return this.update(latest.id, {
      inProgress: latest.inProgress - count,
      inProgressRevenue: latest.inProgressRevenue - valueToMove,
      closed: newClosed,
      closedRevenue: newClosedRevenue,
      conversionRate: newConversionRate,
    })
  },

  // Método para gerar dados aleatórios para simulação
  async generateRandomData() {
    const leads = Math.floor(Math.random() * 50) + 80 // 80-130 leads
    const inProgressRate = Math.random() * 0.2 + 0.3 // 30-50% dos leads
    const closedRate = Math.random() * 0.2 + 0.1 // 10-30% dos leads em atendimento

    const inProgress = Math.floor(leads * inProgressRate)
    const closed = Math.floor(inProgress * closedRate)

    const avgTicket = Math.floor(Math.random() * 1000) + 1500 // R$ 1500-2500

    const leadsRevenue = leads * avgTicket
    const inProgressRevenue = inProgress * avgTicket
    const closedRevenue = closed * avgTicket

    const conversionRate = (closed / leads) * 100

    const now = new Date()
    const date = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-01`

    return this.create({
      date,
      leads,
      inProgress,
      closed,
      leadsRevenue,
      inProgressRevenue,
      closedRevenue,
      conversionRate,
      avgTicket,
    })
  },
}

// Funções auxiliares para exportação
export async function getFunnelData() {
  return funnelServices.getLatest()
}

export async function updateFunnelData(id: string, data: Partial<FunnelData>) {
  return funnelServices.update(id, data)
}

export async function addNewLeads(count: number, avgValue: number) {
  return funnelServices.addLeads(count, avgValue)
}

export async function moveLeadsToInProgress(count: number) {
  return funnelServices.moveToInProgress(count)
}

export async function moveInProgressToClosed(count: number) {
  return funnelServices.moveToClose(count)
}

export async function generateRandomFunnelData() {
  return funnelServices.generateRandomData()
}
