"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

interface BarChartProps {
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string | string[]
      borderColor?: string
      borderWidth?: number
      borderRadius?: number
    }[]
  }
}

export function BarChart({ data }: BarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              color: "rgba(30, 58, 95, 0.5)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
          y: {
            grid: {
              color: "rgba(30, 58, 95, 0.5)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
          tooltip: {
            backgroundColor: "rgba(10, 25, 41, 0.9)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#1e3a5f",
            borderWidth: 1,
            padding: 10,
            displayColors: true,
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || ""
                if (label) {
                  label += ": "
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(context.parsed.y)
                }
                return label
              },
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return <canvas ref={chartRef} />
}
