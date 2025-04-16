"use client"

import { Suspense } from "react"
import RolesTable from "../components/roles-table"

export default function CargosPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Cargos e Funções</h1>
      <Suspense fallback={<div>Carregando...</div>}>
        <RolesTable />
      </Suspense>
    </div>
  )
}
