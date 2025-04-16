import type { Metadata } from "next"
import DataManagementDashboard from "@/components/data-management-dashboard"

export const metadata: Metadata = {
  title: "Gerenciamento de Dados | Matra Tecnologia",
  description: "Gerenciamento de dados do dashboard da Matra Tecnologia",
}

export default function DataManagementPage() {
  return <DataManagementDashboard />
}
