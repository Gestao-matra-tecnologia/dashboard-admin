"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Pencil, Trash2, AlertCircle, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import type { ClientMarketingAction } from "@/lib/types"
import {
  fetchClientMarketing,
  addClientMarketing,
  updateClientMarketing,
  deleteClientMarketing,
} from "@/lib/mock-services"

export default function ClientMarketing() {
  const [actions, setActions] = useState<ClientMarketingAction[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentAction, setCurrentAction] = useState<ClientMarketingAction | null>(null)
  const [formData, setFormData] = useState<Omit<ClientMarketingAction, "id">>({
    title: "",
    client: "",
    status: "Planejamento",
    budget: 0,
    roi: 0,
  })
  const [submitting, setSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    loadActions()
  }, [])

  const loadActions = async () => {
    setLoading(true)
    try {
      const data = await fetchClientMarketing()
      setActions(data)
    } catch (error) {
      console.error("Error loading client marketing actions:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar as ações de marketing.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "budget" || name === "roi" ? Number(value) : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddAction = async () => {
    setSubmitting(true)
    try {
      await addClientMarketing(formData)
      await loadActions()
      setIsAddDialogOpen(false)
      resetForm()
      toast({
        title: "Sucesso",
        description: "Ação de marketing adicionada com sucesso.",
      })
    } catch (error) {
      console.error("Error adding client marketing action:", error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar a ação de marketing.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditAction = async () => {
    if (!currentAction) return

    setSubmitting(true)
    try {
      await updateClientMarketing(currentAction.id, formData)
      await loadActions()
      setIsEditDialogOpen(false)
      resetForm()
      toast({
        title: "Sucesso",
        description: "Ação de marketing atualizada com sucesso.",
      })
    } catch (error) {
      console.error("Error updating client marketing action:", error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a ação de marketing.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteAction = async () => {
    if (!currentAction) return

    setSubmitting(true)
    try {
      await deleteClientMarketing(currentAction.id)
      await loadActions()
      setIsDeleteDialogOpen(false)
      toast({
        title: "Sucesso",
        description: "Ação de marketing excluída com sucesso.",
      })
    } catch (error) {
      console.error("Error deleting client marketing action:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir a ação de marketing.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const openEditDialog = (action: ClientMarketingAction) => {
    setCurrentAction(action)
    setFormData({
      title: action.title,
      client: action.client,
      status: action.status,
      budget: action.budget,
      roi: action.roi,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (action: ClientMarketingAction) => {
    setCurrentAction(action)
    setIsDeleteDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      client: "",
      status: "Planejamento",
      budget: 0,
      roi: 0,
    })
    setCurrentAction(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planejamento":
        return "bg-yellow-900 text-yellow-300 border-yellow-700"
      case "Em andamento":
        return "bg-blue-900 text-blue-300 border-blue-700"
      case "Ativo":
        return "bg-green-900 text-green-300 border-green-700"
      case "Concluído":
        return "bg-purple-900 text-purple-300 border-purple-700"
      default:
        return ""
    }
  }

  const getRoiColor = (roi: number) => {
    if (roi === 0) return "text-slate-400" // Ainda não tem ROI
    if (roi >= 3) return "text-green-500" // Excelente
    if (roi >= 2) return "text-cyan-500" // Bom
    if (roi >= 1) return "text-yellow-500" // Aceitável
    return "text-red-500" // Ruim
  }

  const filteredActions = actions.filter((action) => {
    // Filter by status
    if (statusFilter !== "all" && action.status !== statusFilter) {
      return false
    }

    // Filter by search term
    if (
      searchTerm &&
      !action.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !action.client.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })

  return (
    <Card className="bg-[#0f2744] border-[#1e3a5f] text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-white">Marketing dos Clientes</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Adicionar Nova Ação de Marketing</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-white">
                  Título
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="client" className="text-white">
                  Cliente
                </Label>
                <Input
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status" className="text-white">
                  Status
                </Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger className="bg-[#0f2744] border-[#1e3a5f] text-white">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                    <SelectItem value="Planejamento">Planejamento</SelectItem>
                    <SelectItem value="Em andamento">Em andamento</SelectItem>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Concluído">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budget" className="text-white">
                  Orçamento (R$)
                </Label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  min="0"
                  step="100"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="roi" className="text-white">
                  ROI (Retorno sobre Investimento)
                </Label>
                <Input
                  id="roi"
                  name="roi"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.roi}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                className="border-[#1e3a5f] bg-[#0a1929] text-white hover:bg-[#163456]"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddAction}
                disabled={submitting}
                className="bg-cyan-600 text-white hover:bg-cyan-700"
              >
                {submitting ? "Adicionando..." : "Adicionar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar ações ou clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0a1929] border-[#1e3a5f] text-white placeholder:text-slate-400 pl-8"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-[#0a1929] border-[#1e3a5f] text-white">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Planejamento">Planejamento</SelectItem>
                <SelectItem value="Em andamento">Em andamento</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={loadActions}
              className="border-[#1e3a5f] bg-[#0a1929] text-cyan-400 hover:bg-[#163456]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                <path d="M16 16h5v5"></path>
              </svg>
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : filteredActions.length === 0 ? (
          <Alert className="bg-[#0a1929] border-[#1e3a5f] text-white">
            <AlertCircle className="h-4 w-4 text-cyan-400" />
            <AlertDescription>
              Nenhuma ação de marketing encontrada. Tente ajustar os filtros ou adicionar novas ações.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e3a5f]">
                  <th className="text-left font-medium p-2 text-slate-300">Título</th>
                  <th className="text-left font-medium p-2 text-slate-300">Cliente</th>
                  <th className="text-left font-medium p-2 text-slate-300">Status</th>
                  <th className="text-left font-medium p-2 text-slate-300">Orçamento</th>
                  <th className="text-left font-medium p-2 text-slate-300">ROI</th>
                  <th className="text-right font-medium p-2 text-slate-300">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredActions.map((action) => (
                  <tr key={action.id} className="border-b border-[#1e3a5f]">
                    <td className="p-2 font-medium text-white">{action.title}</td>
                    <td className="p-2 text-slate-300">{action.client}</td>
                    <td className="p-2">
                      <Badge variant="outline" className={getStatusColor(action.status)}>
                        {action.status}
                      </Badge>
                    </td>
                    <td className="p-2 text-slate-300">R$ {action.budget.toLocaleString("pt-BR")}</td>
                    <td className={`p-2 font-medium ${getRoiColor(action.roi)}`}>
                      {action.roi > 0 ? `${action.roi.toFixed(1)}x` : "-"}
                    </td>
                    <td className="p-2 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(action)}
                        className="h-8 w-8 text-slate-300 hover:text-white hover:bg-[#163456]"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(action)}
                        className="h-8 w-8 text-slate-300 hover:text-red-500 hover:bg-[#163456]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Editar Ação de Marketing</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title" className="text-white">
                  Título
                </Label>
                <Input
                  id="edit-title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-client" className="text-white">
                  Cliente
                </Label>
                <Input
                  id="edit-client"
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status" className="text-white">
                  Status
                </Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger className="bg-[#0f2744] border-[#1e3a5f] text-white">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                    <SelectItem value="Planejamento">Planejamento</SelectItem>
                    <SelectItem value="Em andamento">Em andamento</SelectItem>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Concluído">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-budget" className="text-white">
                  Orçamento (R$)
                </Label>
                <Input
                  id="edit-budget"
                  name="budget"
                  type="number"
                  min="0"
                  step="100"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-roi" className="text-white">
                  ROI (Retorno sobre Investimento)
                </Label>
                <Input
                  id="edit-roi"
                  name="roi"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.roi}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="border-[#1e3a5f] bg-[#0a1929] text-white hover:bg-[#163456]"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleEditAction}
                disabled={submitting}
                className="bg-cyan-600 text-white hover:bg-cyan-700"
              >
                {submitting ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Confirmar Exclusão</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-white">
                Tem certeza que deseja excluir a ação "{currentAction?.title}" do cliente {currentAction?.client}?
              </p>
              <p className="text-slate-400 mt-2">Esta ação não pode ser desfeita.</p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                className="border-[#1e3a5f] bg-[#0a1929] text-white hover:bg-[#163456]"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleDeleteAction}
                disabled={submitting}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                {submitting ? "Excluindo..." : "Excluir"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
