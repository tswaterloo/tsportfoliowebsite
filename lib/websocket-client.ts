// WebSocket client utility for real-time communication
// Demonstrates WebSocket integration for IoT and robotics applications

export interface WebSocketConfig {
  url: string
  reconnectInterval?: number
  maxReconnectAttempts?: number
  onOpen?: () => void
  onClose?: () => void
  onError?: (error: Event) => void
  onMessage?: (data: any) => void
}

export class WebSocketClient {
  private ws: WebSocket | null = null
  private config: WebSocketConfig
  private reconnectAttempts = 0
  private reconnectTimeout: NodeJS.Timeout | null = null

  constructor(config: WebSocketConfig) {
    this.config = {
      reconnectInterval: 5000,
      maxReconnectAttempts: 5,
      ...config,
    }
  }

  connect() {
    try {
      this.ws = new WebSocket(this.config.url)

      this.ws.onopen = () => {
        console.log("[v0] WebSocket connected to", this.config.url)
        this.reconnectAttempts = 0
        this.config.onOpen?.()
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          this.config.onMessage?.(data)
        } catch (error) {
          console.error("[v0] Failed to parse WebSocket message:", error)
        }
      }

      this.ws.onerror = (error) => {
        console.error("[v0] WebSocket error:", error)
        this.config.onError?.(error)
      }

      this.ws.onclose = () => {
        console.log("[v0] WebSocket disconnected")
        this.config.onClose?.()
        this.attemptReconnect()
      }
    } catch (error) {
      console.error("[v0] Failed to create WebSocket:", error)
      this.attemptReconnect()
    }
  }

  private attemptReconnect() {
    if (this.config.maxReconnectAttempts && this.reconnectAttempts >= this.config.maxReconnectAttempts) {
      console.log("[v0] Max reconnect attempts reached")
      return
    }

    this.reconnectAttempts++
    console.log(`[v0] Attempting to reconnect (${this.reconnectAttempts}/${this.config.maxReconnectAttempts})...`)

    this.reconnectTimeout = setTimeout(() => {
      this.connect()
    }, this.config.reconnectInterval)
  }

  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    } else {
      console.warn("[v0] WebSocket is not connected")
    }
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }

    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN
  }
}

// Example usage for robot telemetry
export function createTelemetryClient(onData: (data: any) => void) {
  return new WebSocketClient({
    url: "ws://localhost:8080/telemetry",
    reconnectInterval: 3000,
    maxReconnectAttempts: 10,
    onOpen: () => {
      console.log("[v0] Telemetry stream connected")
    },
    onClose: () => {
      console.log("[v0] Telemetry stream disconnected")
    },
    onError: (error) => {
      console.error("[v0] Telemetry stream error:", error)
    },
    onMessage: onData,
  })
}
