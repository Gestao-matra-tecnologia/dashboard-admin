"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  FileText,
  Home,
  LineChart,
  Settings,
  Users,
  Database,
  MessageSquare,
  Target,
  Heart,
  Megaphone,
  UserCheck,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMobile } from "@/hooks/use-mobile"

interface SidebarWrapperProps {
  children: React.ReactNode
}

export function SidebarWrapper({ children }: SidebarWrapperProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-[#071527]">{children}</main>
      </div>
    </SidebarProvider>
  )
}

function AppSidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const navigation = [
    {
      name: "Visão Geral",
      href: "/",
      icon: Home,
      current: pathname === "/",
    },
    {
      name: "Financeiro",
      href: "/financeiro",
      icon: LineChart,
      current: pathname === "/financeiro",
    },
    {
      name: "Demandas da Semana",
      href: "/demandas",
      icon: FileText,
      current: pathname === "/demandas",
    },
    {
      name: "Metas por Área",
      href: "/metas",
      icon: Target,
      current: pathname === "/metas",
    },
    {
      name: "Marketing Interno",
      href: "/marketing-interno",
      icon: Heart,
      current: pathname === "/marketing-interno",
    },
    {
      name: "Marketing de Clientes",
      href: "/marketing-clientes",
      icon: Megaphone,
      current: pathname === "/marketing-clientes",
    },
    {
      name: "Cargos e Funções",
      href: "/cargos",
      icon: Users,
      current: pathname === "/cargos",
    },
    {
      name: "Desempenho",
      href: "/desempenho",
      icon: UserCheck,
      current: pathname === "/desempenho",
    },
    {
      name: "Cultura",
      href: "/cultura",
      icon: MessageSquare,
      current: pathname === "/cultura",
    },
    {
      name: "Gerenciamento de Dados",
      href: "/gerenciamento",
      icon: Database,
      current: pathname === "/gerenciamento",
    },
  ]

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r border-[#1e3a5f]">
      <SidebarHeader className="py-4">
        <div className="flex items-center px-2">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-cyan-600 p-1">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div className="font-semibold text-lg text-white">Matra Tecnologia</div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={item.current} tooltip={item.name}>
                <Link href={item.href} className="flex items-center">
                  <item.icon className="h-5 w-5" />
                  <span className="ml-3">{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-3 py-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
              <AvatarFallback className="bg-cyan-700">MT</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Admin</span>
              <span className="text-xs text-slate-400">admin@matra.tech</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Configurações</span>
            </Button>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
