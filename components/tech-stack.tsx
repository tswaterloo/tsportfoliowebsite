"use client"

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const techStack = [
  {
    category: "Frontend",
    technologies: [
      { name: "React", usage: "Component-based UI architecture for all pages and interactive elements" },
      { name: "Next.js 15", usage: "Server-side rendering, API routes, and optimized production builds" },
      { name: "TypeScript", usage: "Type-safe code across entire codebase for reliability and maintainability" },
      { name: "Tailwind CSS v4", usage: "Utility-first styling system for responsive design and dark theme" },
      { name: "Framer Motion", usage: "Smooth animations and transitions throughout the portfolio" },
      { name: "shadcn/ui", usage: "Pre-built accessible UI components (buttons, cards, forms, tooltips)" },
    ],
  },
  {
    category: "Backend",
    technologies: [
      { name: "Node.js", usage: "JavaScript runtime powering all server-side logic and API endpoints" },
      { name: "Next.js API Routes", usage: "RESTful endpoints at /api/sql/* for CRUD operations" },
      { name: "REST API", usage: "HTTP endpoints for projects, skills, experience, and contact form data" },
      { name: "Server Actions", usage: "Server-side form handling and data mutations" },
    ],
  },
  {
    category: "Database",
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
  },
  {
    category: "CI/CD & DevOps",
    technologies: [
      {
        name: "GitHub Actions",
        usage: "Automated CI/CD pipeline for linting, type checking, and building on every push",
      },
      { name: "Docker", usage: "Containerization for consistent development and production environments" },
      { name: "Docker Compose", usage: "Multi-container orchestration for local development with databases" },
      { name: "Vercel", usage: "Production deployment platform with automatic previews and edge network CDN" },
    ],
  },
  {
    category: "3D & Graphics",
    technologies: [
      { name: "Three.js", usage: "WebGL rendering engine for 3D robot visualization in the showcase section" },
      { name: "React Three Fiber", usage: "React renderer for Three.js enabling declarative 3D scenes" },
      { name: "WebGL", usage: "Hardware-accelerated 3D graphics rendering in the browser" },
    ],
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
                return (
                  <div key={index} className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground/90">{stack.category}</h3>
                    <div className="flex flex-wrap gap-2 pl-4 border-l-2 border-primary/30">
                      {stack.technologies.map((tech) => (
                        <Tooltip key={tech.name}>
                          <TooltipTrigger asChild>
                            <Badge
                              variant="secondary"
                              className="text-sm bg-muted hover:bg-primary/20 transition-colors text-foreground cursor-help px-3 py-1"
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
                  </div>
                )
              })}
            </div>
          </TooltipProvider>

          <div className="mt-12 text-center">
            <div className="p-4 border-l-2 border-primary/50 bg-primary/5">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Live Implementation:</span> Every technology listed
                above is actively used in this portfolio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
