"use client"

import { ArrowDownCircle, ArrowUpCircle, DollarSign, Download, Filter, Plus, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const financas = [
  {
    id: 1,
    tipo: "Receita",
    descricao: "Mensalidade Spotform",
    valor: 5000,
    data: "05/04/2025",
    responsavel: "Carol",
    categoria: "Produtos",
  },
  {
    id: 2,
    tipo: "Receita",
    descricao: "Projeto Alpha Móveis",
    valor: 12000,
    data: "10/04/2025",
    responsavel: "Jeremias",
    categoria: "Projeto",
  },
  {
    id: 3,
    tipo: "Custo",
    descricao: "Salários",
    valor: 25000,
    data: "01/04/2025",
    responsavel: "Carol",
    categoria: "Time",
  },
  {
    id: 4,
    tipo: "Custo",
    descricao: "Infraestrutura Cloud",
    valor: 3500,
    data: "03/04/2025",
    responsavel: "Bruno",
    categoria: "Fixos",
  },
  {
    id: 5,
    tipo: "Investimento",
    descricao: "Campanha Meta Ads",
    valor: 8000,
    data: "07/04/2025",
    responsavel: "Luiz",
    categoria: "Ads",
  },
  {
    id: 6,
    tipo: "Receita",
    descricao: "Mensalidade NotifyX",
    valor: 2000,
    data: "05/04/2025",
    responsavel: "Carol",
    categoria: "Produtos",
  },
  {
    id: 7,
    tipo: "Custo",
    descricao: "Aluguel Escritório",
    valor: 4500,
    data: "10/04/2025",
    responsavel: "Carol",
    categoria: "Fixos",
  },
]

export default function FinanceTable() {
  const totalReceitas = financas.filter((item) => item.tipo === "Receita").reduce((acc, item) => acc + item.valor, 0)

  const totalCustos = financas.filter((item) => item.tipo === "Custo").reduce((acc, item) => acc + item.valor, 0)

  const totalInvestimentos = financas
    .filter((item) => item.tipo === "Investimento")
    .reduce((acc, item) => acc + item.valor, 0)

  const saldo = totalReceitas - totalCustos - totalInvestimentos

  return (
    <>
      <div className="grid gap-4 md:grid-cols-4 mb-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {totalReceitas.toLocaleString("pt-BR")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custos</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R$ {totalCustos.toLocaleString("pt-BR")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investimentos</CardTitle>
            <Upload className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">R$ {totalInvestimentos.toLocaleString("pt-BR")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${saldo >= 0 ? "text-green-600" : "text-red-600"}`}>
              R$ {saldo.toLocaleString("pt-BR")}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Valores e Finanças</CardTitle>
          <div className="flex gap-2">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Nova Transação
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Select defaultValue="todos">
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="receita">Receita</SelectItem>
                <SelectItem value="custo">Custo</SelectItem>
                <SelectItem value="investimento">Investimento</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium p-2">Tipo</th>
                  <th className="text-left font-medium p-2">Descrição</th>
                  <th className="text-left font-medium p-2">Valor</th>
                  <th className="text-left font-medium p-2">Data</th>
                  <th className="text-left font-medium p-2">Responsável</th>
                  <th className="text-left font-medium p-2">Categoria</th>
                </tr>
              </thead>
              <tbody>
                {financas.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">
                      <Badge
                        variant="outline"
                        className={
                          item.tipo === "Receita"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : item.tipo === "Custo"
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        }
                      >
                        {item.tipo === "Receita" && <ArrowUpCircle className="mr-1 h-3 w-3" />}
                        {item.tipo === "Custo" && <ArrowDownCircle className="mr-1 h-3 w-3" />}
                        {item.tipo === "Investimento" && <Upload className="mr-1 h-3 w-3" />}
                        {item.tipo}
                      </Badge>
                    </td>
                    <td className="p-2 font-medium">{item.descricao}</td>
                    <td className={`p-2 font-medium ${item.tipo === "Receita" ? "text-green-600" : "text-red-600"}`}>
                      R$ {item.valor.toLocaleString("pt-BR")}
                    </td>
                    <td className="p-2">{item.data}</td>
                    <td className="p-2">{item.responsavel}</td>
                    <td className="p-2">{item.categoria}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
