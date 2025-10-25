"use client"

import { useEffect, useRef } from "react"

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
    }> = []

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 2, // Larger dots (2-5px instead of 1.5-4px)
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        const dx = particle.x - mouseRef.current.x
        const dy = particle.y - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const warpRadius = 150
        const warpStrength = 15

        let warpX = particle.x
        let warpY = particle.y

        if (distance < warpRadius) {
          const force = (1 - distance / warpRadius) * warpStrength
          warpX += (dx / distance) * force
          warpY += (dy / distance) * force
        }

        ctx.beginPath()
        ctx.arc(warpX, warpY, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(0, 217, 255, 0.8)"
        ctx.fill()
      })

      // Draw connections with warp effect
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx1 = p1.x - mouseRef.current.x
          const dy1 = p1.y - mouseRef.current.y
          const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1)
          const warpRadius = 150
          const warpStrength = 15

          let warpX1 = p1.x
          let warpY1 = p1.y
          if (distance1 < warpRadius) {
            const force = (1 - distance1 / warpRadius) * warpStrength
            warpX1 += (dx1 / distance1) * force
            warpY1 += (dy1 / distance1) * force
          }

          const dx2 = p2.x - mouseRef.current.x
          const dy2 = p2.y - mouseRef.current.y
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

          let warpX2 = p2.x
          let warpY2 = p2.y
          if (distance2 < warpRadius) {
            const force = (1 - distance2 / warpRadius) * warpStrength
            warpX2 += (dx2 / distance2) * force
            warpY2 += (dy2 / distance2) * force
          }

          const dx = warpX1 - warpX2
          const dy = warpY1 - warpY2
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(warpX1, warpY1)
            ctx.lineTo(warpX2, warpY2)
            ctx.strokeStyle = `rgba(0, 217, 255, ${0.6 * (1 - distance / 150)})`
            ctx.lineWidth = 2
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-90 dark:opacity-70"
      style={{ zIndex: 0 }}
    />
  )
}
