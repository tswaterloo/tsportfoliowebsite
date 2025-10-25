"use client"

import { useEffect } from "react"

export function CustomCursor() {
  useEffect(() => {
    const cursor = document.createElement("div")

    cursor.style.cssText = `
      position: fixed;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.6);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity 0.2s ease;
    `

    document.body.appendChild(cursor)

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
      cursor.style.opacity = "1"
    }

    const handleMouseLeave = () => {
      cursor.style.opacity = "0"
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.body.removeChild(cursor)
    }
  }, [])

  return null
}
