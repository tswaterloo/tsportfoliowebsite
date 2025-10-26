"use client"

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
    <section id="robot-showcase" className="py-16 border-b border-border/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Badge variant="outline" className="mb-4">
              <Cube className="h-3 w-3 mr-1" />
              3D Visualization
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Robot Viewer</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore my VEX Robotics competition robot in 3D. Built with React Three Fiber and WebGL for real-time
              rendering and interactive controls.
            </p>
          </div>

          {/* 3D Viewer - No card wrapper */}
          <div className="relative aspect-video bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-lg overflow-hidden border border-border/50 mb-8 group">
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

          {/* Info Section - No boxes */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">VEX Robotics Competition Robot</h3>
              <p className="text-muted-foreground mb-4">
                The World Championship Robot that I designed.
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary">React Three Fiber</Badge>
                <Badge variant="secondary">Three.js</Badge>
                <Badge variant="secondary">WebGL</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">GLTF Models</Badge>
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

            {/* Technical Details - Flowing list style like skills section */}
            <div className="border-t border-border/30 pt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <Cube className="h-5 w-5 text-red-500" />
                    </div>
                    <h3 className="font-semibold text-lg">3D Graphics Stack</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground pl-[52px]">
                    <li>• React Three Fiber for declarative 3D scenes</li>
                    <li>• Three.js for WebGL rendering engine</li>
                    <li>• Drei helpers for cameras, controls, and environments</li>
                    <li>• GLTF model loading and optimization</li>
                    <li>• Real-time lighting and shadow calculations</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                      <Eye className="h-5 w-5 text-yellow-500" />
                    </div>
                    <h3 className="font-semibold text-lg">Interactive Features</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground pl-[52px]">
                    <li>• Orbit controls for 360° viewing</li>
                    <li>• Animation playback controls</li>
                    <li>• Hover interactions with tooltips</li>
                    <li>• Responsive camera positioning</li>
                    <li>• Performance monitoring overlay</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
