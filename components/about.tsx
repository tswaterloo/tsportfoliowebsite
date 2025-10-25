"use client"

import { useEffect, useRef, useState } from "react"
import { Award, Trophy, GraduationCap, Users } from "lucide-react"

const highlights = [
  {
    icon: Trophy,
    title: "World Championship Finalist",
    description: "Top 2 of 20,000 teams worldwide",
  },
  {
    icon: Award,
    title: "5x State Awards",
    description: "Excellence, Innovate, Amaze Awards",
  },
  {
    icon: GraduationCap,
    title: "UWaterloo Engineering",
    description: "Electrical Engineering Student",
  },
  {
    icon: Users,
    title: "Team Leadership",
    description: "Captain & Instructor for 8+ years",
  },
]

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-8 relative border-b border-border/30" ref={sectionRef}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-8 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            About Me
          </h2>
          <div
            className={`space-y-6 text-lg leading-relaxed text-muted-foreground transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p>
              I'm Tanush, a first-year Electrical Engineering student at the University of Waterloo. I'm looking for opportunities to work on exciting and interesting technologies.

             
            </p>
            <p>
                 I spend a lot of time in C++ and Python, and recently started exploring full-stack development (ex: this website). I've also worked extensively with embedded systems, microcontrollers, PCB design, and CAD softwares.
            </p>
            <p>
                Previously, I led my Robotics Team to a World Championshp Finalist position,  conducted ECE research at Hofstra University, and was invited to present an AI showcase in Dallas by the CTO of VEX Robotics.
            </p>

            <p>
                To see what else I have done and what I am currently doing, scroll down!
    
            </p>
            <p className="text-sm italic text-muted-foreground/80">
              Note: Recently, I've become interested in learning more about algorithmic trading. I am working a project related to it which I will complete and share soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
