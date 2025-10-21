"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Cpu, Wrench, Brain, Box, Zap } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const skillCategories = [
  {
    icon: Code2,
    title: "Programming Languages",
    skills: ["C++", "Python", "JavaScript", "TypeScript", "Java", "SQL"],
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    skills: ["PyTorch", "TensorFlow", "YOLOv5", "TensorRT", "Computer Vision", "NLP (LSTM, BERT)"],
  },
  {
    icon: Cpu,
    title: "Embedded Systems & Hardware",
    skills: ["Arduino", "STM32", "ESP32", "NVIDIA Jetson", "PCB Design (KiCad)", "Linux"],
  },
  {
    icon: Box,
    title: "CAD & Manufacturing",
    skills: ["Fusion 360", "Onshape", "SolidWorks", "3D Printing", "CNC Machining", "KiCad"],
  },
  {
    icon: Wrench,
    title: "Development Tools & Frameworks",
    skills: ["Git", "React", "Node.js", "Express.js", "MongoDB", "Pandas", "NumPy", "Matplotlib"],
  },
  {
    icon: Zap,
    title: "Robotics & Control Systems",
    skills: ["PID Control", "Odometry", "Path Planning", "Motion Control", "Sensor Fusion", "Autonomous Systems"],
  },
]

function SkillCard({ category, index }: { category: (typeof skillCategories)[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const Icon = category.icon

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card className="p-6 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 group border-2 hover:border-primary/50 bg-card/50 backdrop-blur">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{category.title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="bg-muted hover:bg-primary/20 hover:text-primary transition-colors cursor-default text-foreground"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Technical Skills</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-balance">
            Comprehensive technical expertise spanning robotics, AI/ML, embedded systems, and full-stack development
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCard key={index} category={category} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
