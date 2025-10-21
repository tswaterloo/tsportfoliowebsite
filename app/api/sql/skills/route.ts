import { type NextRequest, NextResponse } from "next/server"
import { skillQueries } from "@/lib/db"

// GET /api/sql/skills - Fetch all skills from PostgreSQL
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    const skills = category ? await skillQueries.getByCategory(category) : await skillQueries.getAll()

    return NextResponse.json({
      success: true,
      data: skills,
      count: skills.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching skills:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch skills" }, { status: 500 })
  }
}
