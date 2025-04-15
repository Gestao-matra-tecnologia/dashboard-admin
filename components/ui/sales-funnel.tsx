"use client"

import { useEffect, useRef } from "react"

interface FunnelStage {
  label: string
  value: number
  percentage: number
  color: string
}

interface SalesFunnelProps {
  data: {
    leads: FunnelStage
    inProgress: FunnelStage
    closed: FunnelStage
  }
  height: number
}

export function SalesFunnel({ data, height }: SalesFunnelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const width = canvas.width
    const stageHeight = height / 3

    // Adicionar sombra para todos os elementos
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
    ctx.shadowBlur = 10
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 2

    // Draw funnel stages
    // Top stage (Leads)
    const topWidth = width * 0.9
    const topLeft = (width - topWidth) / 2
    drawTrapezoid(ctx, topLeft, 0, topWidth, stageHeight, topWidth * 0.7, data.leads.color)

    // Middle stage (In Progress)
    const middleWidth = topWidth * 0.7
    const middleLeft = (width - middleWidth) / 2
    drawTrapezoid(ctx, middleLeft, stageHeight, middleWidth, stageHeight, middleWidth * 0.7, data.inProgress.color)

    // Bottom stage (Closed)
    const bottomWidth = middleWidth * 0.7
    const bottomLeft = (width - bottomWidth) / 2
    drawTrapezoid(ctx, bottomLeft, stageHeight * 2, bottomWidth, stageHeight, bottomWidth * 0.5, data.closed.color)

    // Remover sombra para o texto
    ctx.shadowColor = "transparent"
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    // Add labels and values
    ctx.font = "bold 14px Arial"
    ctx.fillStyle = "#ffffff"
    ctx.textAlign = "center"

    // Top label
    ctx.fillText(data.leads.label, width / 2, stageHeight / 2 - 20)
    ctx.font = "bold 16px Arial"
    ctx.fillText(data.leads.value.toLocaleString(), width / 2, stageHeight / 2 + 5)
    ctx.font = "12px Arial"
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    ctx.fillText(`${data.leads.percentage}%`, width / 2, stageHeight / 2 + 25)

    // Middle label
    ctx.font = "bold 14px Arial"
    ctx.fillStyle = "#ffffff"
    ctx.fillText(data.inProgress.label, width / 2, stageHeight * 1.5 - 20)
    ctx.font = "bold 16px Arial"
    ctx.fillText(data.inProgress.value.toLocaleString(), width / 2, stageHeight * 1.5 + 5)
    ctx.font = "12px Arial"
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    ctx.fillText(`${data.inProgress.percentage}%`, width / 2, stageHeight * 1.5 + 25)

    // Bottom label
    ctx.font = "bold 14px Arial"
    ctx.fillStyle = "#ffffff"
    ctx.fillText(data.closed.label, width / 2, stageHeight * 2.5 - 20)
    ctx.font = "bold 16px Arial"
    ctx.fillText(data.closed.value.toLocaleString(), width / 2, stageHeight * 2.5 + 5)
    ctx.font = "12px Arial"
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    ctx.fillText(`${data.closed.percentage}%`, width / 2, stageHeight * 2.5 + 25)
  }, [data, height])

  // Helper function to draw a trapezoid
  function drawTrapezoid(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    topWidth: number,
    height: number,
    bottomWidth: number,
    color: string,
  ) {
    const bottomX = x + (topWidth - bottomWidth) / 2

    // Create gradient
    const gradient = ctx.createLinearGradient(x, y, x + topWidth, y)
    gradient.addColorStop(0, color)
    gradient.addColorStop(1, adjustColor(color, -20))

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + topWidth, y)
    ctx.lineTo(bottomX + bottomWidth, y + height)
    ctx.lineTo(bottomX, y + height)
    ctx.closePath()

    // Fill with gradient
    ctx.fillStyle = gradient
    ctx.fill()

    // Add subtle border
    ctx.strokeStyle = adjustColor(color, -40)
    ctx.lineWidth = 1
    ctx.stroke()

    // Add shine effect
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + topWidth * 0.8, y)
    ctx.lineTo(bottomX + bottomWidth * 0.8, y + height)
    ctx.lineTo(bottomX, y + height)
    ctx.closePath()

    const shineGradient = ctx.createLinearGradient(x, y, x + topWidth * 0.8, y)
    shineGradient.addColorStop(0, "rgba(255, 255, 255, 0.15)")
    shineGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

    ctx.fillStyle = shineGradient
    ctx.fill()
  }

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
      <canvas ref={canvasRef} width={340} height={height} className="max-w-full" />
    </div>
  )
}
