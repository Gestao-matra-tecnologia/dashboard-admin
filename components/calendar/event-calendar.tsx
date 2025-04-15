"use client"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  date: Date
  type: "meeting" | "deadline" | "reminder"
}

interface EventCalendarProps {
  events?: Event[]
  className?: string
}

export function EventCalendar({ events = [], className }: EventCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  // Preencher com dias do mês anterior para começar no domingo
  const startDay = startOfMonth(currentMonth).getDay()
  const prevMonthDays =
    startDay === 0
      ? []
      : Array.from({ length: startDay }, (_, i) => {
          const date = new Date(currentMonth)
          date.setDate(0 - i)
          return date
        }).reverse()

  // Preencher com dias do próximo mês para terminar no sábado
  const endDay = endOfMonth(currentMonth).getDay()
  const nextMonthDays =
    endDay === 6
      ? []
      : Array.from({ length: 6 - endDay }, (_, i) => {
          const date = new Date(currentMonth)
          date.setMonth(date.getMonth() + 1, i + 1)
          return date
        })

  const allDays = [...prevMonthDays, ...daysInMonth, ...nextMonthDays]

  // Agrupar eventos por data
  const eventsByDate: Record<string, Event[]> = {}
  events.forEach((event) => {
    const dateKey = format(event.date, "yyyy-MM-dd")
    if (!eventsByDate[dateKey]) {
      eventsByDate[dateKey] = []
    }
    eventsByDate[dateKey].push(event)
  })

  const getEventIndicator = (date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd")
    const dayEvents = eventsByDate[dateKey] || []

    if (dayEvents.length === 0) return null

    return (
      <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-0.5">
        {dayEvents.slice(0, 3).map((event, i) => (
          <span
            key={i}
            className={cn(
              "h-1 w-1 rounded-full",
              event.type === "meeting" && "bg-blue-500",
              event.type === "deadline" && "bg-red-500",
              event.type === "reminder" && "bg-yellow-500",
            )}
          />
        ))}
        {dayEvents.length > 3 && <span className="h-1 w-1 rounded-full bg-gray-500" />}
      </div>
    )
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Calendário de Eventos</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Mês anterior</span>
            </Button>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{format(currentMonth, "MMMM yyyy", { locale: ptBR })}</span>
            </div>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Próximo mês</span>
            </Button>
          </div>
        </div>
        <CardDescription>Visualize e gerencie seus eventos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center">
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
            <div key={day} className="py-2 text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
          {allDays.map((day, i) => {
            const isCurrentMonth = isSameMonth(day, currentMonth)
            const isSelected = false // Implementar seleção se necessário
            const isCurrent = isToday(day)

            return (
              <div
                key={i}
                className={cn(
                  "relative aspect-square p-1",
                  !isCurrentMonth && "text-muted-foreground opacity-50",
                  isSelected && "bg-accent text-accent-foreground",
                  isCurrent && !isSelected && "bg-accent/50 text-accent-foreground",
                  "hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-md",
                )}
              >
                <div className="flex h-full w-full items-center justify-center">{format(day, "d")}</div>
                {getEventIndicator(day)}
              </div>
            )
          })}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span>Reuniões</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span>Prazos</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-yellow-500" />
          <span>Lembretes</span>
        </div>
      </CardFooter>
    </Card>
  )
}
