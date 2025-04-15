import type { Notification } from "./types"

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Nova demanda criada",
    message: "A demanda 'Implementar nova landing page' foi criada e atribuída a você.",
    type: "info",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutos atrás
  },
  {
    id: "2",
    title: "Meta atingida",
    message: "A meta 'Aumentar tráfego orgânico em 20%' foi atingida com sucesso!",
    type: "success",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 horas atrás
  },
  {
    id: "3",
    title: "Prazo próximo",
    message: "A demanda 'Corrigir bug no formulário de contato' vence em 2 dias.",
    type: "warning",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 horas atrás
  },
  {
    id: "4",
    title: "Erro no sistema",
    message: "Ocorreu um erro ao tentar sincronizar os dados financeiros.",
    type: "error",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 dia atrás
  },
  {
    id: "5",
    title: "Novo funcionário",
    message: "Carlos Ferreira foi adicionado à equipe de Marketing.",
    type: "info",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 dias atrás
  },
]
