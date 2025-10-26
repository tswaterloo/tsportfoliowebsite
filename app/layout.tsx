import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { CustomCursor } from "@/components/custom-cursor"

import { Rajdhani as V0_Font_Rajdhani, Space_Mono as V0_Font_Space_Mono, Cormorant as V0_Font_Cormorant } from 'next/font/google'

// Initialize fonts
const _rajdhani = V0_Font_Rajdhani({ subsets: ['latin'], weight: ["300","400","500","600","700"] })
const _spaceMono = V0_Font_Space_Mono({ subsets: ['latin'], weight: ["400","700"] })
const _cormorant = V0_Font_Cormorant({ subsets: ['latin'], weight: ["300","400","500","600","700"] })

export const metadata: Metadata = {
  title: "Tanush Shah | Full Stack Developer",
  description:
    "Electrical Engineering student at University of Waterloo specializing in full-stack development, robotics, and machine learning",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-mono ${GeistSans.variable} ${GeistMono.variable}`}>
        <CustomCursor />
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
