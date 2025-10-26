"use client"

import { useState } from "react"

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["C++", "Python", "JavaScript", "TypeScript", "Java", "SQL"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "AI & Machine Learning",
    skills: ["PyTorch", "TensorFlow", "YOLOv5", "TensorRT", "Computer Vision", "NLP (LSTM, BERT)"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Embedded Systems & Hardware",
    skills: ["Arduino", "STM32", "ESP32", "NVIDIA Jetson", "PCB Design (KiCad)", "Linux"],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "CAD & Manufacturing",
    skills: ["Fusion 360", "Onshape", "SolidWorks", "3D Printing", "CNC Machining", "KiCad"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Development Tools & Frameworks",
    skills: ["Git", "React", "Node.js", "Express.js", "MongoDB", "Pandas", "NumPy", "Matplotlib"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Robotics & Control Systems",
    skills: ["PID Control", "Odometry", "Path Planning", "Motion Control", "Sensor Fusion", "Autonomous Systems"],
    color: "from-pink-500 to-rose-500",
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
                className="space-y-3 relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <h3
                  className={`text-xl font-semibold bg-gradient-to-r ${category.color} bg-clip-text text-transparent transition-all duration-300 ${hoveredIndex === index ? "translate-x-2" : ""}`}
                >
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2 pl-4 border-l-2 border-border/30 group-hover:border-primary/50 transition-colors">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className="text-muted-foreground hover:text-foreground transition-colors cursor-default relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent hover:after:w-full after:transition-all after:duration-300"
                      style={{
                        transitionDelay: `${skillIndex * 30}ms`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
