"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import DemandTable from "../demand-table"

export default function DemandManager() {
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
      ) : (
        <div>
          <Alert className="bg-[#0a1929] border-[#1e3a5f] text-white mb-4">
            <AlertCircle className="h-4 w-4 text-cyan-400" />
            <AlertDescription>
              O gerenciamento de demandas é feito diretamente no componente de Demandas da Semana. Use o botão abaixo
              para acessar a página completa.
            </AlertDescription>
          </Alert>

          <Button
            onClick={() => {
              toast({
                title: "Redirecionando",
                description: "Você será redirecionado para a página de Demandas da Semana.",
              })
              // Em um ambiente real, isso redirecionaria para a página de demandas
              // window.location.href = "/demandas"
            }}
            className="bg-cyan-600 text-white hover:bg-cyan-700"
          >
            Ir para Demandas da Semana
          </Button>

          <div className="mt-6">
            <DemandTable />
          </div>
        </div>
      )}
    </div>
  )
}
