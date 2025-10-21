import { RobotViewer3D } from "@/components/robot-viewer-3d"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function Robot3DPage() {
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
                <h1 className="text-xl font-bold">VEX Robotics 3D Viewer</h1>
                <p className="text-sm text-muted-foreground">Interactive 3D model visualization</p>
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
                <a href="http://bit.ly/46xUgox" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Demo
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 3D Viewer */}
      <main className="h-[calc(100vh-73px)]">
        <RobotViewer3D />
      </main>
    </div>
  )
}
