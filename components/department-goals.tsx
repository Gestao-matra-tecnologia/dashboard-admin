"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PlusCircle, Pencil, Trash2, AlertCircle } from "lucide-react"
import type { DepartmentGoal } from "@/lib/types"
import {
  fetchDepartmentGoals,
  addDepartmentGoal,
  updateDepartmentGoal,
  deleteDepartmentGoal,
} from "@/lib/mock-services"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DepartmentGoals() {
  const [goals, setGoals] = useState<DepartmentGoal[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentGoal, setCurrentGoal] = useState<DepartmentGoal | null>(null)
  const [formData, setFormData] = useState<Omit<DepartmentGoal, "id">>({
    department: "",
    goal: "",
    progress: 0,
    dueDate: "",
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadGoals()
  }, [])

  const loadGoals = async () => {
    setLoading(true)
    try {
      const data = await fetchDepartmentGoals()
      setGoals(data)
    } catch (error) {
      console.error("Error loading goals:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar as metas.",
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
      [name]: name === "progress" ? Number(value) : value,
    }))
  }

  const handleAddGoal = async () => {
    setSubmitting(true)
    try {
      await addDepartmentGoal(formData)
      await loadGoals()
      setIsAddDialogOpen(false)
      resetForm()
      toast({
        title: "Sucesso",
        description: "Meta adicionada com sucesso.",
      })
    } catch (error) {
      console.error("Error adding goal:", error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar a meta.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditGoal = async () => {
    if (!currentGoal) return

    setSubmitting(true)
    try {
      await updateDepartmentGoal(currentGoal.id, formData)
      await loadGoals()
      setIsEditDialogOpen(false)
      resetForm()
      toast({
        title: "Sucesso",
        description: "Meta atualizada com sucesso.",
      })
    } catch (error) {
      console.error("Error updating goal:", error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a meta.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteGoal = async () => {
    if (!currentGoal) return

    setSubmitting(true)
    try {
      await deleteDepartmentGoal(currentGoal.id)
      await loadGoals()
      setIsDeleteDialogOpen(false)
      toast({
        title: "Sucesso",
        description: "Meta excluída com sucesso.",
      })
    } catch (error) {
      console.error("Error deleting goal:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir a meta.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const openEditDialog = (goal: DepartmentGoal) => {
    setCurrentGoal(goal)
    setFormData({
      department: goal.department,
      goal: goal.goal,
      progress: goal.progress,
      dueDate: goal.dueDate,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (goal: DepartmentGoal) => {
    setCurrentGoal(goal)
    setIsDeleteDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      department: "",
      goal: "",
      progress: 0,
      dueDate: "",
    })
    setCurrentGoal(null)
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "bg-green-500"
    if (progress >= 50) return "bg-blue-500"
    if (progress >= 25) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card className="bg-[#0f2744] border-[#1e3a5f] text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-white">Metas por Área</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-cyan-600 text-white hover:bg-cyan-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova Meta
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Adicionar Nova Meta</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="department" className="text-white">
                  Departamento
                </Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="goal" className="text-white">
                  Meta
                </Label>
                <Input
                  id="goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="progress" className="text-white">
                  Progresso (%)
                </Label>
                <Input
                  id="progress"
                  name="progress"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate" className="text-white">
                  Data de Conclusão
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
                onClick={handleAddGoal}
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
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : goals.length === 0 ? (
          <Alert className="bg-[#0a1929] border-[#1e3a5f] text-white">
            <AlertCircle className="h-4 w-4 text-cyan-400" />
            <AlertDescription>Nenhuma meta encontrada. Adicione novas metas para começar.</AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="bg-[#0a1929] border border-[#1e3a5f] rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-white">{goal.department}</h3>
                    <p className="text-slate-300">{goal.goal}</p>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(goal)}
                      className="h-8 w-8 text-slate-300 hover:text-white hover:bg-[#163456]"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDeleteDialog(goal)}
                      className="h-8 w-8 text-slate-300 hover:text-red-500 hover:bg-[#163456]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="w-full mr-4">
                    <div className="h-2 w-full bg-[#1e3a5f] rounded-full">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(goal.progress)}`}
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-white">{goal.progress}%</span>
                    <span className="text-xs text-slate-400">até {goal.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Editar Meta</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-department" className="text-white">
                  Departamento
                </Label>
                <Input
                  id="edit-department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-goal" className="text-white">
                  Meta
                </Label>
                <Input
                  id="edit-goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-progress" className="text-white">
                  Progresso (%)
                </Label>
                <Input
                  id="edit-progress"
                  name="progress"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-dueDate" className="text-white">
                  Data de Conclusão
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
                onClick={handleEditGoal}
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
                Tem certeza que deseja excluir a meta "{currentGoal?.goal}" do departamento {currentGoal?.department}?
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
                onClick={handleDeleteGoal}
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
