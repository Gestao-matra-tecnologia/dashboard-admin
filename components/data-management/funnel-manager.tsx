"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SalesFunnel } from "@/components/ui/sales-funnel"
import {
  funnelServices,
  type FunnelData,
  addNewLeads,
  moveLeadsToInProgress,
  moveInProgressToClosed,
  generateRandomFunnelData,
} from "@/lib/services/funnel-services"

export default function FunnelManager() {
  const [loading, setLoading] = useState(true)
  const [funnelData, setFunnelData] = useState<FunnelData | null>(null)
  const [newLeadsCount, setNewLeadsCount] = useState<number>(0)
  const [newLeadsValue, setNewLeadsValue] = useState<number>(2000)
  const [moveToInProgressCount, setMoveToInProgressCount] = useState<number>(0)
  const [moveToClosedCount, setMoveToClosedCount] = useState<number>(0)
  const [displayFunnelData, setDisplayFunnelData] = useState({
    leads: {
      label: "Leads Novos",
      value: 0,
      percentage: 100,
      color: "#22d3ee",
      revenue: 0,
    },
    inProgress: {
      label: "Em Atendimento",
      value: 0,
      percentage: 0,
      color: "#c084fc",
      revenue: 0,
    },
    closed: {
      label: "Fechados",
      value: 0,
      percentage: 0,
      color: "#4ade80",
      revenue: 0,
    },
  })

  // Carregar dados do funil
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const data = await funnelServices.getLatest()

        if (data) {
          setFunnelData(data)
          updateDisplayFunnel(data)
        } else {
          // Se não houver dados, gerar dados aleatórios
          const newData = await generateRandomFunnelData()
          setFunnelData(newData)
          updateDisplayFunnel(newData)
        }

        setLoading(false)
      } catch (error) {
        console.error("Erro ao carregar dados do funil:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Função para atualizar os dados de exibição do funil
  const updateDisplayFunnel = (data: FunnelData) => {
    setDisplayFunnelData({
      leads: {
        label: "Leads Novos",
        value: data.leads,
        percentage: 100,
        color: "#22d3ee",
        revenue: data.leadsRevenue,
      },
      inProgress: {
        label: "Em Atendimento",
        value: data.inProgress,
        percentage: data.leads > 0 ? Math.round((data.inProgress / data.leads) * 100) : 0,
        color: "#c084fc",
        revenue: data.inProgressRevenue,
      },
      closed: {
        label: "Fechados",
        value: data.closed,
        percentage: data.leads > 0 ? Math.round((data.closed / data.leads) * 100) : 0,
        color: "#4ade80",
        revenue: data.closedRevenue,
      },
    })
  }

  // Função para adicionar novos leads
  const handleAddLeads = async () => {
    if (newLeadsCount <= 0) return

    try {
      setLoading(true)
      const updatedData = await addNewLeads(newLeadsCount, newLeadsValue)
      setFunnelData(updatedData)
      updateDisplayFunnel(updatedData)
      setNewLeadsCount(0)
      setLoading(false)
    } catch (error) {
      console.error("Erro ao adicionar leads:", error)
      setLoading(false)
    }
  }

  // Função para mover leads para "Em Atendimento"
  const handleMoveToInProgress = async () => {
    if (moveToInProgressCount <= 0 || !funnelData) return

    try {
      setLoading(true)
      const updatedData = await moveLeadsToInProgress(moveToInProgressCount)
      setFunnelData(updatedData)
      updateDisplayFunnel(updatedData)
      setMoveToInProgressCount(0)
      setLoading(false)
    } catch (error) {
      console.error("Erro ao mover leads para Em Atendimento:", error)
      setLoading(false)
    }
  }

  // Função para mover "Em Atendimento" para "Fechados"
  const handleMoveToClosed = async () => {
    if (moveToClosedCount <= 0 || !funnelData) return

    try {
      setLoading(true)
      const updatedData = await moveInProgressToClosed(moveToClosedCount)
      setFunnelData(updatedData)
      updateDisplayFunnel(updatedData)
      setMoveToClosedCount(0)
      setLoading(false)
    } catch (error) {
      console.error("Erro ao mover leads para Fechados:", error)
      setLoading(false)
    }
  }

  // Função para gerar dados aleatórios
  const handleGenerateRandomData = async () => {
    try {
      setLoading(true)
      const newData = await generateRandomFunnelData()
      setFunnelData(newData)
      updateDisplayFunnel(newData)
      setLoading(false)
    } catch (error) {
      console.error("Erro ao gerar dados aleatórios:", error)
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
        <CardHeader className="pb-2 pt-4 border-b border-[#1e3a5f]">
          <CardTitle className="text-lg text-white">Funil de Vendas</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
            </div>
          ) : (
            <SalesFunnel data={displayFunnelData} height={300} showRevenue={true} />
          )}
        </CardContent>
      </Card>

      <Card className="bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
        <CardHeader className="pb-2 pt-4 border-b border-[#1e3a5f]">
          <CardTitle className="text-lg text-white">Gerenciar Funil</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {loading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <h3 className="text-md font-medium text-white">Adicionar Novos Leads</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newLeadsCount">Quantidade</Label>
                    <Input
                      id="newLeadsCount"
                      type="number"
                      min="0"
                      value={newLeadsCount}
                      onChange={(e) => setNewLeadsCount(Number.parseInt(e.target.value) || 0)}
                      className="bg-[#163456] border-[#1e3a5f] text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newLeadsValue">Valor Médio (R$)</Label>
                    <Input
                      id="newLeadsValue"
                      type="number"
                      min="0"
                      value={newLeadsValue}
                      onChange={(e) => setNewLeadsValue(Number.parseInt(e.target.value) || 0)}
                      className="bg-[#163456] border-[#1e3a5f] text-white"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleAddLeads}
                  disabled={newLeadsCount <= 0}
                  className="w-full bg-cyan-600 hover:bg-cyan-700"
                >
                  Adicionar Leads
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-md font-medium text-white">Mover para Em Atendimento</h3>
                <div className="space-y-2">
                  <Label htmlFor="moveToInProgressCount">Quantidade (máx: {funnelData?.leads || 0})</Label>
                  <Input
                    id="moveToInProgressCount"
                    type="number"
                    min="0"
                    max={funnelData?.leads || 0}
                    value={moveToInProgressCount}
                    onChange={(e) => setMoveToInProgressCount(Number.parseInt(e.target.value) || 0)}
                    className="bg-[#163456] border-[#1e3a5f] text-white"
                  />
                </div>
                <Button
                  onClick={handleMoveToInProgress}
                  disabled={moveToInProgressCount <= 0 || moveToInProgressCount > (funnelData?.leads || 0)}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Mover para Em Atendimento
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-md font-medium text-white">Mover para Fechados</h3>
                <div className="space-y-2">
                  <Label htmlFor="moveToClosedCount">Quantidade (máx: {funnelData?.inProgress || 0})</Label>
                  <Input
                    id="moveToClosedCount"
                    type="number"
                    min="0"
                    max={funnelData?.inProgress || 0}
                    value={moveToClosedCount}
                    onChange={(e) => setMoveToClosedCount(Number.parseInt(e.target.value) || 0)}
                    className="bg-[#163456] border-[#1e3a5f] text-white"
                  />
                </div>
                <Button
                  onClick={handleMoveToClosed}
                  disabled={moveToClosedCount <= 0 || moveToClosedCount > (funnelData?.inProgress || 0)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Mover para Fechados
                </Button>
              </div>

              <Button onClick={handleGenerateRandomData} className="w-full bg-blue-600 hover:bg-blue-700">
                Gerar Dados Aleatórios
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
