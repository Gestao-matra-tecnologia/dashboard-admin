"use client"

import { useState } from "react"
import { ArrowDownCircle, Download, Filter, Plus, Search, Calendar, CheckCircle, Clock } from "lucide-react"
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

// Dados de exemplo para saídas financeiras
const initialExpenses = [
  {
    id: 1,
    conta: "Aluguel Escritório",
    descricao: "Aluguel mensal",
    valor: 4500,
    data: "2025-04-05",
    tipo: "Fixa",
    observacoes: "Contrato anual",
    pago: true,
    recorrente: true,
  },
  {
    id: 2,
    conta: "Salários",
    descricao: "Folha de pagamento",
    valor: 25000,
    data: "2025-04-01",
    tipo: "Fixa",
    observacoes: "Equipe completa",
    pago: true,
    recorrente: true,
  },
  {
    id: 3,
    conta: "Infraestrutura Cloud",
    descricao: "Servidores e serviços",
    valor: 3500,
    data: "2025-04-03",
    tipo: "Variável",
    observacoes: "AWS + Google Cloud",
    pago: true,
    recorrente: true,
  },
  {
    id: 4,
    conta: "Marketing",
    descricao: "Campanha Meta Ads",
    valor: 8000,
    data: "2025-04-07",
    tipo: "Variável",
    observacoes: "Campanha Spotform",
    pago: true,
    recorrente: false,
  },
  {
    id: 5,
    conta: "Equipamentos",
    descricao: "Notebooks novos",
    valor: 12000,
    data: "2025-04-15",
    tipo: "Empresa",
    observacoes: "3 notebooks para equipe de dev",
    pago: false,
    recorrente: false,
  },
  {
    id: 6,
    conta: "Empréstimo",
    descricao: "Parcela financiamento",
    valor: 2500,
    data: "2025-04-20",
    tipo: "Parcelamento",
    observacoes: "Parcela 5/24",
    pago: false,
    recorrente: true,
  },
  {
    id: 7,
    conta: "Pró-labore",
    descricao: "Retirada sócios",
    valor: 10000,
    data: "2025-04-10",
    tipo: "Pessoal",
    observacoes: "Dividido entre sócios",
    pago: true,
    recorrente: true,
  },
]

// Atualizar a interface do componente para receber e atualizar dados
interface FinanceExpenseTableProps {
  filters: {
    month: number
    year: number
  }
  updateFilters: (filters: Partial<{ month: number; year: number }>) => void
  data: any[]
  updateData: (data: any[]) => void
}

