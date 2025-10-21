import { type NextRequest, NextResponse } from "next/server"
import { experienceQueries } from "@/lib/db"

// GET /api/sql/experience - Fetch all experience from PostgreSQL
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const current = searchParams.get("current")

    const experience = current === "true" ? await experienceQueries.getCurrent() : await experienceQueries.getAll()

    return NextResponse.json({
      success: true,
      data: experience,
      count: experience.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching experience:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch experience" }, { status: 500 })
  }
}
