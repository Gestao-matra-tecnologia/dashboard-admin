import { redirect } from "next/navigation"

export default function Home() {
  // Redirecionar para o dashboard principal
  redirect("/dashboard")
}
