"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"

interface Role {
  id: string
  title: string
  department: string
  responsibilities: string
  requirements: string
}

const initialRoles: Role[] = [
  {
    id: "1",
    title: "Desenvolvedor Frontend",
    department: "Tecnologia",
    responsibilities: "Desenvolvimento de interfaces, implementação de componentes React",
    requirements: "React, TypeScript, HTML, CSS",
  },
  {
    id: "2",
    title: "Desenvolvedor Backend",
    department: "Tecnologia",
    responsibilities: "Desenvolvimento de APIs, implementação de serviços",
    requirements: "Node.js, Express, PostgreSQL",
  },
  {
    id: "3",
    title: "Designer UX/UI",
    department: "Design",
    responsibilities: "Criação de interfaces, prototipagem, pesquisa de usuário",
    requirements: "Figma, Adobe XD, Princípios de UX",
  },
  {
    id: "4",
    title: "Gerente de Projetos",
    department: "Gestão",
    responsibilities: "Coordenação de equipes, planejamento de projetos",
    requirements: "Certificação PMP, experiência em metodologias ágeis",
  },
]

export default function RolesTable() {
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [newRole, setNewRole] = useState<Partial<Role>>({
    title: "",
    department: "",
    responsibilities: "",
    requirements: "",
  })
  const [isAdding, setIsAdding] = useState(false)

  const handleAddRole = () => {
    if (!newRole.title || !newRole.department || !newRole.responsibilities || !newRole.requirements) {
      return
    }

    const role: Role = {
      id: Date.now().toString(),
      title: newRole.title,
      department: newRole.department,
      responsibilities: newRole.responsibilities,
      requirements: newRole.requirements,
    }

    setRoles([...roles, role])
    setNewRole({
      title: "",
      department: "",
      responsibilities: "",
      requirements: "",
    })
    setIsAdding(false)
  }

  const handleEditRole = (role: Role) => {
    setEditingRole(role)
  }

  const handleUpdateRole = () => {
    if (!editingRole) return

    setRoles(roles.map((role) => (role.id === editingRole.id ? editingRole : role)))
    setEditingRole(null)
  }

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter((role) => role.id !== id))
  }

  return (
    <Card className="bg-slate-800 text-white border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Cargos e Funções</CardTitle>
        <Button
          onClick={() => setIsAdding(!isAdding)}
          variant="outline"
          className="text-white border-blue-500 hover:bg-blue-700"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Cargo
        </Button>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <Card className="mb-4 bg-slate-700 border-none">
            <CardContent className="pt-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">Cargo</label>
                    <Input
                      value={newRole.title}
                      onChange={(e) => setNewRole({ ...newRole, title: e.target.value })}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">Departamento</label>
                    <Input
                      value={newRole.department}
                      onChange={(e) => setNewRole({ ...newRole, department: e.target.value })}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Responsabilidades</label>
                  <Input
                    value={newRole.responsibilities}
                    onChange={(e) => setNewRole({ ...newRole, responsibilities: e.target.value })}
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Requisitos</label>
                  <Input
                    value={newRole.requirements}
                    onChange={(e) => setNewRole({ ...newRole, requirements: e.target.value })}
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button onClick={() => setIsAdding(false)} variant="outline" className="text-white border-gray-500">
                    Cancelar
                  </Button>
                  <Button onClick={handleAddRole} className="bg-blue-600 hover:bg-blue-700 text-white">
                    Salvar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {editingRole && (
          <Card className="mb-4 bg-slate-700 border-none">
            <CardContent className="pt-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">Cargo</label>
                    <Input
                      value={editingRole.title}
                      onChange={(e) => setEditingRole({ ...editingRole, title: e.target.value })}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">Departamento</label>
                    <Input
                      value={editingRole.department}
                      onChange={(e) => setEditingRole({ ...editingRole, department: e.target.value })}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Responsabilidades</label>
                  <Input
                    value={editingRole.responsibilities}
                    onChange={(e) => setEditingRole({ ...editingRole, responsibilities: e.target.value })}
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Requisitos</label>
                  <Input
                    value={editingRole.requirements}
                    onChange={(e) => setEditingRole({ ...editingRole, requirements: e.target.value })}
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button onClick={() => setEditingRole(null)} variant="outline" className="text-white border-gray-500">
                    Cancelar
                  </Button>
                  <Button onClick={handleUpdateRole} className="bg-blue-600 hover:bg-blue-700 text-white">
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
                <TableHead className="text-white">Cargo</TableHead>
                <TableHead className="text-white">Departamento</TableHead>
                <TableHead className="text-white">Responsabilidades</TableHead>
                <TableHead className="text-white">Requisitos</TableHead>
                <TableHead className="text-white text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id} className="border-slate-700">
                  <TableCell className="font-medium text-white">{role.title}</TableCell>
                  <TableCell className="text-white">{role.department}</TableCell>
                  <TableCell className="text-white">{role.responsibilities}</TableCell>
                  <TableCell className="text-white">{role.requirements}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={() => handleEditRole(role)}
                        size="sm"
                        variant="ghost"
                        className="text-blue-400 hover:text-blue-300 hover:bg-slate-700"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteRole(role.id)}
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
