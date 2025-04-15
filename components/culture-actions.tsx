"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PlusCircle, Pencil, Trash2, AlertCircle, Search, Calendar, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import type { CultureAction } from "@/lib/types"
import { fetchCultureActions, addCultureAction, updateCultureAction, deleteCultureAction } from "@/lib/mock-services"

export default function CultureActions() {
  const [actions, setActions] = useState<CultureAction[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentAction, setCurrentAction] = useState<CultureAction | null>(null)
  const [formData, setFormData] = useState<Omit<CultureAction, "id">>({
    title: "",
    description: "",
    date: "",
    status: "Planejado",
    responsible: "",
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
      const data = await fetchCultureActions()
      setActions(data)
    } catch (error) {
      console.error("Error loading culture actions:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar as ações de cultura.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddAction = async () => {
    setSubmitting(true)
    try {
      await addCultureAction(formData)
      await loadActions()
      setIsAddDialogOpen(false)
      resetForm()
      toast({
        title: "Sucesso",
        description: "Ação de cultura adicionada com sucesso.",
      })
    } catch (error) {
      console.error("Error adding culture action:", error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar a ação de cultura.",
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
      await updateCultureAction(currentAction.id, formData)
      await loadActions()
      setIsEditDialogOpen(false)
      resetForm()
      toast({
        title: "Sucesso",
        description: "Ação de cultura atualizada com sucesso.",
      })
    } catch (error) {
      console.error("Error updating culture action:", error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a ação de cultura.",
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
      await deleteCultureAction(currentAction.id)
      await loadActions()
      setIsDeleteDialogOpen(false)
      toast({
        title: "Sucesso",
        description: "Ação de cultura excluída com sucesso.",
      })
    } catch (error) {
      console.error("Error deleting culture action:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir a ação de cultura.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const openEditDialog = (action: CultureAction) => {
    setCurrentAction(action)
    setFormData({
      title: action.title,
      description: action.description,
      date: action.date,
      status: action.status,
      responsible: action.responsible,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (action: CultureAction) => {
    setCurrentAction(action)
    setIsDeleteDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      status: "Planejado",
      responsible: "",
    })
    setCurrentAction(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planejado":
        return "bg-yellow-900 text-yellow-300 border-yellow-700"
      case "Ativo":
        return "bg-green-900 text-green-300 border-green-700"
      case "Concluído":
        return "bg-blue-900 text-blue-300 border-blue-700"
      case "Recorrente":
        return "bg-purple-900 text-purple-300 border-purple-700"
      default:
        return ""
    }
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
      !action.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })

  return (
    <Card className="bg-[#0f2744] border-[#1e3a5f] text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-white">Ações de Cultura</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-cyan-600 text-white hover:bg-cyan-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova Ação
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Adicionar Nova Ação de Cultura</DialogTitle>
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
                <Label htmlFor="description" className="text-white">
                  Descrição
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date" className="text-white">
                  Data
                </Label>
                <Input
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                  placeholder="Ex: 2023-06-20 ou Mensal"
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
                    <SelectItem value="Planejado">Planejado</SelectItem>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Concluído">Concluído</SelectItem>
                    <SelectItem value="Recorrente">Recorrente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="responsible" className="text-white">
                  Responsável
                </Label>
                <Input
                  id="responsible"
                  name="responsible"
                  value={formData.responsible}
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
              placeholder="Buscar ações de cultura..."
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
                <SelectItem value="Planejado">Planejado</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
                <SelectItem value="Recorrente">Recorrente</SelectItem>
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
              Nenhuma ação de cultura encontrada. Tente ajustar os filtros ou adicionar novas ações.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredActions.map((action) => (
              <div key={action.id} className="bg-[#0a1929] border border-[#1e3a5f] rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-white">{action.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={getStatusColor(action.status)}>
                        {action.status}
                      </Badge>
                      <div className="flex items-center text-xs text-slate-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {action.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
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
                  </div>
                </div>
                <p className="text-sm text-white mt-2">{action.description}</p>
                <div className="flex items-center mt-3 text-xs text-slate-400">
                  <Users className="h-3 w-3 mr-1" />
                  <span>Responsável: {action.responsible}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Editar Ação de Cultura</DialogTitle>
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
                <Label htmlFor="edit-description" className="text-white">
                  Descrição
                </Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-date" className="text-white">
                  Data
                </Label>
                <Input
                  id="edit-date"
                  name="date"
                  value={formData.date}
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
                    <SelectItem value="Planejado">Planejado</SelectItem>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Concluído">Concluído</SelectItem>
                    <SelectItem value="Recorrente">Recorrente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-responsible" className="text-white">
                  Responsável
                </Label>
                <Input
                  id="edit-responsible"
                  name="responsible"
                  value={formData.responsible}
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
              <p className="text-white">Tem certeza que deseja excluir a ação "{currentAction?.title}"?</p>
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
