"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, Users, Eye, Activity, Award } from "lucide-react"

interface AnalyticsData {
  totalViews: number
  totalProjects: number
  totalStars: number
  totalForks: number
  viewsByMonth: Array<{ month: string; views: number }>
  projectsByCategory: Array<{ category: string; count: number }>
  topProjects: Array<{ name: string; views: number }>
  skillsUsage: Array<{ skill: string; projects: number }>
}

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  async function fetchAnalytics() {
    try {
      const response = await fetch("/api/analytics")
      const data = await response.json()

      if (data.success) {
        setAnalytics(data.data)
      }
    } catch (error) {
      console.error("[v0] Analytics fetch error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!analytics) return null

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Activity className="h-3 w-3 mr-1" />
              Portfolio Analytics
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Performance Metrics</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time analytics tracking portfolio engagement, project views, and technology trends.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 border-2 hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <Eye className="h-8 w-8 text-primary" />
                <Badge variant="secondary" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +23%
                </Badge>
              </div>
              <div className="text-3xl font-bold mb-1">{analytics.totalViews.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </Card>

            <Card className="p-6 border-2 hover:border-secondary/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <Activity className="h-8 w-8 text-secondary" />
                <Badge variant="secondary" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12%
                </Badge>
              </div>
              <div className="text-3xl font-bold mb-1">{analytics.totalProjects}</div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </Card>

            <Card className="p-6 border-2 hover:border-accent/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <Award className="h-8 w-8 text-accent" />
                <Badge variant="secondary" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +34%
                </Badge>
              </div>
              <div className="text-3xl font-bold mb-1">{analytics.totalStars}</div>
              <div className="text-sm text-muted-foreground">GitHub Stars</div>
            </Card>

            <Card className="p-6 border-2 hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-primary" />
                <Badge variant="secondary" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +18%
                </Badge>
              </div>
              <div className="text-3xl font-bold mb-1">{analytics.totalForks}</div>
              <div className="text-sm text-muted-foreground">Project Forks</div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Views Over Time */}
            <Card className="p-6 border-2">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Portfolio Views Over Time
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={analytics.viewsByMonth}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorViews)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Top Projects */}
            <Card className="p-6 border-2">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Most Viewed Projects
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={analytics.topProjects} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    width={120}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="views" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Skills Usage */}
          <Card className="p-6 border-2">
            <h3 className="font-semibold mb-6 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Technology Stack Usage
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {analytics.skillsUsage.map((skill) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{skill.skill}</span>
                    <span className="text-muted-foreground">{skill.projects} projects</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(skill.projects / analytics.totalProjects) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
