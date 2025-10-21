"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Grid, PerspectiveCamera, Html, useGLTF } from "@react-three/drei"
import { Suspense, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Maximize2, Info } from "lucide-react"
import type * as THREE from "three"

// Robot component with animation
function Robot({ isAnimating }: { isAnimating: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Use the built-in duck model as placeholder
  const { scene } = useGLTF("/assets/3d/duck.glb")

  useFrame((state, delta) => {
    if (meshRef.current && isAnimating) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group>
      {/* Main robot body - using duck as placeholder */}
      <primitive
        ref={meshRef}
        object={scene.clone()}
        scale={2}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />

      {/* Info label */}
      {hovered && (
        <Html position={[0, 3, 0]} center>
          <div className="bg-background/95 backdrop-blur-sm border-2 border-primary rounded-lg px-4 py-2 shadow-xl">
            <p className="text-sm font-semibold text-foreground whitespace-nowrap">VEX Robotics Competition Robot</p>
            <p className="text-xs text-muted-foreground">Click and drag to rotate</p>
          </div>
        </Html>
      )}

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
    </group>
  )
}

// Loading fallback
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading 3D Model...</p>
      </div>
    </Html>
  )
}

export function RobotViewer3D() {
  const [isAnimating, setIsAnimating] = useState(true)
  const [showInfo, setShowInfo] = useState(true)

  const handleReset = () => {
    setIsAnimating(false)
    setTimeout(() => setIsAnimating(true), 100)
  }

  return (
    <div className="w-full h-full min-h-[600px] relative">
      {/* 3D Canvas */}
      <Canvas shadows className="bg-gradient-to-b from-background to-muted/30">
        <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />

        <Suspense fallback={<Loader />}>
          <Robot isAnimating={isAnimating} />

          {/* Environment */}
          <Environment preset="studio" />

          {/* Grid floor */}
          <Grid
            args={[20, 20]}
            cellSize={0.5}
            cellThickness={0.5}
            cellColor="#6b7280"
            sectionSize={2}
            sectionThickness={1}
            sectionColor="#3b82f6"
            fadeDistance={25}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid
          />

          {/* Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={15}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>

      {/* Control Panel */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <Card className="p-4 bg-background/95 backdrop-blur-sm border-2 shadow-xl">
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant={isAnimating ? "default" : "outline"}
              onClick={() => setIsAnimating(!isAnimating)}
              className="gap-2"
            >
              {isAnimating ? (
                <>
                  <Pause className="h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Play
                </>
              )}
            </Button>

            <Button size="sm" variant="outline" onClick={handleReset} className="gap-2 bg-transparent">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>

            <Button size="sm" variant="outline" onClick={() => setShowInfo(!showInfo)} className="gap-2">
              <Info className="h-4 w-4" />
              Info
            </Button>

            <div className="h-6 w-px bg-border" />

            <Button size="sm" variant="ghost" className="gap-2">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Info Panel */}
      {showInfo && (
        <div className="absolute top-6 right-6 z-10 max-w-xs">
          <Card className="p-4 bg-background/95 backdrop-blur-sm border-2 shadow-xl">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              3D Robot Viewer
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Drag to rotate the view</li>
              <li>• Scroll to zoom in/out</li>
              <li>• Right-click drag to pan</li>
              <li>• Hover over robot for details</li>
            </ul>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">Built with React Three Fiber</p>
            </div>
          </Card>
        </div>
      )}

      {/* Stats Overlay */}
      <div className="absolute top-6 left-6 z-10">
        <Card className="p-3 bg-background/95 backdrop-blur-sm border-2 shadow-xl">
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-semibold text-primary">{isAnimating ? "Animating" : "Paused"}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Renderer:</span>
              <span className="font-semibold">WebGL</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Framework:</span>
              <span className="font-semibold">Three.js</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
