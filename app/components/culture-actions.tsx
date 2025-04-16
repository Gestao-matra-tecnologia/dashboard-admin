"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Pencil, Trash2, Calendar } from "lucide-react"

interface CultureAction {
  id: string
  name: string
  description: string
  date: string
  status: "Planejada" | "Em andamento" | "Concluída"
}

const initialActions: CultureAction[] = [
  {
    id: "1",
    name: "Workshop de Comunicação",
    description: "Workshop para melhorar a comunicação entre equipes",
    date: "2023-06-15",
    status: "Concluída",
  },
  {
    id: "2",
    name: "Programa de Mentoria",
    description: "Programa de mentoria para desenvolvedores júnior",
    date: "2023-08-01",
    status: "Em andamento",
  },
  {
    id: "3",
    name: "Dia de Integração",
    description: "Atividades de integração entre departamentos",
    date: "2023-09-20",
    status: "Planejada",
  },
  {
    id: "4",
    name: "Pesquisa de Clima Organizacional",
    description: "Avaliação do clima e cultura da empresa",
    date: "2023-07-10",
    status: "Concluída",
  },
]

export default function CultureActions() {
  const [actions, setActions] = useState<CultureAction[]>(initialActions)
  const [editingAction, setEditingAction] = useState<CultureAction | null>(null)
  const [newAction, setNewAction] = useState<Partial<CultureAction>>({
    name: "",
    description: "",
    date: "",
    status: "Planejada",
  })
  const [isAdding, setIsAdding] = useState(false)

  const handleAddAction = () => {
    if (!newAction.name || !newAction.description || !newAction.date || !newAction.status) {
      return
    }

    const action: CultureAction = {
      id: Date.now().toString(),
      name: newAction.name,
      description: newAction.description,
      date: newAction.date,
      status: newAction.status as "Planejada" | "Em andamento" | "Concluída",
    }

    setActions([...actions, action])
    setNewAction({
      name: "",
      description: "",
      date: "",
      status: "Planejada",
    })
    setIsAdding(false)
  }

  const handleEditAction = (action: CultureAction) => {
    setEditingAction(action)
  }

  const handleUpdateAction = () => {
    if (!editingAction) return

    setActions(actions.map((action) => (action.id === editingAction.id ? editingAction : action)))
    setEditingAction(null)
  }

  const handleDeleteAction = (id: string) => {
    setActions(actions.filter((action) => action.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planejada":
        return "bg-yellow-500/20 text-yellow-500"
      case "Em andamento":
        return "bg-blue-500/20 text-blue-500"
      case "Concluída":
        return "bg-green-500/20 text-green-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  return (
    <Card className="bg-slate-800 text-white border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Ações de Cultura</CardTitle>
        <Button
          onClick={() => setIsAdding(!isAdding)}
          variant="outline"
          className="text-white border-blue-500 hover:bg-blue-700"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Ação
        </Button>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <Card className="mb-4 bg-slate-700 border-none">
            <CardContent className="pt-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">Nome da Ação</label>
                    <Input
                      value={newAction.name}
                      onChange={(e) => setNewAction({ ...newAction, name: e.target.value })}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">Data</label>
                    <Input
                      type="date"
                      value={newAction.date}
                      onChange={(e) => setNewAction({ ...newAction, date: e.target.value })}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Descrição</label>
                  <Input
                    value={newAction.description}
                    onChange={(e) => setNewAction({ ...newAction, description: e.target.value })}
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Status</label>
                  <select
                    value={newAction.status}
                    onChange={(e) => setNewAction({ ...newAction, status: e.target.value as any })}
                    className="w-full rounded-md bg-slate-600 border-slate-500 text-white p-2"
                  >
                    <option value="Planejada">Planejada</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Concluída">Concluída</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button onClick={() => setIsAdding(false)} variant="outline" className="text-white border-gray-500">
                    Cancelar
                  </Button>
                  <Button onClick={handleAddAction} className="bg-blue-600 hover:bg-blue-700 text-white">
                    Salvar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {editingAction && (
          <Card className="mb-4 bg-slate-700 border-none">
            <CardContent className="pt-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">Nome da Ação</label>
                    <Input
                      value={editingAction.name}
                      onChange={(e) => setEditingAction({ ...editingAction, name: e.target.value })}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">Data</label>
                    <Input
                      type="date"
                      value={editingAction.date}
                      onChange={(e) => setEditingAction({ ...editingAction, date: e.target.value })}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Descrição</label>
                  <Input
                    value={editingAction.description}
                    onChange={(e) => setEditingAction({ ...editingAction, description: e.target.value })}
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Status</label>
                  <select
                    value={editingAction.status}
                    onChange={(e) => setEditingAction({ ...editingAction, status: e.target.value as any })}
                    className="w-full rounded-md bg-slate-600 border-slate-500 text-white p-2"
                  >
                    <option value="Planejada">Planejada</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Concluída">Concluída</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => setEditingAction(null)}
                    variant="outline"
                    className="text-white border-gray-500"
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleUpdateAction} className="bg-blue-600 hover:bg-blue-700 text-white">
                    Atualizar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="rounded-md border border-slate-700">
          <Table>
            <TableHeader className="bg-slate-700">
              <TableRow>
                <TableHead className="text-white">Nome</TableHead>
                <TableHead className="text-white">Descrição</TableHead>
                <TableHead className="text-white">Data</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actions.map((action) => (
                <TableRow key={action.id} className="border-slate-700">
                  <TableCell className="font-medium text-white">{action.name}</TableCell>
                  <TableCell className="text-white">{action.description}</TableCell>
                  <TableCell className="text-white">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                      {new Date(action.date).toLocaleDateString("pt-BR")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(action.status)}`}>
                      {action.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={() => handleEditAction(action)}
                        size="sm"
                        variant="ghost"
                        className="text-blue-400 hover:text-blue-300 hover:bg-slate-700"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteAction(action.id)}
                        size="sm"
                        variant="ghost"
                        className="text-red-400 hover:text-red-300 hover:bg-slate-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
