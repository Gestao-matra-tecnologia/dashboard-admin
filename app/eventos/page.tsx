import { SidebarWrapper } from "@/components/sidebar"
import { EventCalendar } from "@/components/calendar/event-calendar"

// Dados de exemplo para eventos
const mockEvents = [
  {
    id: "1",
    title: "Reunião de Equipe",
    date: new Date(2025, 3, 15, 14, 0),
    type: "meeting" as const,
  },
  {
    id: "2",
    title: "Entrega do Projeto",
    date: new Date(2025, 3, 22, 18, 0),
    type: "deadline" as const,
  },
  {
    id: "3",
    title: "Fechamento Financeiro",
    date: new Date(2025, 3, 30, 12, 0),
    type: "reminder" as const,
  },
  {
    id: "4",
    title: "Reunião com Cliente",
    date: new Date(2025, 3, 18, 10, 0),
    type: "meeting" as const,
  },
  {
    id: "5",
    title: "Prazo de Entrega",
    date: new Date(2025, 3, 25, 17, 0),
    type: "deadline" as const,
  },
]

export default function EventosPage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Calendário de Eventos</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <EventCalendar events={mockEvents} />
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Próximos Eventos</h3>
              <div className="space-y-4">
                {mockEvents
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((event) => (
                    <div key={event.id} className="flex items-start gap-4 rounded-lg border p-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                          event.type === "meeting"
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                            : event.type === "deadline"
                              ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                              : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                        }`}
                      >
                        <span className="text-sm font-medium">{event.date.getDate()}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {event.date.toLocaleDateString("pt-BR", {
                            day: "numeric",
                            month: "long",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="mt-1 text-sm">
                          {event.type === "meeting" ? "Reunião" : event.type === "deadline" ? "Prazo" : "Lembrete"}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Adicionar Evento</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="event-title" className="text-sm font-medium">
                    Título
                  </label>
                  <input
                    id="event-title"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Título do evento"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="event-date" className="text-sm font-medium">
                    Data e Hora
                  </label>
                  <input
                    id="event-date"
                    type="datetime-local"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="event-type" className="text-sm font-medium">
                    Tipo
                  </label>
                  <select
                    id="event-type"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="meeting">Reunião</option>
                    <option value="deadline">Prazo</option>
                    <option value="reminder">Lembrete</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="event-description" className="text-sm font-medium">
                    Descrição
                  </label>
                  <textarea
                    id="event-description"
                    className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Descrição do evento"
                  />
                </div>
                <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                  Adicionar Evento
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarWrapper>
  )
}
