"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, ArrowUp, ArrowDown, Minus } from "lucide-react"
import { employeePerformanceServices } from "@/lib/mock-services"
import type { EmployeePerformance } from "@/lib/types"

export default function EmployeeRanking() {
  const [employees, setEmployees] = useState<EmployeePerformance[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true)
        const data = await employeePerformanceServices.getAll()
        // Ordenar por pontuação, do maior para o menor
        const sortedData = [...data].sort((a, b) => b.score - a.score)
        setEmployees(sortedData)
      } catch (error) {
        console.error("Erro ao buscar dados de desempenho:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  // Função para determinar a mudança de posição
  const getPositionChange = (index: number, employee: EmployeePerformance) => {
    const previousPosition = employee.previousRank || index + 1
    const currentPosition = index + 1

    if (previousPosition < currentPosition) {
      return { icon: <ArrowDown className="h-4 w-4 text-red-500" />, text: `${currentPosition - previousPosition}` }
    } else if (previousPosition > currentPosition) {
      return { icon: <ArrowUp className="h-4 w-4 text-green-500" />, text: `${previousPosition - currentPosition}` }
    } else {
      return { icon: <Minus className="h-4 w-4 text-gray-500" />, text: "" }
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Ranking de Destaque</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Destaque do Mês (Primeiro Colocado) */}
          {employees.length > 0 && (
            <Card className="bg-gradient-to-r from-[#0f2744] to-[#1e3a5f] border-[#1e3a5f] overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-center text-2xl text-white">Destaque do Mês</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center pt-0">
                <div className="relative">
                  <div className="absolute -top-1 -right-1">
                    <Trophy className="h-8 w-8 text-yellow-400" />
                  </div>
                  <Avatar className="h-32 w-32 border-4 border-yellow-400">
                    <AvatarImage
                      src={employees[0].avatar || "/placeholder.svg?height=128&width=128"}
                      alt={employees[0].name}
                    />
                    <AvatarFallback className="text-3xl bg-[#0f2744] text-cyan-400">
                      {employees[0].name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-white">{employees[0].name}</h3>
                <p className="text-cyan-400">{employees[0].role}</p>
                <div className="mt-4 flex items-center gap-2">
                  <Badge className="bg-yellow-600 text-white px-3 py-1 text-lg">{employees[0].score} pontos</Badge>
                </div>
                <div className="mt-6 w-full">
                  <h4 className="text-lg font-semibold text-white mb-2">Destaques:</h4>
                  <ul className="space-y-2 text-slate-300">
                    {employees[0].highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ranking Completo */}
          <Card className="bg-[#0f2744] border-[#1e3a5f]">
            <CardHeader>
              <CardTitle className="text-white">Ranking Completo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.map((employee, index) => {
                  const positionChange = getPositionChange(index, employee)

                  return (
                    <div
                      key={employee.id}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        index === 0
                          ? "bg-gradient-to-r from-yellow-900/30 to-yellow-700/20 border border-yellow-700/50"
                          : index === 1
                            ? "bg-gradient-to-r from-slate-700/30 to-slate-600/20 border border-slate-600/50"
                            : index === 2
                              ? "bg-gradient-to-r from-amber-900/30 to-amber-700/20 border border-amber-700/50"
                              : "bg-[#0a1929] border border-[#1e3a5f]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-8 text-center font-bold text-lg text-white">{index + 1}</div>
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={employee.avatar || "/placeholder.svg?height=48&width=48"}
                            alt={employee.name}
                          />
                          <AvatarFallback className="bg-[#0f2744] text-cyan-400">
                            {employee.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-white">{employee.name}</h3>
                          <p className="text-sm text-slate-400">{employee.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {positionChange.icon}
                          <span className="text-xs">{positionChange.text}</span>
                        </div>
                        <Badge
                          className={`${
                            index === 0
                              ? "bg-yellow-600"
                              : index === 1
                                ? "bg-slate-500"
                                : index === 2
                                  ? "bg-amber-700"
                                  : "bg-[#1e3a5f]"
                          } text-white`}
                        >
                          {employee.score} pts
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
