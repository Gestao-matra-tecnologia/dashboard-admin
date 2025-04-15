"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Trash2, Plus } from "lucide-react"
import { productsServicesServices } from "@/lib/mock-services"
import type { ProductService } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"

export default function ProductsServicesManager() {
  const [products, setProducts] = useState<ProductService[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    type: "product",
    price: "",
    status: "active",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsServicesServices.getAll()
        setProducts(data)
      } catch (error) {
        console.error("Erro ao buscar produtos e serviços:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar os produtos e serviços.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      type: "product",
      price: "",
      status: "active",
    })
    setIsEditing(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const productData = {
        ...formData,
        price: Number.parseFloat(formData.price),
      }

      if (isEditing) {
        await productsServicesServices.update(formData.id, productData)
        toast({
          title: "Sucesso",
          description: "Produto/serviço atualizado com sucesso!",
        })
      } else {
        await productsServicesServices.create(productData)
        toast({
          title: "Sucesso",
          description: "Produto/serviço adicionado com sucesso!",
        })
      }

      // Atualizar a lista
      const updatedProducts = await productsServicesServices.getAll()
      setProducts(updatedProducts)

      // Fechar o diálogo e resetar o formulário
      setDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Erro ao salvar produto/serviço:", error)
      toast({
        title: "Erro",
        description: isEditing
          ? "Não foi possível atualizar o produto/serviço."
          : "Não foi possível adicionar o produto/serviço.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (product: ProductService) => {
    setFormData({
      id: product.id,
      name: product.name,
      type: product.type,
      price: product.price.toString(),
      status: product.status,
    })
    setIsEditing(true)
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este item?")) {
      try {
        await productsServicesServices.delete(id)
        setProducts(products.filter((product) => product.id !== id))
        toast({
          title: "Sucesso",
          description: "Produto/serviço excluído com sucesso!",
        })
      } catch (error) {
        console.error("Erro ao excluir produto/serviço:", error)
        toast({
          title: "Erro",
          description: "Não foi possível excluir o produto/serviço.",
          variant: "destructive",
        })
      }
    }
  }

  if (loading) {
    return <div className="text-center py-10 text-white">Carregando produtos e serviços...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Produtos e Serviços</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm()
                setDialogOpen(true)
              }}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              <Plus className="mr-2 h-4 w-4" /> Novo Produto/Serviço
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0f2744] text-white border-[#1e3a5f]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Editar" : "Adicionar"} Produto/Serviço</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-[#1e3a5f] border-[#2a4a6f] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger className="bg-[#1e3a5f] border-[#2a4a6f] text-white">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1e3a5f] border-[#2a4a6f] text-white">
                    <SelectItem value="product">Produto</SelectItem>
                    <SelectItem value="service">Serviço</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="bg-[#1e3a5f] border-[#2a4a6f] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger className="bg-[#1e3a5f] border-[#2a4a6f] text-white">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1e3a5f] border-[#2a4a6f] text-white">
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-transparent border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700">
                  {isEditing ? "Atualizar" : "Adicionar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border border-[#1e3a5f] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#1e3a5f]">
            <TableRow>
              <TableHead className="text-white">Nome</TableHead>
              <TableHead className="text-white">Tipo</TableHead>
              <TableHead className="text-white">Preço</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-300">
                  Nenhum produto ou serviço cadastrado.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id} className="border-t border-[#1e3a5f] hover:bg-[#1e3a5f]/30">
                  <TableCell className="text-white">{product.name}</TableCell>
                  <TableCell className="text-white">{product.type === "product" ? "Produto" : "Serviço"}</TableCell>
                  <TableCell className="text-white">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(product.price)}
                  </TableCell>
                  <TableCell className="text-white">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        product.status === "active" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                      }`}
                    >
                      {product.status === "active" ? "Ativo" : "Inativo"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(product)}
                        className="h-8 w-8 text-cyan-400 hover:text-cyan-300 hover:bg-[#1e3a5f]"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(product.id)}
                        className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-[#1e3a5f]"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
