import { NextResponse } from "next/server"

// GitHub API integration to fetch public repositories
// This demonstrates external API integration skills

const GITHUB_USERNAME = "tanushshah" // Replace with actual GitHub username

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = Number.parseInt(searchParams.get("limit") || "6")

  try {
    // Fetch public repositories from GitHub API
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${limit}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          // Add GitHub token for higher rate limits in production
          // Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub repositories")
    }

    const repos = await response.json()

    // Transform GitHub data to match our project format
    const projects = repos.map((repo: any) => ({
      id: repo.id.toString(),
      title: repo.name,
      description: repo.description || "No description available",
      technologies: repo.language ? [repo.language] : [],
      github: repo.html_url,
      demo: repo.homepage || undefined,
      category: "github",
      featured: repo.stargazers_count > 10,
      stats: {
        views: 0,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
      },
      updatedAt: repo.updated_at,
      createdAt: repo.created_at,
    }))

    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length,
      source: "github",
    })
  } catch (error) {
    console.error("[v0] GitHub API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch GitHub repositories",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// POST /api/github/sync - Sync GitHub repos to database
export async function POST() {
  try {
    // Fetch repos from GitHub
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub repositories")
    }

    const repos = await response.json()

    // In production, save to MongoDB
    console.log("[v0] Synced", repos.length, "repositories from GitHub")

    return NextResponse.json({
      success: true,
      message: `Synced ${repos.length} repositories`,
      count: repos.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to sync repositories",
      },
      { status: 500 },
    )
  }
}
