"use client"

import { useState } from "react"
import { Download, Filter, Plus, Search, Trash2, Edit, Calendar, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Dados de exemplo para colaboradores
const initialEmployees = [
  {
    id: 1,
    nome: "Luiz",
    cargo: "Tráfego Pago",
    tipocontrato: "PJ",
    valormensal: 3500,
    datapagamento: "2025-04-10",
    status: "Pago",
  },
  {
    id: 2,
    nome: "Bruno",
    cargo: "Desenvolvedor",
    tipocontrato: "CLT",
    valormensal: 5000,
    datapagamento: "2025-04-05",
    status: "Pago",
  },
  {
    id: 3,
    nome: "Ryan",
    cargo: "Desenvolvedor Front-end",
    tipocontrato: "PJ",
    valormensal: 4000,
    datapagamento: "2025-04-10",
    status: "Pendente",
  },
  {
    id: 4,
    nome: "Carol",
    cargo: "Administrativo",
    tipocontrato: "CLT",
    valormensal: 3000,
    datapagamento: "2025-04-05",
    status: "Pago",
  },
  {
    id: 5,
    nome: "Mariana",
    cargo: "Marketing",
    tipocontrato: "PJ",
    valormensal: 3800,
    datapagamento: "2025-04-10",
    status: "Pendente",
  },
  {
    id: 6,
    nome: "Pedro",
    cargo: "Vídeo",
    tipocontrato: "Freelancer",
    valormensal: 2500,
    datapagamento: "2025-04-15",
    status: "Pendente",
  },
  {
    id: 7,
    nome: "Jeremias",
    cargo: "CEO",
    tipocontrato: "PJ",
    valormensal: 10000,
    datapagamento: "2025-04-05",
    status: "Pago",
  },
]

interface FinanceEmployeeTableProps {
  filters: {
    month: number
    year: number
  }
  updateFilters: (filters: Partial<{ month: number; year: number }>) => void
}

export default function FinanceEmployeeTable({ filters, updateFilters }: FinanceEmployeeTableProps) {
  const [employees, setEmployees] = useState(initialEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [contractFilter, setContractFilter] = useState("todos")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState<(typeof initialEmployees)[0] | null>(null)
  const [newEmployee, setNewEmployee] = useState({
    nome: "",
    cargo: "",
    tipocontrato: "CLT",
    valormensal: 0,
    datapagamento: new Date().toISOString().split("T")[0],
    status: "Pendente",
  })

  // Meses para seleção
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  // Filtrar colaboradores por mês/ano e outros filtros
  const filteredEmployees = employees.filter((employee) => {
    const employeeDate = new Date(employee.datapagamento)
    const matchesMonth = employeeDate.getMonth() === filters.month
    const matchesYear = employeeDate.getFullYear() === filters.year
    const matchesSearch =
      employee.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.cargo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesContract = contractFilter === "todos" || employee.tipocontrato === contractFilter
    const matchesStatus = statusFilter === "todos" || employee.status === statusFilter

    return matchesMonth && matchesYear && matchesSearch && matchesContract && matchesStatus
  })

  // Calcular total dos salários filtrados
  const totalSalary = filteredEmployees.reduce((sum, employee) => sum + employee.valormensal, 0)
  const totalPaid = filteredEmployees
    .filter((e) => e.status === "Pago")
    .reduce((sum, employee) => sum + employee.valormensal, 0)
  const totalPending = filteredEmployees
    .filter((e) => e.status === "Pendente")
    .reduce((sum, employee) => sum + employee.valormensal, 0)

  // Adicionar novo colaborador
  const handleAddEmployee = () => {
    const newId = Math.max(0, ...employees.map((e) => e.id)) + 1
    setEmployees([...employees, { id: newId, ...newEmployee }])
    setIsAddDialogOpen(false)
    setNewEmployee({
      nome: "",
      cargo: "",
      tipocontrato: "CLT",
      valormensal: 0,
      datapagamento: new Date().toISOString().split("T")[0],
      status: "Pendente",
    })
  }

  // Editar colaborador
  const handleEditEmployee = () => {
    if (!currentEmployee) return
    setEmployees(employees.map((employee) => (employee.id === currentEmployee.id ? { ...currentEmployee } : employee)))
    setIsEditDialogOpen(false)
    setCurrentEmployee(null)
  }

  // Remover colaborador
  const handleRemoveEmployee = (id: number) => {
    setEmployees(employees.filter((employee) => employee.id !== id))
  }

  // Marcar como pago/pendente
  const togglePaymentStatus = (id: number) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id ? { ...employee, status: employee.status === "Pago" ? "Pendente" : "Pago" } : employee,
      ),
    )
  }

  // Exportar dados
  const handleExport = () => {
    const csvContent = [
      ["ID", "Nome", "Cargo", "Tipo de Contrato", "Valor Mensal", "Data de Pagamento", "Status"],
      ...filteredEmployees.map((employee) => [
        employee.id,
        employee.nome,
        employee.cargo,
        employee.tipocontrato,
        employee.valormensal,
        employee.datapagamento,
        employee.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `colaboradores_${months[filters.month]}_${filters.year}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2">
            <Select
              value={filters.month.toString()}
              onValueChange={(value) => updateFilters({ month: Number.parseInt(value) })}
            >
              <SelectTrigger className="w-[180px] bg-[#0a1929] border-[#1e3a5f] text-white">
                <Calendar className="mr-2 h-4 w-4 text-cyan-400" />
                <SelectValue placeholder="Mês" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                {months.map((month, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.year.toString()}
              onValueChange={(value) => updateFilters({ year: Number.parseInt(value) })}
            >
              <SelectTrigger className="w-[120px] bg-[#0a1929] border-[#1e3a5f] text-white">
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                {[2024, 2025, 2026].map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Select value={contractFilter} onValueChange={setContractFilter}>
              <SelectTrigger className="w-[180px] bg-[#0a1929] border-[#1e3a5f] text-white">
                <Filter className="mr-2 h-4 w-4 text-cyan-400" />
                <SelectValue placeholder="Tipo de Contrato" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="CLT">CLT</SelectItem>
                <SelectItem value="PJ">PJ</SelectItem>
                <SelectItem value="Freelancer">Freelancer</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-[#0a1929] border-[#1e3a5f] text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Pago">Pago</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-cyan-400" />
              <Input
                placeholder="Buscar colaborador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full bg-[#0a1929] border-[#1e3a5f] text-white placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cyan-600 text-white hover:bg-cyan-700">
                <Plus className="mr-2 h-4 w-4" />
                Novo Colaborador
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0f2744] border-[#1e3a5f] text-white">
              <DialogHeader>
                <DialogTitle className="text-white">Adicionar Novo Colaborador</DialogTitle>
                <DialogDescription className="text-slate-300">Preencha os dados do novo colaborador</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nome" className="text-right text-slate-300">
                    Nome
                  </Label>
                  <Input
                    id="nome"
                    value={newEmployee.nome}
                    onChange={(e) => setNewEmployee({ ...newEmployee, nome: e.target.value })}
                    className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cargo" className="text-right text-slate-300">
                    Cargo
                  </Label>
                  <Input
                    id="cargo"
                    value={newEmployee.cargo}
                    onChange={(e) => setNewEmployee({ ...newEmployee, cargo: e.target.value })}
                    className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tipoContrato" className="text-right text-slate-300">
                    Tipo de Contrato
                  </Label>
                  <Select
                    value={newEmployee.tipocontrato}
                    onValueChange={(value) => setNewEmployee({ ...newEmployee, tipocontrato: value })}
                  >
                    <SelectTrigger className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white">
                      <SelectValue placeholder="Selecione o tipo de contrato" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                      <SelectItem value="CLT">CLT</SelectItem>
                      <SelectItem value="PJ">PJ</SelectItem>
                      <SelectItem value="Freelancer">Freelancer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="valorMensal" className="text-right text-slate-300">
                    Valor Mensal (R$)
                  </Label>
                  <Input
                    id="valorMensal"
                    type="number"
                    value={newEmployee.valormensal}
                    onChange={(e) => setNewEmployee({ ...newEmployee, valormensal: Number.parseFloat(e.target.value) })}
                    className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dataPagamento" className="text-right text-slate-300">
                    Data de Pagamento
                  </Label>
                  <Input
                    id="dataPagamento"
                    type="date"
                    value={newEmployee.datapagamento}
                    onChange={(e) => setNewEmployee({ ...newEmployee, datapagamento: e.target.value })}
                    className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right text-slate-300">
                    Status
                  </Label>
                  <Select
                    value={newEmployee.status}
                    onValueChange={(value) => setNewEmployee({ ...newEmployee, status: value })}
                  >
                    <SelectTrigger className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                      <SelectItem value="Pago">Pago</SelectItem>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddEmployee} className="bg-cyan-600 text-white hover:bg-cyan-700">
                  Adicionar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="bg-[#0f2744] border-[#1e3a5f] text-white">
              <DialogHeader>
                <DialogTitle className="text-white">Editar Colaborador</DialogTitle>
                <DialogDescription className="text-slate-300">Atualize os dados do colaborador</DialogDescription>
              </DialogHeader>
              {currentEmployee && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-nome" className="text-right text-slate-300">
                      Nome
                    </Label>
                    <Input
                      id="edit-nome"
                      value={currentEmployee.nome}
                      onChange={(e) => setCurrentEmployee({ ...currentEmployee, nome: e.target.value })}
                      className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-cargo" className="text-right text-slate-300">
                      Cargo
                    </Label>
                    <Input
                      id="edit-cargo"
                      value={currentEmployee.cargo}
                      onChange={(e) => setCurrentEmployee({ ...currentEmployee, cargo: e.target.value })}
                      className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-tipoContrato" className="text-right text-slate-300">
                      Tipo de Contrato
                    </Label>
                    <Select
                      value={currentEmployee.tipocontrato}
                      onValueChange={(value) => setCurrentEmployee({ ...currentEmployee, tipocontrato: value })}
                    >
                      <SelectTrigger className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white">
                        <SelectValue placeholder="Selecione o tipo de contrato" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                        <SelectItem value="CLT">CLT</SelectItem>
                        <SelectItem value="PJ">PJ</SelectItem>
                        <SelectItem value="Freelancer">Freelancer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-valorMensal" className="text-right text-slate-300">
                      Valor Mensal (R$)
                    </Label>
                    <Input
                      id="edit-valorMensal"
                      type="number"
                      value={currentEmployee.valormensal}
                      onChange={(e) =>
                        setCurrentEmployee({ ...currentEmployee, valormensal: Number.parseFloat(e.target.value) })
                      }
                      className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-dataPagamento" className="text-right text-slate-300">
                      Data de Pagamento
                    </Label>
                    <Input
                      id="edit-dataPagamento"
                      type="date"
                      value={currentEmployee.datapagamento}
                      onChange={(e) => setCurrentEmployee({ ...currentEmployee, datapagamento: e.target.value })}
                      className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-status" className="text-right text-slate-300">
                      Status
                    </Label>
                    <Select
                      value={currentEmployee.status}
                      onValueChange={(value) => setCurrentEmployee({ ...currentEmployee, status: value })}
                    >
                      <SelectTrigger className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                        <SelectItem value="Pago">Pago</SelectItem>
                        <SelectItem value="Pendente">Pendente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button type="submit" onClick={handleEditEmployee} className="bg-cyan-600 text-white hover:bg-cyan-700">
                  Salvar Alterações
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            onClick={handleExport}
            className="border-[#1e3a5f] bg-[#0a1929] text-cyan-400 hover:bg-[#163456]"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Total de Salários</p>
              <p className="text-2xl font-bold text-white">
                R$ {totalSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-[#163456] flex items-center justify-center">
              <span className="text-lg font-bold text-cyan-400">{filteredEmployees.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Já Pago</p>
              <p className="text-2xl font-bold text-green-400">
                R$ {totalPaid.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </CardContent>
        </Card>

        <Card className="bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Pendente</p>
              <p className="text-2xl font-bold text-yellow-400">
                R$ {totalPending.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-400" />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e3a5f]">
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Nome</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Cargo</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Tipo de Contrato</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Valor Mensal</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Data de Pagamento</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Status</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b border-[#1e3a5f]">
                    <td className="py-4 px-6 font-medium text-white text-sm">{employee.nome}</td>
                    <td className="py-4 px-6 text-slate-300 text-sm">{employee.cargo}</td>
                    <td className="py-4 px-6 text-sm">
                      <Badge
                        variant="outline"
                        className={
                          employee.tipocontrato === "CLT"
                            ? "bg-green-900 text-green-300 border-green-700"
                            : employee.tipocontrato === "PJ"
                              ? "bg-blue-900 text-blue-300 border-blue-700"
                              : "bg-yellow-900 text-yellow-300 border-yellow-700"
                        }
                      >
                        {employee.tipocontrato}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-cyan-400 text-sm">
                      R$ {employee.valormensal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 px-6 text-slate-300 text-sm">
                      {new Date(employee.datapagamento).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="py-4 px-6 text-sm">
                      <Badge
                        variant="outline"
                        className={
                          employee.status === "Pago"
                            ? "bg-green-900 text-green-300 border-green-700 cursor-pointer"
                            : "bg-yellow-900 text-yellow-300 border-yellow-700 cursor-pointer"
                        }
                        onClick={() => togglePaymentStatus(employee.id)}
                      >
                        {employee.status === "Pago" ? (
                          <>
                            <CheckCircle className="mr-1 h-3 w-3" /> Pago
                          </>
                        ) : (
                          <>
                            <Clock className="mr-1 h-3 w-3" /> Pendente
                          </>
                        )}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-[#1e3a5f] bg-[#0a1929] text-cyan-400 hover:bg-[#163456]"
                          onClick={() => {
                            setCurrentEmployee(employee)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-[#1e3a5f] bg-[#0a1929] text-red-400 hover:bg-[#163456]"
                          onClick={() => handleRemoveEmployee(employee.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
