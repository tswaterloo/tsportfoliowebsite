"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server, Database, Code, Workflow, Cloud, GitBranch } from "lucide-react"

const techStack = [
  {
    icon: Code,
    title: "Frontend",
    description: "Modern React with TypeScript and Next.js",
    technologies: ["React", "Next.js 15", "TypeScript", "Tailwind CSS v4", "Framer Motion", "shadcn/ui"],
    color: "text-cyan-400",
  },
  {
    icon: Server,
    title: "Backend",
    description: "RESTful APIs with Node.js and Express-style routing",
    technologies: ["Node.js", "Next.js API Routes", "REST API", "Server Actions", "WebSockets"],
    color: "text-green-400",
  },
  {
    icon: Database,
    title: "Database",
    description: "Both SQL and NoSQL database management",
    technologies: ["PostgreSQL", "Neon", "MongoDB", "SQL Queries", "Database Migrations"],
    color: "text-purple-400",
  },
  {
    icon: Workflow,
    title: "CI/CD & DevOps",
    description: "Automated deployment and testing pipelines",
    technologies: ["GitHub Actions", "Docker", "Docker Compose", "Vercel", "Automated Testing"],
    color: "text-blue-400",
  },
  {
    icon: Cloud,
    title: "3D & Graphics",
    description: "Interactive 3D visualizations and CAD",
    technologies: ["Three.js", "React Three Fiber", "WebGL", "3D Rendering", "CAD Viewer"],
    color: "text-pink-400",
  },
  {
    icon: GitBranch,
    title: "Real-time & Data",
    description: "Live data streaming and visualization",
    technologies: ["WebSockets", "Real-time Charts", "Data Visualization", "Recharts", "Live Telemetry"],
    color: "text-orange-400",
  },
]

export function TechStack() {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary/50">
              Full-Stack Development
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technology Stack</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
              This portfolio itself is a demonstration of modern web development, showcasing REST APIs, PostgreSQL &
              MongoDB databases, 3D graphics, real-time WebSocket data, CI/CD pipelines, and Docker containerization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((stack, index) => {
              const Icon = stack.icon
              return (
                <Card
                  key={index}
                  className="p-6 border-2 hover:border-primary/50 transition-all duration-300 group bg-card/50 backdrop-blur hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className={`h-6 w-6 ${stack.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold">{stack.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{stack.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {stack.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs bg-muted hover:bg-primary/20 transition-colors text-foreground"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <Card className="p-6 border-2 border-primary/30 bg-primary/5 backdrop-blur">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Live Implementation:</span> This website uses PostgreSQL
                (Neon) for project data, MongoDB for analytics, REST API endpoints for CRUD operations, real-time
                WebSocket telemetry dashboard, 3D robot viewer with Three.js, GitHub Actions CI/CD pipeline, and Docker
                containerization for deployment.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
