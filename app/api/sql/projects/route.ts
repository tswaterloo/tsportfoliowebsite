import { type NextRequest, NextResponse } from "next/server"
import { projectQueries } from "@/lib/db"

// GET /api/sql/projects - Fetch all projects from PostgreSQL
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")

    let projects

    if (featured === "true") {
      projects = await projectQueries.getFeatured()
    } else if (category) {
      projects = await projectQueries.getByCategory(category)
    } else {
      projects = await projectQueries.getAll()
    }

    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching projects:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 })
  }
}

// POST /api/sql/projects - Create new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const project = await projectQueries.create(body)

    return NextResponse.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error("[v0] Error creating project:", error)
    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 500 })
  }
}
