"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
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
    github_url: "http://bit.ly/46xUgox",
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
    github_url: "https://bit.ly/3KyGHh4",
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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

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
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-2 hover:border-primary/50">
        <div className="relative overflow-hidden">
          <img
            src={project.image_url || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>
          <div className="flex gap-3">
            {project.github_url && (
              <Button variant="outline" size="sm" className="group/btn bg-transparent" asChild>
                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
                  Code
                </a>
              </Button>
            )}
            {project.demo_url && (
              <Button size="sm" className="group/btn" asChild>
                <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  View
                </a>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        console.log("[v0] Fetching projects from PostgreSQL API...")
        const response = await fetch("/api/sql/projects")

        if (response.ok) {
          const result = await response.json()
          console.log("[v0] API response:", result)

          if (result.success && Array.isArray(result.data)) {
            setProjects(result.data)
            console.log("[v0] Successfully loaded projects from PostgreSQL")
          } else {
            console.log("[v0] API response format unexpected, using fallback data")
            setProjects(FALLBACK_PROJECTS)
          }
        } else {
          console.log("[v0] API request failed, using fallback data")
          setProjects(FALLBACK_PROJECTS)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch projects:", error)
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
            <p className="text-muted-foreground">Loading projects from PostgreSQL...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Featured Projects</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            A showcase of my robotics, AI, and engineering projects demonstrating expertise in embedded systems,
            computer vision, and full-stack development
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
