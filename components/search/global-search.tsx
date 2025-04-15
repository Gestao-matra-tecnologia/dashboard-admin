"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  title: string
  description: string
  category: string
  url: string
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  // Simular resultados de pesquisa
  const searchResults: SearchResult[] = [
    {
      id: "1",
      title: "Dashboard",
      description: "Visão geral do sistema",
      category: "Páginas",
      url: "/",
    },
    {
      id: "2",
      title: "Financeiro",
      description: "Gestão financeira",
      category: "Páginas",
      url: "/financeiro",
    },
    {
      id: "3",
      title: "Demandas da Semana",
      description: "Lista de tarefas e demandas",
      category: "Páginas",
      url: "/demandas",
    },
    {
      id: "4",
      title: "Metas por Área",
      description: "Objetivos departamentais",
      category: "Páginas",
      url: "/metas",
    },
    {
      id: "5",
      title: "Spotform",
      description: "Produto SaaS",
      category: "Produtos",
      url: "/gerenciamento?tab=produtos",
    },
    {
      id: "6",
      title: "NotifyX",
      description: "Produto SaaS",
      category: "Produtos",
      url: "/gerenciamento?tab=produtos",
    },
    {
      id: "7",
      title: "João Silva",
      description: "Desenvolvedor",
      category: "Funcionários",
      url: "/desempenho",
    },
    {
      id: "8",
      title: "Maria Oliveira",
      description: "Designer",
      category: "Funcionários",
      url: "/desempenho",
    },
  ]

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    setLoading(true)

    // Simular uma chamada de API
    const timer = setTimeout(() => {
      const filtered = searchResults.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = (result: SearchResult) => {
    setOpen(false)
    router.push(result.url)
  }

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2",
          "bg-background text-muted-foreground",
        )}
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Pesquisar...</span>
        <span className="sr-only">Pesquisar</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            ref={inputRef}
            placeholder="Pesquisar em todo o sistema..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>{loading ? "Pesquisando..." : "Nenhum resultado encontrado."}</CommandEmpty>
            {results.length > 0 && (
              <>
                <CommandGroup heading="Páginas">
                  {results
                    .filter((result) => result.category === "Páginas")
                    .map((result) => (
                      <CommandItem key={result.id} onSelect={() => handleSelect(result)}>
                        <Search className="mr-2 h-4 w-4" />
                        <div className="flex flex-col">
                          <span>{result.title}</span>
                          <span className="text-xs text-muted-foreground">{result.description}</span>
                        </div>
                      </CommandItem>
                    ))}
                </CommandGroup>
                <CommandGroup heading="Produtos">
                  {results
                    .filter((result) => result.category === "Produtos")
                    .map((result) => (
                      <CommandItem key={result.id} onSelect={() => handleSelect(result)}>
                        <Search className="mr-2 h-4 w-4" />
                        <div className="flex flex-col">
                          <span>{result.title}</span>
                          <span className="text-xs text-muted-foreground">{result.description}</span>
                        </div>
                      </CommandItem>
                    ))}
                </CommandGroup>
                <CommandGroup heading="Funcionários">
                  {results
                    .filter((result) => result.category === "Funcionários")
                    .map((result) => (
                      <CommandItem key={result.id} onSelect={() => handleSelect(result)}>
                        <Search className="mr-2 h-4 w-4" />
                        <div className="flex flex-col">
                          <span>{result.title}</span>
                          <span className="text-xs text-muted-foreground">{result.description}</span>
                        </div>
                      </CommandItem>
                    ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
