"use client"

import { DollarSign, FileText, LineChart, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircularProgressIndicator } from "./ui/circular-progress"

export default function OverviewMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-[#0f2744] border-[#1e3a5f] text-white overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-300">Faturamento Total</CardTitle>
          <DollarSign className="h-4 w-4 text-cyan-400" />
        </CardHeader>
        <CardContent className="pb-2">
          <div className="text-2xl font-bold text-white">R$ 65.000</div>
          <p className="text-xs text-slate-300">Meta: R$ 100.000</p>
          <div className="mt-3 h-2 w-full rounded-full bg-[#1e3a5f]">
            <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: "65%" }}></div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-[#0f2744] border-[#1e3a5f] text-white overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-300">MRR Produtos</CardTitle>
          <LineChart className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent className="pb-2">
          <div className="text-2xl font-bold text-white">R$ 20.000</div>
          <p className="text-xs text-slate-300">Meta: R$ 50.000</p>
          <div className="mt-3 h-2 w-full rounded-full bg-[#1e3a5f]">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"
              style={{ width: "40%" }}
            ></div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-[#0f2744] border-[#1e3a5f] text-white overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-300">Projetos Clientes</CardTitle>
          <FileText className="h-4 w-4 text-yellow-400" />
        </CardHeader>
        <CardContent className="pb-2">
          <div className="text-2xl font-bold text-white">R$ 32.000</div>
          <p className="text-xs text-slate-300">Meta: R$ 40.000</p>
          <div className="mt-3 h-2 w-full rounded-full bg-[#1e3a5f]">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
              style={{ width: "80%" }}
            ></div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-[#0f2744] border-[#1e3a5f] text-white overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-300">Novos Leads</CardTitle>
          <Users className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent className="pb-2">
          <div className="text-2xl font-bold text-white">1.800</div>
          <p className="text-xs text-slate-300">Meta: 2.000</p>
          <div className="mt-3 h-2 w-full rounded-full bg-[#1e3a5f]">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600"
              style={{ width: "90%" }}
            ></div>
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2 bg-[#0f2744] border-[#1e3a5f] text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white">Métricas Principais</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <CircularProgressIndicator value={65} color="#22d3ee" size={120} strokeWidth={10} label="65%" />
            <span className="mt-2 text-sm text-slate-300">Faturamento</span>
          </div>
          <div className="flex flex-col items-center">
            <CircularProgressIndicator value={40} color="#c084fc" size={120} strokeWidth={10} label="40%" />
            <span className="mt-2 text-sm text-slate-300">MRR</span>
          </div>
          <div className="flex flex-col items-center">
            <CircularProgressIndicator value={90} color="#4ade80" size={120} strokeWidth={10} label="90%" />
            <span className="mt-2 text-sm text-slate-300">Leads</span>
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2 bg-[#0f2744] border-[#1e3a5f] text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white">Metas Trimestrais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-slate-300">Faturar R$ 300.000</span>
              <span className="text-sm font-medium text-cyan-400">60%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#1e3a5f]">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-slate-300">10.000 leads totais</span>
              <span className="text-sm font-medium text-purple-400">45%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#1e3a5f]">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"
                style={{ width: "45%" }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-slate-300">MRR R$ 50K até junho</span>
              <span className="text-sm font-medium text-yellow-400">30%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#1e3a5f]">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
                style={{ width: "30%" }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
