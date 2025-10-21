"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ExternalLink, Download } from "lucide-react"
import { useEffect, useState } from "react"
import { TypewriterText } from "@/components/typewriter-text"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-6">
            <span className="text-lg md:text-xl font-semibold text-primary mb-4 block">Hi, I'm Tanush Shah</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
              <TypewriterText
                texts={[
                  "Electrical Engineering Student",
                  "Robotics Engineer",
                  "Full Stack Developer",
                  "AI/ML Enthusiast",
                ]}
              />
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
            VEX Robotics World Championship Finalist | Electrical Engineering @ University of Waterloo
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Passionate about robotics, AI, and full-stack development. Experienced in C++, Python, React, and machine
            learning with a track record of leading award-winning robotics teams and building innovative engineering
            projects.
          </p>

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
              href="https://github.com/tanushshah"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
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