export default function FinanceExpenseTable({ filters, updateFilters, data, updateData }: FinanceExpenseTableProps) {
  // Usar os dados passados via props ou inicializar com dados de exemplo se estiver vazio
  const [expenses, setExpenses] = useState(data && data.length > 0 ? data : initialExpenses)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("todos")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newExpense, setNewExpense] = useState({
    conta: "",
    descricao: "",
    valor: 0,
    data: new Date().toISOString().split("T")[0],
    tipo: "Fixa",
    observacoes: "",
    pago: false,
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
  const updateExpenses = (newExpenses: any[]) => {
    setExpenses(newExpenses)
    updateData(newExpenses)
  }

  // Filtrar saídas por mês/ano e outros filtros
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.data)
    const matchesMonth = expenseDate.getMonth() === filters.month
    const matchesYear = expenseDate.getFullYear() === filters.year
    const matchesSearch =
      expense.conta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.observacoes.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "todos" || expense.tipo === typeFilter
    const matchesStatus =
      statusFilter === "todos" ||
      (statusFilter === "pago" && expense.pago) ||
      (statusFilter === "pendente" && !expense.pago)

    return matchesMonth && matchesYear && matchesSearch && matchesType && matchesStatus
  })

  // Calcular total das saídas filtradas
  const totalExpense = filteredExpenses.reduce((sum, expense) => sum + expense.valor, 0)
  const totalPaid = filteredExpenses.filter((e) => e.pago).reduce((sum, expense) => sum + expense.valor, 0)
  const totalPending = filteredExpenses.filter((e) => !e.pago).reduce((sum, expense) => sum + expense.valor, 0)

  // Adicionar nova saída
  const handleAddExpense = () => {
    const newId = Math.max(0, ...expenses.map((e) => e.id)) + 1
    const updatedExpenses = [...expenses, { id: newId, ...newExpense }]
    updateExpenses(updatedExpenses)
    setIsAddDialogOpen(false)
    setNewExpense({
      conta: "",
      descricao: "",
      valor: 0,
      data: new Date().toISOString().split("T")[0],
      tipo: "Fixa",
      observacoes: "",
      pago: false,
      recorrente: false,
    })
  }

  // Remover saída
  const handleRemoveExpense = (id: number) => {
    updateExpenses(expenses.filter((expense) => expense.id !== id))
  }

  // Marcar como pago/pendente
  const togglePaymentStatus = (id: number) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === id ? { ...expense, pago: !expense.pago } : expense,
    )
    updateExpenses(updatedExpenses)
  }

  // Exportar dados
  const handleExport = () => {
    const csvContent = [
      ["ID", "Conta", "Descrição", "Valor", "Data", "Tipo", "Observações", "Pago", "Recorrente"],
      ...filteredExpenses.map((expense) => [
        expense.id,
        expense.conta,
        expense.descricao,
        expense.valor,
        expense.data,
        expense.tipo,
        expense.observacoes,
        expense.pago ? "Sim" : "Não",
        expense.recorrente ? "Sim" : "Não",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `saidas_${months[filters.month]}_${filters.year}.csv`)
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
                <SelectItem value="Fixa">Fixa</SelectItem>
                <SelectItem value="Variável">Variável</SelectItem>
                <SelectItem value="Pessoal">Pessoal</SelectItem>
                <SelectItem value="Empresa">Empresa</SelectItem>
                <SelectItem value="Parcelamento">Parcelamento</SelectItem>
                <SelectItem value="Dívida">Dívida</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-[#0a1929] border-[#1e3a5f] text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pago">Pago</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-cyan-400" />
              <Input
                placeholder="Buscar conta..."
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
                Nova Saída
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0f2744] border-[#1e3a5f] text-white">
              <DialogHeader>
                <DialogTitle className="text-white">Adicionar Nova Saída</DialogTitle>
                <DialogDescription className="text-slate-300">
                  Preencha os dados da nova saída financeira
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="conta" className="text-right text-slate-300">
                    Conta / Fonte
                  </Label>
                  <Input
                    id="conta"
                    value={newExpense.conta}
                    onChange={(e) => setNewExpense({ ...newExpense, conta: e.target.value })}
                    className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="descricao" className="text-right text-slate-300">
                    Descrição
                  </Label>
                  <Input
                    id="descricao"
                    value={newExpense.descricao}
                    onChange={(e) => setNewExpense({ ...newExpense, descricao: e.target.value })}
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
                    value={newExpense.valor}
                    onChange={(e) => setNewExpense({ ...newExpense, valor: Number.parseFloat(e.target.value) })}
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
                    value={newExpense.data}
                    onChange={(e) => setNewExpense({ ...newExpense, data: e.target.value })}
                    className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tipo" className="text-right text-slate-300">
                    Tipo
                  </Label>
                  <Select
                    value={newExpense.tipo}
                    onValueChange={(value) => setNewExpense({ ...newExpense, tipo: value })}
                  >
                    <SelectTrigger className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                      <SelectItem value="Fixa">Fixa</SelectItem>
                      <SelectItem value="Variável">Variável</SelectItem>
                      <SelectItem value="Pessoal">Pessoal</SelectItem>
                      <SelectItem value="Empresa">Empresa</SelectItem>
                      <SelectItem value="Parcelamento">Parcelamento</SelectItem>
                      <SelectItem value="Dívida">Dívida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="observacoes" className="text-right text-slate-300">
                    Observações
                  </Label>
                  <Input
                    id="observacoes"
                    value={newExpense.observacoes}
                    onChange={(e) => setNewExpense({ ...newExpense, observacoes: e.target.value })}
                    className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="text-right text-slate-300">Status</div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pago"
                      checked={newExpense.pago}
                      onCheckedChange={(checked) => setNewExpense({ ...newExpense, pago: checked === true })}
                      className="border-[#1e3a5f] data-[state=checked]:bg-cyan-600"
                    />
                    <label htmlFor="pago" className="text-sm font-medium leading-none text-slate-300">
                      Já pago
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="text-right text-slate-300">Recorrência</div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="recorrente"
                      checked={newExpense.recorrente}
                      onCheckedChange={(checked) => setNewExpense({ ...newExpense, recorrente: checked === true })}
                      className="border-[#1e3a5f] data-[state=checked]:bg-cyan-600"
                    />
                    <label htmlFor="recorrente" className="text-sm font-medium leading-none text-slate-300">
                      Saída mensal recorrente
                    </label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddExpense} className="bg-cyan-600 text-white hover:bg-cyan-700">
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
              <p className="text-sm text-slate-300">Total de Saídas</p>
              <p className="text-2xl font-bold text-red-400">
                R$ {totalExpense.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <ArrowDownCircle className="h-8 w-8 text-red-400" />
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
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Conta / Fonte</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Descrição</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Valor</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Data</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Tipo</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Status</th>
                  <th className="text-left font-medium py-4 px-6 text-sm text-slate-300">Recorrente</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense) => (
                    <tr key={expense.id} className="border-b border-[#1e3a5f] hover:bg-[#0a1929]">
                      <td className="py-4 px-6">{expense.conta}</td>
                      <td className="py-4 px-6">{expense.descricao}</td>
                      <td className="py-4 px-6 text-red-400">
                        R$ {expense.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-6">{new Date(expense.data).toLocaleDateString("pt-BR")}</td>
                      <td className="py-4 px-6">{expense.tipo}</td>
                      <td className="py-4 px-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePaymentStatus(expense.id)}
                          className={`${
                            expense.pago
                              ? "text-green-400 hover:text-green-500"
                              : "text-yellow-400 hover:text-yellow-500"
                          }`}
                        >
                          {expense.pago ? (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Pago
                            </>
                          ) : (
                            <>
                              <Clock className="mr-2 h-4 w-4" />
                              Pendente
                            </>
                          )}
                        </Button>
                      </td>
                      <td className="py-4 px-6">{expense.recorrente ? "Sim" : "Não"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      Nenhuma saída encontrada para os filtros selecionados.
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
