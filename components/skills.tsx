"use client"

import { Badge } from "@/components/ui/badge"
import { useState } from "react"

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["C++", "Python", "JavaScript", "TypeScript", "Java", "SQL"],
    color: "from-blue-500/10 to-cyan-500/10 border-blue-500/30",
  },
  {
    title: "AI & Machine Learning",
    skills: ["PyTorch", "TensorFlow", "YOLOv5", "TensorRT", "Computer Vision", "NLP (LSTM, BERT)"],
    color: "from-purple-500/10 to-pink-500/10 border-purple-500/30",
  },
  {
    title: "Embedded Systems & Hardware",
    skills: ["Arduino", "STM32", "ESP32", "NVIDIA Jetson", "PCB Design (KiCad)", "Linux"],
    color: "from-orange-500/10 to-red-500/10 border-orange-500/30",
  },
  {
    title: "CAD & Manufacturing",
    skills: ["Fusion 360", "Onshape", "SolidWorks", "3D Printing", "CNC Machining", "KiCad"],
    color: "from-green-500/10 to-emerald-500/10 border-green-500/30",
  },
  {
    title: "Development Tools & Frameworks",
    skills: ["Git", "React", "Node.js", "Express.js", "MongoDB", "Pandas", "NumPy", "Matplotlib"],
    color: "from-cyan-500/10 to-blue-500/10 border-cyan-500/30",
  },
  {
    title: "Robotics & Control Systems",
    skills: ["PID Control", "Odometry", "Path Planning", "Motion Control", "Sensor Fusion", "Autonomous Systems"],
    color: "from-pink-500/10 to-rose-500/10 border-pink-500/30",
  },
]

export function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="skills" className="py-8 relative border-b border-border/30">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl text-balance">
            Comprehensive technical expertise spanning robotics, AI/ML, embedded systems, and full-stack development
          </p>

          <div className="space-y-8">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="space-y-3 relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`absolute inset-0 -mx-6 rounded-lg bg-gradient-to-r ${category.color} transition-opacity duration-300 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    width: "calc(100% + 3rem)",
                  }}
                />

                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-foreground/90">{category.title}</h3>
                  <div className="flex flex-wrap gap-2 pl-4 border-l-2 border-primary/30">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-muted hover:bg-primary/20 hover:text-primary transition-colors cursor-default text-foreground text-sm px-3 py-1"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
