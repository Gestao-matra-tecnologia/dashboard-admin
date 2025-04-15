"use client"

import { useEffect, useRef } from "react"

interface BarChartItem {
  name: string
  value: number
  color: string
}

interface MiniBarChartProps {
  data: BarChartItem[]
  height: number
  isMonetary?: boolean
}

export function MiniBarChart({ data, height, isMonetary = false }: MiniBarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const width = canvas.width
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2
    const barWidth = chartWidth / data.length - 20

    // Adicionar sombra para todos os elementos
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
    ctx.shadowBlur = 8
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 2

    // Draw bars
    data.forEach((item, index) => {
      const x = padding + index * (chartWidth / data.length) + (chartWidth / data.length - barWidth) / 2
      const barHeight = isMonetary
        ? (item.value / Math.max(...data.map((d) => d.value))) * chartHeight
        : (item.value / 100) * chartHeight
      const y = height - padding - barHeight

      // Create gradient
      const gradient = ctx.createLinearGradient(x, y, x, height - padding)
      gradient.addColorStop(0, item.color)
      gradient.addColorStop(1, adjustColor(item.color, -30))

      // Draw bar with rounded top
      ctx.beginPath()
      ctx.moveTo(x, height - padding)
      ctx.lineTo(x, y + 5)
      ctx.arc(x + 5, y + 5, 5, Math.PI, Math.PI * 1.5)
      ctx.lineTo(x + barWidth - 5, y)
      ctx.arc(x + barWidth - 5, y + 5, 5, Math.PI * 1.5, 0)
      ctx.lineTo(x + barWidth, height - padding)
      ctx.closePath()

      ctx.fillStyle = gradient
      ctx.fill()

      // Add shine effect
      ctx.beginPath()
      ctx.moveTo(x + 2, height - padding)
      ctx.lineTo(x + 2, y + 5)
      ctx.lineTo(x + barWidth / 3, y + 5)
      ctx.lineTo(x + barWidth / 3, height - padding)
      ctx.closePath()

      const shineGradient = ctx.createLinearGradient(x, y, x + barWidth / 3, y)
      shineGradient.addColorStop(0, "rgba(255, 255, 255, 0.15)")
      shineGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.fillStyle = shineGradient
      ctx.fill()

      // Remover sombra para o texto
      ctx.shadowColor = "transparent"
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0

      // Draw label
      ctx.font = "bold 12px Arial"
      ctx.fillStyle = "#ffffff"
      ctx.textAlign = "center"
      ctx.fillText(item.name, x + barWidth / 2, height - 15)

      // Draw value
      const valueText = isMonetary ? `R$ ${item.value.toLocaleString()}` : `${item.value}%`
      ctx.fillText(valueText, x + barWidth / 2, y - 10)
    })

    // Draw bottom line
    ctx.beginPath()
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.strokeStyle = "#1e3a5f"
    ctx.lineWidth = 1
    ctx.stroke()
  }, [data, height, isMonetary])

  // Helper function to adjust color brightness
  function adjustColor(color: string, amount: number): string {
    const hex = color.replace("#", "")
    const r = Math.max(0, Math.min(255, Number.parseInt(hex.substring(0, 2), 16) + amount))
    const g = Math.max(0, Math.min(255, Number.parseInt(hex.substring(2, 4), 16) + amount))
    const b = Math.max(0, Math.min(255, Number.parseInt(hex.substring(4, 6), 16) + amount))
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
  }

  return (
    <div className="flex justify-center items-center h-full">
      <canvas ref={canvasRef} width={500} height={height} className="max-w-full" />
    </div>
  )
}
