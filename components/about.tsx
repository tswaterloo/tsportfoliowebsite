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
              Hi, I'm Tanush Shah, a first year Electrical Engineering student at the University of Waterloo. I love solving difficult problems, and I am excited about opportunities within software, hardware, design, or any that may be intellectually stimulating
              
              On the <span className="text-foreground font-medium">software</span> side, I spend a lot of time in C++ as well as Python. Recently, I've become interested in full-stack development, which led to the creation of this site! I enjoy using Linux, and I've been experimenting with computer vision. In terms of <span className="text-foreground font-medium">firmware/hardware</span>
              , I'm most experienced with Arduino, ESP32, and ESP32. I also like KiCad. Previously, I did Competitive VEX Robotics for 8 years, as the lead designer (various CAD softwares) and programmer (C++) on my team. I led my team to the <span className="text-foreground font-medium">VEX World Championship Finals</span> (top 2 out of 20,000 teams), as well as many other awards such as: 1x Worlds Division Champion, 1x Worlds Division Finalist, 2x New Jersey Tournament Champion, 5x Judges' Awards.
            </p>
            <p>
              I've done lots of other cool things and am always learning more and looking for a new problem to solve! Scroll down on this website to see a showcase what else I've done in detail.

            </p>
            <p className="text-sm italic text-muted-foreground/80">
              These days, I am interested in learning more about algorithmic trading and financial modeling.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
