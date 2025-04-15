"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, Settings, LayoutDashboard, LineChart, Trophy, Database, Menu, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import OverviewDashboard from "./overview-dashboard"
import FinanceDashboard from "./finance/finance-dashboard" // Corrigido: importação como default export

interface DashboardProps {
  setCurrentPage: (page: string) => void
}

export default function Dashboard({ setCurrentPage }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isMobile = useMobile()

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setIsSidebarOpen(false)
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
    setIsSidebarOpen(false)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewDashboard />
      case "finance":
        return <FinanceDashboard />
      default:
        return <OverviewDashboard />
    }
  }

  return (
    <div className="flex h-screen bg-[#0a1929] text-white overflow-hidden">
      {/* Sidebar Toggle for Mobile */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 text-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "bg-[#0f2744] w-64 border-r border-[#1e3a5f] flex-shrink-0 flex flex-col",
          isMobile && "fixed inset-y-0 left-0 z-40 transform transition-transform duration-200 ease-in-out",
          isMobile && !isSidebarOpen && "-translate-x-full",
        )}
      >
        <div className="p-4 border-b border-[#1e3a5f]">
          <h1 className="text-xl font-bold text-white">Matra Tecnologia</h1>
          <p className="text-sm text-slate-400">Dashboard Administrativo</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Principal</h2>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-slate-300 hover:text-white hover:bg-[#163456]",
                  activeTab === "overview" && "bg-[#163456] text-white",
                )}
                onClick={() => handleTabChange("overview")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Visão Geral
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-slate-300 hover:text-white hover:bg-[#163456]",
                  activeTab === "finance" && "bg-[#163456] text-white",
                )}
                onClick={() => handleTabChange("finance")}
              >
                <LineChart className="mr-2 h-4 w-4" />
                Financeiro
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:text-white hover:bg-[#163456]"
                onClick={() => handleNavigate("employee-ranking")}
              >
                <Trophy className="mr-2 h-4 w-4" />
                Ranking de Destaque
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:text-white hover:bg-[#163456]"
                onClick={() => handleNavigate("data-management")}
              >
                <Database className="mr-2 h-4 w-4" />
                Gerenciamento de Dados
              </Button>
            </div>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Relatórios</h2>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:text-white hover:bg-[#163456]"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Análise de Vendas
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:text-white hover:bg-[#163456]"
              >
                <Users className="mr-2 h-4 w-4" />
                Equipe
              </Button>
            </div>
          </div>
        </nav>
        <div className="p-4 border-t border-[#1e3a5f]">
          <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-[#163456]">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content */}
        <main className="flex-1 overflow-y-auto">{renderContent()}</main>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
