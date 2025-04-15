"use client"

import { useEffect, useState } from "react"

interface CircularProgressIndicatorProps {
  value: number
  color: string
  size: number
  strokeWidth: number
  label?: string
}

export function CircularProgressIndicator({ value, color, size, strokeWidth, label }: CircularProgressIndicatorProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value)
    }, 100)

    return () => clearTimeout(timer)
  }, [value])

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Fundo do círculo com gradiente */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(30, 58, 95, 0.8) 0%, rgba(15, 39, 68, 0.8) 100%)`,
        }}
      />

      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {/* Círculo de fundo */}
        <circle cx={size / 2} cy={size / 2} r={radius} fill="transparent" stroke="#1e3a5f" strokeWidth={strokeWidth} />

        {/* Círculo de progresso com gradiente */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1s ease-in-out",
            filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))",
          }}
        />
      </svg>

      {/* Conteúdo central */}
      {label && (
        <div
          className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white"
          style={{ fontSize: size / 4 }}
        >
          {label}
        </div>
      )}
    </div>
  )
}
