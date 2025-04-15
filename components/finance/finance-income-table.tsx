"use client"

import { useState } from "react"
import { ArrowUpCircle, Download, Filter, Plus, Search, Calendar, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { Checkbox } from "@/components/ui/checkbox"

// Dados de exemplo para entradas financeiras
const initialIncomes = [
  {
    id: 1,
    cliente: "Empresa ABC",
    descricao: "Desenvolvimento de site",
    valor: 15000,
    data: "2025-04-10",
    tipo: "Serviço",
    observacoes: "Projeto concluído",
    recebido: true,
    recorrente: false,
  },
  {
    id: 2,
    cliente: "Cliente XYZ",
    descricao: "Consultoria mensal",
    valor: 5000,
    data: "2025-04-05",
    tipo: "Consultoria",
    observacoes: "Contrato mensal",
    recebido: true,
    recorrente: true,
  },
  {
    id: 3,
    cliente: "Startup 123",
    descricao: "Licença software",
    valor: 2500,
    data: "2025-04-15",
    tipo: "Produto",
    observacoes: "Licença anual",
    recebido: false,
    recorrente: false,
  },
  {
    id: 4,
    cliente: "Corporação Global",
    descricao: "Manutenção sistemas",
    valor: 8000,
    data: "2025-04-20",
    tipo: "Serviço",
    observacoes: "Contrato trimestral",
    recebido: false,
    recorrente: true,
  },
  {
    id: 5,
    cliente: "Empresa Local",
    descricao: "Treinamento equipe",
    valor: 12000,
    data: "2025-04-08",
    tipo: "Treinamento",
    observacoes: "20 participantes",
    recebido: true,
    recorrente: false,
  },
]

// Atualizar a interface do componente para receber e atualizar dados
interface FinanceIncomeTableProps {
  filters: {
    month: number
    year: number
  }
  updateFilters: (filters: Partial<{ month: number; year: number }>) => void
  data: any[]
  updateData: (data: any[]) => void
}

export default function FinanceIncomeTable({ filters, updateFilters, data, updateData }: FinanceIncomeTableProps) {
  // Usar os dados passados via props ou inicializar com dados de exemplo se estiver vazio
  const [incomes, setIncomes] = useState(Array.isArray(data) && data.length > 0 ? data : initialIncomes)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("todos")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newIncome, setNewIncome] = useState({
    cliente: "",
    descricao: "",
    valor: 0,
    data: new Date().toISOString().split("T")[0],
    tipo: "Serviço",
    observacoes: "",
    recebido: false,
    recorrente: false,
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

  // Atualizar o estado local e propagar as mudanças para o componente pai
  const updateIncomes = (newIncomes: any[]) => {
    setIncomes(newIncomes)
    updateData(newIncomes)
  }

  // Filtrar entradas por mês/ano e outros filtros
  const filteredIncomes = incomes.filter((income) => {
    const incomeDate = new Date(income.data)
    const matchesMonth = incomeDate.getMonth() === filters.month
    const matchesYear = incomeDate.getFullYear() === filters.year
    const matchesSearch =
      income.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      income.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      income.observacoes.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "todos" || income.tipo === typeFilter
    const matchesStatus =
      statusFilter === "todos" ||
      (statusFilter === "recebido" && income.recebido) ||
      (statusFilter === "pendente" && !income.recebido)

    return matchesMonth && matchesYear && matchesSearch && matchesType && matchesStatus
  })

  // Calcular total das entradas filtradas
  const totalIncome = filteredIncomes.reduce((sum, income) => sum + income.valor, 0)
  const totalReceived = filteredIncomes.filter((i) => i.recebido).reduce((sum, income) => sum + income.valor, 0)
  const totalPending = filteredIncomes.filter((i) => !i.recebido).reduce((sum, income) => sum + income.valor, 0)

  // Adicionar nova entrada
  const handleAddIncome = () => {
    const newId = Math.max(0, ...incomes.map((i) => i.id)) + 1
    const updatedIncomes = [...incomes, { id: newId, ...newIncome }]
    updateIncomes(updatedIncomes)
    setIsAddDialogOpen(false)
    setNewIncome({
      cliente: "",
      descricao: "",
      valor: 0,
      data: new Date().toISOString().split("T")[0],
      tipo: "Serviço",
      observacoes: "",
      recebido: false,
      recorrente: false,
    })
  }

  // Remover entrada
  const handleRemoveIncome = (id: number) => {
    updateIncomes(incomes.filter((income) => income.id !== id))
  }

  // Marcar como recebido/pendente
  const togglePaymentStatus = (id: number) => {
    const updatedIncomes = incomes.map((income) =>
      income.id === id ? { ...income, recebido: !income.recebido } : income,
    )
    updateIncomes(updatedIncomes)
  }

  // Exportar dados
  const handleExport = () => {
    const csvContent = [
      ["ID", "Cliente", "Descrição", "Valor", "Data", "Tipo", "Observações", "Recebido", "Recorrente"],
      ...filteredIncomes.map((income) => [
        income.id,
        income.cliente,
        income.descricao,
        income.valor,
        income.data,
        income.tipo,
        income.observacoes,
        income.recebido ? "Sim" : "Não",
        income.recorrente ? "Sim" : "Não",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `entradas_${months[filters.month]}_${filters.year}.csv`)
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
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px] bg-[#0a1929] border-[#1e3a5f] text-white">
                <Filter className="mr-2 h-4 w-4 text-cyan-400" />
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Serviço">Serviço</SelectItem>
                <SelectItem value="Produto">Produto</SelectItem>
                <SelectItem value="Consultoria">Consultoria</SelectItem>
                <SelectItem value="Treinamento">Treinamento</SelectItem>
                <SelectItem value="Outro">Outro</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-[#0a1929] border-[#1e3a5f] text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="recebido">Recebido</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-cyan-400" />
              <Input
                placeholder="Buscar cliente..."
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
                Nova Entrada
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0f2744] border-[#1e3a5f] text-white">
              <DialogHeader>
                <DialogTitle className="text-white">Adicionar Nova Entrada</DialogTitle>
                <DialogDescription className="text-slate-300">
                  Preencha os dados da nova entrada financeira
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cliente" className="text-right text-slate-300">
                    Cliente
                  </Label>
                  <Input
                    id="cliente"
                    value={newIncome.cliente}
                    onChange={(e) => setNewIncome({ ...newIncome, cliente: e.target.value })}
                    className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="descricao" className="text-right text-slate-300">
                    Descrição
                  </Label>
                  <Input
                    id="descricao"
                    value={newIncome.descricao}
                    onChange={(e) => setNewIncome({ ...newIncome, descricao: e.target.value })}
                    className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="valor" className="text-right text-slate-300">
                    Valor (R$)
                  </Label>
                  <Input
                    id="valor"
                    type="number"
                    value={newIncome.valor}
                    onChange={(e) => setNewIncome({ ...newIncome, valor: Number.parseFloat(e.target.value) })}
                    className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="data" className="text-right text-slate-300">
                    Data
                  </Label>
                  <Input
                    id="data"
                    type="date"
                    value={newIncome.data}
                    onChange={(e) => setNewIncome({ ...newIncome, data: e.target.value })}
                    className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tipo" className="text-right text-slate-300">
                    Tipo
                  </Label>
                  <Select value={newIncome.tipo} onValueChange={(value) => setNewIncome({ ...newIncome, tipo: value })}>
                    <SelectTrigger className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                      <SelectItem value="Serviço">Serviço</SelectItem>
                      <SelectItem value="Produto">Produto</SelectItem>
                      <SelectItem value="Consultoria">Consultoria</SelectItem>
                      <SelectItem value="Treinamento">Treinamento</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="observacoes" className="text-right text-slate-300">
                    Observações
                  </Label>
                  <Input
                    id="observacoes"
                    value={newIncome.observacoes}
                    onChange={(e) => setNewIncome({ ...newIncome, observacoes: e.target.value })}
                    className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="text-right text-slate-300">Status</div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="recebido"
                      checked={newIncome.recebido}
                      onCheckedChange={(checked) => setNewIncome({ ...newIncome, recebido: checked === true })}
                      className="border-[#1e3a5f] data-[state=checked]:bg-cyan-600"
                    />
                    <label htmlFor="recebido" className="text-sm font-medium leading-none text-slate-300">
                      Já recebido
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="text-right text-slate-300">Recorrência</div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="recorrente"
                      checked={newIncome.recorrente}
                      onCheckedChange={(checked) => setNewIncome({ ...newIncome, recorrente: checked === true })}
                      className="border-[#1e3a5f] data-[state=checked]:bg-cyan-600"
                    />
                    <label htmlFor="recorrente" className="text-sm font-medium leading-none text-slate-300">
                      Entrada mensal recorrente
                    </label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddIncome} className="bg-cyan-600 text-white hover:bg-cyan-700">
                  Adicionar
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
              <p className="text-sm text-slate-300">Total de Entradas</p>
              <p className="text-2xl font-bold text-green-400">
                R$ {totalIncome.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <ArrowUpCircle className="h-8 w-8 text-green-400" />
          </CardContent>
        </Card>

        <Card className="bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Já Recebido</p>
              <p className="text-2xl font-bold text-green-400">
                R$ {totalReceived.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </CardContent>
        </Card>

        <Card className="bg-[#0f2744] border-[#1e3a5f] text-white shadow-lg">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">A Receber</p>
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
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Cliente</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Descrição</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Valor</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Data</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Tipo</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Status</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Recorrente</th>
                </tr>
              </thead>
              <tbody>
                {filteredIncomes.length > 0 ? (
                  filteredIncomes.map((income) => (
                    <tr key={income.id} className="border-b border-[#1e3a5f] hover:bg-[#0a1929]">
                      <td className="py-4 px-6">{income.cliente}</td>
                      <td className="py-4 px-6">{income.descricao}</td>
                      <td className="py-4 px-6 text-green-400">
                        R$ {income.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-6">{new Date(income.data).toLocaleDateString("pt-BR")}</td>
                      <td className="py-4 px-6">{income.tipo}</td>
                      <td className="py-4 px-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePaymentStatus(income.id)}
                          className={`${
                            income.recebido
                              ? "text-green-400 hover:text-green-500"
                              : "text-yellow-400 hover:text-yellow-500"
                          }`}
                        >
                          {income.recebido ? (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Recebido
                            </>
                          ) : (
                            <>
                              <Clock className="mr-2 h-4 w-4" />
                              Pendente
                            </>
                          )}
                        </Button>
                      </td>
                      <td className="py-4 px-6">{income.recorrente ? "Sim" : "Não"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      Nenhuma entrada encontrada para os filtros selecionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
