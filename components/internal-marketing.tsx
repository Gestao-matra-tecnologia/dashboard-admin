"use client"

import { useState, useEffect } from "react"
import { Edit, Filter, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { internalMarketingServices, type InternalMarketingCampaign } from "@/lib/mock-services"

export default function InternalMarketing() {
  const [campaigns, setCampaigns] = useState<InternalMarketingCampaign[]>([])
  const [statusFilter, setStatusFilter] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentCampaign, setCurrentCampaign] = useState<InternalMarketingCampaign | null>(null)
  const { toast } = useToast()

  const [newCampaign, setNewCampaign] = useState<Omit<InternalMarketingCampaign, "id">>({
    campanha: "",
    objetivo: "",
    responsavel: "",
    status: "Planejado",
    dataDisparo: new Date().toISOString().split("T")[0],
    tipoConteudo: "",
  })

  // Carregar dados
  useEffect(() => {
    const loadCampaigns = async () => {
      setIsLoading(true)
      try {
        const data = internalMarketingServices.getAll()
        setCampaigns(data)
      } catch (error) {
        console.error("Erro ao carregar campanhas:", error)
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar as campanhas de marketing interno.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadCampaigns()
  }, [toast])

  // Filtrar campanhas
  const filteredCampaigns = campaigns.filter((campanha) => {
    if (statusFilter !== "todos" && campanha.status !== statusFilter) return false
    if (
      searchTerm &&
      !campanha.campanha.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !campanha.objetivo.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false
    return true
  })

  // Adicionar nova campanha
  const handleAddCampaign = () => {
    try {
      const createdCampaign = internalMarketingServices.create(newCampaign)
      setCampaigns([...campaigns, createdCampaign])
      setIsAddDialogOpen(false)
      setNewCampaign({
        campanha: "",
        objetivo: "",
        responsavel: "",
        status: "Planejado",
        dataDisparo: new Date().toISOString().split("T")[0],
        tipoConteudo: "",
      })
      toast({
        title: "Campanha adicionada",
        description: "A campanha foi adicionada com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao adicionar campanha:", error)
      toast({
        title: "Erro ao adicionar campanha",
        description: "Não foi possível adicionar a campanha.",
        variant: "destructive",
      })
    }
  }

  // Atualizar campanha
  const handleUpdateCampaign = () => {
    if (!currentCampaign) return

    try {
      const updatedCampaign = internalMarketingServices.update(currentCampaign.id, currentCampaign)
      if (updatedCampaign) {
        setCampaigns(campaigns.map((campaign) => (campaign.id === updatedCampaign.id ? updatedCampaign : campaign)))
        setIsEditDialogOpen(false)
        setCurrentCampaign(null)
        toast({
          title: "Campanha atualizada",
          description: "A campanha foi atualizada com sucesso.",
        })
      }
    } catch (error) {
      console.error("Erro ao atualizar campanha:", error)
      toast({
        title: "Erro ao atualizar campanha",
        description: "Não foi possível atualizar a campanha.",
        variant: "destructive",
      })
    }
  }

  // Remover campanha
  const handleDeleteCampaign = (id: string) => {
    try {
      internalMarketingServices.delete(id)
      setCampaigns(campaigns.filter((campaign) => campaign.id !== id))
      toast({
        title: "Campanha removida",
        description: "A campanha foi removida com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao remover campanha:", error)
      toast({
        title: "Erro ao remover campanha",
        description: "Não foi possível remover a campanha.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="bg-[#0f2744] border-[#1e3a5f] text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-white">Marketing Interno</CardTitle>
        <Button size="sm" className="bg-cyan-600 text-white hover:bg-cyan-700" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Campanha
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar campanha..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0a1929] border-[#1e3a5f] text-white placeholder:text-slate-400"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-[#0a1929] border-[#1e3a5f] text-white">
                <Filter className="mr-2 h-4 w-4 text-cyan-400" />
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Planejado">Planejado</SelectItem>
                <SelectItem value="Em andamento">Em andamento</SelectItem>
                <SelectItem value="Finalizado">Finalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e3a5f]">
                  <th className="text-left font-medium p-2 text-slate-300">Campanha / Ação</th>
                  <th className="text-left font-medium p-2 text-slate-300">Objetivo</th>
                  <th className="text-left font-medium p-2 text-slate-300">Responsável</th>
                  <th className="text-left font-medium p-2 text-slate-300">Status</th>
                  <th className="text-left font-medium p-2 text-slate-300">Data de disparo</th>
                  <th className="text-left font-medium p-2 text-slate-300">Tipo de conteúdo</th>
                  <th className="text-left font-medium p-2 text-slate-300">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campanha) => (
                    <tr key={campanha.id} className="border-b border-[#1e3a5f]">
                      <td className="p-2 font-medium text-white">{campanha.campanha}</td>
                      <td className="p-2 text-slate-300">{campanha.objetivo}</td>
                      <td className="p-2 text-slate-300">{campanha.responsavel}</td>
                      <td className="p-2">
                        <Badge
                          variant="outline"
                          className={
                            campanha.status === "Finalizado"
                              ? "bg-green-900 text-green-300 border-green-700"
                              : campanha.status === "Em andamento"
                                ? "bg-blue-900 text-blue-300 border-blue-700"
                                : "bg-yellow-900 text-yellow-300 border-yellow-700"
                          }
                        >
                          {campanha.status}
                        </Badge>
                      </td>
                      <td className="p-2 text-slate-300">
                        {new Date(campanha.dataDisparo).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="p-2 text-slate-300">{campanha.tipoConteudo}</td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-[#1e3a5f] bg-[#0a1929] text-cyan-400 hover:bg-[#163456]"
                            onClick={() => {
                              setCurrentCampaign(campanha)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-[#1e3a5f] bg-[#0a1929] text-red-400 hover:bg-[#163456]"
                            onClick={() => handleDeleteCampaign(campanha.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-slate-400">
                      Nenhuma campanha encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>

      {/* Dialog para adicionar campanha */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-[#0f2744] border-[#1e3a5f] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Adicionar Nova Campanha</DialogTitle>
            <DialogDescription className="text-slate-300">
              Preencha os dados da nova campanha de marketing interno.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campanha" className="text-right text-slate-300">
                Campanha / Ação
              </Label>
              <Input
                id="campanha"
                value={newCampaign.campanha}
                onChange={(e) => setNewCampaign({ ...newCampaign, campanha: e.target.value })}
                className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="objetivo" className="text-right text-slate-300">
                Objetivo
              </Label>
              <Input
                id="objetivo"
                value={newCampaign.objetivo}
                onChange={(e) => setNewCampaign({ ...newCampaign, objetivo: e.target.value })}
                className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="responsavel" className="text-right text-slate-300">
                Responsável
              </Label>
              <Input
                id="responsavel"
                value={newCampaign.responsavel}
                onChange={(e) => setNewCampaign({ ...newCampaign, responsavel: e.target.value })}
                className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right text-slate-300">
                Status
              </Label>
              <Select
                value={newCampaign.status}
                onValueChange={(value: "Planejado" | "Em andamento" | "Finalizado") =>
                  setNewCampaign({ ...newCampaign, status: value })
                }
              >
                <SelectTrigger className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                  <SelectItem value="Planejado">Planejado</SelectItem>
                  <SelectItem value="Em andamento">Em andamento</SelectItem>
                  <SelectItem value="Finalizado">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dataDisparo" className="text-right text-slate-300">
                Data de disparo
              </Label>
              <Input
                id="dataDisparo"
                type="date"
                value={newCampaign.dataDisparo}
                onChange={(e) => setNewCampaign({ ...newCampaign, dataDisparo: e.target.value })}
                className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tipoConteudo" className="text-right text-slate-300">
                Tipo de conteúdo
              </Label>
              <Input
                id="tipoConteudo"
                value={newCampaign.tipoConteudo}
                onChange={(e) => setNewCampaign({ ...newCampaign, tipoConteudo: e.target.value })}
                className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                placeholder="Ex: Post, Vídeo, Email"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddCampaign} className="bg-cyan-600 text-white hover:bg-cyan-700">
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para editar campanha */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#0f2744] border-[#1e3a5f] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Editar Campanha</DialogTitle>
            <DialogDescription className="text-slate-300">Atualize os dados da campanha.</DialogDescription>
          </DialogHeader>
          {currentCampaign && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-campanha" className="text-right text-slate-300">
                  Campanha / Ação
                </Label>
                <Input
                  id="edit-campanha"
                  value={currentCampaign.campanha}
                  onChange={(e) => setCurrentCampaign({ ...currentCampaign, campanha: e.target.value })}
                  className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-objetivo" className="text-right text-slate-300">
                  Objetivo
                </Label>
                <Input
                  id="edit-objetivo"
                  value={currentCampaign.objetivo}
                  onChange={(e) => setCurrentCampaign({ ...currentCampaign, objetivo: e.target.value })}
                  className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-responsavel" className="text-right text-slate-300">
                  Responsável
                </Label>
                <Input
                  id="edit-responsavel"
                  value={currentCampaign.responsavel}
                  onChange={(e) => setCurrentCampaign({ ...currentCampaign, responsavel: e.target.value })}
                  className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right text-slate-300">
                  Status
                </Label>
                <Select
                  value={currentCampaign.status}
                  onValueChange={(value: "Planejado" | "Em andamento" | "Finalizado") =>
                    setCurrentCampaign({ ...currentCampaign, status: value })
                  }
                >
                  <SelectTrigger className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                    <SelectItem value="Planejado">Planejado</SelectItem>
                    <SelectItem value="Em andamento">Em andamento</SelectItem>
                    <SelectItem value="Finalizado">Finalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-dataDisparo" className="text-right text-slate-300">
                  Data de disparo
                </Label>
                <Input
                  id="edit-dataDisparo"
                  type="date"
                  value={currentCampaign.dataDisparo}
                  onChange={(e) => setCurrentCampaign({ ...currentCampaign, dataDisparo: e.target.value })}
                  className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-tipoConteudo" className="text-right text-slate-300">
                  Tipo de conteúdo
                </Label>
                <Input
                  id="edit-tipoConteudo"
                  value={currentCampaign.tipoConteudo}
                  onChange={(e) => setCurrentCampaign({ ...currentCampaign, tipoConteudo: e.target.value })}
                  className="col-span-3 bg-[#0a1929] border-[#1e3a5f] text-white"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateCampaign} className="bg-cyan-600 text-white hover:bg-cyan-700">
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
