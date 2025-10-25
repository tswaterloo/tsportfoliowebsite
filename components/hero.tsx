"use client"

import { Button } from "@/components/ui/button"
import { Linkedin, Mail, ExternalLink, Download, Code2, Cpu, Wrench, Brain } from "lucide-react"
import { useEffect, useState } from "react"
import { TypewriterText } from "@/components/typewriter-text"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const skillIcons = [
    { icon: Code2, label: "C++", color: "text-blue-400" },
    { icon: Code2, label: "Python", color: "text-yellow-400" },
    { icon: Code2, label: "React", color: "text-cyan-400" },
    { icon: Cpu, label: "Robotics", color: "text-purple-400" },
    { icon: Brain, label: "AI/ML", color: "text-pink-400" },
    { icon: Wrench, label: "CAD", color: "text-green-400" },
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-8 space-y-4">
            <span className="text-3xl md:text-4xl lg:text-5xl font-light block tracking-wide bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              Hi, I'm
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-balance bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%] leading-[1.1]">
              Tanush Shah
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                <TypewriterText
                  texts={[
                    "Electrical Engineering Student",
                    "Robotics Engineer",
                    "Full Stack Developer",
                    "Embedded Systems Developer",
                    "Firmware Engineer",
                    "AI/ML Enthusiast",
                  ]}
                />
              </span>
            </h2>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground mb-6 text-balance font-medium">
            Electrical Engineering @ University of Waterloo
          </p>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Electrical engineering student looking to solve difficult problems and make an impact. Hands-on experience in software development, robotics, embedded systems, hardware | Prev: VEX Robotics World Finalist, ECE Research @ Hofstra University, special AI showcase presenter @ Robotics World Championship in Dallas.
          </p>

          <div className="flex items-center justify-center gap-6 mb-10 flex-wrap">
            {skillIcons.map((skill, index) => {
              const Icon = skill.icon
              return (
                <div
                  key={skill.label}
                  className="flex flex-col items-center gap-2 group cursor-default"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-3 bg-background/50 backdrop-blur-sm border-2 border-border rounded-lg group-hover:border-primary/50 transition-all group-hover:scale-110">
                    <Icon className={`h-6 w-6 ${skill.color}`} />
                  </div>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {skill.label}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Button size="lg" className="group" asChild>
              <a href="#projects">
                View Projects
                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6">
            <a
              href="https://linkedin.com/in/tanush-shah17"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-secondary transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:t67shah@uwaterloo.ca"
              className="text-muted-foreground hover:text-accent transition-all hover:scale-110"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-24 h-24 bg-accent/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "4s" }}
      />
    </section>
  )
}
