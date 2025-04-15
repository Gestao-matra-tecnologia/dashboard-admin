"use client"

import { useState } from "react"
import { Search, FileText, HelpCircle, Video, BookOpen, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      question: "Como adicionar uma nova demanda?",
      answer:
        "Para adicionar uma nova demanda, acesse a página 'Demandas da Semana', clique no botão 'Nova Demanda' no canto superior direito e preencha o formulário com as informações necessárias.",
    },
    {
      question: "Como gerar relatórios financeiros?",
      answer:
        "Para gerar relatórios financeiros, acesse a página 'Relatórios', selecione a aba 'Financeiro', defina o período desejado e clique no botão 'Exportar'.",
    },
    {
      question: "Como atualizar metas departamentais?",
      answer:
        "Para atualizar metas departamentais, acesse a página 'Metas por Área', encontre a meta que deseja atualizar, clique no botão de edição e faça as alterações necessárias.",
    },
    {
      question: "Como adicionar um novo funcionário ao sistema?",
      answer:
        "Para adicionar um novo funcionário, acesse a página 'Gerenciamento de Dados', selecione a aba 'Funcionários', clique no botão 'Novo Funcionário' e preencha o formulário com os dados do funcionário.",
    },
    {
      question: "Como alterar minha senha?",
      answer:
        "Para alterar sua senha, acesse a página 'Configurações', selecione a aba 'Conta', preencha os campos de senha atual e nova senha, e clique em 'Salvar'.",
    },
  ]

  const guides = [
    {
      title: "Guia de Início Rápido",
      description: "Aprenda os conceitos básicos para começar a usar o dashboard",
      icon: <FileText className="h-6 w-6" />,
      url: "#",
    },
    {
      title: "Gerenciamento Financeiro",
      description: "Como utilizar as ferramentas financeiras do sistema",
      icon: <BookOpen className="h-6 w-6" />,
      url: "#",
    },
    {
      title: "Gestão de Demandas",
      description: "Aprenda a gerenciar tarefas e demandas eficientemente",
      icon: <FileText className="h-6 w-6" />,
      url: "#",
    },
    {
      title: "Relatórios e Análises",
      description: "Como extrair insights dos dados do seu negócio",
      icon: <FileText className="h-6 w-6" />,
      url: "#",
    },
  ]

  const videos = [
    {
      title: "Tour pelo Dashboard",
      description: "Conheça todas as funcionalidades do sistema",
      duration: "5:32",
      thumbnail: "/placeholder.svg?height=120&width=200",
      url: "#",
    },
    {
      title: "Configurando Metas",
      description: "Como definir e acompanhar metas departamentais",
      duration: "4:15",
      thumbnail: "/placeholder.svg?height=120&width=200",
      url: "#",
    },
    {
      title: "Gerenciando Finanças",
      description: "Tutorial completo sobre o módulo financeiro",
      duration: "8:47",
      thumbnail: "/placeholder.svg?height=120&width=200",
      url: "#",
    },
  ]

  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqs

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">Ajuda e Suporte</h2>
        <p className="text-muted-foreground">
          Encontre respostas para suas dúvidas e aprenda a utilizar todas as funcionalidades do sistema.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Pesquisar na documentação..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span>Perguntas Frequentes</span>
          </TabsTrigger>
          <TabsTrigger value="guides" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Guias</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span>Vídeos</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Suporte</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>Respostas para as dúvidas mais comuns</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <p className="text-center py-4 text-muted-foreground">
                    Nenhum resultado encontrado para "{searchQuery}"
                  </p>
                )}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Guias e Documentação</CardTitle>
              <CardDescription>Aprenda a utilizar todas as funcionalidades do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {guides.map((guide, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">{guide.icon}</div>
                      <div>
                        <CardTitle className="text-base">{guide.title}</CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardFooter className="pt-2">
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={guide.url}>Ver Guia</a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vídeos Tutoriais</CardTitle>
              <CardDescription>Aprenda visualmente com nossos vídeos tutoriais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {videos.map((video, index) => (
                  <div key={index} className="group overflow-hidden rounded-lg border">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute bottom-2 right-2 rounded bg-black/70 px-1 py-0.5 text-xs text-white">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">{video.title}</h3>
                      <p className="text-sm text-muted-foreground">{video.description}</p>
                      <Button variant="link" size="sm" className="mt-2 px-0" asChild>
                        <a href={video.url}>Assistir vídeo</a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Suporte Técnico</CardTitle>
              <CardDescription>Entre em contato com nossa equipe de suporte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium">Horário de Atendimento</h3>
                <p className="text-sm text-muted-foreground">Segunda a Sexta, das 8h às 18h</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-sm text-muted-foreground">suporte@matra.tech</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Telefone</h4>
                    <p className="text-sm text-muted-foreground">(11) 3456-7890</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium">Envie sua mensagem</h3>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nome
                      </label>
                      <Input id="name" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Assunto
                    </label>
                    <Input id="subject" placeholder="Assunto da mensagem" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Descreva sua dúvida ou problema"
                    />
                  </div>
                  <Button>Enviar Mensagem</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
