"use client"

import { Badge } from "@/components/ui/badge"

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["C++", "Python", "JavaScript", "TypeScript", "Java", "SQL"],
  },
  {
    title: "AI & Machine Learning",
    skills: ["PyTorch", "TensorFlow", "YOLOv5", "TensorRT", "Computer Vision", "NLP (LSTM, BERT)"],
  },
  {
    title: "Embedded Systems & Hardware",
    skills: ["Arduino", "STM32", "ESP32", "NVIDIA Jetson", "PCB Design (KiCad)", "Linux"],
  },
  {
    title: "CAD & Manufacturing",
    skills: ["Fusion 360", "Onshape", "SolidWorks", "3D Printing", "CNC Machining", "KiCad"],
  },
  {
    title: "Development Tools & Frameworks",
    skills: ["Git", "React", "Node.js", "Express.js", "MongoDB", "Pandas", "NumPy", "Matplotlib"],
  },
  {
    title: "Robotics & Control Systems",
    skills: ["PID Control", "Odometry", "Path Planning", "Motion Control", "Sensor Fusion", "Autonomous Systems"],
  },
]

export function Skills() {
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
              <div key={index} className="space-y-3">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
