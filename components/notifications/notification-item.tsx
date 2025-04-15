"use client"

import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Check, AlertCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Notification } from "@/lib/types"

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
}

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const { id, title, message, type, createdAt, read } = notification

  const getIcon = () => {
    switch (type) {
      case "success":
        return <Check className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-amber-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "info":
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const timeAgo = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: ptBR,
  })

  return (
    <div
      className={cn("flex items-start gap-3 p-4 hover:bg-muted/50 cursor-pointer", !read && "bg-muted/30")}
      onClick={() => !read && onMarkAsRead(id)}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">{getIcon()}</div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className={cn("text-sm font-medium", !read && "font-semibold")}>{title}</p>
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
        </div>
        <p className="text-xs text-muted-foreground">{message}</p>
      </div>
      {!read && <div className="h-2 w-2 rounded-full bg-cyan-500" />}
    </div>
  )
}
