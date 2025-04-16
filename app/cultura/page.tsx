"use client"

import { Suspense } from "react"
import CultureActions from "../components/culture-actions"

export default function CulturaPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Cultura Organizacional</h1>
      <Suspense fallback={<div>Carregando...</div>}>
        <CultureActions />
      </Suspense>
    </div>
  )
}
