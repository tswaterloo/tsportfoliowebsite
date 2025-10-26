"use client"

import { useEffect, useState } from "react"
import { Database, Mail, Activity } from "lucide-react"

export function SystemStatus() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const services = [
    { icon: Database, label: "Database", status: "Connected", color: "text-green-400" },
    { icon: Mail, label: "Email Service", status: "Active", color: "text-green-400" },
    { icon: Activity, label: "API", status: "Healthy", color: "text-green-400" },
  ]

  return (
    <div className="absolute top-20 right-8 z-50 hidden lg:block">
      <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-lg p-4 shadow-lg">
        <div className="text-xs font-semibold text-muted-foreground mb-3 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          System Status
        </div>
        <div className="space-y-2">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div key={service.label} className="flex items-center gap-2 text-xs">
                <Icon className={`h-3 w-3 ${service.color}`} />
                <span className="text-muted-foreground min-w-[90px]">{service.label}:</span>
                <span className={`font-medium ${service.color}`}>{service.status}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
