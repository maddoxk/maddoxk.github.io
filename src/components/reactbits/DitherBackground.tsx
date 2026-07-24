import React, { useEffect, useRef } from 'react'

interface DitherBackgroundProps {
  className?: string
  color1?: string
  color2?: string
}

export default function DitherBackground({
  className = '',
  color1 = '#090a0f',
  color2 = '#1b1c24',
}: DitherBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // 4x4 Bayer Dithering Matrix
    const bayerMatrix = [
      [ 0,  8,  2, 10],
      [12,  4, 14,  6],
      [ 3, 11,  1,  9],
      [15,  7, 13,  5]
    ]

    const render = () => {
      time += 0.015
      ctx.clearRect(0, 0, width, height)

      // Create animated wave gradient
      const imgData = ctx.createImageData(width, height)
      const data = imgData.data

      // Downsampled grid for performance
      const step = 4
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          // Normalize coordinates
          const u = x / width
          const v = y / height

          // Plasma wave equation
          const wave = Math.sin(u * 6 + time) + Math.cos(v * 6 + time) + Math.sin((u + v) * 4 + time * 1.2)
          const normWave = (wave + 3) / 6 // 0 to 1

          // Bayer threshold lookup
          const bx = (x / step) % 4
          const by = (y / step) % 4
          const threshold = bayerMatrix[by][bx] / 16

          const ditherVal = normWave > threshold ? 1 : 0

          // Color channel interpolation (dark charcoal void -> deep slate cyan)
          const r = Math.round(18 + ditherVal * 28)
          const g = Math.round(20 + ditherVal * 32)
          const b = Math.round(28 + ditherVal * 42)
          const a = 255

          for (let dy = 0; dy < step && y + dy < height; dy++) {
            for (let dx = 0; dx < step && x + dx < width; dx++) {
              const idx = ((y + dy) * width + (x + dx)) * 4
              data[idx] = r
              data[idx + 1] = g
              data[idx + 2] = b
              data[idx + 3] = a
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0)
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color1, color2])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
