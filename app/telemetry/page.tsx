import { RobotTelemetry } from "@/components/robot-telemetry"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, BookOpen } from "lucide-react"
import Link from "next/link"

export default function TelemetryPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Portfolio
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-xl font-bold">Robot Telemetry Dashboard</h1>
                <p className="text-sm text-muted-foreground">Real-time sensor monitoring with WebSockets</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                <a href="https://bit.ly/46tg7gQ" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  Code
                </a>
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                <a href="/docs/API_DOCUMENTATION.md" target="_blank" rel="noopener noreferrer">
                  <BookOpen className="h-4 w-4" />
                  Docs
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <main>
        <RobotTelemetry />
      </main>
    </div>
  )
}
