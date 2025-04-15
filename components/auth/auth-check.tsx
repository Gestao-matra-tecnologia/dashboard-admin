"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

interface AuthCheckProps {
  children: React.ReactNode
}

export function AuthCheck({ children }: AuthCheckProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const checkAuth = () => {
      try {
        const user = typeof window !== "undefined" ? localStorage.getItem("user") : null

        if (!user && pathname !== "/auth/login") {
          router.push("/auth/login")
        } else if (user) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
        setIsAuthenticated(false)
        if (pathname !== "/auth/login") {
          router.push("/auth/login")
        }
      } finally {
        setIsLoading(false)
      }
    }

    // Pequeno delay para garantir que o componente está montado
    const timer = setTimeout(checkAuth, 100)
    return () => clearTimeout(timer)
  }, [pathname, router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#071527]">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    )
  }

  if (!isAuthenticated && pathname !== "/auth/login") {
    return null
  }

  return <>{children}</>
}
