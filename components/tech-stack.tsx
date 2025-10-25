"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Server, Database, Code, Workflow, Cloud, GitBranch } from "lucide-react"

const techStack = [
  {
    icon: Code,
    title: "Frontend",
    description: "Modern React with TypeScript and Next.js",
    technologies: [
      { name: "React", usage: "Component-based UI architecture for all pages and interactive elements" },
      { name: "Next.js 15", usage: "Server-side rendering, API routes, and optimized production builds" },
      { name: "TypeScript", usage: "Type-safe code across entire codebase for reliability and maintainability" },
      { name: "Tailwind CSS v4", usage: "Utility-first styling system for responsive design and dark theme" },
      { name: "Framer Motion", usage: "Smooth animations and transitions throughout the portfolio" },
      { name: "shadcn/ui", usage: "Pre-built accessible UI components (buttons, cards, forms, tooltips)" },
    ],
    color: "text-cyan-400",
  },
  {
    icon: Server,
    title: "Backend",
    description: "RESTful APIs with Node.js and Express-style routing",
    technologies: [
      { name: "Node.js", usage: "JavaScript runtime powering all server-side logic and API endpoints" },
      { name: "Next.js API Routes", usage: "RESTful endpoints at /api/sql/* for CRUD operations" },
      { name: "REST API", usage: "HTTP endpoints for projects, skills, experience, and contact form data" },
      { name: "Server Actions", usage: "Server-side form handling and data mutations" },
      { name: "WebSockets", usage: "Real-time telemetry dashboard with live sensor data streaming" },
    ],
    color: "text-green-400",
  },
  {
    icon: Database,
    title: "Database",
    description: "Both SQL and NoSQL database management",
    technologies: [
      {
        name: "PostgreSQL",
        usage: "Relational database storing projects, skills, experience, and contact submissions",
      },
      { name: "Neon", usage: "Serverless PostgreSQL hosting with connection pooling and auto-scaling" },
      { name: "MongoDB", usage: "NoSQL database for analytics tracking and flexible document storage" },
      { name: "SQL Queries", usage: "Raw SQL queries with parameterized statements for data retrieval and insertion" },
      { name: "Database Migrations", usage: "SQL scripts in /scripts folder for schema creation and data seeding" },
    ],
    color: "text-purple-400",
  },
  {
    icon: Workflow,
    title: "CI/CD & DevOps",
    description: "Automated deployment and testing pipelines",
    technologies: [
      { name: "GitHub Actions", usage: "Automated CI/CD pipeline for linting, type-checking, and deployment" },
      { name: "Docker", usage: "Multi-stage containerization for consistent development and production environments" },
      { name: "Docker Compose", usage: "Local development setup with database and application containers" },
      { name: "Vercel", usage: "Production hosting with automatic deployments and edge network distribution" },
      { name: "Automated Testing", usage: "Continuous integration testing on every commit and pull request" },
    ],
    color: "text-blue-400",
  },
  {
    icon: Cloud,
    title: "3D & Graphics",
    description: "Interactive 3D visualizations and CAD",
    technologies: [
      { name: "Three.js", usage: "WebGL rendering engine for 3D robot visualization at /robot-3d" },
      { name: "React Three Fiber", usage: "React renderer for Three.js enabling declarative 3D scenes" },
      { name: "WebGL", usage: "Hardware-accelerated 3D graphics rendering in the browser" },
      { name: "3D Rendering", usage: "Real-time lighting, shadows, and camera controls for robot viewer" },
      { name: "CAD Viewer", usage: "Interactive 3D model viewer with orbit controls and animations" },
    ],
    color: "text-pink-400",
  },
  {
    icon: GitBranch,
    title: "Real-time & Data",
    description: "Live data streaming and visualization",
    technologies: [
      { name: "WebSockets", usage: "Bidirectional communication for real-time telemetry dashboard at /telemetry" },
      {
        name: "Real-time Charts",
        usage: "Live updating charts showing sensor data, battery levels, and gyroscope readings",
      },
      { name: "Data Visualization", usage: "Interactive charts and graphs using Recharts library" },
      { name: "Recharts", usage: "Composable charting library for line charts, area charts, and gauges" },
      { name: "Live Telemetry", usage: "Simulated robot sensor data streaming at 10Hz update rate" },
    ],
    color: "text-orange-400",
  },
]

export function TechStack() {
  return (
    <section className="py-8 relative overflow-hidden border-b border-border/30">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary/50">
              Full-Stack Development
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technology Stack</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
              This portfolio itself is a demonstration of modern web development. Hover over each technology to see
              exactly how it's used.
            </p>
          </div>

          <TooltipProvider delayDuration={200}>
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
                        <Tooltip key={tech.name}>
                          <TooltipTrigger asChild>
                            <Badge
                              variant="secondary"
                              className="text-xs bg-muted hover:bg-primary/20 transition-colors text-foreground cursor-help"
                            >
                              {tech.name}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-sm">{tech.usage}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </Card>
                )
              })}
            </div>
          </TooltipProvider>

          <div className="mt-12 text-center">
            <Card className="p-6 border-2 border-primary/30 bg-primary/5 backdrop-blur">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Live Implementation:</span> Every technology listed
                above is actively used in this portfolio. This isn't just a list of skills—it's a working demonstration
                of full-stack development.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
