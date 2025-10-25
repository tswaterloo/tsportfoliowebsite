"use client"

import { useEffect, useRef } from "react"

export function InteractiveGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosRef = useRef<{ x: number; y: number } | null>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()

    const gridSize = 40
    const warpRadius = 120
    const warpStrength = 12

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = "rgba(120, 120, 120, 0.35)"
      ctx.lineWidth = 1.8

      const mousePos = mousePosRef.current

      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        for (let y = 0; y <= canvas.height; y += 5) {
          let offsetX = x
          let offsetY = y

          if (mousePos) {
            const dx = mousePos.x - x
            const dy = mousePos.y - y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < warpRadius) {
              const warpFactor = (1 - distance / warpRadius) * warpStrength
              offsetX += (dx / distance) * warpFactor
              offsetY += (dy / distance) * warpFactor * 0.5
            }
          }

          if (y === 0) {
            ctx.moveTo(offsetX, offsetY)
          } else {
            ctx.lineTo(offsetX, offsetY)
          }
        }
        ctx.stroke()
      }

      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        for (let x = 0; x <= canvas.width; x += 5) {
          let offsetX = x
          let offsetY = y

          if (mousePos) {
            const dx = mousePos.x - x
            const dy = mousePos.y - y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < warpRadius) {
              const warpFactor = (1 - distance / warpRadius) * warpStrength
              offsetX += (dx / distance) * warpFactor * 0.5
              offsetY += (dy / distance) * warpFactor
            }
          }

          if (x === 0) {
            ctx.moveTo(offsetX, offsetY)
          } else {
            ctx.lineTo(offsetX, offsetY)
          }
        }
        ctx.stroke()
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      updateCanvasSize()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-50" style={{ zIndex: 0 }} />
}
