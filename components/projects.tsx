"use client"
import { ExternalLink } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface Project {
  id: number
  title: string
  description: string
  image_url: string
  technologies: string[]
  github_url?: string
  demo_url?: string
  display_order: number
}

const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "VEX Robotics World Championship Robot",
    description:
      "Led team to Finalist position at VEX Robotics World Championship (top 2 of 20,000 teams). Programmed drive, autonomous, PID, and odometry systems in C++. Designed complete robot in Fusion 360 with detailed CAD documentation.",
    image_url: "/advanced-robotics-competition-robot-with-sensors.jpg",
    technologies: ["C++", "VEXCode Pro", "PROS", "Fusion 360", "PID Control", "Odometry"],
    demo_url: "https://bit.ly/46tg7gQ",
    display_order: 1,
  },
  {
    id: 2,
    title: "Large-Format Gantry 3D Printer",
    description:
      "Designed and built modular large-format gantry 3D printer in Onshape. Coded multi-axis motion control and G-code execution with Duet 3D Controller & RepRap Firmware. Presented at research symposium with 2000+ attendees.",
    image_url: "/large-format-gantry-3d-printer-industrial.jpg",
    technologies: ["Onshape", "RepRap Firmware", "G-code", "Motion Control", "Duet 3D"],
    demo_url: "https://bit.ly/48rf9Ej",
    display_order: 2,
  },
  {
    id: 3,
    title: "Mobile 4WD 3D Printing Robot",
    description:
      "Designed and built mobile 4WD robot with integrated 3D printing capability using Arduino. Fabricated custom PCB shield using KiCad. Implemented motion control algorithms and path planning for stepper motors in C++.",
    image_url: "/mobile-robot-with-3d-printer-autonomous.jpg",
    technologies: ["Arduino", "KiCad", "C++", "PCB Design", "Stepper Motors", "Path Planning"],
    demo_url: "https://bit.ly/48rf9Ej",
    display_order: 3,
  },
  {
    id: 4,
    title: "VEX AI Computer Vision System",
    description:
      "Developed position mapping and object detection using YOLOv5 deep learning model. Engineered serial communication between NVIDIA Jetson Nano (Linux) and V5 Brain. Optimized performance 5x through TensorRT GPU acceleration.",
    image_url: "/computer-vision-object-detection-ai-robot.jpg",
    technologies: ["Python", "YOLOv5", "TensorRT", "NVIDIA Jetson Nano", "Computer Vision", "Linux"],
    display_order: 4,
  },
  {
    id: 5,
    title: "Financial Market Sentiment Analysis AI",
    description:
      "Built NLP models (LSTM, BERT, Bag of Words) using Python to analyze financial news and predict market trends. Achieved 85% classification accuracy using sentiment analysis with Logistic Regression, K-NN, and Random Forest.",
    image_url: "/financial-ai-sentiment-analysis-dashboard.jpg",
    technologies: ["Python", "PyTorch", "TensorFlow", "BERT", "LSTM", "NLP", "scikit-learn"],
    display_order: 5,
  },
]

function ProjectItem({ project, index }: { project: Project; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (itemRef.current) {
      observer.observe(itemRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={itemRef}
      className={`group transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="relative border-l-2 border-border pl-8 pb-12 hover:border-primary transition-colors duration-300">
        <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-border group-hover:bg-primary group-hover:scale-150 transition-all duration-300" />

        <div className="font-mono text-xs text-muted-foreground mb-2">{String(index + 1).padStart(2, "0")}</div>

        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-2xl font-light tracking-tight group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <p className="text-base text-muted-foreground leading-relaxed mb-4 max-w-3xl">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs text-muted-foreground/70 hover:text-primary transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/sql/projects")

        if (response.ok) {
          const result = await response.json()

          if (result.success && Array.isArray(result.data)) {
            const uniqueProjects = result.data.filter(
              (project: Project, index: number, self: Project[]) =>
                index === self.findIndex((p) => p.id === project.id || p.title === project.title),
            )
            console.log("[v0] Projects received from API:", result.data.length)
            console.log("[v0] Unique projects after filtering:", uniqueProjects.length)
            console.log(
              "[v0] Project titles:",
              uniqueProjects.map((p: Project) => p.title),
            )
            setProjects(uniqueProjects)
          } else {
            setProjects(FALLBACK_PROJECTS)
          }
        } else {
          setProjects(FALLBACK_PROJECTS)
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error)
        setProjects(FALLBACK_PROJECTS)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section id="projects" className="py-24 bg-muted/30 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-8 relative border-b border-border/30">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-3">Selected Work</h2>
            <p className="text-sm text-muted-foreground font-mono">Robotics / AI / Engineering</p>
          </div>

          <div className="space-y-0">
            {projects.map((project, index) => (
              <ProjectItem key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
