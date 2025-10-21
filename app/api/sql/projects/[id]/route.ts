import { type NextRequest, NextResponse } from "next/server"
import { projectQueries } from "@/lib/db"

// GET /api/sql/projects/[id] - Fetch single project
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const project = await projectQueries.getById(Number.parseInt(id))

    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error("[v0] Error fetching project:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch project" }, { status: 500 })
  }
}

// PUT /api/sql/projects/[id] - Update project
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const project = await projectQueries.update(Number.parseInt(id), body)

    return NextResponse.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error("[v0] Error updating project:", error)
    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 500 })
  }
}

// DELETE /api/sql/projects/[id] - Delete project
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await projectQueries.delete(Number.parseInt(id))

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    })
  } catch (error) {
    console.error("[v0] Error deleting project:", error)
    return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 500 })
  }
}
