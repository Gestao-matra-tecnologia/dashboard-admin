"use client"

import { Suspense } from "react"
import RolesTable from "@/components/roles-table"

export default function RolesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Cargos e Funções</h1>
      <Suspense fallback={<div className="text-white">Carregando...</div>}>
        <RolesTable />
      </Suspense>
    </div>
  )
}
