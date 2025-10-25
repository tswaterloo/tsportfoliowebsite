"use client"

import type React from "react"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera, Html, useGLTF } from "@react-three/drei"
import { Suspense, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Info, X, Upload } from "lucide-react"
import type * as THREE from "three"

function Robot({ isAnimating, modelPath }: { isAnimating: boolean; modelPath: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  const { scene } = useGLTF(modelPath)

  useFrame((state, delta) => {
    if (meshRef.current && isAnimating) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group>
      <primitive
        ref={meshRef}
        object={scene.clone()}
        scale={2}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />

      {hovered && (
        <Html position={[0, 3, 0]} center>
          <div className="bg-background/95 backdrop-blur-sm border border-primary/30 rounded-lg px-3 py-2 shadow-xl pointer-events-none">
            <p className="text-xs font-medium text-foreground whitespace-nowrap">VEX Robotics Robot</p>
            <p className="text-[10px] text-muted-foreground">Drag to rotate</p>
          </div>
        </Html>
      )}

      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
    </group>
  )
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-muted-foreground">Loading 3D Model...</p>
      </div>
    </Html>
  )
}

export function RobotViewer3D() {
  const [isAnimating, setIsAnimating] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [modelPath, setModelPath] = useState("/assets/3d/duck.glb")

  const handleReset = () => {
    setIsAnimating(false)
    setTimeout(() => setIsAnimating(true), 100)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileName = file.name.toLowerCase()

      if (fileName.endsWith(".step") || fileName.endsWith(".stp")) {
        alert(
          "STEP files need to be converted to .glb or .gltf format first.\n\n" +
            "You can convert them using:\n" +
            "• FreeCAD (free)\n" +
            "• Blender (free)\n" +
            "• Online converters like AnyConv\n\n" +
            "Export as .glb for best results!",
        )
        return
      }

      if (fileName.endsWith(".glb") || fileName.endsWith(".gltf")) {
        const url = URL.createObjectURL(file)
        setModelPath(url)
      } else {
        alert("Please upload a .glb, .gltf file (or convert your STEP file first)")
      }
    }
  }

  return (
    <div className="w-full h-full min-h-[400px] relative rounded-lg overflow-hidden border border-border/50 bg-gradient-to-br from-background via-muted/10 to-background">
      <Canvas shadows className="bg-transparent">
        <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />

        <Suspense fallback={<Loader />}>
          <Robot isAnimating={isAnimating} modelPath={modelPath} />
          <Environment preset="studio" />
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

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center gap-2 bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-2 shadow-lg">
          <Button
            size="sm"
            variant={isAnimating ? "default" : "outline"}
            onClick={() => setIsAnimating(!isAnimating)}
            className="h-8 px-3 text-xs"
            title={isAnimating ? "Pause" : "Play"}
          >
            {isAnimating ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            className="h-8 px-3 text-xs bg-transparent"
            title="Reset"
          >
            <RotateCcw className="h-3 w-3" />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowInfo(!showInfo)}
            className="h-8 px-3 text-xs"
            title="Info"
          >
            <Info className="h-3 w-3" />
          </Button>

          <label className="cursor-pointer">
            <Button
              size="sm"
              variant="outline"
              className="h-8 px-3 text-xs bg-transparent"
              title="Upload CAD File"
              asChild
            >
              <span>
                <Upload className="h-3 w-3" />
              </span>
            </Button>
            <input type="file" accept=".glb,.gltf,.step,.stp" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {showInfo && (
        <div className="absolute top-4 right-4 z-10 max-w-[220px]">
          <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-lg">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xs font-semibold">Controls</h3>
              <button
                onClick={() => setShowInfo(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
            <ul className="text-[10px] text-muted-foreground space-y-1">
              <li>• Drag to rotate</li>
              <li>• Scroll to zoom</li>
              <li>• Right-click to pan</li>
              <li>• Click upload to add your CAD</li>
            </ul>
            <div className="mt-2 pt-2 border-t border-border/50">
              <p className="text-[9px] text-muted-foreground">
                Upload .glb or .gltf files. STEP files must be converted first using FreeCAD or Blender.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
