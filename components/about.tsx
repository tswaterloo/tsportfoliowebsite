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
              Hi, I'm Tanush Shah, a first year Electrical Engineering student at the University of Waterloo. I'm excited about opportunities to solve difficult and interesting problems, whether they be in software, hardware, data, etc.

              On the <span className="text-foreground font-medium">software</span> side, I spend a lot of time in C++ as well as Python. Recently, I've become interested in full-stack development, which led to the creation of this site! In terms of <span className="text-foreground font-medium">firmware/hardware</span>
              , I've used Arduino & ESP32 extensively, as well as KiCAD. I also like KiCad. I also have 6 years of experience with CAD softwares such as Fusion 360.
            
            </p>
            <p>
               I've done lots of cool things utilizing the aforementioned skills, scroll down on this website to see a showcase of said things!
            </p>
            <p className="text-sm italic text-muted-foreground/80">
              Recently, I've become interested in learning more about algorithmic trading. I am working a project related to it which I will complete and upload soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
