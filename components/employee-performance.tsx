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
import type { EmployeePerformance } from "@/lib/types"
import {
  fetchEmployeePerformance,
  addEmployeePerformance,
  updateEmployeePerformance,
  deleteEmployeePerformance,
} from "@/lib/mock-services"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function EmployeePerformanceTable() {
  const [employees, setEmployees] = useState<EmployeePerformance[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState<EmployeePerformance | null>(null)
  const [formData, setFormData] = useState<Omit<EmployeePerformance, "id">>({
    name: "",
    position: "",
    department: "",
    achievements: "",
    rating: 0,
  })
  const [submitting, setSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  useEffect(() => {
    loadEmployees()
  }, [])

  const loadEmployees = async () => {
    setLoading(true)
    try {
      const data = await fetchEmployeePerformance()
      setEmployees(data)
    } catch (error) {
      console.error("Error loading employees:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados de desempenho dos funcionários.",
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
      [name]: name === "rating" ? Number.parseInt(value, 10) : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddEmployee = async () => {
    setSubmitting(true)
    try {
      await addEmployeePerformance(formData)
      await loadEmployees()
      setIsAddDialogOpen(false)
      resetForm()
      toast({
        title: "Sucesso",
        description: "Funcionário adicionado com sucesso.",
      })
    } catch (error) {
      console.error("Error adding employee:", error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o funcionário.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditEmployee = async () => {
    if (!currentEmployee) return

    setSubmitting(true)
    try {
      await updateEmployeePerformance(currentEmployee.id, formData)
      await loadEmployees()
      setIsEditDialogOpen(false)
      resetForm()
      toast({
        title: "Sucesso",
        description: "Dados do funcionário atualizados com sucesso.",
      })
    } catch (error) {
      console.error("Error updating employee:", error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar os dados do funcionário.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteEmployee = async () => {
    if (!currentEmployee) return

    setSubmitting(true)
    try {
      await deleteEmployeePerformance(currentEmployee.id)
      await loadEmployees()
      setIsDeleteDialogOpen(false)
      toast({
        title: "Sucesso",
        description: "Funcionário removido com sucesso.",
      })
    } catch (error) {
      console.error("Error deleting employee:", error)
      toast({
        title: "Erro",
        description: "Não foi possível remover o funcionário.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const openEditDialog = (employee: EmployeePerformance) => {
    setCurrentEmployee(employee)
    setFormData({
      name: employee.name,
      position: employee.position,
      department: employee.department,
      achievements: employee.achievements,
      rating: employee.rating,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (employee: EmployeePerformance) => {
    setCurrentEmployee(employee)
    setIsDeleteDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      department: "",
      achievements: "",
      rating: 0,
    })
    setCurrentEmployee(null)
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 90) return "text-green-400"
    if (rating >= 70) return "text-cyan-400"
    if (rating >= 50) return "text-yellow-400"
    return "text-red-400"
  }

  const departments = [...new Set(employees.map((emp) => emp.department))]

  const filteredEmployees = employees.filter((employee) => {
    // Filter by department
    if (departmentFilter !== "all" && employee.department !== departmentFilter) {
      return false
    }

    // Filter by search term
    if (searchTerm && !employee.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    return true
  })

  return (
    <Card className="bg-[#0f2744] border-[#1e3a5f] text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-white">Desempenho dos Funcionários</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-cyan-600 text-white hover:bg-cyan-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Funcionário
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Adicionar Novo Funcionário</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-white">
                  Nome
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="position" className="text-white">
                  Cargo
                </Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
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
                <Label htmlFor="achievements" className="text-white">
                  Conquistas
                </Label>
                <Input
                  id="achievements"
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rating" className="text-white">
                  Avaliação (0-100)
                </Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.rating}
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
                onClick={handleAddEmployee}
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
              placeholder="Buscar funcionários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0a1929] border-[#1e3a5f] text-white placeholder:text-slate-400 pl-8"
            />
          </div>
          <div className="flex gap-2">
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[180px] bg-[#0a1929] border-[#1e3a5f] text-white">
                <SelectValue placeholder="Filtrar por departamento" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                <SelectItem value="all">Todos</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={loadEmployees}
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
        ) : filteredEmployees.length === 0 ? (
          <Alert className="bg-[#0a1929] border-[#1e3a5f] text-white">
            <AlertCircle className="h-4 w-4 text-cyan-400" />
            <AlertDescription>
              Nenhum funcionário encontrado. Tente ajustar os filtros ou adicionar novos funcionários.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e3a5f]">
                  <th className="text-left font-medium p-2 text-slate-300">Nome</th>
                  <th className="text-left font-medium p-2 text-slate-300">Cargo</th>
                  <th className="text-left font-medium p-2 text-slate-300">Departamento</th>
                  <th className="text-left font-medium p-2 text-slate-300">Conquistas</th>
                  <th className="text-left font-medium p-2 text-slate-300">Avaliação</th>
                  <th className="text-right font-medium p-2 text-slate-300">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b border-[#1e3a5f]">
                    <td className="p-2 font-medium text-white">{employee.name}</td>
                    <td className="p-2 text-slate-300">{employee.position}</td>
                    <td className="p-2 text-slate-300">{employee.department}</td>
                    <td className="p-2 text-slate-300">{employee.achievements}</td>
                    <td className="p-2">
                      <span className={`font-bold ${getRatingColor(employee.rating)}`}>{employee.rating}%</span>
                    </td>
                    <td className="p-2 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(employee)}
                        className="h-8 w-8 text-slate-300 hover:text-white hover:bg-[#163456]"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(employee)}
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
              <DialogTitle className="text-white">Editar Funcionário</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name" className="text-white">
                  Nome
                </Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-position" className="text-white">
                  Cargo
                </Label>
                <Input
                  id="edit-position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
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
                <Label htmlFor="edit-achievements" className="text-white">
                  Conquistas
                </Label>
                <Input
                  id="edit-achievements"
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleInputChange}
                  className="bg-[#0f2744] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-rating" className="text-white">
                  Avaliação (0-100)
                </Label>
                <Input
                  id="edit-rating"
                  name="rating"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.rating}
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
                onClick={handleEditEmployee}
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
              <p className="text-white">Tem certeza que deseja excluir o funcionário "{currentEmployee?.name}"?</p>
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
                onClick={handleDeleteEmployee}
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
