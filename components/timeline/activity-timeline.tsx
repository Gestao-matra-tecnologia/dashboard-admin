import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Check, FileText, MessageSquare, User, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineItem {
  id: string
  title: string
  description: string
  type: "task" | "message" | "user" | "alert"
  date: string
  user: {
    name: string
    avatar?: string
  }
}

interface ActivityTimelineProps {
  items: TimelineItem[]
  className?: string
}

export function ActivityTimeline({ items, className }: ActivityTimelineProps) {
  const getIcon = (type: TimelineItem["type"]) => {
    switch (type) {
      case "task":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
            <FileText className="h-4 w-4" />
          </div>
        )
      case "message":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
            <MessageSquare className="h-4 w-4" />
          </div>
        )
      case "user":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
            <User className="h-4 w-4" />
          </div>
        )
      case "alert":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
            <AlertCircle className="h-4 w-4" />
          </div>
        )
      default:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            <Check className="h-4 w-4" />
          </div>
        )
    }
  }

  return (
    <div className={cn("space-y-8", className)}>
      {items.map((item) => (
        <div key={item.id} className="flex gap-4">
          {getIcon(item.type)}
          <div className="flex flex-col space-y-1">
            <div className="flex flex-col space-y-1">
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{item.user.name}</span>
              <span className="mx-1">•</span>
              <span>
                {formatDistanceToNow(new Date(item.date), {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
