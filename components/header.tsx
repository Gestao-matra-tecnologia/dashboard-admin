"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlobalSearch } from "@/components/search/global-search"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { useMobile } from "@/hooks/use-mobile"

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Mapear o pathname para um título legível
  const getPageTitle = () => {
    const routes: Record<string, string> = {
      "/": "Visão Geral",
      "/financeiro": "Financeiro",
      "/demandas": "Demandas da Semana",
      "/metas": "Metas por Área",
      "/marketing-interno": "Marketing Interno",
      "/marketing-clientes": "Marketing de Clientes",
      "/cargos": "Cargos e Funções",
      "/desempenho": "Desempenho",
      "/cultura": "Cultura",
      "/gerenciamento": "Gerenciamento de Dados",
      "/relatorios": "Relatórios",
      "/configuracoes": "Configurações",
      "/ajuda": "Ajuda e Suporte",
    }

    return routes[pathname] || "Dashboard"
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-[#1e3a5f] bg-[#071527] px-4 sm:px-6">
      {isMobile && (
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      )}
      <div className="flex flex-1 items-center gap-4">
        <h1 className="text-lg font-semibold text-white">{getPageTitle()}</h1>
      </div>
      <div className="flex items-center gap-2">
        <GlobalSearch />
        <NotificationCenter />
      </div>
    </header>
  )
}
