"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { PlusCircle, Pencil, Trash2, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  produto: string
  tipo: string
  mrrAtual: number
  meta: number
  status: string
  progresso: number
}

// Mock service para produtos
const productService = {
  getAll: async (): Promise<Product[]> => {
    // Simular uma chamada de API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            produto: "Spotform",
            tipo: "SaaS",
            mrrAtual: 5000,
            meta: 50000,
            status: "Em atualização",
            progresso: 10,
          },
          {
            id: "2",
            produto: "NotifyX",
            tipo: "SaaS",
            mrrAtual: 2000,
            meta: 20000,
            status: "Pronto",
            progresso: 10,
          },
          {
            id: "3",
            produto: "Firebank",
            tipo: "SaaS",
            mrrAtual: 0,
            meta: 10000,
            status: "MVP",
            progresso: 0,
          },
          {
            id: "4",
            produto: "SharkPage",
            tipo: "Builder",
            mrrAtual: 0,
            meta: 5000,
            status: "Em beta",
            progresso: 0,
          },
          {
            id: "5",
            produto: "Serviços TI",
            tipo: "Consultas",
            mrrAtual: 30000,
            meta: 35000,
            status: "Ativo",
            progresso: 85,
          },
        ])
      }, 500)
    })
  },
  add: async (product: Omit<Product, "id">): Promise<Product> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct = {
          id: Math.random().toString(36).substring(2, 9),
          ...product,
        }
        resolve(newProduct)
      }, 500)
    })
  },
  update: async (id: string, product: Omit<Product, "id">): Promise<Product> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id, ...product })
      }, 500)
    })
  },
  delete: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })
  },
}

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    produto: "",
    tipo: "SaaS",
    mrrAtual: 0,
    meta: 0,
    status: "MVP",
    progresso: 0,
  })
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const data = await productService.getAll()
      setProducts(data)
    } catch (error) {
      console.error("Erro ao carregar produtos:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os produtos.",
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
      [name]: ["mrrAtual", "meta", "progresso"].includes(name) ? Number(value) : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddProduct = async () => {
    setSubmitting(true)
    try {
      await productService.add(formData)
      await loadProducts()
      setIsAddDialogOpen(false)
      resetForm()
      toast({
        title: "Sucesso",
        description: "Produto adicionado com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao adicionar produto:", error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o produto.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditProduct = async () => {
    if (!currentProduct) return

    setSubmitting(true)
    try {
      await productService.update(currentProduct.id, formData)
      await loadProducts()
      setIsEditDialogOpen(false)
      resetForm()
      toast({
        title: "Sucesso",
        description: "Produto atualizado com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao atualizar produto:", error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o produto.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteProduct = async () => {
    if (!currentProduct) return

    setSubmitting(true)
    try {
      await productService.delete(currentProduct.id)
      await loadProducts()
      setIsDeleteDialogOpen(false)
      toast({
        title: "Sucesso",
        description: "Produto excluído com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao excluir produto:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o produto.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const openEditDialog = (product: Product) => {
    setCurrentProduct(product)
    setFormData({
      produto: product.produto,
      tipo: product.tipo,
      mrrAtual: product.mrrAtual,
      meta: product.meta,
      status: product.status,
      progresso: product.progresso,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (product: Product) => {
    setCurrentProduct(product)
    setIsDeleteDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      produto: "",
      tipo: "SaaS",
      mrrAtual: 0,
      meta: 0,
      status: "MVP",
      progresso: 0,
    })
    setCurrentProduct(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pronto":
      case "Ativo":
        return "bg-green-900 text-green-300 border-green-700"
      case "Em atualização":
      case "Em beta":
        return "bg-blue-900 text-blue-300 border-blue-700"
      case "MVP":
        return "bg-yellow-900 text-yellow-300 border-yellow-700"
      default:
        return "bg-slate-800 text-slate-300 border-slate-700"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-[#0f2744] border-[#1e3a5f] text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold text-white">Gerenciamento de Produtos e Serviços</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-cyan-600 text-white hover:bg-cyan-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
              <DialogHeader>
                <DialogTitle className="text-white">Adicionar Novo Produto</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="produto" className="text-white">
                      Nome do Produto
                    </Label>
                    <Input
                      id="produto"
                      name="produto"
                      value={formData.produto}
                      onChange={handleInputChange}
                      className="bg-[#0f2744] border-[#1e3a5f] text-white"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tipo" className="text-white">
                      Tipo
                    </Label>
                    <Select value={formData.tipo} onValueChange={(value) => handleSelectChange("tipo", value)}>
                      <SelectTrigger className="bg-[#0f2744] border-[#1e3a5f] text-white">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                        <SelectItem value="SaaS">SaaS</SelectItem>
                        <SelectItem value="Builder">Builder</SelectItem>
                        <SelectItem value="Consultas">Consultas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="mrrAtual" className="text-white">
                      MRR Atual (R$)
                    </Label>
                    <Input
                      id="mrrAtual"
                      name="mrrAtual"
                      type="number"
                      value={formData.mrrAtual}
                      onChange={handleInputChange}
                      className="bg-[#0f2744] border-[#1e3a5f] text-white"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="meta" className="text-white">
                      Meta (R$)
                    </Label>
                    <Input
                      id="meta"
                      name="meta"
                      type="number"
                      value={formData.meta}
                      onChange={handleInputChange}
                      className="bg-[#0f2744] border-[#1e3a5f] text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="status" className="text-white">
                      Status
                    </Label>
                    <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                      <SelectTrigger className="bg-[#0f2744] border-[#1e3a5f] text-white">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                        <SelectItem value="MVP">MVP</SelectItem>
                        <SelectItem value="Em beta">Em beta</SelectItem>
                        <SelectItem value="Em atualização">Em atualização</SelectItem>
                        <SelectItem value="Pronto">Pronto</SelectItem>
                        <SelectItem value="Ativo">Ativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="progresso" className="text-white">
                      Progresso (%)
                    </Label>
                    <Input
                      id="progresso"
                      name="progresso"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.progresso}
                      onChange={handleInputChange}
                      className="bg-[#0f2744] border-[#1e3a5f] text-white"
                    />
                  </div>
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
                  onClick={handleAddProduct}
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
          ) : products.length === 0 ? (
            <Alert className="bg-[#0a1929] border-[#1e3a5f] text-white">
              <AlertCircle className="h-4 w-4 text-cyan-400" />
              <AlertDescription>
                Nenhum produto encontrado. Adicione novos produtos para visualizá-los aqui.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1e3a5f]">
                    <th className="text-left font-medium p-2 text-slate-300">Produto</th>
                    <th className="text-left font-medium p-2 text-slate-300">Tipo</th>
                    <th className="text-left font-medium p-2 text-slate-300">MRR Atual</th>
                    <th className="text-left font-medium p-2 text-slate-300">Meta</th>
                    <th className="text-left font-medium p-2 text-slate-300">Status</th>
                    <th className="text-left font-medium p-2 text-slate-300">Progresso</th>
                    <th className="text-right font-medium p-2 text-slate-300">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-[#1e3a5f]">
                      <td className="p-2 font-medium text-white">{product.produto}</td>
                      <td className="p-2 text-slate-300">{product.tipo}</td>
                      <td className="p-2 text-cyan-400">R$ {product.mrrAtual.toLocaleString()}</td>
                      <td className="p-2 text-slate-300">R$ {product.meta.toLocaleString()}</td>
                      <td className="p-2">
                        <Badge variant="outline" className={getStatusColor(product.status)}>
                          {product.status}
                        </Badge>
                      </td>
                      <td className="p-2 w-[180px]">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-full rounded-full bg-[#1e3a5f]">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                              style={{ width: `${product.progresso}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-slate-300">{product.progresso}%</span>
                        </div>
                      </td>
                      <td className="p-2 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(product)}
                          className="h-8 w-8 text-slate-300 hover:text-white hover:bg-[#163456]"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteDialog(product)}
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
                <DialogTitle className="text-white">Editar Produto</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-produto" className="text-white">
                      Nome do Produto
                    </Label>
                    <Input
                      id="edit-produto"
                      name="produto"
                      value={formData.produto}
                      onChange={handleInputChange}
                      className="bg-[#0f2744] border-[#1e3a5f] text-white"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-tipo" className="text-white">
                      Tipo
                    </Label>
                    <Select value={formData.tipo} onValueChange={(value) => handleSelectChange("tipo", value)}>
                      <SelectTrigger className="bg-[#0f2744] border-[#1e3a5f] text-white">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                        <SelectItem value="SaaS">SaaS</SelectItem>
                        <SelectItem value="Builder">Builder</SelectItem>
                        <SelectItem value="Consultas">Consultas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-mrrAtual" className="text-white">
                      MRR Atual (R$)
                    </Label>
                    <Input
                      id="edit-mrrAtual"
                      name="mrrAtual"
                      type="number"
                      value={formData.mrrAtual}
                      onChange={handleInputChange}
                      className="bg-[#0f2744] border-[#1e3a5f] text-white"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-meta" className="text-white">
                      Meta (R$)
                    </Label>
                    <Input
                      id="edit-meta"
                      name="meta"
                      type="number"
                      value={formData.meta}
                      onChange={handleInputChange}
                      className="bg-[#0f2744] border-[#1e3a5f] text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-status" className="text-white">
                      Status
                    </Label>
                    <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                      <SelectTrigger className="bg-[#0f2744] border-[#1e3a5f] text-white">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a1929] border-[#1e3a5f] text-white">
                        <SelectItem value="MVP">MVP</SelectItem>
                        <SelectItem value="Em beta">Em beta</SelectItem>
                        <SelectItem value="Em atualização">Em atualização</SelectItem>
                        <SelectItem value="Pronto">Pronto</SelectItem>
                        <SelectItem value="Ativo">Ativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-progresso" className="text-white">
                      Progresso (%)
                    </Label>
                    <Input
                      id="edit-progresso"
                      name="progresso"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.progresso}
                      onChange={handleInputChange}
                      className="bg-[#0f2744] border-[#1e3a5f] text-white"
                    />
                  </div>
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
                  onClick={handleEditProduct}
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
                <p className="text-white">Tem certeza que deseja excluir o produto "{currentProduct?.produto}"?</p>
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
                  onClick={handleDeleteProduct}
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
    </div>
  )
}
