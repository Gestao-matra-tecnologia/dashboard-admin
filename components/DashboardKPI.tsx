"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DashboardKPI = () => {
  const [dados, setDados] = useState({
    kanbanDoDia: {
      trafegoPago: {
        pendente: ["Criativo Pet Help", "Campanha V7 para subir"],
        emAndamento: [],
        feito: ["Campanha Google Ads"],
      },
      comercial: {
        pendente: ["Reunião com Dr. Ivo", "Proposta Alpha Planejados"],
        emAndamento: [],
        feito: ["Onboarding Noeli"],
      },
      sistemas: {
        pendente: ["Bug tela login", "Entrega V7 ajustes"],
        emAndamento: [],
        feito: [],
      },
      administrativo: {
        pendente: ["Emitir NF", "Enviar boletos"],
        emAndamento: [],
        feito: ["Atualizar contratos"],
      },
      edicao: {
        pendente: ["Cortar vídeo do Spotform"],
        emAndamento: [],
        feito: [],
      },
      desenvolvimento: {
        pendente: ["Nova tela de dashboard"],
        emAndamento: [],
        feito: [],
      },
      marketing: {
        pendente: ["Post para Instagram", "Criativo novo YouTube"],
        emAndamento: [],
        feito: ["Texto para campanha de abril"],
      },
    },
    metaMensal: 150000,
    metaSemanal: 52600,
    faturamentoAtual: 26400,
    vendasKiwify: 9951,
    metaKiwify: 40000,
  });

  const progressoMensal = Math.min(
    (dados.faturamentoAtual / dados.metaMensal) * 100,
    100
  );
  const progressoSemanal = Math.min(
    (dados.faturamentoAtual / dados.metaSemanal) * 100,
    100
  );
  const progressoKiwify = Math.min(
    (dados.vendasKiwify / dados.metaKiwify) * 100,
    100
  );

  const setoresResumo = [
    "trafegoPago",
    "comercial",
    "sistemas",
    "administrativo",
    "edicao",
    "desenvolvimento",
    "marketing",
  ];

  const resumoSetores = setoresResumo.map((setor) => {
    const feito = dados.kanbanDoDia[setor]?.feito.length || 0;
    const total = Object.values(dados.kanbanDoDia[setor] || {}).reduce(
      (acc, val) => acc + val.length,
      0
    );
    return {
      nome: setor,
      progresso: total === 0 ? 0 : Math.round((feito / total) * 100),
    };
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const sourceCol = result.source.droppableId;
    const destCol = result.destination.droppableId;
    const setor = result.type;
    const sourceItems = Array.from(dados.kanbanDoDia[setor][sourceCol]);
    const destItems = Array.from(dados.kanbanDoDia[setor][destCol]);
    const [movedItem] = sourceItems.splice(result.source.index, 1);
    destItems.splice(result.destination.index, 0, movedItem);

    setDados((prev) => ({
      ...prev,
      kanbanDoDia: {
        ...prev.kanbanDoDia,
        [setor]: {
          ...prev.kanbanDoDia[setor],
          [sourceCol]: sourceItems,
          [destCol]: destItems,
        },
      },
    }));
  };

  const coresSetores: Record<string, string> = {
    trafegoPago: "bg-purple-50 border-purple-400",
    comercial: "bg-yellow-50 border-yellow-400",
    sistemas: "bg-blue-50 border-blue-400",
    administrativo: "bg-green-50 border-green-400",
    edicao: "bg-pink-50 border-pink-400",
    desenvolvimento: "bg-gray-50 border-gray-400",
    marketing: "bg-orange-50 border-orange-400",
  };

  return (
    <div className="p-6 space-y-10">
      {/* METAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <h2 className="text-lg font-bold text-black mb-1">Meta do Mês</h2>
            <p className="text-2xl font-semibold text-green-600">
              R$ {dados.metaMensal.toLocaleString()}
            </p>
            <Progress value={progressoMensal} className="my-2" />
            <p className="text-xs text-gray-600">
              {progressoMensal.toFixed(0)}% da meta mensal
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-lg font-bold text-black mb-1">
              Meta da Semana
            </h2>
            <p className="text-2xl font-semibold text-blue-600">
              R$ {dados.metaSemanal.toLocaleString()}
            </p>
            <Progress value={progressoSemanal} className="my-2" />
            <p className="text-xs text-gray-600">
              {progressoSemanal.toFixed(0)}% da meta semanal
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-lg font-bold text-black mb-1">Kiwify</h2>
            <p className="text-2xl font-semibold text-purple-600">
              {dados.vendasKiwify.toLocaleString()} vendas
            </p>
            <Progress value={progressoKiwify} className="my-2" />
            <p className="text-xs text-gray-600">
              {progressoKiwify.toFixed(0)}% da meta
            </p>
          </CardContent>
        </Card>
      </div>

      {/* RESUMO SETORES */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-bold text-black mb-4">
            Resumo de Conclusão por Setor
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center items-center">
            {resumoSetores.map((setor, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-xl p-4 border hover:shadow-md transition-all"
              >
                <h3 className="text-sm font-medium text-black mb-1 capitalize">
                  {setor.nome.replace(/([A-Z])/g, " $1")}
                </h3>
                <Progress
                  value={setor.progresso}
                  className="h-2 rounded-full bg-gray-100"
                />
                <p className="text-sm font-semibold text-gray-700 mt-2">
                  {setor.progresso}%
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* KANBAN */}
      {Object.entries(dados.kanbanDoDia).map(([setor, colunas]) => (
        <Card
          key={setor}
          className={`border-t-4 rounded-xl ${coresSetores[setor]}`}
        >
          <CardContent>
            <h2 className="text-xl font-bold text-black mb-4 capitalize">
              Kanban - {setor.replace(/([A-Z])/g, " $1")}
            </h2>
            <DragDropContext
              onDragEnd={(result) => onDragEnd({ ...result, type: setor })}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(colunas).map(([coluna, tarefas]) => (
                  <Droppable key={coluna} droppableId={coluna}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="space-y-2"
                      >
                        <h3 className="text-sm font-semibold text-black border-b pb-1 mb-2 capitalize">
                          {coluna}
                        </h3>
                        <ul className="space-y-2">
                          {tarefas.map((tarefa, index) => (
                            <Draggable
                              key={`${setor}-${coluna}-${index}`}
                              draggableId={`${setor}-${coluna}-${index}`}
                              index={index}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-black hover:shadow transition"
                                >
                                  {tarefa}
                                </li>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </ul>
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </DragDropContext>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardKPI;
