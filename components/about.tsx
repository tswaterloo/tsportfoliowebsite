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
              I've been obsessed with building things since I was 10 years old. What started with LEGO Mindstorms
              evolved into competitive robotics, where I spent the last 8 years designing, programming, and competing
              with VEX robots. Leading my team to the{" "}
              <span className="text-foreground font-medium">World Championship Finals</span> (top 2 out of 20,000 teams)
              taught me that the best solutions come from relentless iteration and creative problem-solving.
            </p>
            <p>
              I don't just code robots—I think about how they move, how they sense their environment, and how to make
              them smarter. Whether it's implementing{" "}
              <span className="text-foreground font-medium">PID control loops</span> for precision movement, training{" "}
              <span className="text-foreground font-medium">YOLOv5 models</span> for real-time object detection, or
              optimizing algorithms with <span className="text-foreground font-medium">TensorRT GPU acceleration</span>,
              I'm driven by making systems work better, faster, and more intelligently.
            </p>
            <p>
              Beyond robotics, I love exploring the intersection of hardware and software. I've designed{" "}
              <span className="text-foreground font-medium">custom PCBs</span>, built{" "}
              <span className="text-foreground font-medium">large-format 3D printers</span>, and developed{" "}
              <span className="text-foreground font-medium">full-stack web applications</span>. Currently studying{" "}
              <span className="text-foreground font-medium">Electrical Engineering at the University of Waterloo</span>,
              I'm always looking for the next challenging problem to solve—whether it's in robotics, AI, or quantitative
              finance.
            </p>
            <p className="text-sm italic text-muted-foreground/80">
              When I'm not coding or building robots, you'll find me competing in Model UN, teaching robotics to younger
              students, or diving deep into financial markets and algorithmic trading strategies.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
