"use client"

import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { TechStack } from "@/components/tech-stack"
import { RobotShowcase } from "@/components/robot-showcase"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { ScrollProgress } from "@/components/scroll-progress"
import { InteractiveGridBackground } from "@/components/interactive-grid-background"

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <InteractiveGridBackground />
      <ScrollProgress />
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <TechStack />
      <RobotShowcase />
      <Contact />
    </main>
  )
}
