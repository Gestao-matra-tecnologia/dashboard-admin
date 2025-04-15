"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PlusCircle, Pencil, Trash2, Search, AlertCircle } from "lucide-react"
import type { DemandItem } from "@/lib/types"
import { fetchDemands, addDemand, updateDemand, deleteDemand } from "@/lib/mock-services"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DemandTable() {
  const [demands, setDemands] = useState<DemandItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentDemand, setCurrentDemand] = useState<DemandItem | null>(null)
  const [formData, setFormData] = useState<Omit<DemandItem, "id">>({
    title: "",
    priority: "Média",
    status: "Pendente",
    assignedTo: "",
    dueDate: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()

  useEffect(() => {
    loadDemands()
  }, [])

  const loadDemands = async () => {
    setLoading(true)
    try {
      const data = await fetchDemands()
      setDemands(data)
    } catch (error) {
      console.error("Error loading demands:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar as demandas.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddDemand = async () => {
    setSubmitting(true)
    try {
      await addDemand(formData)
      await loadDemands()
      setIsAddDialogOpen(false)
      resetForm()
      toast({
        title: "Sucesso",
        description: "Demanda adicionada com sucesso.",
      })
    } catch (error) {
      console.error("Error adding demand:", error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar a demanda.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditDemand = async () => {
    if (!currentDemand) return

    setSubmitting(true)
    try {
      await updateDemand(currentDemand.id, formData)
      await loadDemands()
      setIsEditDialogOpen(false)
      resetForm()
      toast({
        title: "Sucesso",
        description: "Demanda atualizada com sucesso.",
      })
    } catch (error) {
      console.error("Error updating demand:", error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a demanda.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteDemand = async () => {
    if (!currentDemand) return

    setSubmitting(true)
    try {
      await deleteDemand(currentDemand.id)
      await loadDemands()
      setIsDeleteDialogOpen(false)
      toast({
        title: "Sucesso",
        description: "Demanda excluída com sucesso.",
      })
    } catch (error) {
      console.error("Error deleting demand:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir a demanda.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const openEditDialog = (demand: DemandItem) => {
    setCurrentDemand(demand)
    setFormData({
      title: demand.title,
      priority: demand.priority,
      status: demand.status,
      assignedTo: demand.assignedTo,
      dueDate: demand.dueDate,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (demand: DemandItem) => {
    setCurrentDemand(demand)
    setIsDeleteDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      priority: "Média",
      status: "Pendente",
      assignedTo: "",
      dueDate: "",
    })
    setCurrentDemand(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendente":
        return "bg-yellow-900 text-yellow-300 border-yellow-700"
      case "Em andamento":
        return "bg-blue-900 text-blue-300 border-blue-700"
      case "Concluído":
        return "bg-green-900 text-green-300 border-green-700"
      default:
        return ""
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-red-900 text-red-300 border-red-700"
      case "Média":
        return "bg-orange-900 text-orange-300 border-orange-700"
      case "Baixa":
        return "bg-green-900 text-green-300 border-green-700"
      default:
        return ""
    }
  }

  const filteredDemands = demands.filter((demand) => {
    // Filter by status
    if (statusFilter !== "all" && demand.status !== statusFilter) {
      return false
    }

    // Filter by search term
    if (searchTerm && !demand.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    return true
  })

  return (
    <Card className="bg-[#0f2744] border-[#1e3a5f] text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-white">Demandas da Semana</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-cyan-600 text-white hover:bg-cyan-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova Demanda
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Adicionar Nova Demanda</DialogTitle>
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
                <Label htmlFor="priority" className="text-white">
                  Prioridade
                </Label>
                <Select value={formData.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                  <SelectTrigger className="bg-[#0f2744] border-[#1e3a5f] text-white">
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Média">Média</SelectItem>
                    <SelectItem value="Baixa">Baixa</SelectItem>
                  </SelectContent>
                </Select>
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
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Em andamento">Em andamento</SelectItem>
                    <SelectItem value="Concluído">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignedTo" className="text-white">
                  Responsável
                </Label>
                <Input
                  id="assignedTo"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate" className="text-white">
                  Data de Entrega
                </Label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
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
                onClick={handleAddDemand}
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
              placeholder="Buscar demandas..."
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
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Em andamento">Em andamento</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={loadDemands}
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
        ) : filteredDemands.length === 0 ? (
          <Alert className="bg-[#0a1929] border-[#1e3a5f] text-white">
            <AlertCircle className="h-4 w-4 text-cyan-400" />
            <AlertDescription>
              Nenhuma demanda encontrada. Tente ajustar os filtros ou adicionar novas demandas.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e3a5f]">
                  <th className="text-left font-medium p-2 text-slate-300">Título</th>
                  <th className="text-left font-medium p-2 text-slate-300">Responsável</th>
                  <th className="text-left font-medium p-2 text-slate-300">Status</th>
                  <th className="text-left font-medium p-2 text-slate-300">Prioridade</th>
                  <th className="text-left font-medium p-2 text-slate-300">Prazo</th>
                  <th className="text-right font-medium p-2 text-slate-300">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredDemands.map((demand) => (
                  <tr key={demand.id} className="border-b border-[#1e3a5f]">
                    <td className="p-2 font-medium text-white">{demand.title}</td>
                    <td className="p-2 text-slate-300">{demand.assignedTo}</td>
                    <td className="p-2">
                      <Badge variant="outline" className={getStatusColor(demand.status)}>
                        {demand.status}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <Badge variant="outline" className={getPriorityColor(demand.priority)}>
                        {demand.priority}
                      </Badge>
                    </td>
                    <td className="p-2 text-slate-300">{demand.dueDate}</td>
                    <td className="p-2 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(demand)}
                        className="h-8 w-8 text-slate-300 hover:text-white hover:bg-[#163456]"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(demand)}
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
              <DialogTitle className="text-white">Editar Demanda</DialogTitle>
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
                <Label htmlFor="edit-priority" className="text-white">
                  Prioridade
                </Label>
                <Select value={formData.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                  <SelectTrigger className="bg-[#0f2744] border-[#1e3a5f] text-white">
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Média">Média</SelectItem>
                    <SelectItem value="Baixa">Baixa</SelectItem>
                  </SelectContent>
                </Select>
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
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Em andamento">Em andamento</SelectItem>
                    <SelectItem value="Concluído">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-assignedTo" className="text-white">
                  Responsável
                </Label>
                <Input
                  id="edit-assignedTo"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-dueDate" className="text-white">
                  Data de Entrega
                </Label>
                <Input
                  id="edit-dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
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
                onClick={handleEditDemand}
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
              <p className="text-white">Tem certeza que deseja excluir a demanda "{currentDemand?.title}"?</p>
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
                onClick={handleDeleteDemand}
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
