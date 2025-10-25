"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Cable as Cube, Eye, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import dynamic from "next/dynamic"

const RobotViewer3D = dynamic(
  () => import("@/components/robot-viewer-3d").then((mod) => ({ default: mod.RobotViewer3D })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-muted/30">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading 3D Viewer...</p>
        </div>
      </div>
    ),
  },
)

export function RobotShowcase() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Cube className="h-3 w-3 mr-1" />
              3D Visualization
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Robot Viewer</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore my VEX Robotics competition robot in 3D. Built with React Three Fiber and WebGL for real-time
              rendering and interactive controls.
            </p>
          </div>

          <Card className="overflow-hidden border-2 hover:border-primary/30 transition-all group">
            <div className="relative aspect-video bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
              <div className="absolute inset-0">
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-12 h-12 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm text-muted-foreground">Loading 3D Model...</p>
                      </div>
                    </div>
                  }
                >
                  <div className="w-full h-full pointer-events-none">
                    <RobotViewer3D />
                  </div>
                </Suspense>
              </div>

              {/* Overlay with link to full page */}
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Link href="/robot-3d">
                  <Button size="lg" className="gap-2 pointer-events-auto">
                    <Eye className="h-5 w-5" />
                    View Full 3D Experience
                  </Button>
                </Link>
              </div>
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">VEX Robotics Competition Robot</h3>
                  <p className="text-muted-foreground">
                    World Championship Finalist robot with advanced autonomous navigation and PID control systems.
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">React Three Fiber</Badge>
                <Badge variant="secondary">Three.js</Badge>
                <Badge variant="secondary">WebGL</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">GLTF Models</Badge>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-sm">
                  <div className="font-semibold mb-1">Interactive Controls</div>
                  <div className="text-muted-foreground">Orbit, zoom, and pan</div>
                </div>
                <div className="text-sm">
                  <div className="font-semibold mb-1">Real-time Rendering</div>
                  <div className="text-muted-foreground">60 FPS WebGL graphics</div>
                </div>
                <div className="text-sm">
                  <div className="font-semibold mb-1">Responsive Design</div>
                  <div className="text-muted-foreground">Works on all devices</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Link href="/robot-3d">
                  <Button className="gap-2">
                    <Eye className="h-4 w-4" />
                    Launch 3D Viewer
                  </Button>
                </Link>
                <Button variant="outline" className="gap-2 bg-transparent" asChild>
                  <a href="http://bit.ly/46xUgox" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Competition Video
                  </a>
                </Button>
              </div>
            </div>
          </Card>

          {/* Technical Details */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-2">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Cube className="h-5 w-5 text-primary" />
                3D Graphics Stack
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• React Three Fiber for declarative 3D scenes</li>
                <li>• Three.js for WebGL rendering engine</li>
                <li>• Drei helpers for cameras, controls, and environments</li>
                <li>• GLTF model loading and optimization</li>
                <li>• Real-time lighting and shadow calculations</li>
              </ul>
            </Card>

            <Card className="p-6 border-2">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Eye className="h-5 w-5 text-secondary" />
                Interactive Features
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Orbit controls for 360° viewing</li>
                <li>• Animation playback controls</li>
                <li>• Hover interactions with tooltips</li>
                <li>• Responsive camera positioning</li>
                <li>• Performance monitoring overlay</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
