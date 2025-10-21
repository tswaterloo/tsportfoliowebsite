"use client"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Activity,
  Zap,
  Thermometer,
  Gauge,
  Radio,
  AlertTriangle,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface TelemetryData {
  timestamp: number
  battery: number
  temperature: number
  motorSpeed: number
  position: { x: number; y: number }
  sensors: {
    gyro: { x: number; y: number; z: number }
    accelerometer: { x: number; y: number; z: number }
  }
  status: "active" | "idle" | "error"
}

export function RobotTelemetry() {
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([])
  const [currentData, setCurrentData] = useState<TelemetryData | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const simulationRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // In production, connect to actual WebSocket server
    // connectWebSocket()

    return () => {
      disconnectWebSocket()
      stopSimulation()
    }
  }, [])

  function connectWebSocket() {
    try {
      // In production: ws://your-robot-server.com/telemetry
      const ws = new WebSocket("ws://localhost:8080/telemetry")

      ws.onopen = () => {
        console.log("[v0] WebSocket connected")
        setIsConnected(true)
      }

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data) as TelemetryData
        updateTelemetry(data)
      }

      ws.onerror = (error) => {
        console.error("[v0] WebSocket error:", error)
        setIsConnected(false)
      }

      ws.onclose = () => {
        console.log("[v0] WebSocket disconnected")
        setIsConnected(false)
      }

      wsRef.current = ws
    } catch (error) {
      console.error("[v0] Failed to connect WebSocket:", error)
    }
  }

  function disconnectWebSocket() {
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
  }

  function startSimulation() {
    setIsSimulating(true)
    setIsConnected(true)

    simulationRef.current = setInterval(() => {
      const data: TelemetryData = {
        timestamp: Date.now(),
        battery: Math.max(0, 100 - Math.random() * 0.5),
        temperature: 25 + Math.random() * 10,
        motorSpeed: Math.random() * 100,
        position: {
          x: Math.random() * 200 - 100,
          y: Math.random() * 200 - 100,
        },
        sensors: {
          gyro: {
            x: Math.random() * 360,
            y: Math.random() * 360,
            z: Math.random() * 360,
          },
          accelerometer: {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
            z: Math.random() * 2 - 1,
          },
        },
        status: Math.random() > 0.95 ? "error" : Math.random() > 0.5 ? "active" : "idle",
      }

      updateTelemetry(data)
    }, 1000)
  }

  function stopSimulation() {
    setIsSimulating(false)
    setIsConnected(false)
    if (simulationRef.current) {
      clearInterval(simulationRef.current)
      simulationRef.current = null
    }
  }

  function updateTelemetry(data: TelemetryData) {
    setCurrentData(data)
    setTelemetryData((prev) => {
      const updated = [...prev, data]
      // Keep last 30 data points
      return updated.slice(-30)
    })
  }

  function resetData() {
    setTelemetryData([])
    setCurrentData(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-500"
      case "idle":
        return "text-yellow-500"
      case "error":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "idle":
        return <Activity className="h-5 w-5 text-yellow-500" />
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Radio className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Activity className="h-3 w-3 mr-1" />
              Real-Time Telemetry
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Robot Telemetry Dashboard</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Live monitoring of robot sensors, motors, and system status using WebSocket connections for real-time data
              streaming.
            </p>
          </div>

          {/* Connection Status */}
          <Card className="p-6 mb-6 border-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
                  />
                  <span className="font-semibold">{isConnected ? "Connected" : "Disconnected"}</span>
                </div>
                {currentData && (
                  <>
                    <div className="h-6 w-px bg-border" />
                    <div className="flex items-center gap-2">
                      {getStatusIcon(currentData.status)}
                      <span className={`font-semibold capitalize ${getStatusColor(currentData.status)}`}>
                        {currentData.status}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                {!isSimulating ? (
                  <Button onClick={startSimulation} className="gap-2">
                    <Play className="h-4 w-4" />
                    Start Simulation
                  </Button>
                ) : (
                  <Button onClick={stopSimulation} variant="destructive" className="gap-2">
                    <Pause className="h-4 w-4" />
                    Stop Simulation
                  </Button>
                )}
                <Button onClick={resetData} variant="outline" className="gap-2 bg-transparent">
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
          </Card>

          {/* Current Metrics */}
          {currentData && (
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <Card className="p-6 border-2">
                <div className="flex items-center justify-between mb-2">
                  <Zap className="h-8 w-8 text-primary" />
                  <Badge variant={currentData.battery > 20 ? "secondary" : "destructive"}>
                    {currentData.battery > 20 ? "Good" : "Low"}
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{currentData.battery.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Battery Level</div>
                <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      currentData.battery > 20 ? "bg-primary" : "bg-destructive"
                    }`}
                    style={{ width: `${currentData.battery}%` }}
                  />
                </div>
              </Card>

              <Card className="p-6 border-2">
                <div className="flex items-center justify-between mb-2">
                  <Thermometer className="h-8 w-8 text-secondary" />
                  <Badge variant={currentData.temperature < 40 ? "secondary" : "destructive"}>
                    {currentData.temperature < 40 ? "Normal" : "High"}
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{currentData.temperature.toFixed(1)}°C</div>
                <div className="text-sm text-muted-foreground">Temperature</div>
              </Card>

              <Card className="p-6 border-2">
                <div className="flex items-center justify-between mb-2">
                  <Gauge className="h-8 w-8 text-accent" />
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{currentData.motorSpeed.toFixed(0)}</div>
                <div className="text-sm text-muted-foreground">Motor Speed (RPM)</div>
              </Card>

              <Card className="p-6 border-2">
                <div className="flex items-center justify-between mb-2">
                  <Radio className="h-8 w-8 text-primary" />
                  <Badge variant="secondary">Live</Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{telemetryData.length}</div>
                <div className="text-sm text-muted-foreground">Data Points</div>
              </Card>
            </div>
          )}

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Battery Chart */}
            <Card className="p-6 border-2">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Battery Level Over Time
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={telemetryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                  />
                  <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    labelFormatter={(ts) => new Date(ts).toLocaleTimeString()}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="battery" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Temperature Chart */}
            <Card className="p-6 border-2">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-secondary" />
                Temperature Monitoring
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={telemetryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                  />
                  <YAxis domain={[0, 50]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    labelFormatter={(ts) => new Date(ts).toLocaleTimeString()}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Sensor Data */}
          {currentData && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-2">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Gyroscope Data
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">X-Axis</span>
                    <span className="font-mono font-semibold">{currentData.sensors.gyro.x.toFixed(2)}°</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Y-Axis</span>
                    <span className="font-mono font-semibold">{currentData.sensors.gyro.y.toFixed(2)}°</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Z-Axis</span>
                    <span className="font-mono font-semibold">{currentData.sensors.gyro.z.toFixed(2)}°</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-secondary" />
                  Accelerometer Data
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">X-Axis</span>
                    <span className="font-mono font-semibold">{currentData.sensors.accelerometer.x.toFixed(3)} g</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Y-Axis</span>
                    <span className="font-mono font-semibold">{currentData.sensors.accelerometer.y.toFixed(3)} g</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Z-Axis</span>
                    <span className="font-mono font-semibold">{currentData.sensors.accelerometer.z.toFixed(3)} g</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
