import type { TimelineItem } from "@/components/timeline/activity-timeline"

export const mockTimelineItems: TimelineItem[] = [
  {
    id: "1",
    title: "Nova demanda criada",
    description: "A demanda 'Implementar nova landing page' foi criada",
    type: "task",
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutos atrás
    user: {
      name: "João Silva",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "2",
    title: "Comentário adicionado",
    description: "Um comentário foi adicionado à demanda 'Corrigir bug no formulário de contato'",
    type: "message",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 horas atrás
    user: {
      name: "Maria Oliveira",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "3",
    title: "Novo usuário adicionado",
    description: "Carlos Ferreira foi adicionado à equipe de Marketing",
    type: "user",
    date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 horas atrás
    user: {
      name: "Ana Costa",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "4",
    title: "Alerta de sistema",
    description: "Ocorreu um erro ao tentar sincronizar os dados financeiros",
    type: "alert",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 dia atrás
    user: {
      name: "Sistema",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "5",
    title: "Meta atingida",
    description: "A meta 'Aumentar tráfego orgânico em 20%' foi atingida com sucesso",
    type: "task",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 dias atrás
    user: {
      name: "Pedro Santos",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
]
