"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { clientMarketingServices } from "@/lib/mock-services"
import type { ClientMarketingAction } from "@/lib/types"
import { PlusCircle, Edit2, Trash2 } from "lucide-react"

export default function FunnelManager() {
  const [actions, setActions] = useState<ClientMarketingAction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentAction, setCurrentAction] = useState<ClientMarketingAction | null>(null)
  const [formData, setFormData] = useState({
    client: "",
    action: "",
    status: "lead",
    date: "",
    budget: "",
    responsible: "",
  })
  const [stats, setStats] = useState({
    leads: 0,
    inProgress: 0,
    closed: 0,
    totalBudget: 0,
  })

  useEffect(() => {
    fetchActions()
  }, [])

  const fetchActions = async () => {
    try {
      setIsLoading(true)
      const data = await clientMarketingServices.getAll()
      setActions(data)
      calculateStats(data)
    } catch (error) {
      console.error("Erro ao buscar ações:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateStats = (data: ClientMarketingAction[]) => {
    const leads = data.filter((item) => item.status === "lead").length
    const inProgress = data.filter((item) => item.status === "em atendimento").length
    const closed = data.filter((item) => item.status === "fechado").length
    const totalBudget = data.reduce((sum, item) => sum + Number(item.budget), 0)

    setStats({
      leads,
      inProgress,
      closed,
      totalBudget,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      client: "",
      action: "",
      status: "lead",
      date: "",
      budget: "",
      responsible: "",
    })
  }

  const handleAddAction = async () => {
    try {
      // Validar campos obrigatórios
      if (!formData.client || !formData.action || !formData.status || !formData.date) {
        alert("Por favor, preencha todos os campos obrigatórios.")
        return
      }

      const newAction = {
        ...formData,
        budget: Number(formData.budget) || 0,
        id: Date.now().toString(), // ID temporário
      }

      // Usar o método create em vez de add
      await clientMarketingServices.create(newAction)
      await fetchActions() // Recarregar dados
      setIsAddDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Erro ao adicionar ação:", error)
      alert(`Erro ao adicionar ação: ${error}`)
    }
  }

  const handleEditAction = async () => {
    try {
      if (!currentAction) return

      const updatedAction = {
        ...currentAction,
        ...formData,
        budget: Number(formData.budget) || 0,
      }

      await clientMarketingServices.update(updatedAction)
      await fetchActions() // Recarregar dados
      setIsEditDialogOpen(false)
      setCurrentAction(null)
      resetForm()
    } catch (error) {
      console.error("Erro ao editar ação:", error)
    }
  }

  const handleDeleteAction = async () => {
    try {
      if (!currentAction) return

      await clientMarketingServices.delete(currentAction.id)
      await fetchActions() // Recarregar dados
      setIsDeleteDialogOpen(false)
      setCurrentAction(null)
    } catch (error) {
      console.error("Erro ao excluir ação:", error)
    }
  }

  const openEditDialog = (action: ClientMarketingAction) => {
    setCurrentAction(action)
    setFormData({
      client: action.client,
      action: action.action,
      status: action.status,
      date: action.date,
      budget: action.budget.toString(),
      responsible: action.responsible || "",
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (action: ClientMarketingAction) => {
    setCurrentAction(action)
    setIsDeleteDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "lead":
        return "bg-blue-500"
      case "em atendimento":
        return "bg-yellow-500"
      case "fechado":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gerenciamento do Funil de Vendas</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova Ação
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0f2744] border-[#1e3a5f] text-white">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Ação</DialogTitle>
              <DialogDescription className="text-slate-300">
                Preencha os dados para adicionar uma nova ação ao funil de vendas.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Cliente</Label>
                  <Input
                    id="client"
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                    className="bg-[#0a1929] border-[#1e3a5f]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="action">Ação</Label>
                  <Input
                    id="action"
                    name="action"
                    value={formData.action}
                    onChange={handleInputChange}
                    className="bg-[#0a1929] border-[#1e3a5f]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger className="bg-[#0a1929] border-[#1e3a5f]">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f2744] border-[#1e3a5f]">
                      <SelectItem value="lead">Lead</SelectItem>
                      <SelectItem value="em atendimento">Em Atendimento</SelectItem>
                      <SelectItem value="fechado">Fechado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="bg-[#0a1929] border-[#1e3a5f]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Orçamento (R$)</Label>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="bg-[#0a1929] border-[#1e3a5f]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsible">Responsável</Label>
                  <Input
                    id="responsible"
                    name="responsible"
                    value={formData.responsible}
                    onChange={handleInputChange}
                    className="bg-[#0a1929] border-[#1e3a5f]"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-cyan-600 hover:bg-cyan-700" onClick={handleAddAction}>
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas do Funil */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#0f2744] border-[#1e3a5f]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{stats.leads}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#0f2744] border-[#1e3a5f]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Em Atendimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{stats.inProgress}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#0f2744] border-[#1e3a5f]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Fechados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{stats.closed}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#0f2744] border-[#1e3a5f]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Orçamento Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-400">R$ {stats.totalBudget.toLocaleString("pt-BR")}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Ações */}
      <Card className="bg-[#0f2744] border-[#1e3a5f]">
        <CardHeader>
          <CardTitle className="text-white">Ações do Funil</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-[#1e3a5f] hover:bg-[#0a1929]">
                  <TableHead className="text-slate-300">Cliente</TableHead>
                  <TableHead className="text-slate-300">Ação</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Data</TableHead>
                  <TableHead className="text-slate-300">Orçamento</TableHead>
                  <TableHead className="text-slate-300">Responsável</TableHead>
                  <TableHead className="text-slate-300 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {actions.length === 0 ? (
                  <TableRow className="border-[#1e3a5f]">
                    <TableCell colSpan={7} className="text-center text-slate-400">
                      Nenhuma ação encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  actions.map((action) => (
                    <TableRow key={action.id} className="border-[#1e3a5f] hover:bg-[#0a1929]">
                      <TableCell className="font-medium text-white">{action.client}</TableCell>
                      <TableCell className="text-slate-300">{action.action}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(action.status)}`}>{action.status}</Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{action.date}</TableCell>
                      <TableCell className="text-slate-300">R$ {action.budget.toLocaleString("pt-BR")}</TableCell>
                      <TableCell className="text-slate-300">{action.responsible}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(action)}
                            className="h-8 w-8 text-slate-300 hover:text-white hover:bg-[#1e3a5f]"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteDialog(action)}
                            className="h-8 w-8 text-slate-300 hover:text-red-500 hover:bg-[#1e3a5f]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Dialog de Edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#0f2744] border-[#1e3a5f] text-white">
          <DialogHeader>
            <DialogTitle>Editar Ação</DialogTitle>
            <DialogDescription className="text-slate-300">Edite os dados da ação selecionada.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-client">Cliente</Label>
                <Input
                  id="edit-client"
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                  className="bg-[#0a1929] border-[#1e3a5f]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-action">Ação</Label>
                <Input
                  id="edit-action"
                  name="action"
                  value={formData.action}
                  onChange={handleInputChange}
                  className="bg-[#0a1929] border-[#1e3a5f]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger className="bg-[#0a1929] border-[#1e3a5f]">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0f2744] border-[#1e3a5f]">
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="em atendimento">Em Atendimento</SelectItem>
                    <SelectItem value="fechado">Fechado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-date">Data</Label>
                <Input
                  id="edit-date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="bg-[#0a1929] border-[#1e3a5f]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-budget">Orçamento (R$)</Label>
                <Input
                  id="edit-budget"
                  name="budget"
                  type="number"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="bg-[#0a1929] border-[#1e3a5f]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-responsible">Responsável</Label>
                <Input
                  id="edit-responsible"
                  name="responsible"
                  value={formData.responsible}
                  onChange={handleInputChange}
                  className="bg-[#0a1929] border-[#1e3a5f]"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-cyan-600 hover:bg-cyan-700" onClick={handleEditAction}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-[#0f2744] border-[#1e3a5f] text-white">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription className="text-slate-300">
              Tem certeza que deseja excluir esta ação? Esta operação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteAction}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
