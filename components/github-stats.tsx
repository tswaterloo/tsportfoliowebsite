"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Star, GitFork, Eye, TrendingUp, Calendar, Code2, ExternalLink } from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface GitHubRepo {
  id: string
  title: string
  description: string
  technologies: string[]
  github?: string
  stats: {
    stars: number
    forks: number
    views: number
  }
  updatedAt?: string
  createdAt?: string
}

interface GitHubStats {
  totalRepos: number
  totalStars: number
  totalForks: number
  languageDistribution: Array<{ name: string; value: number; color: string }>
  activityData: Array<{ month: string; commits: number; stars: number }>
}

export function GitHubStats() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGitHubData()
  }, [])

  async function fetchGitHubData() {
    try {
      setLoading(true)
      const response = await fetch("/api/github?limit=10")
      const data = await response.json()

      if (data.success) {
        setRepos(data.data)
        calculateStats(data.data)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError("Failed to fetch GitHub data")
      console.error("[v0] GitHub fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  function calculateStats(repoData: GitHubRepo[]) {
    const totalStars = repoData.reduce((sum, repo) => sum + repo.stats.stars, 0)
    const totalForks = repoData.reduce((sum, repo) => sum + repo.stats.forks, 0)

    // Language distribution
    const langMap = new Map<string, number>()
    repoData.forEach((repo) => {
      repo.technologies.forEach((tech) => {
        langMap.set(tech, (langMap.get(tech) || 0) + 1)
      })
    })

    const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#6366f1"]
    const languageDistribution = Array.from(langMap.entries())
      .map(([name, value], index) => ({
        name,
        value,
        color: colors[index % colors.length],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6)

    // Mock activity data
    const activityData = [
      { month: "Jan", commits: 45, stars: 12 },
      { month: "Feb", commits: 52, stars: 18 },
      { month: "Mar", commits: 38, stars: 15 },
      { month: "Apr", commits: 67, stars: 24 },
      { month: "May", commits: 71, stars: 31 },
      { month: "Jun", commits: 58, stars: 28 },
    ]

    setStats({
      totalRepos: repoData.length,
      totalStars,
      totalForks,
      languageDistribution,
      activityData,
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading GitHub data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-8 text-center border-2 border-destructive/20">
        <Github className="h-12 w-12 text-destructive mx-auto mb-3" />
        <p className="text-destructive font-semibold mb-2">Failed to load GitHub data</p>
        <p className="text-sm text-muted-foreground mb-4">{error}</p>
        <Button onClick={fetchGitHubData} variant="outline">
          Try Again
        </Button>
      </Card>
    )
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Github className="h-3 w-3 mr-1" />
              GitHub Analytics
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Source Contributions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time data from my GitHub profile showcasing projects, contributions, and coding activity.
            </p>
          </div>

          {/* Stats Overview */}
          {stats && (
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card className="p-6 border-2 hover:border-primary/30 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <Code2 className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-3xl font-bold mb-1">{stats.totalRepos}</div>
                <div className="text-sm text-muted-foreground">Public Repositories</div>
              </Card>

              <Card className="p-6 border-2 hover:border-secondary/30 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <Star className="h-8 w-8 text-secondary group-hover:scale-110 transition-transform" />
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-3xl font-bold mb-1">{stats.totalStars}</div>
                <div className="text-sm text-muted-foreground">Total Stars</div>
              </Card>

              <Card className="p-6 border-2 hover:border-accent/30 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <GitFork className="h-8 w-8 text-accent group-hover:scale-110 transition-transform" />
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-3xl font-bold mb-1">{stats.totalForks}</div>
                <div className="text-sm text-muted-foreground">Total Forks</div>
              </Card>

              <Card className="p-6 border-2 hover:border-primary/30 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <Eye className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-3xl font-bold mb-1">15.4K</div>
                <div className="text-sm text-muted-foreground">Profile Views</div>
              </Card>
            </div>
          )}

          {/* Charts */}
          {stats && (
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Activity Chart */}
              <Card className="p-6 border-2">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Contribution Activity
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={stats.activityData}>
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
                    <Line
                      type="monotone"
                      dataKey="commits"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="stars"
                      stroke="hsl(var(--secondary))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Commits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary" />
                    <span className="text-muted-foreground">Stars Received</span>
                  </div>
                </div>
              </Card>

              {/* Language Distribution */}
              <Card className="p-6 border-2">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" />
                  Language Distribution
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={stats.languageDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stats.languageDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}

          {/* Repository List */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Recent Repositories</h3>
            <div className="grid gap-4">
              {repos.slice(0, 6).map((repo) => (
                <Card key={repo.id} className="p-6 border-2 hover:border-primary/30 transition-all group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {repo.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">{repo.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {repo.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {repo.stats.stars}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-4 w-4" />
                        {repo.stats.forks}
                      </div>
                      {repo.updatedAt && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Updated {new Date(repo.updatedAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    {repo.github && (
                      <Button variant="ghost" size="sm" className="gap-2" asChild>
                        <a href={repo.github} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          View
                        </a>
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" size="lg" className="gap-2 bg-transparent" asChild>
                <a href="https://github.com/tanushshah" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  View All on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
